from django.contrib.auth import get_user_model
from django.test import TestCase
from django.core.exceptions import ValidationError


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
'''
    def test_create_user(self):
        user = User.objects.create_user(email='normal@user.com', password='foo')
        self.assertEqual(user.email, 'normal@user.com')
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)
        with self.assertRaises(TypeError):
            User.objects.create_user()
        with self.assertRaises(TypeError):
            User.objects.create_user(email='')
        with self.assertRaises(ValueError):
            User.objects.create_user(email='', password="foo")

    def test_create_superuser(self):
        User = get_user_model()
        admin_user = User.objects.create_superuser(email='super@user.com', password='foo')
        self.assertEqual(admin_user.email, 'super@user.com')
        self.assertTrue(admin_user.is_active)
        self.assertTrue(admin_user.is_staff)
        self.assertTrue(admin_user.is_superuser)
        try:
            # username is None for the AbstractUser option
            # username does not exist for the AbstractBaseUser option
            self.assertIsNone(admin_user.username)
        except AttributeError:
            pass
        with self.assertRaises(ValueError):
            User.objects.create_superuser(
                email='super@user.com', password='foo', is_superuser=False)
                '''