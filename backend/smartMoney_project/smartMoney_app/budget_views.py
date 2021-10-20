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

import pytz
from datetime import datetime

from . import models
from .models import Sm_user as User
from .models import SecurityCode as Sc
from .models import Expense,Category,Budget

def validCode(user_id,received_code):
	user = User.get(id = user_id)
	expected_code = Sc.get(user=user).getCode()
	return expected_code == received_code

def dateFromString(stringDate): #Format 'AAAA-MM-DD'
        paris_tz = pytz.timezone("UTC")
        parsedString = stringDate.split('-')
        return paris_tz.localize(datetime(int(parsedString[0]), int(parsedString[1]), int(parsedString[2])))

value = openapi.Schema(title = 'value',type=openapi.FORMAT_FLOAT)
code = openapi.Schema(title = 'session_code',type=openapi.TYPE_STRING)
description = openapi.Schema(title = 'description',type=openapi.TYPE_STRING)
category = openapi.Schema(title = 'category',type=openapi.TYPE_STRING)
date = openapi.Schema(title = 'date',type=openapi.TYPE_STRING)
category_name = openapi.Schema(title = 'category_name',type=openapi.TYPE_STRING)
icon = openapi.Schema(title = 'icons',type=openapi.TYPE_STRING)
category_id = openapi.Schema(title = 'category_id',type=openapi.TYPE_STRING)
month = openapi.Schema(title = 'month',type=openapi.TYPE_STRING)



@swagger_auto_schema(methods=['post'],
					request_body=openapi.Schema(
						type=openapi.TYPE_OBJECT,
						required=['version'],
						properties={
							'code': code,
							'month': month,
							},
						),
					responses={201: 'Budgets sended',401: 'Invalid Credentials'})
@api_view(['POST'])
def budget_details(request,user_id):
	user = User.get(id = user_id)
	received_code = request.data.get('code')
	start_of_month = dateFromString(request.data.get('month'))
	if validCode(user_id,received_code):
		budget = Budget.get(user = user, month = start_of_month)
		details = budget.getDetails()
		print(details)
		return Response(details,status = status.HTTP_200_OK)
	return Response(status = status.HTTP_401_UNAUTHORIZED)


@swagger_auto_schema(methods=['post'],
					request_body=openapi.Schema(
						type=openapi.TYPE_OBJECT,
						required=['version'],
						properties={
							'code': code,
							'month': month,
							#TODO: Agregar el arreglo de categories
							},
						),
					responses={201: 'Budget created',400: 'Budget already exist',401: 'Invalid Credentials'})
@api_view(['POST'])
def create_budget(request,user_id):
	user = User.get(id = user_id)
	received_code = request.data.get('code')
	month = (request.data.get('month'))
	if validCode(user_id,received_code):
		categories = request.data.get('categories')
		try:
			budget = Budget.create_budget(user = user, month = month)
		except Exception as e:
			return Response(status = status.HTTP_400_BAD_REQUEST)
		for detail in categories:
			budget.add(detail.get('category'),detail.get('value'))
		return Response(status = status.HTTP_200_OK)
	return Response(status = status.HTTP_401_UNAUTHORIZED)

@swagger_auto_schema(methods=['delete'],
					request_body=openapi.Schema(
						type=openapi.TYPE_OBJECT,
						required=['version'],
						properties={
							'code': code,
							'month': month,
							},
						),
					responses={200: 'Budget deleted',401: 'Invalid Credentials'})
@api_view(['DELETE'])
def delete_budget(request,user_id):
	user = User.get(id = user_id)
	month = dateFromString(request.data.get('month'))
	received_code = request.data.get('code')
	if validCode(user_id,received_code):
		categories = request.data.get('categories')
		budget = Budget.get(user = user, month = month)
		budget.delete()
		return Response(status = status.HTTP_200_OK)
	return Response(status = status.HTTP_401_UNAUTHORIZED)

