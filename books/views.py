from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import sys
from .models import Book
from .common import BookSerializer
from .populated import PopulatedBookSerializer

class BookListView(APIView):
    def get(self, request):
        books = Book.objects.all()
        serialized_books = PopulatedBookSerializer(books, many=True)
        return Response(serialized_books.data, status=status.HTTP_200_OK)
