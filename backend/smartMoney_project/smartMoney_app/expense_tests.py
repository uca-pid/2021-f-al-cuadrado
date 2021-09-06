from django.contrib.auth import get_user_model
from django.test import TestCase
from django.core.exceptions import ValidationError
from rest_framework.test import APITestCase
from django.contrib.auth.hashers import make_password,check_password
from django.core import mail
from .models import Expense 

User = get_user_model()

class ConsumptionTestCase(APITestCase):
	def userLogin (self,email,password):
		webClient = self.client
		return webClient.post('/login/', {'email': email, 'password': password})
	def setUp(self):
		password = make_password('admin')
		user = User(first_name='Francisco',email='f@gmail.com',last_name='Stulich',password=password)
		user.full_clean()
		user.save()
	def test_expense_creation_success(self):
		user = User.objects.filter().first()
		expense = Expense(value = 500,owner = user)
		self.assertEqual(expense.getValue(),500)
		self.assertEqual(expense.getOwner(),user)
	def test_user_succesfully_saves_an_expense(self):
		loginResponse = self.userLogin('f@gmail.com','admin')
		self.assertEqual(loginResponse.status_code,200)
		self.assertEqual(len(Expense.objects.filter()),0)
		loginCode = loginResponse.data.get('code')
		user_id = loginResponse.data.get('user_id')
		webClient = self.client
		response = webClient.post('/new_expense/' + str(user_id) + '/', {'code' : loginCode, 'value' : 500})
		self.assertEqual(response.status_code,201)
		self.assertEqual(len(Expense.objects.filter()),1)
	def test_user_saving_an_expense_fails(self):
		loginResponse = self.userLogin('f@gmail.com','admin')
		self.assertEqual(loginResponse.status_code,200)
		self.assertEqual(len(Expense.objects.filter()),0)
		wrongLoginCode = loginResponse.data.get('code')[::-1]
		user_id = loginResponse.data.get('user_id')
		webClient = self.client
		response = webClient.post('/new_expense/' + str(user_id) + '/', {'code' : wrongLoginCode, 'value' : 500})
		self.assertEqual(response.status_code,401)
		self.assertEqual(len(Expense.objects.filter()),0)
	def test_get_all_expenses(self):
		loginResponse = self.userLogin('f@gmail.com','admin')
		self.assertEqual(loginResponse.status_code,200)
		loginCode = loginResponse.data.get('code')
		user_id = loginResponse.data.get('user_id')
		webClient = self.client
		for i in range(6):
			webClient.post('/new_expense/' + str(user_id) + '/', {'code' : loginCode, 'value' : 100*(i+1)})
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




