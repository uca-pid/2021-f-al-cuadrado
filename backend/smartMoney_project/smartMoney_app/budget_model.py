from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

from django.contrib.auth.hashers import make_password,check_password

from .managers import BudgetManager
from datetime import datetime, timedelta
from django.utils import timezone
import datetime
from dateutil.relativedelta import relativedelta


from django.db.models import Q,F
from django.db.models.functions import Coalesce
from django.db.models.functions import TruncMonth

from .models import Sm_user,baseModel,Category



class Budget(models.Model,baseModel):
	user = models.ForeignKey(Sm_user, on_delete=models.CASCADE)
	month = models.DateTimeField(default = timezone.now)
	categories = models.ManyToManyField(Category,through = 'Budget_Category')
	class Meta:
		unique_together = ('user', 'month')

	objects = BudgetManager()
	@classmethod
	def create_budget(cls,user,month: datetime.datetime):
		return cls.objects.create_budget(user,month)

	def getTotalFrom(self,category_name):
		category = Category.get(name = category_name)
		if category and category.isValidFor(self.user):
			cat_filter = Q(category = category)
			budget_filter = Q(budget = self)
			return Budget_Category.get(filter = cat_filter & budget_filter).getTotal()

	def modify(self, **args_to_change):
		today_month = datetime.date.today().month
		if today_month >= self.getMonth() :
			raise ValueError(_('Cant delete older or active budgets'))
		else:
			return super().modify(**args_to_change)
	def getUser(self):
		return self.user

	def editCategory(self,category_name: str, total: float):
		category = Category.get(name = category_name)
		cat_filter = Q(category = category)
		budget_filter = Q(budget = self)
		budget_category = Budget_Category.get(filter = cat_filter & budget_filter)
		if budget_category:
			budget_category.modify(total = total)


	def getMonth(self):
		return self.month.month
	def add(self,category_name: str, total: float):
		category = Category.get(name = category_name)
		if category and category.isValidFor(self.user):
			self.categories.add(category, through_defaults = {'total': total})
		else:
			raise ValueError(_('Not Valid category'))
	def delete(self):
		today_month = datetime.date.today().month
		if today_month >= self.getMonth() :
			raise ValueError(_('Cant delete older or active budgets'))
		else:
			super().delete()
	def getDetails(self):
		categories = Category.getAllWith(user = self.user)
		user_filter = Q(user = self.user) | Q(user = None)
		budget_filter = Q(budget_category__budget = self)
		expense_owner_filter = (Q(expense__owner = self.user) | Q(expense__owner = None))
		date_time_filter = (Q(expense__date__month = self.month.month) | Q(expense__date__month = None))
		categories = Category.objects.filter(user_filter)
		return (categories.annotate(total= Coalesce(models.Sum('budget_category__total',filter = budget_filter),0.0),
									total_spent = Coalesce(models.Sum('expense__value',filter = (expense_owner_filter & date_time_filter)),0.0))).values('name','total','total_spent')
		return Budget_Category.getAllWith(budget= self).values('category__name','total')
	def getTotal(self):
		budget_filter = Q(budget = self)
		return Budget_Category.objects.all().values('budget').annotate(total_budget = Coalesce(models.Sum('total',filter = budget_filter),0.0))
			





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
