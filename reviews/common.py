from rest_framework import serializers
from .models import Review
from jwt_auth.serializer import UserSerializer

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


class newReviewSerializer(ReviewSerializer):
    owner = UserSerializer()