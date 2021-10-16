from django.contrib.auth import get_user_model
from django.test import TestCase
from django.core.exceptions import ValidationError
from rest_framework.test import APITestCase
from django.contrib.auth.hashers import make_password,check_password
from django.core import mail
from .models import SecurityCode as Sc 




User = get_user_model()

class UserTestCase(APITestCase):

    def userLogin (self,email,password):
        webClient = self.client
        return webClient.post('/login/', {'email': email, 'password': password})

    def setUp(self):
        user = User.objects.create_user(first_name='Francisco',email='f@gmail.com',last_name='Stulich',password='admin')

    def test_user_creation_success(self):
        user = User.objects.first()
        self.assertEqual(user.getName(),'Francisco')
        self.assertEqual(user.getEmail(),'f@gmail.com')
        self.assertEqual(user.getLastName(),'Stulich')
        self.assertTrue(user.check_password('admin'))

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
                user.save()

    def test_user_login_succesful(self):
        webClient = self.client
        response = webClient.post('/login/', {'email': 'f@gmail.com', 'password': 'admin'})
        self.assertEqual(response.status_code,200)
        self.assertTrue(response.data.get('user_id'))
        self.assertTrue(len(response.data.get('code')) == 6)

    def test_user_tries_login_with_invalid_credentials(self):
        webClient = self.client
        response = webClient.post('/login/', {'email': 'f2@gmail.com', 'password': 'admin'})
        self.assertEqual(response.status_code,401)

    def test_user_registration(self):
        self.assertTrue(len(User.getAllWith()) == 1)
        webClient = self.client
        response = webClient.post('/register/',{'first_name': 'Federico','last_name' : 'De Grandis', 'email' : 'f2@gmail.com', 'password' : 'f^2'})
        self.assertEqual(response.status_code,201)
        new_user = User.getAllWith(first_name = 'Federico', email = 'f2@gmail.com', last_name = 'De Grandis')
        self.assertTrue(len(User.getAllWith()) == 2)
        self.assertEqual(len(new_user),1)

    def test_user_registration_fails_bc_blank_fields(self):
        webClient = self.client
        invalid_users = []
        user_without_name = {'first_name': '','last_name' : 'De Grandis', 'email' : 'f2@gmail.com', 'password' : 'f^2'}
        user_without_last_name = {'first_name': 'Federico','last_name' : '', 'email' : 'f2@gmail.com', 'password' : 'f^2'}
        user_without_email = {'first_name': 'Federico','last_name' : 'De Grandis', 'email' : '', 'password' : 'f^2'}
        user_without_password = {'first_name': 'Federico','last_name' : 'De Grandis', 'email' : 'f2@gmail.com', 'password' : ''}
        invalid_users.append(user_without_name)
        invalid_users.append(user_without_last_name)
        invalid_users.append(user_without_email)
        invalid_users.append(user_without_password)
        for user in invalid_users:
            response = webClient.post('/register/',user)
            self.assertEqual(response.status_code,409)

    def test_user_registration_fails_bc_email_already_used(self):
        self.assertTrue(len(User.getAllWith(email = 'f@gmail.com')) == 1)
        webClient = self.client
        response = webClient.post('/register/',{'first_name': 'Federico','last_name' : 'De Grandis', 'email' : 'f@gmail.com', 'password' : 'f^2'})
        self.assertEqual(response.status_code,409)

    def test_user_changes_his_password_succesfully(self):
        loginResponse = self.userLogin('f@gmail.com','admin').data
        user = User.get(email = 'f@gmail.com')
        code = loginResponse.get('code')
        user_id = loginResponse.get('user_id')
        webClient = self.client
        response = webClient.put('/changePassword/' + str(user_id) + '/',{'code' : code, 'old_password': 'admin', 'new_password' : 'f^2'})
        self.assertEqual(response.status_code,200)
        user = User.get(email = 'f@gmail.com')
        self.assertTrue(check_password('f^2',user.getPassword()))

    def test_user_cant_change_password(self): #contrasenia incorrecta.
        loginResponse = self.userLogin('f@gmail.com','admin').data
        user = User.get(email = 'f@gmail.com')
        code = loginResponse.get('code')
        user_id = loginResponse.get('user_id')
        webClient = self.client
        response = webClient.put('/changePassword/' + str(user_id) + '/',{'code' : code, 'old_password': '', 'new_password' : 'f^2'})
        self.assertEqual(response.status_code,401)
        user = User.get(email = 'f@gmail.com')
        self.assertTrue(check_password('admin',user.getPassword()))

    def test_user_forgot_password_successfully(self):
        client = self.client
        response = client.post('/forgotPassword/',{'email' : 'f@gmail.com'})
        user_id = response.data.get('user_id')
        user = User.get(id = user_id)
        code = Sc.get(user = user).getCode()
        self.assertEqual(len(mail.outbox),1)
        self.assertEqual(mail.outbox[0].subject,'Password Recovery')
        self.assertEqual(mail.outbox[0].body,'Use the next code to recover your password\n' + str(code))
        self.assertEqual(response.status_code,200) #email enviado y codigo creado
        response =  client.put('/forgotPassword/' + str(user_id) + '/', {'new_password' : 'f^2', 'code' : code})
        user = User.get(email = 'f@gmail.com')
        self.assertTrue(user.check_password('f^2'))

    def test_user_forgot_password_fails_bc_inexistent_email(self):
        client = self.client
        user = User.getAllWith(email = 'f_cuadrado@gmail.com')
        self.assertTrue(len(user) == 0)
        response = client.post('/forgotPassword/',{'email' : 'f_cuadrado@gmail.com'})
        self.assertEqual(response.status_code,400)
        self.assertEqual(len(mail.outbox),0)

    def test_user_forgot_password_fails_bc_wrong_code(self):
        client = self.client
        response = client.post('/forgotPassword/',{'email' : 'f@gmail.com'})
        user_id = response.data.get('user_id')
        wrong_code = response.data.get('code')[::-1]
        self.assertEqual(response.status_code,200) #email enviado y codigo creado
        self.assertEqual(len(mail.outbox),1)
        response =  client.put('/forgotPassword/' + str(user_id) + '/', {'new_password' : 'f^2', 'code' : wrong_code})
        self.assertEqual(response.status_code,401)

    def test_user_has_only_one_code_after_2_logins(self):
        self.assertEqual(len(Sc.getAllWith()),0)
        self.userLogin('f@gmail.com','admin')
        self.assertEqual(len(Sc.getAllWith()),1)
        self.userLogin('f@gmail.com','admin')
        self.assertEqual(len(Sc.getAllWith()),1)
        
    def test_user_code_changes_when_he_logins_again(self):
        self.assertEqual(len(Sc.getAllWith()),0)
        loginResponse = self.userLogin('f@gmail.com','admin')
        first_code = Sc.get(user_code = loginResponse.data.get('code'))
        self.assertEqual(len(Sc.getAllWith()),1)
        self.userLogin('f@gmail.com','admin')
        second_code = Sc.get(user_code = loginResponse.data.get('code'))
        self.assertEqual(len(Sc.getAllWith()),1)
        self.assertNotEqual(first_code, second_code)


