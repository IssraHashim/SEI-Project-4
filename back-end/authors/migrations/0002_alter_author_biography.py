# Generated by Django 3.2.9 on 2021-12-02 15:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authors', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='author',
            name='biography',
            field=models.TextField(default=None, max_length=1000),
        ),
    ]
