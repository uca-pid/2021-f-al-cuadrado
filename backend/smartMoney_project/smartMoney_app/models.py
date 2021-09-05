from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import ugettext_lazy as _

from django.contrib.auth.hashers import make_password,check_password

from .managers import CustomUserManager
from datetime import datetime, timedelta
from random import choice
from django.utils import timezone

class Sm_user(AbstractUser):
    username = None
    email = models.EmailField(_('email address'), unique=True)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email
    def updatePassword(self,new_password):
        self.password = make_password(new_password)
        self.full_clean
        self.save()

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

class SecurityCode(models.Model):
    user_id = models.IntegerField()
    user_code = models.CharField(max_length = 6)
    valid_from = models.DateTimeField()


    def __eq__(self, otherObject):
        return isinstance(otherObject, SecurityCode) and self.user_id == otherObject.getUserId() and self.user_code == otherObject.getCode()

    @classmethod
    def validCode(cls,userId,userCode):
        code = cls.objects.filter(user_id = userId, user_code = userCode).first()
        expire_date = code.getDate() + timedelta(minutes = 20)
        if timezone.now() < expire_date:
            code.updateDate()
            return True
        return False



    @classmethod
    def instanceCreation(cls, userId):
        digits = [0,1,2,3,4,5,6,7,8,9]
        code = ''
        for i in range(6):
            code += str(choice(digits))
        todayDate = timezone.now()
        return cls(user_id = userId, user_code = code, valid_from = todayDate)
    def getCode(self):
        return self.user_code
    def getUserId(self):
        return self.user_id
    def getDate(self):
        return self.valid_from
    def updateDate(self):
        self.valid_from = timezone.now()
        self.save