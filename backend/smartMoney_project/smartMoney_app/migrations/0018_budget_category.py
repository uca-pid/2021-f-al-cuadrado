# Generated by Django 3.2.4 on 2021-10-18 15:50

from django.db import migrations, models
import django.db.models.deletion
import smartMoney_app.base_model


class Migration(migrations.Migration):

    dependencies = [
        ('smartMoney_app', '0017_rename_date_budget_month'),
    ]

    operations = [
        migrations.CreateModel(
            name='Budget_Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('total', models.FloatField()),
                ('budget', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='smartMoney_app.budget')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='smartMoney_app.category')),
            ],
            bases=(models.Model, smartMoney_app.base_model.baseModel),
        ),
    ]
