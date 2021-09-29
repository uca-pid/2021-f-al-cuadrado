from django.shortcuts import render
from django.forms.models import model_to_dict
from django.http import JsonResponse
from django.views import View
from django.contrib.auth.hashers import make_password,check_password
from django.core import serializers

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

def validCode(user_id,received_code):
	user = User.get(id = user_id)
	expected_code = Sc.get(user=user).getCode()
	return expected_code == received_code

value = openapi.Schema(title = 'value',type=openapi.FORMAT_FLOAT)
code = openapi.Schema(title = 'session_code',type=openapi.TYPE_STRING)
description = openapi.Schema(title = 'description',type=openapi.TYPE_STRING)
category = openapi.Schema(title = 'category',type=openapi.TYPE_STRING)
date = openapi.Schema(title = 'date',type=openapi.TYPE_STRING)
category_name = openapi.Schema(title = 'category_name',type=openapi.TYPE_STRING)
icon = openapi.Schema(title = 'icons',type=openapi.TYPE_STRING)
category_id = openapi.Schema(title = 'category_id',type=openapi.TYPE_STRING)



@swagger_auto_schema(methods=['post'],
					request_body=openapi.Schema(
						type=openapi.TYPE_OBJECT,
						required=['version'],
						properties={
							'code': code,
							},
						),
					responses={200: 'Categories sended',401: 'Invalid Credentials'})
@api_view(['POST'])
def category_list(request,user_id):
	user = User.get(id = user_id)
	received_code = request.data.get('code')
	if validCode(user_id,received_code):
		categories = Category.getAllWithTotalsFor(user = user)
		return Response(categories.values(), status = status.HTTP_200_OK)
	return Response(status = status.HTTP_401_UNAUTHORIZED)



@swagger_auto_schema(methods=['post'],
					request_body=openapi.Schema(
						type=openapi.TYPE_OBJECT,
						required=['version'],
						properties={
							'code': code,
							'category' : category
							},
						),
					responses={200: 'Expenses sended',401: 'Invalid Credentials'})
@api_view(['POST'])
def expenses_from_category(request,user_id):	
	user = User.get(id = user_id)
	received_code = request.data.get('code')
	category = Category.get(name = request.data.get('category'))
	if validCode(user_id,received_code):
		expenses = Expense.getAllWith(category = category,owner = user)
		return Response(expenses.values(), status = status.HTTP_200_OK)
	return Response(status = status.HTTP_401_UNAUTHORIZED)
		

@swagger_auto_schema(methods=['post'],
					request_body=openapi.Schema(
						type=openapi.TYPE_OBJECT,
						required=['version'],
						properties={
							'code': code,
							'category_name': category_name,
							'icon' : icon,
							},
						),
					responses={201: 'Category created',401: 'Invalid Credentials'})
@api_view(['POST'])
def new_category(request,user_id):
	user = User.get(id = user_id)
	received_code = request.data.get('code')
	if validCode(user_id,received_code):
		Category.create(name = request.data.get('category_name'), icon = request.data.get('icon'), user = user)
		return Response(status = status.HTTP_201_CREATED)
	return Response(status = status.HTTP_401_UNAUTHORIZED)


@swagger_auto_schema(methods=['put'],
					request_body=openapi.Schema(
						type=openapi.TYPE_OBJECT,
						required=['version'],
						properties={
							'code': code,
							'category_id' : category_id,
							'name': category_name,
							'icon' : icon,
							},
						),
					responses={201: 'Expense created',401: 'Invalid Credentials'})
@api_view(['PUT'])
def edit_category(request,user_id):
	user = User.get(id = user_id)
	received_code = request.data.get('code')
	category = Category.get(id = request.data.get('category_id'))
	if validCode(user_id,received_code) and category.getUser() == user:
		category.modify(**(request.data))
		return Response(status = status.HTTP_200_OK)
	return Response(status = status.HTTP_401_UNAUTHORIZED)



@swagger_auto_schema(methods=['delete'],
					request_body=openapi.Schema(
						type=openapi.TYPE_OBJECT,
						required=['version'],
						properties={
							'code': code,
							'category_id': category_id,
							},
						),
					responses={200: 'Category deleted',401: 'Invalid Credentials'})
@api_view(['DELETE'])
def delete_category(request,user_id):
	user = User.get(id = user_id)
	received_code = request.data.get('code')
	category = Category.get(id = request.data.get('category_id'))
	if validCode(user_id,received_code) and category.getUser() == user:
		category.delete()
		return Response(status = status.HTTP_200_OK)
	return Response(status = status.HTTP_401_UNAUTHORIZED)
 
 
