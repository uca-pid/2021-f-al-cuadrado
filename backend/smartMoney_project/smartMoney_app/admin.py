from django.contrib import admin
from .category_model import Category
from .expense_model import Expense
from .user_model import Sm_user
from .securityCode_model import SecurityCode
from .budget_model import Budget

# Register your models here.

admin.site.register(Category)
admin.site.register(Expense)
admin.site.register(Sm_user)
admin.site.register(SecurityCode)
admin.site.register(Budget)
