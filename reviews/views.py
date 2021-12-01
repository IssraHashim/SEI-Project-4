
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import sys
from .models import Review
from .common import ReviewSerializer
from .populated import PopulatedReviewSerializer

class ReviewListView(APIView):
    def get(self, request):
        reviews = Review.objects.all()
        serialized_reviews = PopulatedReviewSerializer(reviews, many=True)
        return Response(serialized_reviews.data, status=status.HTTP_200_OK)
