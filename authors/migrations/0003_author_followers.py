# Generated by Django 3.2.9 on 2021-12-06 17:11

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('authors', '0002_alter_author_biography'),
    ]

    operations = [
        migrations.AddField(
            model_name='author',
            name='followers',
            field=models.ManyToManyField(blank=True, related_name='liked_authors', to=settings.AUTH_USER_MODEL),
        ),
    ]
