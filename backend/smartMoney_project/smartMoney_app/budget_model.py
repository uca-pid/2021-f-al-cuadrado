from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

from django.contrib.auth.hashers import make_password,check_password

from .managers import BudgetManager
from datetime import datetime, timedelta
from django.utils import timezone
import datetime
from dateutil.relativedelta import relativedelta


from django.db.models import Q
from django.db.models.functions import Coalesce
from django.db.models.functions import TruncMonth

from .models import Sm_user,baseModel,Category



class Budget(models.Model,baseModel):
	user = models.ForeignKey(Sm_user, on_delete=models.CASCADE)
	month = models.DateTimeField(default = timezone.now)

	objects = BudgetManager()
	@classmethod
	def create_budget(cls,user,month,year = datetime.datetime.now().year):
		return cls.objects.create_budget(user,month,year)

	def getTotalFrom(self,category_name):
		category = Category.get(name = category_name)
		if category and category.isValidFor(self.user):
			cat_filter = Q(category = category)
			budget_filter = Q(budget = self)
			return Budget_Category.get(filter = cat_filter & budget_filter).getTotal()

	def getUser(self):
		return self.user

	def getMonth(self):
		return self.month.month
	def add(self,category_name: str, total: float):
		category = Category.get(name = category_name)
		if category and category.isValidFor(self.user):
			return Budget_Category.create(budget = self,category = category,total = total)
		raise ValueError(_('Not Valid category'))





class Budget_Category(models.Model,baseModel):
	category = models.ForeignKey(Category, on_delete=models.CASCADE)
	budget = models.ForeignKey(Budget, on_delete=models.CASCADE)
	total = models.FloatField()

	@classmethod
	def create(cls,budget,category,total):
		budget_cat_obj = cls(budget = budget,category = category,total = total)
		budget_cat_obj.save()
		return budget_cat_obj
	def getTotal(self):
		return self.total
