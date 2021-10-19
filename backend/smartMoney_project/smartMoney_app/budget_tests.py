from django.contrib.auth import get_user_model
from django.test import TestCase
from django.core.exceptions import ValidationError
from rest_framework.test import APITestCase
from django.contrib.auth.hashers import make_password,check_password
from django.core import mail
from .models import Budget,Category,Expense
from .budget_model import Budget_Category

import datetime
import pytz



User = get_user_model()

class BudgetTestCase(APITestCase):
	def setUp(self):
		month = datetime.datetime.now().month
		self.month = '2021-' + str(month) + '-01'
		self.last_month = '2021-' + str(month-1) + '-01'
		self.next_month = '2021-' + str(month+1) + '-01'
		self.following_month = '2021-' + str(month+2) + '-01'
		self.int_month = month
		self.user = User.create_user(first_name='Francisco',email='f@gmail.com',last_name='Stulich',password='admin')

	def userLogin (self,email,password):
		webClient = self.client
		return webClient.post('/login/', {'email': email, 'password': password})

	def test_budget_is_created(self):
		budget = Budget.create_budget(user = self.user,month = self.month)
		self.assertEqual(budget.getUser(),self.user)
		self.assertEqual(budget.getMonth(),self.int_month)
	def test_add_category_details_to_budget(self):
		total = 3500
		budget = Budget.create_budget(user = self.user,month = self.month)
		budget.add('Other',total)
		self.assertEqual(budget.getTotalFrom('Other'),total)
	def test_cant_add_category_details_to_other_user_category(self):
		total = 3500
		user2 = User.create_user(first_name='Francisco',email='f2@gmail.com',last_name='Stulich',password='admin')
		category = Category.create(name = 'Gimnasio', icon = 'Rocket', user = user2)
		self.assertEqual(len(Category.getAllWith(user = user2)),7)
		self.assertEqual(len(Category.getAllWith(user = self.user)),6)
		budget = Budget.create_budget(user = self.user,month = self.month)
		self.assertEqual(len(Budget_Category.objects.filter()),0)
		with self.assertRaises(ValueError):
			budget.add('Gimnasio',total)
		self.assertEqual(len(Budget_Category.objects.filter()),0)
	def test_cant_delete_budget(self):
		this_month_budget = Budget.create_budget(user = self.user,month = self.month)
		last_month_budget = Budget.create_budget(user = self.user,month = self.last_month)
		with self.assertRaises(ValueError):
			this_month_budget.delete()
			last_month_budget.delete()
	def test_delete_budget(self):
		next_month_budget = Budget.create_budget(user = self.user,month = self.next_month)
		self.assertEqual(Budget.objects.count(),1)
		next_month_budget.delete()
		self.assertEqual((Budget.objects.count()),0)
	def test_cant_create_2_budget_same_month(self):
		budget = Budget.create_budget(user = self.user,month = self.month)
		self.assertEqual(Budget.objects.count(),1)
		with self.assertRaises(Exception):
			Budget.create_budget(user = self.user,month = self.month)
	def test_cant_edit_budget(self):
		this_month_budget = Budget.create_budget(user = self.user,month = self.month)
		last_month_budget = Budget.create_budget(user = self.user,month = self.last_month)
		with self.assertRaises(ValueError):
			this_month_budget.modify()
			last_month_budget.modify()
	def test_modify_budget_month(self):
		budget = Budget.create_budget(user = self.user,month = self.next_month)
		self.assertEqual(budget.getMonth(),self.int_month + 1)
		date = pytz.timezone("Europe/Paris").localize(datetime.datetime.now())
		date = date.replace(month = self.int_month + 2)
		budget.modify(month = date)
		self.assertEqual(budget.getMonth(),self.int_month + 2)
	def test_change_category_total_of_budget(self):
		budget = Budget.create_budget(user = self.user,month = self.next_month)
		budget.add('Other',4800)
		self.assertEqual(budget.getTotalFrom('Other'),4800)
		budget.editCategory('Other',3900)
		self.assertEqual(budget.getTotalFrom('Other'),3900)
	def test_user_get_budget_details(self):
		budget = Budget.create_budget(user = self.user,month = self.month)
		budget.add('Other',4800)
		budget.add('Bills and taxes',4800)
		loginResponse = self.userLogin('f@gmail.com','admin')
		loginCode = loginResponse.data.get('code')
		user_id = loginResponse.data.get('user_id')
		webClient = self.client
		response = webClient.post('/budget_details/' + str(user_id) + '/', {'code' : loginCode, 'month': self.month})
		self.assertEqual(response.status_code,200)
		budget_details = response.data
		self.assertEqual(len(budget_details),6)
		categories_datailed = ['Bills and taxes', 'Other']
		for budget_category in budget_details:
			if budget_category['name'] in categories_datailed:
				self.assertEqual(budget_category['total'],4800)
			else:
				self.assertEqual(budget_category['total'],0)
	def test_user_create_budget(self):
		loginResponse = self.userLogin('f@gmail.com','admin')
		loginCode = loginResponse.data.get('code')
		user_id = loginResponse.data.get('user_id')
		webClient = self.client
		self.assertEqual(Budget.objects.all().count(),0)
		response = webClient.post('/create_budget/' + str(user_id) + '/', {'code' : loginCode, 'month': self.month,
																			'categories' : [
																			{
																			'category' : 'Other',
																			'value' : 4800
																			},
																			{
																			'category' : 'Bills and taxes',
																			'value' : 4800
																			}
																			]},format = 'json')
		self.assertEqual(response.status_code,200)
		self.assertEqual(Budget.objects.all().count(),1)
		self.assertEqual(Budget_Category.objects.all().count(),2)
	def test_user_delete_budget(self):
		loginResponse = self.userLogin('f@gmail.com','admin')
		loginCode = loginResponse.data.get('code')
		user_id = loginResponse.data.get('user_id')
		webClient = self.client
		budget = Budget.create_budget(user = self.user,month = self.next_month)
		budget.add('Other',4800)
		budget.add('Bills and taxes',4800)
		self.assertEqual(Budget.objects.all().count(),1)
		self.assertEqual(Budget_Category.objects.all().count(),2)
		response = webClient.delete('/delete_budget/'+ str(user_id) +'/',{'code' : loginCode,
																			'month' : self.next_month})
		self.assertEqual(Budget.objects.all().count(),0)
		self.assertEqual(Budget_Category.objects.all().count(),0)
	def test_user_modifies_budget(self):
		loginResponse = self.userLogin('f@gmail.com','admin')
		loginCode = loginResponse.data.get('code')
		user_id = loginResponse.data.get('user_id')
		webClient = self.client
		budget = Budget.create_budget(user = self.user,month = self.next_month)
		budget.add('Other',4800)
		budget.add('Bills and taxes',4800)
		self.assertEqual(Budget.objects.all().count(),1)
		self.assertEqual(Budget_Category.objects.all().count(),2)
		self.assertEqual(budget.getTotalFrom('Other'),4800)
		self.assertEqual(budget.getTotalFrom('Bills and taxes'),4800)
		response = webClient.put('/edit_budget/' + str(user_id) + '/', {'code' : loginCode, 'month': self.next_month,
																			'categories' : [
																			{
																			'category' : 'Other',
																			'value' : 2000
																			}
																			]},format = 'json')
		self.assertEqual(response.status_code,200)
		self.assertEqual(budget.getTotalFrom('Bills and taxes'),4800)
		self.assertEqual(budget.getTotalFrom('Other'),2000)
	def test_user_gets_budget_total(self):
		loginResponse = self.userLogin('f@gmail.com','admin')
		loginCode = loginResponse.data.get('code')
		user_id = loginResponse.data.get('user_id')
		webClient = self.client
		budget = Budget.create_budget(user = self.user,month = self.next_month)
		budget.add('Bills and taxes',4800)
		budget.add('Other',5000)
		response = webClient.post('/budget_total/' + str(user_id) + '/', {'code' : loginCode, 'month': self.next_month})
		self.assertEqual(response.status_code,200)
		self.assertEqual(response.data[0].get('total_budget'),9800)

	def test_user_gets_budget_total(self):
		webClient = self.client
		loginResponse = self.userLogin('f@gmail.com','admin')
		loginCode = loginResponse.data.get('code')
		user_id = loginResponse.data.get('user_id')
		response = webClient.post('/active_budget/' + str(user_id) + '/', {'code' : loginCode})
		self.assertEqual(response.status_code,400)
		budget = Budget.create_budget(user = self.user,month = self.month)
		response = webClient.post('/active_budget/' + str(user_id) + '/', {'code' : loginCode})
		self.assertEqual(response.status_code,200)

	def test_user_consult_his_future_budgets(self):
		webClient = self.client
		loginResponse = self.userLogin('f@gmail.com','admin')
		self.assertEqual(loginResponse.status_code,200)
		loginCode = loginResponse.data.get('code')
		user_id = loginResponse.data.get('user_id')
		response = webClient.post('/future_budgets/' + str(user_id) + '/', {'code' : loginCode})
		self.assertEqual(response.status_code,200)
		self.assertEqual(len(response.data),0)
		budget = Budget.create_budget(user = self.user,month = self.next_month)
		budget.add('Bills and taxes',4800)
		budget = Budget.create_budget(user = self.user,month = self.following_month)
		budget.add('Bills and taxes',4800)
		response = webClient.post('/future_budgets/' + str(user_id) + '/', {'code' : loginCode})
		self.assertEqual(response.status_code,200)
		self.assertEqual(len(response.data),2)

	def test_user_consult_budgets_from_period_time(self):
		webClient = self.client
		loginResponse = self.userLogin('f@gmail.com','admin')
		loginCode = loginResponse.data.get('code')
		user_id = loginResponse.data.get('user_id')
		budget = Budget.create_budget(user = self.user,month = self.last_month)
		budget.add('Bills and taxes',4800)
		budget = Budget.create_budget(user = self.user,month = self.month)
		budget.add('Bills and taxes',4800)
		budget = Budget.create_budget(user = self.user,month = self.next_month)
		budget.add('Bills and taxes',4800)
		budget = Budget.create_budget(user = self.user,month = self.following_month)
		budget.add('Bills and taxes',4800)
		response = webClient.post('/past_budgets/' + str(user_id) + '/', {'code' : loginCode,
																			'from_date':self.last_month,
																			'up_to_date':self.next_month})
		self.assertEqual(response.status_code,200)
		self.assertEqual(len(response.data),3)
























