# Generated by Django 3.2.9 on 2021-12-02 16:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reviews', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='review',
            name='review',
            field=models.TextField(default=None, max_length=2500),
        ),
    ]
