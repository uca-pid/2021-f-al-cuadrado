from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

from django.contrib.auth.hashers import make_password,check_password

from .managers import CustomUserManager,SecurityCodeManager,ExpenseManager,CategoryManager
from datetime import datetime, timedelta
from django.utils import timezone
import datetime
from dateutil.relativedelta import relativedelta


from django.db.models import Q
from django.db.models.functions import Coalesce
from django.db.models.functions import TruncMonth

from .base_model import baseModel


class Sm_user(AbstractUser,baseModel): 
    username = None
    email = models.EmailField(_('email address'), unique=True)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email

    @classmethod
    def create_user(cls, email, password, **extra_fields):
        try:
            return cls.objects.create_user(email,password,**extra_fields)
        except Exception as e:
            raise e
    def updatePassword(self,new_password):
        self.password = new_password
        self.save()
    def save(self,*arg,**args):
        self.full_clean()
        self.set_password(self.password)
        super().save(*arg,**args)
    def getName(self):
        return self.first_name

    def getEmail(self):
        return self.email

    def getPassword(self):
        return self.password

    def getLastName(self):
        return self.last_name
    def getId(self):
        return self.id
