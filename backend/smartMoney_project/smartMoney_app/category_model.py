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


class Category(models.Model,baseModel):
    name = models.CharField(max_length = 150) #deberia tener un custom validator...
    icon = models.CharField(max_length = 150)
    user = models.ForeignKey(Sm_user, on_delete=models.CASCADE, null = True)

    class Meta: #identificamos el par unico de atributos clave
        unique_together = ('name', 'user')

    #Custom Manager
    objects = CategoryManager()

    
    @classmethod
    def create_default(cls):
        return cls.objects.create_default()

    @classmethod
    def create(cls,**fields):
        return cls.objects.create_category(**fields)
    @classmethod
    def other(cls): #devuelvo el objeto 'otros, para los consumos "huerfanos"'
        cls.create_default()
        return cls.get(name = 'Other').id

    def getName(self):
        return self.name 

    def getIcon(self):
        return self.icon

    def getUser(self):
        return self.user

    @classmethod
    def getAllWith(cls,*arg,**fields):
        cls.objects.create_default()
        keys = fields.keys()
        if 'user' in keys:
            default_categories = cls.objects.getDefault()
            otherCategories = cls.objects.filter(user = fields['user'])
            return default_categories | otherCategories
        return super().getAllWith(*arg,**fields)

    @classmethod
    def getAllWithTotalsFor(cls,user, date = datetime.datetime.now()):
        month = date.strftime("%m")
        year = date.strftime("%Y")
        expense_owner_filter = (Q(expense__owner = user) | Q(expense__owner = None))
        date_time_filter = (Q(expense__date__month = month) & Q(expense__date__year = year))
        categories = cls.getAllWith(user = user)
        categories = categories.annotate(total= Coalesce(models.Sum('expense__value',filter = (expense_owner_filter & date_time_filter)),0.0)).order_by('-total')
        return categories
    def modify(self, **args_to_change):
        keys = args_to_change.keys()
        if 'user' not in keys and not self.isDefault():
            return super().modify(**args_to_change)
        raise ValueError(_('You cant change this category'))
    def delete(self):
        if not self.isDefault():
            super().delete()
        else:
            raise ValueError(_('You cant delete this category'))
    def isDefault(self):
        return self.user == None

    def isValidFor(self,user):
        return self.isDefault() or self.user == user