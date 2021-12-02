
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import PermissionDenied
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticatedOrReadOnly

import sys

from books.populated import PopulatedBookSerializer
from .models import Review
from .common import ReviewSerializer
from .populated import PopulatedReviewSerializer

class ReviewListView(APIView):
    permissions_classes = (IsAuthenticatedOrReadOnly, )

    def post(self, request):
        request.data['owner'] = request.user.id
        review_to_create = ReviewSerializer(data=request.data)
        if review_to_create.is_valid():
            review_to_create.save()
            return Response(review_to_create.data, status=status.HTTP_201_CREATED)
        return Response(review_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


    def get(self, request):
        reviews = Review.objects.all()
        serialized_reviews = PopulatedReviewSerializer(reviews, many=True)
        return Response(serialized_reviews.data, status=status.HTTP_200_OK)


class ReviewDetailView(APIView):
    permissions_classes = (IsAuthenticatedOrReadOnly, )


    def delete(self, request, pk):
        try:
            review_to_delete = Review.objects.get(id=pk)
        except Review.DoesNotExist:
            raise NotFound()
        if review_to_delete.owner != request.user:
            raise PermissionDenied()
        review_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


    def put(self, request, pk):
        try:
            request.data['owner'] = request.user.id
            review_to_update = Review.objects.get(id=pk)
            serialized_review = ReviewSerializer( review_to_update, data = request.data)
        except Review.DoesNotExist:
            raise NotFound()
        if review_to_update.owner != request.user:
            raise PermissionDenied()
        if serialized_review.is_valid():
            serialized_review.save()
            return Response(serialized_review.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(serialized_review.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


    def get(self, request, pk):
        try:
            review = Review.objects.get(id=pk)
            serialized_review = PopulatedReviewSerializer(review)
            return Response(serialized_review.data, status=status.HTTP_200_OK)
        except:
            return Response({'message':'Not Found' }, status=status.HTTP_400_BAD_REQUEST)