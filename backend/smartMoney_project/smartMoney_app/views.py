from django.shortcuts import render
from django.forms.models import model_to_dict
from django.http import JsonResponse
from django.views import View

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
from rest_framework import status
from rest_framework.response import Response
from django.http import HttpResponse


from . import models
from .models import Sm_user as User


email = openapi.Parameter('email', openapi.IN_QUERY, type=openapi.TYPE_STRING,required = True)
password = openapi.Parameter('password', openapi.IN_QUERY, type=openapi.TYPE_STRING,required = True)
first_name = openapi.Parameter('first_name', openapi.IN_QUERY, type=openapi.TYPE_STRING,required = True)
last_name = openapi.Parameter('last_name', openapi.IN_QUERY, type=openapi.TYPE_STRING,required = True)


# Create your views here.

def index(request):
    return HttpResponse("API de SmartMoney.")



@swagger_auto_schema(method='post',manual_parameters=[email,password], responses={200: 'Login success',400: 'Invalid credentials'})
@api_view(['POST'])
def user_login(request):
	email = request.data.get('email')
	password = request.data.get('password')
	user = User.objects.filter(email = email, password = password)
	if user:
		return Response({'code' : 1},status=status.HTTP_200_OK)
	return Response(status = status.HTTP_401_UNAUTHORIZED)


@swagger_auto_schema(method='post',manual_parameters=[first_name,last_name,email,password], responses={201: 'User created',400: 'Some required fields are blank',409: 'The email is already used'})
@api_view(['POST'])
def user_register(request):
	first_name = request.data.get('first_name')
	last_name = request.data.get('last_name')
	password = request.data.get('password')
	email = request.data.get('email')
	user = User(first_name = first_name,last_name = last_name, password = password, email = email)
	try:
		user.full_clean()
		user.save()
		return Response(status = status.HTTP_201_CREATED)
	except Exception as e:
		return Response(status = status.HTTP_409_CONFLICT) 
#['args', 'error_dict', 'message_dict', 'messages', 'update_error_dict', 'with_traceback']
		