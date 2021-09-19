from django.contrib.auth import get_user_model
from django.test import TestCase
from django.core.exceptions import ValidationError
from rest_framework.test import APITestCase
from django.contrib.auth.hashers import make_password,check_password
from django.core import mail
from .models import Category 
from django.utils import timezone


User = get_user_model()

class CategoryTestCase(APITestCase):
	def setUp(self):
		user = User.create_user(first_name='Francisco',email='f@gmail.com',last_name='Stulich',password='admin')
	def userLogin (self,email,password):
		webClient = self.client
		return webClient.post('/login/', {'email': email, 'password': password})

	def test_default_categories_creation(self):
		default_categories = ['Impuestos y servicios', 'Entretenimiento y ocio', 'Hogar y mercado', 'Buen vivir y antojos', 'Electrodomésticos', 'Otros']
		self.assertEqual(len(default_categories),6)
		Category.create_default()
		self.assertEqual(len(Category.getAllWith()),6)
		for category_name in default_categories:
			category = Category.get(name = category_name)
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

	def test_different_users_create_identicals_custom_categories(self):
		user1 = User.get(email = 'f@gmail.com')
		user2 = User.create_user(first_name='Francisco',email='f2@gmail.com',last_name='Stulich',password='admin')
		self.assertEqual(len(User.getAllWith()),2)
		Category.create(name = 'Gimnasio', icon = 'Rocket', user = user1)
		self.assertEqual(len(Category.getAllWith()),1)
		Category.create(name = 'Gimnasio', icon = 'Rocket', user = user2)
		self.assertEqual(len(Category.getAllWith()),2)

	def test_same_user_cant_create_identical_custom_categories(self):
		user1 = User.get(email = 'f@gmail.com')
		Category.create(name = 'Gimnasio', icon = 'Rocket', user = user1)
		self.assertEqual(len(Category.getAllWith()),1)
		with self.assertRaises(Exception):
			Category.create(name = 'Gimnasio', icon = 'Rocket', user = user1)

	def test_get_users_categories_include_default(self):
		user1 = User.get(email = 'f@gmail.com')
		Category.create_default()
		self.assertEqual(len(Category.getAllWith()),6)
		Category.create(name = 'Gimnasio', icon = 'Rocket', user = user1)
		self.assertEqual(len(Category.getAllWith(user = user1)),7)

	def test_get_users_categories_not_include_other_users(self):
		user1 = User.get(email = 'f@gmail.com')
		user2 = User.create_user(first_name='Francisco',email='f2@gmail.com',last_name='Stulich',password='admin')
		Category.create_default()
		self.assertEqual(len(Category.getAllWith()),6)
		Category.create(name = 'Gimnasio', icon = 'Rocket', user = user2)
		Category.create(name = 'Gimnasio', icon = 'Rocket', user = user1)
		self.assertEqual(len(Category.getAllWith(user = user1)),7)
		self.assertEqual(len(Category.getAllWith()),8)

