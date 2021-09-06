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


email = openapi.Parameter('email', openapi.IN_QUERY, type=openapi.TYPE_STRING,required = True)
password = openapi.Parameter('password', openapi.IN_QUERY, type=openapi.TYPE_STRING,required = True)
old_password = openapi.Parameter('old_password', openapi.IN_QUERY, type=openapi.TYPE_STRING,required = True)
new_password = openapi.Parameter('new_password', openapi.IN_QUERY, type=openapi.TYPE_STRING,required = True)
first_name = openapi.Parameter('first_name', openapi.IN_QUERY, type=openapi.TYPE_STRING,required = True)
last_name = openapi.Parameter('last_name', openapi.IN_QUERY, type=openapi.TYPE_STRING,required = True)
code = openapi.Parameter('code', openapi.IN_QUERY, type=openapi.TYPE_STRING,required = True)

def sendEmail(receiver_email,code):
	code = str(code)
	subject = 'Password Recovery'
	message = 'Use the next code to recover your password' + code
	send_mail(subject, message, EMAIL_HOST_USER, [receiver_email], fail_silently = False)

@swagger_auto_schema(method='post',manual_parameters=[email,password], responses={200: 'Login success',400: 'Invalid credentials'})
@api_view(['POST']) #creo que va con get
def user_login(request):
	email = request.data.get('email')
	password = request.data.get('password')
	user = User.objects.filter(email = email).first()
	if user and check_password(password,user.getPassword()):
		code = Sc.instanceCreation(user)
		code.full_clean()
		code.save()
		return Response({'code' : code.getCode(),'user_id': code.getUserId()},status=status.HTTP_200_OK)
	return Response(status = status.HTTP_401_UNAUTHORIZED)


@swagger_auto_schema(method='post',manual_parameters=[first_name,last_name,email,password], responses={201: 'User created',409: 'The email is already used'})
@api_view(['POST'])
def user_register(request):
	first_name = request.data.get('first_name')
	last_name = request.data.get('last_name')
	password = request.data.get('password')
	email = request.data.get('email')
	user = User(first_name = first_name,last_name = last_name, password = password, email = email)
	try:
		user.full_clean()
		user.password = make_password(user.getPassword())
		user.save()
		return Response(status = status.HTTP_201_CREATED)
	except Exception as e:
		return Response(status = status.HTTP_409_CONFLICT) 



@swagger_auto_schema(method='put',manual_parameters=[code,old_password,new_password], responses={200: 'User password changed',401: 'Outdated credentials'})
@api_view(['PUT'])
def change_password(request,id):
	user = User.objects.filter(id = id).first()
	expected_code = Sc.objects.filter(user=user).first().getCode()
	received_code = request.data.get('code')
	old_password = request.data.get('old_password')
	new_password = request.data.get('new_password')
	if expected_code == received_code and Sc.validCode(user,expected_code) and check_password(old_password,user.getPassword()):
		user.updatePassword(new_password)
		return Response(status = status.HTTP_200_OK)
	return Response(status = status.HTTP_401_UNAUTHORIZED)




@swagger_auto_schema(method='post',manual_parameters=[email], responses={200: 'Confirmation email sent',400: 'Mail not registered'})
@api_view(['POST'])
def forgot_password(request):
	user = User.objects.filter(email = request.data.get('email')).first()
	try:
		code = Sc.instanceCreation(user) #no deberia retornar el code... sin embargo con el test tendria que generar un code deterministico
		code.full_clean()
		code.save()
		sendEmail(request.data.get('email'),code.getCode())
		return Response({'code' : code.getCode(),'user_id': code.getUserId()} , status = status.HTTP_200_OK)
	except Exception as e:
		return Response(status = status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(method='put',manual_parameters=[new_password,code], responses={200: 'User password changed',401: 'Outdated credentials'})
@api_view(['PUT'])
def forgot_password_confirmation(request,id):
	user = User.objects.filter(id = id).first()
	expected_code = Sc.objects.filter(user=user).first().getCode()
	received_code = request.data.get('code')
	new_password = request.data.get('new_password')
	if expected_code == received_code:
		user.updatePassword(new_password)
		return Response(status = status.HTTP_200_OK)
	return Response(status = status.HTTP_401_UNAUTHORIZED) 

	