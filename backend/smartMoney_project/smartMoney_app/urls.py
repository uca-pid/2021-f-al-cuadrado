from django.urls import path
from . import views


urlpatterns = [
    path('', views.index, name="home"),
    path('login/', views.user_login, name='login'),
    path('register/', views.user_register, name = 'register'),
    path('changePassword/<int:id>/', views.change_password, name='change_password')
]