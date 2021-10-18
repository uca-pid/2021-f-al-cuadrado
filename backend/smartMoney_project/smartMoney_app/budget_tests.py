from django.contrib.auth import get_user_model
from django.test import TestCase
from django.core.exceptions import ValidationError
from rest_framework.test import APITestCase
from django.contrib.auth.hashers import make_password,check_password
from django.core import mail
from .models import Budget,Category
from .budget_model import Budget_Category

import datetime


User = get_user_model()

class CategoryTestCase(APITestCase):
	def setUp(self):
		self.month = datetime.datetime.now().month
		self.user = User.create_user(first_name='Francisco',email='f@gmail.com',last_name='Stulich',password='admin')

	def userLogin (self,email,password):
		webClient = self.client
		return webClient.post('/login/', {'email': email, 'password': password})

	def test_budget_is_created(self):
		budget = Budget.create_budget(user = self.user,month = self.month)
		self.assertEqual(budget.getUser(),self.user)
		self.assertEqual(budget.getMonth(),self.month)
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


