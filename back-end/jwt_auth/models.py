from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    email = models.CharField(max_length=50, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    profile_image = models.CharField(max_length=300)
    liked_authors = models.ManyToManyField(
        'authors.Author',
        related_name='followers',
        blank=True
    )
    liked_books = models.ManyToManyField(
        'books.Book',
        related_name='followers',
        blank=True
    )