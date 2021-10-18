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
from .category_model import Category

class Expense(models.Model,baseModel):
    owner = models.ForeignKey(Sm_user, on_delete=models.CASCADE)
    value = models.FloatField()
    description = models.CharField(max_length = 150,blank= True)
    date = models.DateTimeField(default = timezone.now)
    category = models.ForeignKey(Category, on_delete=models.SET_DEFAULT,default = Category.other)
    objects = ExpenseManager()
    
    @classmethod
    def create_expense(cls,**fields):
        return cls.objects.create_expense(**fields)
    def getOwner(self):
        return self.owner
    def getValue(self):
        return self.value
    def getDescription(self):
        return self.description
    def getDate(self):
        return self.date
    def getCategory(self):
        return self.category

    @classmethod
    def getTotalsPerMonth(cls,user,last_months = 12):
        expense_owner_filter = (Q(owner = user))
        today = datetime.datetime.today()
        today_date = datetime.datetime(today.year, today.month, 1)
        relative_delta = relativedelta(months=+int(last_months))
        from_date = today_date - relative_delta
        last_months_filter = Q(month__gt= from_date)
        months = cls.objects.annotate(month = TruncMonth('date',output_field = models.DateField())).values('month')
        totals_per_month = months.filter(last_months_filter & expense_owner_filter).annotate(total= models.Sum('value')).order_by('month')
        return totals_per_month

    def modify(self, **args_to_change):
        keys = args_to_change.keys()
        if 'date' in keys:
            args_to_change['date'] = Expense.objects.dateFromString(args_to_change['date'])
        if 'category' in keys:
            category_filter = (Q(name = args_to_change['category']) & (Q(user = None) | Q(user = self.owner)))
            args_to_change['category'] = Category.get(category_filter)
        return super().modify(**args_to_change)