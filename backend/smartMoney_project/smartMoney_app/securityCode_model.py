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
from .user_model import Sm_user

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
            return cls.objects.create_security_code(user)
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
