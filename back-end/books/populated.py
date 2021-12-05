from jwt_auth.serializer import UserSerializer
from authors.common import AuthorSerializer
from .common import BookSerializer
from reviews.common import newReviewSerializer

class PopulatedBookSerializer(BookSerializer):
    author = AuthorSerializer()
    reviews = newReviewSerializer(many=True)
    owner = UserSerializer()