from django.contrib.auth import get_user_model
from django.test import TestCase
from django.core.exceptions import ValidationError
from django.test import Client


User = get_user_model()

class UserTestCase(TestCase):
    def setUp(self):
        user = User(first_name='Francisco',email='f@gmail.com',last_name='Stulich',password='admin')
        user.full_clean()
        user.save()

    def test_user_creation_success(self):
        user = User.objects.first()
        self.assertEqual(user.getName(),'Francisco')
        self.assertEqual(user.getEmail(),'f@gmail.com')
        self.assertEqual(user.getLastName(),'Stulich')
        self.assertEqual(user.getPassword(),'admin')

    def test_user_creation_failed(self):
        invalid_users = []
        user_without_name = User(first_name='',email='f2@gmail.com',last_name='Stulich',password='admin')
        user_without_last_name = User(first_name='Francisco',email='f2@gmail.com',last_name='',password='admin')
        user_without_email = User(first_name='Francisco',email='',last_name='Stulich',password='admin')
        user_without_password = User(first_name='Francisco',email='f2@gmail.com',last_name='Stulich',password='')
        invalid_users.append(user_without_name)
        invalid_users.append(user_without_last_name)
        invalid_users.append(user_without_email)
        invalid_users.append(user_without_password)
        for user in invalid_users:
            with self.assertRaises(ValidationError): #Genera un contexto, para que el test falle si en el siguiente codigo no salta la excepcion
                user.full_clean()
                user.save()

    def test_user_login_succesful(self):
        webClient = Client()
        response = webClient.post('/login/', {'email': 'f@gmail.com', 'password': 'admin'})
        self.assertEqual(response.status_code,200)

    def test_user_tries_login_with_invalid_credentials(self):
        webClient = Client()
        response = webClient.post('/login/', {'email': 'f2@gmail.com', 'password': 'admin'})
        self.assertEqual(response.status_code,401)

    def test_user_registration(self):
        webClient = Client()
        response = webClient.post('/registration/',{'first_name': 'Federico','last_name' : 'De Grandis', 'email' : 'f2@gmail.com', 'password' : 'f^2'})
        self.assertEqual(response.status_code,201)
        new_user = User.objects.filter(email = 'f2@gmail.com')
        self.assertTrue(len(new_user) > 0)


