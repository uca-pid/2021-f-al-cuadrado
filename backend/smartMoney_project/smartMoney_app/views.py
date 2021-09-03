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


email = openapi.Parameter('Email', openapi.IN_QUERY, type=openapi.TYPE_STRING,required = True)
password = openapi.Parameter('Password', openapi.IN_QUERY, type=openapi.TYPE_STRING,required = True)


# Create your views here.

def index(request):
    return HttpResponse("API de SmartMoney.")



@swagger_auto_schema(method='post',manual_parameters=[email], responses={200: 'Login success',400: 'Invalid credentials'})
@api_view(['POST'])
def user_login(request):
	email = request.data.get('email')
	password = request.data.get('password')
	user = User.objects.filter(email = email, password = password)
	if user:
		return Response({'code' : 1},status=status.HTTP_200_OK)
	return Response(status = status.HTTP_401_UNAUTHORIZED)