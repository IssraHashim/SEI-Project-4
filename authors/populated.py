from jwt_auth.serializer import UserSerializer
from books.common import BookSerializer
from .common import AuthorSerializer

class PopulatedAuthorSerializer(AuthorSerializer):
    books = BookSerializer(read_only=True, many=True)
    owner = UserSerializer()