from django.db import models
from rest_framework import serializers
from .models import Book
from jwt_auth.common import UserSerializer


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['genre']
