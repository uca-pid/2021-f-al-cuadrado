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
from .models import Expense


code = openapi.Parameter('code', openapi.IN_QUERY, type=openapi.TYPE_STRING,required = True)
value = openapi.Parameter('value', openapi.IN_QUERY, type=openapi.FORMAT_FLOAT,required = True)





@swagger_auto_schema(method='post',manual_parameters=[code,value], responses={201: 'Expense created',401: 'Invalid Credentials'})
@api_view(['POST'])
def new_expense(request,user_id):
	user = User.objects.filter(id = user_id).first()
	expected_code = Sc.objects.filter(user=user).first().getCode()
	received_code = request.data.get('code')
	value = request.data.get('value')
	if expected_code == received_code:
		expense = Expense(value = value, owner = user)
		expense.save()
		return Response(status = status.HTTP_201_CREATED)
	return Response(status = status.HTTP_401_UNAUTHORIZED)



@swagger_auto_schema(method='post', manual_parameters=[code],responses={200: 'Expenses sended',401: 'Invalid Credentials'})
@api_view(['POST'])
def expense_list(request,user_id):
	user = User.objects.filter(id = user_id).first()
	expected_code = Sc.objects.filter(user=user).first().getCode()
	received_code = request.data.get('code')
	value = request.data.get('value')
	if expected_code == received_code:
		expenses = Expense.objects.filter(owner = user)
		return Response(expenses.values(), status = status.HTTP_200_OK)
	return Response(status = status.HTTP_401_UNAUTHORIZED)