from django.shortcuts import render
from django.forms.models import model_to_dict
from django.http import JsonResponse
from django.views import View
from django.contrib.auth.hashers import make_password,check_password

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
from rest_framework import status
from rest_framework.response import Response
from django.http import HttpResponse


from smartMoney_project.settings import EMAIL_HOST_USER
from django.core.mail import send_mail


from . import models
from .models import Sm_user as User
from .models import SecurityCode as Sc

from .user_views import *
from .expense_views import *






# Create your views here.

def index(request):
    return HttpResponse("API de SmartMoney.")

