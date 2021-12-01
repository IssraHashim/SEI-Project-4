from jwt_auth.serializer import UserSerializer
from authors.common import AuthorSerializer
from .common import BookSerializer

class PopulatedBookSerializer(BookSerializer):
    author = AuthorSerializer()
    owner = UserSerializer()