from django.contrib.auth import get_user_model
from django.test import TestCase
from django.core.exceptions import ValidationError
from rest_framework.test import APITestCase
from django.contrib.auth.hashers import make_password,check_password
from django.core import mail
from .models import Category,Expense
from django.utils import timezone
import datetime


date = datetime.datetime.now()
date = date.strftime("%Y") + '-' + date.strftime("%m") + '-' + date.strftime("%d")

User = get_user_model()

class CategoryTestCase(APITestCase):
	def setUp(self):
		user2 = User.create_user(first_name='Francisco',email='f2@gmail.com',last_name='Stulich',password='admin')
		user = User.create_user(first_name='Francisco',email='f@gmail.com',last_name='Stulich',password='admin')
		category = Category.get(name = 'Other')
		Expense.create_expense(value = 500,description = 'Entrada cine',owner = user,date = date,category = category)
		Expense.create_expense(value = 250,description = 'Entrada teatro',owner = user,date = date,category = category)
		category = Category.get(name = 'Bills and taxes')
		Expense.create_expense(value = 750,description = 'ARBA',owner = user,date = date,category = category)
		Expense.create_expense(value = 750,description = 'ARBA',owner = user2,date = date,category = category)
	def userLogin (self,email,password):
		webClient = self.client
		return webClient.post('/login/', {'email': email, 'password': password})

	def test_default_categories_are_created(self):
		default_categories = [('Bills and taxes', 'IoReceipt'),
		('Entertainment and leisure', 'IoGameController'), 
		('Market and home', 'IoCart'), 
		('Wellness and cravings', 'IoWineSharp'), 
		('Home appliances', 'IoDesktopSharp'), 
		('Other', 'IoShapes')]
		self.assertEqual(len(default_categories),6)
		self.assertEqual(len(Category.getAllWith()),6)

		for category_data in default_categories:
			category = Category.get(name = category_data[0],icon = category_data[1])
			self.assertTrue(category != None)

	def test_default_categories_creation_is_unique(self):
		Category.create_default()
		Category.create_default()
		self.assertEqual(len(Category.getAllWith()),6)

	def test_custom_category_belongs_to_an_user(self):
		user = User.get(email = 'f@gmail.com')
		category = Category.create(name = 'Gimnasio', icon = 'Rocket', user = user)
		self.assertEqual(category.getName(), 'Gimnasio')
		self.assertEqual(category.getIcon(), 'Rocket')
		self.assertEqual(category.getUser(), user)
		self.assertEqual(len(Category.getAllWith()),7)

	def test_different_users_create_identicals_custom_categories(self):
		user1 = User.get(email = 'f@gmail.com')
		user2 = User.get(email = 'f2@gmail.com')
		self.assertEqual(len(User.getAllWith()),2)
		Category.create(name = 'Gimnasio', icon = 'Rocket', user = user1)
		self.assertEqual(len(Category.getAllWith()),7)
		Category.create(name = 'Gimnasio', icon = 'Rocket', user = user2)
		self.assertEqual(len(Category.getAllWith()),8)

	def test_same_user_cant_create_identical_custom_categories(self):
		user1 = User.get(email = 'f@gmail.com')
		Category.create(name = 'Gimnasio', icon = 'Rocket', user = user1)
		self.assertEqual(len(Category.getAllWith()),7)
		with self.assertRaises(Exception):
			Category.create(name = 'Gimnasio', icon = 'Rocket', user = user1)

	def test_get_users_categories_include_default(self):
		user1 = User.get(email = 'f@gmail.com')
		self.assertEqual(len(Category.getAllWith()),6)
		Category.create(name = 'Gimnasio', icon = 'Rocket', user = user1)
		self.assertEqual(len(Category.getAllWith(user = user1)),7)

	def test_get_users_categories_not_include_other_users(self):
		user1 = User.get(email = 'f@gmail.com')
		user2 = User.get(email = 'f2@gmail.com')
		self.assertEqual(len(Category.getAllWith()),6)
		Category.create(name = 'Gimnasio', icon = 'Rocket', user = user2)
		Category.create(name = 'Gimnasio', icon = 'Rocket', user = user1)
		self.assertEqual(len(Category.getAllWith(user = user1)),7)
		self.assertEqual(len(Category.getAllWith()),8)

	def test_get_all_categories_with_his_totals_for_an_user(self):
		user1 = User.get(email = 'f@gmail.com')
		categories = Category.getAllWithTotalsFor(user1)
		self.assertEqual(len(categories), 6)
		categories_with_expenses = ['Other','Bills and taxes']
		for category in categories:
			if category.name in categories_with_expenses:
				self.assertEqual(category.total,750)
			else:
				self.assertEqual(category.total,0)

	def test_endpoint_get_all_categories_with_his_totals_for_an_user(self):
		loginResponse = self.userLogin('f@gmail.com','admin')
		self.assertEqual(loginResponse.status_code,200)
		loginCode = loginResponse.data.get('code')
		user_id = loginResponse.data.get('user_id')
		user = User.get(id= user_id)
		category = Category.create(name = 'Gimnasio', icon = 'Rocket', user = user)
		Expense.create_expense(value = 750,description = 'Primer mes',owner = user,date = date,category = category)
		webClient = self.client
		response = webClient.post('/categories/' + str(user_id) + '/', {'code' : loginCode})
		self.assertEqual(response.status_code,200)
		categories = response.data
		self.assertEqual(len(categories),7)
		categories_with_expenses = ['Other','Bills and taxes','Gimnasio']
		for category in categories:
			if category['name'] in categories_with_expenses:
				self.assertEqual(category['total'],750)
			else:
				self.assertEqual(category['total'],0)

	def test_get_all_user_expenses_from_category(self):
		loginResponse = self.userLogin('f@gmail.com','admin')
		self.assertEqual(loginResponse.status_code,200)
		loginCode = loginResponse.data.get('code')
		user_id = loginResponse.data.get('user_id')
		user = User.get(id= user_id)
		webClient = self.client
		response = webClient.post('/category_expenses/' + str(user_id) + '/', {'code' : loginCode, 'category': 'Other'})
		self.assertEqual(response.status_code , 200)
		self.assertEqual(len(response.data),2)

	def test_user_create_category_success(self):
		loginResponse = self.userLogin('f@gmail.com','admin')
		self.assertEqual(loginResponse.status_code,200)
		loginCode = loginResponse.data.get('code')
		user_id = loginResponse.data.get('user_id')
		user = User.get(id= user_id)
		webClient = self.client
		self.assertEqual(len(Category.getAllWith(user = user)),6)
		response = webClient.post('/new_category/' + str(user_id) + '/', {'code' : loginCode, 'category_name': 'Gimnasio','icon': 'Rocket'})
		self.assertEqual(response.status_code , 201)
		self.assertEqual(len(Category.getAllWith(user = user)),7)
		category = Category.get(user = user)
		self.assertEqual(category.getName(),'Gimnasio')
		self.assertEqual(category.getIcon(),'Rocket')
		self.assertEqual(category.getUser(), user)

	def test_user_create_category_fails(self):
		loginResponse = self.userLogin('f@gmail.com','admin')
		self.assertEqual(loginResponse.status_code,200)
		wrongLoginCode = loginResponse.data.get('code')[::-1]
		user_id = loginResponse.data.get('user_id')
		user = User.get(id= user_id)
		webClient = self.client
		self.assertEqual(len(Category.getAllWith(user = user)),6)
		response = webClient.post('/new_category/' + str(user_id) + '/', {'code' : wrongLoginCode, 'category_name': 'Gimnasio','icon': 'Rocket'})
		self.assertEqual(response.status_code , 401)
		self.assertEqual(len(Category.getAllWith(user = user)),6)

	def test_dont_get_all_user_expenses_from_category_with_invalid_credentials(self):
		loginResponse = self.userLogin('f@gmail.com','admin')
		self.assertEqual(loginResponse.status_code,200)
		wrongLoginCode = loginResponse.data.get('code')[::-1]
		user_id = loginResponse.data.get('user_id')
		user = User.get(id= user_id)
		webClient = self.client
		response = webClient.post('/category_expenses/' + str(user_id) + '/', {'code' : wrongLoginCode, 'category': 'Other'})
		self.assertEqual(response.status_code , 401)

	def test_user_cant_create_expense_from_other_user_category(self):
		user1 = User.get(email = 'f@gmail.com')
		user2 = User.get(email = 'f2@gmail.com')
		category = Category.create(name = 'Gimnasio', icon = 'Rocket', user = user2)
		self.assertEqual(len(Category.getAllWith()),7)
		self.assertEqual(len(Category.getAllWith(user = user1)),6)
		self.assertEqual(len(Category.getAllWith(user = user2)),7)
		loginResponse = self.userLogin('f@gmail.com','admin')
		self.assertEqual(loginResponse.status_code,200)
		webClient = self.client
		loginCode = loginResponse.data.get('code')
		user_id = loginResponse.data.get('user_id')
		response = webClient.post('/new_expense/' + str(user_id) + '/', {'code' : loginCode, 'value' : 500,
															 'description': 'Supermercado', 'category':'Gimnasio',
															 'date': '2021-09-18'})
		self.assertEqual(response.status_code,400)

	def test_cant_edit_default_category(self):
		category = Category.get(name = 'Bills and taxes')
		with self.assertRaises(ValueError):
			category.modify(name = 'Impuestos')
		self.assertEqual(category.getName(),'Bills and taxes')

	def test_edit_category(self):
		user1 = User.get(email = 'f@gmail.com')
		category = Category.create(name = 'Gimnasio', icon = 'Rocket', user = user1)
		category_id = category.id
		self.assertEqual(len(Category.getAllWith()),7)
		category.modify(name = 'Pets', icon = 'Dog')
		category = Category.get(id = category_id)
		self.assertEqual(category.getName(),'Pets')
		self.assertEqual(category.getIcon(),'Dog')
		self.assertEqual(len(Category.getAllWith()),7)


	def test_user_edits_category(self):
		user1 = User.get(email = 'f@gmail.com')
		category = Category.create(name = 'Gimnasio', icon = 'Rocket', user = user1)
		category_id = category.id
		webClient = self.client
		loginResponse = self.userLogin('f@gmail.com','admin')
		self.assertEqual(loginResponse.status_code,200)
		loginCode = loginResponse.data.get('code')
		user_id = loginResponse.data.get('user_id')
		response = webClient.put('/edit_category/' + str(user_id) + '/', {'code' : loginCode, 'category_id' : category_id  ,
			'name' : 'pets', 'icon' : 'Dog'},format = 'json')
		self.assertEqual(response.status_code,200)
		category = Category.get(id = category_id)
		self.assertEqual(category.getName(),'pets')
		self.assertEqual(category.getIcon(),'Dog')

	def test_user_cant_edit_category_with_invalid_credentials(self):
		user1 = User.get(email = 'f@gmail.com')
		category = Category.create(name = 'Gimnasio', icon = 'Rocket', user = user1)
		category_id = category.id
		webClient = self.client
		loginResponse = self.userLogin('f@gmail.com','admin')
		self.assertEqual(loginResponse.status_code,200)
		wrongLoginCode = loginResponse.data.get('code')[::-1]
		user_id = loginResponse.data.get('user_id')
		response = webClient.put('/edit_category/' + str(user_id) + '/', {'code' : wrongLoginCode, 'category_id' : category_id  ,
			'name' : 'pets', 'icon' : 'Dog'},format = 'json')
		self.assertEqual(response.status_code,401)
		category = Category.get(id = category_id)
		self.assertEqual(category.getName(),'Gimnasio')
		self.assertEqual(category.getIcon(),'Rocket')

	def test_user_cant_edit_other_user_category(self):
		user1 = User.get(email = 'f@gmail.com')
		user2 = User.get(email = 'f2@gmail.com')
		category = Category.create(name = 'Gimnasio', icon = 'Rocket', user = user2)
		category_id = category.id
		webClient = self.client
		loginResponse = self.userLogin('f@gmail.com','admin') #login user1
		self.assertEqual(loginResponse.status_code,200)
		self.assertEqual(len(Category.getAllWith(user = user1)),6)
		loginCode = loginResponse.data.get('code')
		user_id = loginResponse.data.get('user_id')
		response = webClient.put('/edit_category/' + str(user_id) + '/', {'code' : loginCode, 'category_id' : category_id  ,
			'name' : 'pets', 'icon' : 'Dog'},format = 'json')
		self.assertEqual(response.status_code,401)
		category = Category.get(id = category_id)
		self.assertEqual(category.getName(),'Gimnasio')
		self.assertEqual(category.getIcon(),'Rocket')

	def test_cant_delete_default_categories(self):
		self.assertEqual(len(Category.getAllWith()),6)
		category = Category.get(name = 'Bills and taxes')
		self.assertTrue(category != None)
		with self.assertRaises(ValueError):
			category.delete()

	def test_user_delete_category(self):
		user1 = User.get(email = 'f@gmail.com')
		category = Category.create(name = 'Gimnasio', icon = 'Rocket', user = user1)
		self.assertEqual(len(Category.getAllWith(user = user1)),7)
		category_id = category.id
		webClient = self.client
		loginResponse = self.userLogin('f@gmail.com','admin')
		self.assertEqual(loginResponse.status_code,200)
		loginCode = loginResponse.data.get('code')
		user_id = loginResponse.data.get('user_id')
		response = webClient.delete('/delete_category/' + str(user_id) + '/', {'code' : loginCode, 'category_id' : category_id})
		self.assertEqual(response.status_code,200)
		self.assertEqual(len(Category.getAllWith(user = user1)),6)


	def test_user_tries_delete_default_category_and_fails(self):
		user1 = User.get(email = 'f@gmail.com')
		category = Category.get(name = 'Bills and taxes')
		self.assertEqual(len(Category.getAllWith(user = user1)),6)
		category_id = category.id
		webClient = self.client
		loginResponse = self.userLogin('f@gmail.com','admin')
		self.assertEqual(loginResponse.status_code,200)
		loginCode = loginResponse.data.get('code')
		user_id = loginResponse.data.get('user_id')
		response = webClient.delete('/delete_category/' + str(user_id) + '/', {'code' : loginCode, 'category_id' : category_id})
		self.assertEqual(response.status_code,401)
		self.assertEqual(len(Category.getAllWith(user = user1)),6)

	def test_user_cant_delete_category_invalid_credentials(self):
		user1 = User.get(email = 'f@gmail.com')
		category = Category.create(name = 'Gimnasio', icon = 'Rocket', user = user1)
		self.assertEqual(len(Category.getAllWith(user = user1)),7)
		category_id = category.id
		webClient = self.client
		loginResponse = self.userLogin('f@gmail.com','admin')
		self.assertEqual(loginResponse.status_code,200)
		wrongLoginCode = loginResponse.data.get('code')[::-1]
		user_id = loginResponse.data.get('user_id')
		response = webClient.delete('/delete_category/' + str(user_id) + '/', {'code' : wrongLoginCode, 'category_id' : category_id})
		self.assertEqual(response.status_code,401)
		self.assertEqual(len(Category.getAllWith(user = user1)),7)

	def test_delete_category_with_expenses_go_to_other(self):
		user1 = User.get(email = 'f@gmail.com')
		category = Category.create(name = 'Gimnasio', icon = 'Rocket', user = user1)
		self.assertEqual(len(Category.getAllWith(user = user1)),7)
		expense = Expense.create_expense(value = 1500,description = 'Primer mes',owner = user1,date = date,category = category)
		self.assertEqual(expense.getCategory().getName(),'Gimnasio')
		category.delete()
		self.assertEqual(len(Category.getAllWith(user = user1)),6)
		expense = Expense.get(value = 1500,description = 'Primer mes')
		self.assertEqual(expense.getCategory().getName(),'Other')





















