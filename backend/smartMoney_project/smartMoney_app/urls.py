from django.urls import path
from . import views


urlpatterns = [
    path('', views.index, name="home"),
    path('login/', views.user_login, name='login'),
    path('register/', views.user_register, name = 'register'),
    path('changePassword/<int:user_id>/', views.change_password, name='change_password'),
    path('forgotPassword/',views.forgot_password,name = 'forgot_password'),
    path('forgotPassword/<int:user_id>/',views.forgot_password_confirmation,name = 'forgot_password_confirm'),
    path('new_expense/<int:user_id>/',views.new_expense,name = 'create expense'),
    path('expenses/<int:user_id>/',views.expense_list, name = 'Get an user expenses'),
    path('edit_expense/<int:user_id>/',views.edit_expense, name = 'Edit an user expense'),
    path('categories/<int:user_id>/',views.category_list, name = 'Get an user categories with his totals'),
    path('category_expenses/<int:user_id>/',views.expenses_from_category,name= 'Get an user expenses from a category'),
    path('new_category/<int:user_id>/',views.new_category,name= 'create category'),
    path('delete_expense/<int:user_id>/',views.delete_expense, name = 'delete expenses'),
    path('edit_category/<int:user_id>/',views.edit_category, name = 'Edit an user category'),
    path('delete_category/<int:user_id>/',views.delete_category, name = 'delete expenses'),
    path('expenses_per_month/<int:user_id>/',views.expenses_per_month,name = 'expenses per month'),
    path('category_names/<int:user_id>/',views.category_list_name,name = 'Get an user categories names')



]