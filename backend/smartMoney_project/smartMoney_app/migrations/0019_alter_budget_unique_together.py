# Generated by Django 3.2.4 on 2021-10-18 18:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('smartMoney_app', '0018_budget_category'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='budget',
            unique_together={('user', 'month')},
        ),
    ]
