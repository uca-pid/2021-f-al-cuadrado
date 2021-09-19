from django.contrib.auth.base_user import BaseUserManager 
from django.utils.translation import gettext_lazy as _ 
from django.db import models
from random import choice


from django.utils import timezone


class CustomUserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """
    def create_user(self, email, password, **extra_fields):
        """
        Create and save a User with the given email and password.
        """
        if not email or not password:
            raise ValueError(_('The Email and password must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email,password = password, **extra_fields)
        user.save()
        return user
    def get_queryset(self):
        return super().get_queryset()


class SecurityCodeManager(models.Manager):
    def create_security_code(self,Sc,user):
        codes = self.filter(user = user)
        digits = [0,1,2,3,4,5,6,7,8,9]
        code = ''
        for i in range(6):
            code += str(choice(digits))
        todayDate = timezone.now()
        if codes:
            userCode = codes.first()
            userCode.user_code = code
            userCode.updateDate() #No esta Testeado
            return userCode
        else:
            userCode = Sc(user = user, user_code = code, valid_from = todayDate)
            userCode.save()
            return userCode

class ExpenseManager(models.Manager):
    def create_expense(self,Expense,**extra_fields):
        expense = Expense(**extra_fields)
        expense.save()
        return expense