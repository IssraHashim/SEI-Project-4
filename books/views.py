from django.core.exceptions import PermissionDenied
from django.shortcuts import render
from rest_framework import permissions
from rest_framework.exceptions import NotFound
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import sys
from .models import Book
from .common import BookSerializer
from .populated import PopulatedBookSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.db.models import Avg

class BookListView(APIView):
    permissions_classes = (IsAuthenticatedOrReadOnly, )

    def post(self, request):
        request.data['owner'] = request.user.id
        book_to_create = BookSerializer(data=request.data)
        if book_to_create.is_valid():
            book_to_create.save()
            return Response(book_to_create.data, status=status.HTTP_201_CREATED)
        return Response(book_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


    def get(self, _request):
        try:
            books = Book.objects.all()
            serialized_books = PopulatedBookSerializer(books, many=True)
            return Response(serialized_books.data, status=status.HTTP_200_OK)
        except:
            return Response ({'message':'Not Found' }, status=status.HTTP_400_BAD_REQUEST)



class GenreListView(APIView):

    def get(self, _request):
        try:
            genres = Book.objects.filter()
            serialized_genres = genres.values('genre', 'id')
            return Response(serialized_genres.values_list('genre', 'id'),status=status.HTTP_200_OK )
        except:
            return Response ({'message':'Not Found' }, status=status.HTTP_400_BAD_REQUEST)


class BookDetailView(APIView):
    permissions_classes = (IsAuthenticatedOrReadOnly, )


    def delete(self, request, pk):
        try:
            book_to_delete = Book.objects.get(id=pk)
        except Book.DoesNotExist:
            raise NotFound()
        if book_to_delete.owner != request.user:
            raise PermissionDenied()
        book_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


    def put(self, request, pk):
        try:
            request.data['owner'] = request.user.id
            book_to_update = Book.objects.get(id=pk)
            serialized_book = BookSerializer( book_to_update, data = request.data)
        except Book.DoesNotExist:
            raise NotFound()
        if book_to_update.owner != request.user:
            raise PermissionDenied()
        if serialized_book.is_valid():
            serialized_book.save()
            return Response(serialized_book.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(serialized_book.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


    def get(self, request, pk):
        try:
            book = Book.objects.get(id=pk)
            serialized_book = PopulatedBookSerializer(book)
            return Response(serialized_book.data, status=status.HTTP_200_OK)
        except:
            return Response({'message':'Not Found' }, status=status.HTTP_400_BAD_REQUEST)



class BookAddView(APIView):

    def put(self, request, pk):
        try:
            book_to_update = Book.objects.get(id=pk)
            request.data['author'] = (book_to_update.author.id)
            request.data['owner'] = (book_to_update.owner.id)
            serialized_book = BookSerializer( book_to_update, data = request.data)
            print('OWNER ------>',type(book_to_update.owner))
        except Book.DoesNotExist:
            raise NotFound()
        if serialized_book.is_valid():
            serialized_book.save()
            return Response(serialized_book.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(serialized_book.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
