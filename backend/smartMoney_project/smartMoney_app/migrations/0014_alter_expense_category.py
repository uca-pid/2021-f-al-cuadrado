# Generated by Django 3.2.4 on 2021-09-29 16:07

from django.db import migrations, models
import django.db.models.deletion
import smartMoney_app.models


class Migration(migrations.Migration):

    dependencies = [
        ('smartMoney_app', '0013_expense_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='expense',
            name='category',
            field=models.ForeignKey(default=smartMoney_app.models.Category.other, on_delete=django.db.models.deletion.SET_DEFAULT, to='smartMoney_app.category'),
        ),
    ]
