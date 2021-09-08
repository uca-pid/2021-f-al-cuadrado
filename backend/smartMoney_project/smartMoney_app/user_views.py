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


email = openapi.Schema(title = 'email',type=openapi.TYPE_STRING)
password = openapi.Schema(title = 'password',type=openapi.TYPE_STRING)
old_password = openapi.Schema(title = 'old_password',type=openapi.TYPE_STRING)
new_password = openapi.Schema(title = 'new_password',type=openapi.TYPE_STRING)
first_name = openapi.Schema(title = 'first_name',type=openapi.TYPE_STRING)
last_name = openapi.Schema(title = 'last_name',type=openapi.TYPE_STRING)
code = openapi.Schema(title = 'session_code',type=openapi.TYPE_STRING)



def sendEmail(receiver_email,code):
	code = str(code)
	subject = 'Password Recovery'
	message = 'Use the next code to recover your password\n' + code
	send_mail(subject, message, EMAIL_HOST_USER, [receiver_email], fail_silently = False)

@swagger_auto_schema(methods=['post'],
					request_body=openapi.Schema(
						type=openapi.TYPE_OBJECT,
						required=['version'],
						properties={
							'email': email,
							'password':password
							},
						),
					responses={200: 'Login success',400: 'Invalid credentials'})
@api_view(['POST']) #creo que va con get
def user_login(request):
	email = request.data.get('email')
	password = request.data.get('password')
	user_to_login = User.get(email = email)
	if user_to_login and user_to_login.check_password(password):
		code = Sc.instanceCreation(user_to_login)
		return Response({'code' : code.getCode(),'user_id': code.getUserId()},status=status.HTTP_200_OK)
	return Response(status = status.HTTP_401_UNAUTHORIZED)


@swagger_auto_schema(methods=['post'],
					request_body=openapi.Schema(
						type=openapi.TYPE_OBJECT,
						required=['version'],
						properties={
							'first_name': first_name,
							'last_name': last_name,
							'email': email,
							'password':password
							},
						),
					responses={201: 'User created',409: 'The email is already used'})
@api_view(['POST'])
def user_register(request):
	first_name = request.data.get('first_name')
	last_name = request.data.get('last_name')
	password = request.data.get('password')
	email = request.data.get('email')
	try:
		user = User.create_user(first_name = first_name,last_name = last_name, password = password, email = email)
		return Response(status = status.HTTP_201_CREATED)
	except Exception as e:
		return Response(status = status.HTTP_409_CONFLICT) 



@swagger_auto_schema(methods=['put'],
					request_body=openapi.Schema(
						type=openapi.TYPE_OBJECT,
						required=['version'],
						properties={
							'code': code,
							'old_password': old_password,
							'new_password': new_password,
							},
						),
					responses={200: 'User password changed',401: 'Outdated credentials'})
@api_view(['PUT'])
def change_password(request,user_id):
	user = User.get(id = user_id)
	received_code = request.data.get('code')
	old_password = request.data.get('old_password')
	new_password = request.data.get('new_password')
	if Sc.validCode(user,received_code) and user.check_password(old_password):
		user.updatePassword(new_password)
		return Response(status = status.HTTP_200_OK)
	return Response(status = status.HTTP_401_UNAUTHORIZED)




@swagger_auto_schema(methods=['post'],
					request_body=openapi.Schema(
						type=openapi.TYPE_OBJECT,
						required=['version'],
						properties={
							'email': email,
							},
						),
					responses={200: 'Confirmation email sent',400: 'Mail not registered'})
@api_view(['POST'])
def forgot_password(request):
	user = User.get(email = request.data.get('email'))
	try:
		code = Sc.instanceCreation(user)
		sendEmail(request.data.get('email'),code.getCode())
		return Response({'code' : code.getCode(),'user_id': code.getUserId()} , status = status.HTTP_200_OK)
	except Exception as e:
		return Response(status = status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(methods=['put'],
					request_body=openapi.Schema(
						type=openapi.TYPE_OBJECT,
						required=['version'],
						properties={
							'new_password': new_password,
							},
						),
					responses={200: 'User password changed',401: 'Outdated credentials'})
@api_view(['PUT'])
def forgot_password_confirmation(request,user_id):
	user = User.get(id = user_id)
	expected_code = Sc.objects.filter(user=user).first().getCode()
	received_code = request.data.get('code')
	new_password = request.data.get('new_password')
	if expected_code == received_code:
		user.updatePassword(new_password)
		return Response(status = status.HTTP_200_OK)
	return Response(status = status.HTTP_401_UNAUTHORIZED) 

	
