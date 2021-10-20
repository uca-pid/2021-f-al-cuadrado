from django.contrib.auth.base_user import BaseUserManager 
from django.utils.translation import gettext_lazy as _ 
from django.db import models
from random import choice



from datetime import datetime
import pytz
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
    def create_superuser(self, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
        return self.create_user(email, password, **extra_fields)


class SecurityCodeManager(models.Manager):
    def create_security_code(self,user):
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
            userCode = self.model(user = user, user_code = code, valid_from = todayDate)
            userCode.save()
            return userCode

class ExpenseManager(models.Manager):
    def create_expense(self,**extra_fields):
        if extra_fields['date'] :
            extra_fields['date'] = self.dateFromString(extra_fields['date'])
        if self.validCategory(extra_fields['category'],extra_fields['owner']):
            expense = self.model(**extra_fields)
            expense.save()
            return expense
        raise ValueError(_('Invalid information'))
 
    def dateFromString(self,stringDate): #Format 'AAAA-MM-DD'
        paris_tz = pytz.timezone("UTC")
        parsedString = stringDate.split('-')
        return paris_tz.localize(datetime(int(parsedString[0]), int(parsedString[1]), int(parsedString[2])))
    def validCategory(self,category,owner):
        return category.user == owner or category.user == None




class CategoryManager(models.Manager):
    def create_default(self):
        default_categories = [('Bills and taxes', 'IoReceipt'), 
        ('Entertainment and leisure', 'IoGameController'), 
        ('Market and home', 'IoCart'),
        ('Wellness and cravings', 'IoWineSharp'), 
        ('Home appliances', 'IoDesktopSharp'), 
        ('Other', 'IoShapes')]
        for category_data in default_categories:
            category_name = category_data[0]
            category_icon = category_data[1]
            category = self.model.get(name = category_name)
            if not category:
                category = self.model(name= category_name, icon = category_icon)
                category.save()

    def create_category(self,**fields):
        category = self.model(**fields)
        category.save()
        return category

    def getDefault(self):
       return  self.filter(user = None)



class BudgetManager(models.Manager):
    def create_budget(self,user,month):
        date = self.dateFromString(month)
        budget = self.model(user = user,month = date)
        budget.save()
        return budget

    def dateFromString(self,stringDate): #Format 'AAAA-MM-DD'
        paris_tz = pytz.timezone("UTC")
        parsedString = stringDate.split('-')
        return paris_tz.localize(datetime(int(parsedString[0]), int(parsedString[1]), int(parsedString[2])))