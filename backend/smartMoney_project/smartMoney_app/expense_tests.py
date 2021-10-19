from django.contrib.auth import get_user_model
from django.test import TestCase
from django.core.exceptions import ValidationError
from rest_framework.test import APITestCase
from django.contrib.auth.hashers import make_password,check_password
from django.core import mail
from .models import Expense, Category
from django.utils import timezone
from datetime import datetime
import pytz


User = get_user_model()

class ConsumptionTestCase(APITestCase):
	def userLogin (self,email,password):
		webClient = self.client
		return webClient.post('/login/', {'email': email, 'password': password})

	def setUp(self):
		user = User.create_user(first_name='Francisco',email='f@gmail.com',last_name='Stulich',password='admin')
		Category.create_default()

	def test_expense_creation_success(self):
		user = User.get(email= 'f@gmail.com')
		date = '2021-09-18'
		category = Category.get(name = 'Other')
		expense = Expense.create_expense(value = 500,description = 'Entrada cine',owner = user,date = date,category = category)
		date = pytz.timezone("UTC").localize(datetime(2021, 9 , 18))
		self.assertEqual(expense.getValue(),500)
		self.assertEqual(expense.getOwner(),user)
		self.assertEqual(expense.getDescription(),'Entrada cine')
		self.assertEqual(expense.getDate(),date)
		self.assertEqual(expense.getCategory(),category)


	def test_expense_edition_success(self):
		user = User.get(email= 'f@gmail.com')
		date = '2021-09-18'
		category = Category.get(name = 'Other')
		expense = Expense.create_expense(value = 500,description = 'Entrada cine',owner = user,date = date, category = category)
		self.assertEqual(expense.getValue(),500)
		self.assertEqual(expense.getDescription(),'Entrada cine')
		expense.modify(value = 750, description = 'Supermercado')
		self.assertEqual(expense.getDescription(),'Supermercado')
		self.assertEqual(expense.getValue(),750)


	def test_user_succesfully_saves_an_expense(self):
		loginResponse = self.userLogin('f@gmail.com','admin')
		self.assertEqual(loginResponse.status_code,200)
		self.assertEqual(len(Expense.getAllWith()),0)
		loginCode = loginResponse.data.get('code')
		user_id = loginResponse.data.get('user_id')
		user = User.get(id = user_id)
		date = '2021-09-18'
		webClient = self.client
		response = webClient.post('/new_expense/' + str(user_id) + '/', {'code' : loginCode, 'value' : 500, 
																		'description': 'Supermercado', 'category':'Market and home',
																		'date': date}) #falta date
		self.assertEqual(response.status_code,201)
		self.assertEqual(len(Expense.getAllWith()),1)
		date = pytz.timezone("UTC").localize(datetime(2021, 9 , 18))
		category = Category.get(name = 'Market and home')
		expense = Expense.get(value = 500)
		self.assertEqual(expense.getValue(),500)
		self.assertEqual(expense.getOwner(),user)
		self.assertEqual(expense.getDescription(),'Supermercado')
		self.assertEqual(expense.getDate(),date)
		self.assertEqual(expense.getCategory(),category)


	def test_user_saving_an_expense_fails(self):
		loginResponse = self.userLogin('f@gmail.com','admin')
		self.assertEqual(loginResponse.status_code,200)
		self.assertEqual(len(Expense.getAllWith()),0)
		wrongLoginCode = loginResponse.data.get('code')[::-1]
		user_id = loginResponse.data.get('user_id')
		webClient = self.client
		response = webClient.post('/new_expense/' + str(user_id) + '/', {'code' : wrongLoginCode, 'value' : 500})
		self.assertEqual(response.status_code,401)
		self.assertEqual(len(Expense.getAllWith()),0)

	def test_get_all_expenses(self):
		loginResponse = self.userLogin('f@gmail.com','admin')
		self.assertEqual(loginResponse.status_code,200)
		loginCode = loginResponse.data.get('code')
		user_id = loginResponse.data.get('user_id')
		webClient = self.client
		date = '2021-09-18'
		for i in range(6):
			webClient.post('/new_expense/' + str(user_id) + '/', {'code' : loginCode, 'value' : 100*(i+1),
																'description': 'Supermercado', 'category':'Market and home',
																		'date': date})
		response = webClient.post('/expenses/' + str(user_id) + '/',{'code' : loginCode})
		self.assertEqual(response.status_code,200)
		self.assertEqual(len(response.data),6)
		
	def test_cant_get_expenses_without_valid_credentials(self):
		loginResponse = self.userLogin('f@gmail.com','admin')
		self.assertEqual(loginResponse.status_code,200)
		wrongLoginCode = loginResponse.data.get('code')[::-1]
		user_id = loginResponse.data.get('user_id')
		webClient = self.client
		for i in range(6):
			webClient.post('/new_expense/' + str(user_id) + '/', {'code' : wrongLoginCode, 'value' : 100*(i+1)})
		response = webClient.post('/expenses/' + str(user_id) + '/',{'code' : wrongLoginCode})
		self.assertEqual(response.status_code,401)

	def test_user_edits_expense(self):
		loginResponse = self.userLogin('f@gmail.com','admin')
		self.assertEqual(loginResponse.status_code,200)
		loginCode = loginResponse.data.get('code')
		user_id = loginResponse.data.get('user_id')
		webClient = self.client
		webClient.post('/new_expense/' + str(user_id) + '/', {'code' : loginCode, 'value' : 500,
															 'description': 'Supermercado', 'category':'Market and home',
															 'date': '2021-09-18'})
		self.assertEqual(len(Expense.getAllWith()),1)
		expense = Expense.get(value = 500)
		expense_id = expense.id
		self.assertEqual(expense.getValue(),500)
		self.assertEqual(expense.getDescription(),'Supermercado')
		response = webClient.put('/edit_expense/' + str(user_id) + '/', {'code' : loginCode, 'expense_id': expense_id,
															  'value' : 750, 'description': 'Focos de luz',
															  'category' : 'Bills and taxes',
															  'date': '2020-09-18'},
															  format = 'json')

		expense = Expense.get(id = expense_id)
		self.assertEqual(response.status_code,200)
		self.assertEqual(expense.getValue(),750)
		self.assertEqual(expense.getDescription(),'Focos de luz')
		date = pytz.timezone("UTC").localize(datetime(2020, 9 , 18))
		self.assertEqual(expense.getDate(),date)
		self.assertEqual(expense.getCategory().getName(), 'Bills and taxes')
	def test_user_edits_expense_with_invalid_credentials(self):
		loginResponse = self.userLogin('f@gmail.com','admin')
		self.assertEqual(loginResponse.status_code,200)
		wrongLoginCode = loginResponse.data.get('code')[::-1]
		loginCode = loginResponse.data.get('code')
		user_id = loginResponse.data.get('user_id')
		webClient = self.client
		webClient.post('/new_expense/' + str(user_id) + '/', {'code' : loginCode, 'value' : 500,
															 'description': 'Supermercado', 'category':'Market and home',
															 'date': '2021-09-18'})
		self.assertEqual(len(Expense.getAllWith()),1)
		expense = Expense.get(value = 500)
		expense_id = expense.id
		self.assertEqual(expense.getValue(),500)
		self.assertEqual(expense.getDescription(),'Supermercado')
		response = webClient.put('/edit_expense/' + str(user_id) + '/', {'code' : wrongLoginCode, 'expense_id': expense_id,
															  'Value' : 755.5},
															  format = 'json')
		self.assertEqual(response.status_code,401)
		expense = Expense.get(id = expense_id)
		self.assertEqual(expense.value, 500)

	def test_user_delete_expenses(self):
		loginResponse = self.userLogin('f@gmail.com','admin')
		webClient = self.client
		self.assertEqual(loginResponse.status_code,200)
		loginCode = loginResponse.data.get('code')
		user_id = loginResponse.data.get('user_id')
		webClient.post('/new_expense/' + str(user_id) + '/', {'code' : loginCode, 'value' : 500,
															 'description': 'Supermercado', 'category':'Market and home',
															 'date': '2021-09-18'})
		self.assertEqual(len(Expense.getAllWith()),1)
		expense_id = Expense.get(value = 500).id
		response = webClient.delete('/delete_expense/' + str(user_id) +'/',{'code' : loginCode,
																			'expense_id' : expense_id})
		self.assertEqual(response.status_code,200)
		self.assertEqual(len(Expense.getAllWith()),0)

	def test_user_dont_delete_expenses_bc_invalid_credentials(self):
		loginResponse = self.userLogin('f@gmail.com','admin')
		webClient = self.client
		self.assertEqual(loginResponse.status_code,200)
		loginCode = loginResponse.data.get('code')
		user_id = loginResponse.data.get('user_id')
		webClient.post('/new_expense/' + str(user_id) + '/', {'code' : loginCode, 'value' : 500,
															 'description': 'Supermercado', 'category':'Market and home',
															 'date': '2021-09-18'})
		self.assertEqual(len(Expense.getAllWith()),1)
		expense_id = Expense.get(value = 500).id
		wrongLoginCode = loginCode [::-1]
		response = webClient.delete('/delete_expense/' + str(user_id) +'/',{'code' : wrongLoginCode,
																			'expense_id' : expense_id})
		self.assertEqual(response.status_code,401)
		self.assertEqual(len(Expense.getAllWith()),1)

	def test_get_total_expenses_per_month(self):
		user = User.get(email= 'f@gmail.com')
		other_category = Category.get(name = 'Other')
		bills_cat = Category.get(name = 'Bills and taxes')
		Expense.create_expense(value = 500,description = 'Entrada cine',owner = user,date = '2021-09-20',category = other_category)
		Expense.create_expense(value = 500,description = 'ARBA',owner = user,date = '2021-09-5',category = bills_cat)
		september_total = 1000
		Expense.create_expense(value = 1500,description = 'Entrada cine',owner = user,date = '2021-08-25',category = other_category)
		Expense.create_expense(value = 500,description = 'ARBA',owner = user,date = '2021-08-5',category = bills_cat)
		august_total = 2000
		totals = Expense.getTotalsPerMonth(user)
		self.assertEqual(len(totals) ,2)
		self.assertEqual((totals[0]['total']) ,august_total)
		self.assertEqual(totals[1]['total'] ,september_total)
	def test_user_get_his_totals_per_month(self):
		user = User.get(email= 'f@gmail.com')
		other_category = Category.get(name = 'Other')
		Expense.create_expense(value = 500,description = 'Entrada cine',owner = user,date = '2021-09-20',category = other_category)
		Expense.create_expense(value = 1500,description = 'Entrada cine',owner = user,date = '2021-08-25',category = other_category)
		loginResponse = self.userLogin('f@gmail.com','admin')
		self.assertEqual(loginResponse.status_code,200)
		loginCode = loginResponse.data.get('code')
		user_id = loginResponse.data.get('user_id')
		webClient = self.client
		response = webClient.post('/expenses_per_month/' + str(user_id) + '/', {'code' : loginCode})
		self.assertEqual(response.status_code,200)
		self.assertEqual(len(response.data),2)
	def test_user_get_his_totals_last_3_month(self):
		user = User.get(email= 'f@gmail.com')
		other_category = Category.get(name = 'Other')
		date = datetime.now()
		month = (int(date.strftime("%m")))
		Expense.create_expense(value = 500,description = 'Entrada cine',owner = user,date = '2021-' + str(month) + '-20',category = other_category)
		Expense.create_expense(value = 1500,description = 'Entrada cine',owner = user,date = '2021-' + str(month-1) + '-20',category = other_category)
		Expense.create_expense(value = 1500,description = 'Entrada cine',owner = user,date = '2021-' + str(month-2) + '-20',category = other_category)
		Expense.create_expense(value = 1500,description = 'Entrada cine',owner = user,date = '2021-' + str(month-3) + '-20',category = other_category)
		loginResponse = self.userLogin('f@gmail.com','admin')
		self.assertEqual(loginResponse.status_code,200)
		loginCode = loginResponse.data.get('code')
		user_id = loginResponse.data.get('user_id')
		webClient = self.client
		response = webClient.post('/expenses_per_month/' + str(user_id) + '/', {'code' : loginCode,
																				'last_months' : 3})
		self.assertEqual(response.status_code,200)
		self.assertEqual(len(response.data),3)


	def test_user_filter_expenses(self):
		user = User.get(email= 'f@gmail.com')
		other_category = Category.get(name = 'Other')
		bills_cat = Category.get(name = 'Bills and taxes')
		date = datetime.now()
		month = (int(date.strftime("%m")))
		Expense.create_expense(value = 500,description = 'Entrada cine',owner = user,date = '2021-' + str(month) + '-20',category = other_category)
		Expense.create_expense(value = 1500,description = 'Entrada cine',owner = user,date = '2021-' + str(month-1) + '-20',category = other_category)
		Expense.create_expense(value = 1500,description = 'Entrada cine',owner = user,date = '2021-' + str(month-2) + '-20',category = other_category)
		Expense.create_expense(value = 500,description = 'Entrada cine',owner = user,date = '2021-' + str(month) + '-20',category = other_category)
		Expense.create_expense(value = 1500,description = 'Arba',owner = user,date = '2021-08-20',category = bills_cat)
		loginResponse = self.userLogin('f@gmail.com','admin')
		self.assertEqual(loginResponse.status_code,200)
		loginCode = loginResponse.data.get('code')
		user_id = loginResponse.data.get('user_id')
		webClient = self.client
		response = webClient.post('/expenses/' + str(user_id) + '/',{
			'code' : loginCode,
			'category':[],
			'upTo_date': '2021-'+ str(month-1) + '-21'
			},format = 'json')
		self.assertEqual(len(response.data),3)
	def test_user_gets_his_month_total(self):
		date = datetime.now()
		month = (int(date.strftime("%m")))
		user = User.get(email= 'f@gmail.com')
		other_category = Category.get(name = 'Other')
		bills_cat = Category.get(name = 'Bills and taxes')
		Expense.create_expense(value = 500,description = 'Entrada cine',owner = user,date = '2021-' + str(month) + '-20',category = other_category)
		Expense.create_expense(value = 1500,description = 'Entrada cine',owner = user,date = '2021-' + str(month-1) + '-20',category = other_category)
		Expense.create_expense(value = 1500,description = 'Entrada cine',owner = user,date = '2021-' + str(month-1) + '-20',category = bills_cat)
		Expense.create_expense(value = 500,description = 'Entrada cine',owner = user,date = '2021-' + str(month) + '-20',category = bills_cat)
		loginResponse = self.userLogin('f@gmail.com','admin')
		loginCode = loginResponse.data.get('code')
		user_id = loginResponse.data.get('user_id')
		webClient = self.client
		date = '2021-' + str(month) + '-1'
		response = webClient.post('/month_total/' + str(user_id) + '/', {'code' : loginCode,'month': date})
		self.assertEqual(response.status_code,200)
		self.assertEqual(response.data[0].get('total'),1000)




