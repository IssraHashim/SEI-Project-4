# Generated by Django 3.2.9 on 2021-12-02 15:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0003_book_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='description',
            field=models.TextField(default=None, max_length=1000),
        ),
    ]
