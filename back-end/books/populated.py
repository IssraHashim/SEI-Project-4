from jwt_auth.serializer import UserSerializer
from authors.common import AuthorSerializer
from .common import BookSerializer
from reviews.common import ReviewSerializer

class PopulatedBookSerializer(BookSerializer):
    author = AuthorSerializer()
    reviews = ReviewSerializer(many=True)
    owner = UserSerializer()