@swagger_auto_schema(methods=['put'],
					request_body=openapi.Schema(
						type=openapi.TYPE_OBJECT,
						required=['version'],
						properties={
							'code': code,
							'month': month,
							'new_month': month,
							#TODO: Agregar el arreglo de categories
							},
						),
					responses={200: 'Budget edited',401: 'Invalid Credentials'})
@api_view(['put'])
def edit_budget(request,user_id):
	user = User.get(id = user_id)
	received_code = request.data.get('code')
	month = dateFromString(request.data.get('month'))
	if validCode(user_id,received_code):
		budget = Budget.get(user = user, month = month)
		if request.data.get('new_month'):
			new_month = dateFromString(request.data.get('new_month'))
			budget.modify(month = new_month)
		categories = request.data.get('categories')
		for detail in categories:
			budget.editCategory(detail.get('category'),detail.get('value'))
		return Response(status = status.HTTP_200_OK)
	return Response(status = status.HTTP_401_UNAUTHORIZED)


@swagger_auto_schema(methods=['post'],
					request_body=openapi.Schema(
						type=openapi.TYPE_OBJECT,
						required=['version'],
						properties={
							'code': code,
							'month': month,
							},
						),
					responses={201: 'Budgets sended',401: 'Invalid Credentials'})
@api_view(['POST'])
def budget_total(request,user_id):
	user = User.get(id = user_id)
	received_code = request.data.get('code')
	start_of_month = dateFromString(request.data.get('month'))
	if validCode(user_id,received_code):
		budget = Budget.get(user = user, month = start_of_month)
		total = budget.getTotal()
		return Response(total,status = status.HTTP_200_OK)
	return Response(status = status.HTTP_401_UNAUTHORIZED)

@swagger_auto_schema(methods=['post'],
					request_body=openapi.Schema(
						type=openapi.TYPE_OBJECT,
						required=['version'],
						properties={
							'code': code,
							},
						),
					responses={200: 'There is budget',400: 'There is no budget',401: 'Invalid Credentials'})
@api_view(['POST'])
def active_budget(request,user_id):
	user = User.get(id = user_id)
	received_code = request.data.get('code')
	start_of_month =  pytz.timezone("UTC").localize(datetime.combine(datetime.today().replace(day=1), datetime.min.time()))
	if validCode(user_id,received_code):
		budget = Budget.get(user = user, month = start_of_month)
		if budget:
			return Response(status = status.HTTP_200_OK)
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
					responses={200: 'Budget sended',401: 'Invalid Credentials'})
@api_view(['POST'])
def future_budgets(request,user_id):
	user = User.get(id = user_id)
	received_code = request.data.get('code')
	start_of_month =  pytz.timezone("UTC").localize(datetime.combine(datetime.today().replace(day=1), datetime.min.time()))
	if validCode(user_id,received_code):
		budgets = Budget.getBudgetsFrom(start_of_month)
		return Response(budgets,status = status.HTTP_200_OK)
 
	return Response(status = status.HTTP_401_UNAUTHORIZED)

@swagger_auto_schema(methods=['post'],
					request_body=openapi.Schema(
						type=openapi.TYPE_OBJECT,
						required=['version'],
						properties={
							'code': code,
							'from_date': date,
							'up_to_date': date
							},
						),
					responses={200: 'Budget sended',401: 'Invalid Credentials'})
@api_view(['POST'])
def past_budgets(request,user_id):
	user = User.get(id = user_id)
	received_code = request.data.get('code')
	from_date =  dateFromString(request.data.get('from_date'))
	up_to_date =  dateFromString(request.data.get('up_to_date'))
	if validCode(user_id,received_code):
		budgets = Budget.getBudgetsOfPeriod(from_date,up_to_date)
		return Response(budgets,status = status.HTTP_200_OK)
 
	return Response(status = status.HTTP_401_UNAUTHORIZED)



