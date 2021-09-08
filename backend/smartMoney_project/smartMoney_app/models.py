from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

from django.contrib.auth.hashers import make_password,check_password

from .managers import CustomUserManager,SecurityCodeManager
from datetime import datetime, timedelta
from django.utils import timezone


class baseModel():
    @classmethod
    def getAllWith(cls,**extra_fields):
        return cls.objects.filter(**extra_fields)

    @classmethod
    def get(cls, **extra_fields):
        return cls.objects.filter(**extra_fields).first()
    def save(self,*arg,**args):
        self.full_clean()
        super().save(*arg,**args)


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

class SecurityCode(models.Model,baseModel):
    user = models.ForeignKey(Sm_user, on_delete=models.CASCADE)
    user_code = models.CharField(max_length = 6)
    valid_from = models.DateTimeField()


    objects = SecurityCodeManager()

    def __eq__(self, otherObject):
        return isinstance(otherObject, SecurityCode) and self.user.getUserId() == otherObject.getUserId() and self.user_code == otherObject.getCode() and self.getDate() == other.getDate()

    @classmethod
    def validCode(cls,user,userCode):
        code = cls.objects.filter(user = user).first()
        expire_date = code.getDate() + timedelta(minutes = 20)
        if timezone.now() < expire_date and code.getCode() == userCode:
            code.updateDate()
            return True
        return False

    @classmethod
    def instanceCreation(cls, user):
        try:
            return cls.objects.create_security_code(cls,user)
        except Exception as e:
            raise e
    def getCode(self):
        return self.user_code
    def getUserId(self):
        return self.user.getId()
    def getDate(self):
        return self.valid_from
    def updateDate(self):
        self.valid_from = timezone.now()
        self.save()



class Expense(models.Model,baseModel):
    owner = models.ForeignKey(Sm_user, on_delete=models.CASCADE)
    value = models.FloatField()
    
    def getOwner(self):
        return self.owner
    def getValue(self):
        return self.value