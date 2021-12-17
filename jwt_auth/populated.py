from django.db.models.fields import BLANK_CHOICE_DASH
from .common import UserSerializer
from books.common import BookSerializer
from authors.common import AuthorSerializer


class PopulatedUserSerializer(UserSerializer):
    liked_books = BookSerializer(many=True)
    liked_authors = AuthorSerializer(many=True)