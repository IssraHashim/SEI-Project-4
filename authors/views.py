from django.db.models.deletion import RestrictedError
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from django.core.exceptions import PermissionDenied
from rest_framework import status
import sys
from .models import Author
from .common import AuthorSerializer
from .populated import PopulatedAuthorSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly


class AuthorListView(APIView):
    permissions_classes = (IsAuthenticatedOrReadOnly, )

    def post(self, request):
        request.data['owner'] = request.user.id
        author_to_create = AuthorSerializer(data=request.data)
        if author_to_create.is_valid():
            author_to_create.save()
            return Response(author_to_create.data, status=status.HTTP_201_CREATED)
        return Response(author_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)



    def get(self, request):
        try:
            authors = Author.objects.all()
            serialized_authors = PopulatedAuthorSerializer(authors, many=True)
            return Response(serialized_authors.data, status=status.HTTP_200_OK)
        except:
            return Response({'message': 'Not found'}, status=status.HTTP_400_BAD_REQUEST)


class AuthorDetailView(APIView):
    permissions_classes = (IsAuthenticatedOrReadOnly, )


    def delete(self, request, pk):
        try:
            author_to_delete = Author.objects.get(id=pk)
        except Author.DoesNotExist:
            raise NotFound()
        if author_to_delete.owner != request.user:
            raise PermissionDenied()
        author_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


    def put(self, request, pk):
        try:
            request.data['owner'] = request.user.id
            author_to_update = Author.objects.get(id=pk)
            serialized_author = AuthorSerializer( author_to_update, data = request.data)
        except Author.DoesNotExist:
            raise NotFound()
        if author_to_update.owner != request.user:
            raise PermissionDenied()
        if serialized_author.is_valid():
            serialized_author.save()
            return Response(serialized_author.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(serialized_author.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


    def get(self, request, pk):
        try:
            author = Author.objects.get(id=pk)
            serialized_author = PopulatedAuthorSerializer(author)
            return Response(serialized_author.data, status=status.HTTP_200_OK)
        except:
            return Response({'message':'Not Found' }, status=status.HTTP_400_BAD_REQUEST)
