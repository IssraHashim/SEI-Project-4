# Generated by Django 3.2.9 on 2021-12-06 17:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('jwt_auth', '0003_remove_user_liked_books'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='liked_authors',
        ),
    ]
