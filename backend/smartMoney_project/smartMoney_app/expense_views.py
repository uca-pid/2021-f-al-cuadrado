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
from .models import Expense,Category


#Usar property en Category, llamar una funcion de Expense que me devuelva el total de esa categoria y usuario, la funcion tendria la forma
#GetAllWith(user = user,category = category);sum= 0; for i in consumos: sum += i.value


#code = openapi.Parameter('code', openapi.IN_QUERY, type=openapi.TYPE_STRING,required = True)
value = openapi.Schema(title = 'value',type=openapi.FORMAT_FLOAT)
code = openapi.Schema(title = 'session_code',type=openapi.TYPE_STRING)
description = openapi.Schema(title = 'description',type=openapi.TYPE_STRING)
category = openapi.Schema(title = 'category',type=openapi.TYPE_STRING)
date = openapi.Schema(title = 'date',type=openapi.TYPE_STRING)
expense_id = openapi.Schema(title = 'expense_ids',type=openapi.TYPE_STRING)
month = openapi.Schema(title = 'last_months',type=openapi.TYPE_STRING)




def validCode(user_id,received_code):
	user = User.get(id = user_id)
	expected_code = Sc.get(user=user).getCode()
	return expected_code == received_code


@swagger_auto_schema(methods=['post'],
					request_body=openapi.Schema(
						type=openapi.TYPE_OBJECT,
						required=['version'],
						properties={
							'code': code,
							'value': value,
							'description' : description,
							'category' : category,
							'date' : date
							},
						),
					responses={201: 'Expense created',400: 'Invalid request',401: 'Invalid Credentials'})
@api_view(['POST'])
def new_expense(request,user_id):
	user = User.get(id = user_id)
	expected_code = Sc.get(user=user).getCode()
	received_code = request.data.get('code')
	value = request.data.get('value')
	description = request.data.get('description')
	date = (request.data.get('date'))
	category = Category.get(name = request.data.get('category'))
	if expected_code == received_code:
		try:
			expense = Expense.create_expense(value = value, owner = user,description = description, date = date,category = category)
			return Response(status = status.HTTP_201_CREATED)
		except Exception as e:
			return Response(status = status.HTTP_400_BAD_REQUEST)
	return Response(status = status.HTTP_401_UNAUTHORIZED)



@swagger_auto_schema(methods=['post'],
					request_body=openapi.Schema(
						type=openapi.TYPE_OBJECT,
						required=['version'],
						properties={
							'code': code,
							},
						),
					responses={200: 'Expenses sended',401: 'Invalid Credentials'})
@api_view(['POST'])
def expense_list(request,user_id):
	user = User.get(id = user_id)
	expected_code = Sc.get(user=user).getCode()
	received_code = request.data.get('code')
	if expected_code == received_code:
		expenses = Expense.getAllWith(owner = user).order_by('-date')
		return Response(expenses.values('id','owner_id','value','description','date','category__name','category__icon'), status = status.HTTP_200_OK)
	return Response(status = status.HTTP_401_UNAUTHORIZED)


@swagger_auto_schema(methods=['put'],
					request_body=openapi.Schema(
						type=openapi.TYPE_OBJECT,
						required=['version'],
						properties = {
							'code': code,
							'expense_id' : expense_id,
							'value': value,
							'description' : description,
							'category' : category,
							'date' : date
							},
						),
					responses={200: 'Expense edited',401: 'Invalid Credentials'})
@api_view(['PUT'])
def edit_expense(request,user_id):
	user = User.get(id = user_id)
	received_code = request.data.get('code')
	expense = Expense.get(id= request.data.get('expense_id'))
	if validCode(user_id,received_code) and expense.getOwner() == user:
		expense.modify(**request.data)
		return Response(status = status.HTTP_200_OK)
	return Response(status = status.HTTP_401_UNAUTHORIZED)


@swagger_auto_schema(methods=['delete'],
					request_body=openapi.Schema(
						type=openapi.TYPE_OBJECT,
						required=['version'],
						properties={
							'code': code,
							'expense_id': value,
							},
						),
					responses={200: 'Expense deleted',401: 'Invalid Credentials'})
@api_view(['DELETE'])
def delete_expense(request,user_id):
	user = User.get(id = user_id)
	received_code = request.data.get('code')
	if validCode(user_id,received_code):
		expense = Expense.get(id= request.data.get('expense_id'))
		expense.delete()
		return Response(status = status.HTTP_200_OK)
	return Response(status = status.HTTP_401_UNAUTHORIZED)

@swagger_auto_schema(methods=['post'],
					request_body=openapi.Schema(
						type=openapi.TYPE_OBJECT,
						required=['version'],
						properties={
							'code': code,
							'last_months' : month
							},
						),
					responses={200: 'Totals sended',401: 'Invalid Credentials'})
@api_view(['POST'])
def expenses_per_month(request,user_id):
	user = User.get(id = user_id)
	expected_code = Sc.get(user=user).getCode()
	received_code = request.data.get('code')
	last_months = request.data.get('last_months')
	if expected_code == received_code:
		totals = Expense.getTotalsPerMonth(last_months = last_months or 12,user = user)
		return Response(totals, status = status.HTTP_200_OK)
	return Response(status = status.HTTP_401_UNAUTHORIZED)
	




	


