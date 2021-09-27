from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

from django.contrib.auth.hashers import make_password,check_password

from .managers import CustomUserManager,SecurityCodeManager,ExpenseManager,CategoryManager
from datetime import datetime, timedelta
from django.utils import timezone
import datetime


from django.db.models import Q
from django.db.models.functions import Coalesce

class baseModel():
    @classmethod
    def getAllWith(cls,filter = None,**extra_fields):
        if filter:
            return cls.objects.filter(filter)
        return cls.objects.filter(**extra_fields)

    @classmethod
    def get(cls, filter = None, **extra_fields):
        if filter:
            return cls.objects.filter(filter).first()
        return cls.objects.filter(**extra_fields).first()
    def save(self,*arg,**args):
        self.full_clean()
        super().save(*arg,**args)
    def modify(self, **args_to_change):
        keys = args_to_change.keys()
        for argument in keys:\
            setattr(self, argument, args_to_change[argument])
        self.save()
        return self


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
    def getAllWithTotalsFor(cls,user, month = datetime.datetime.now().strftime("%m")):
        expense_owner_filter = (Q(expense__owner = user) | Q(expense__owner = None))
        date_time_filter = (Q(expense__date__month = month) | Q(expense__date__month = None))
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

    def modify(self, **args_to_change):
        keys = args_to_change.keys()
        if 'date' in keys:
            args_to_change['date'] = Expense.objects.dateFromString(args_to_change['date'])
        if 'category' in keys:
            category_filter = (Q(name = args_to_change['category']) & (Q(user = None) | Q(user = self.owner)))
            args_to_change['category'] = Category.get(category_filter)
        return super().modify(**args_to_change)