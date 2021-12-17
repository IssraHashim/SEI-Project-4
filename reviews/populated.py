from jwt_auth.serializer import UserSerializer
from books.populated import PopulatedBookSerializer
from .common import ReviewSerializer

class PopulatedReviewSerializer(ReviewSerializer):
    book = PopulatedBookSerializer(read_only=True)
    owner = UserSerializer()