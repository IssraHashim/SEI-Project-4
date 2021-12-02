# Generated by Django 3.2.9 on 2021-12-01 18:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authors', '0001_initial'),
        ('books', '0001_initial'),
        ('jwt_auth', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='liked_authors',
            field=models.ManyToManyField(blank=True, related_name='followers', to='authors.Author'),
        ),
        migrations.AddField(
            model_name='user',
            name='liked_books',
            field=models.ManyToManyField(blank=True, related_name='followers', to='books.Book'),
        ),
    ]