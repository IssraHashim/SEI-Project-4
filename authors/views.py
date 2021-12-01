from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import sys
from .models import Author
from .common import AuthorSerializer
from .populated import PopulatedAuthorSerializer

class AuthorListView(APIView):
    def get(self, request):
        authors = Author.objects.all()
        serialized_authors = PopulatedAuthorSerializer(authors, many=True)
        return Response(serialized_authors.data, status=status.HTTP_200_OK)
