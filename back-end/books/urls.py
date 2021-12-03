from django.urls import path
from .views import BookListView, BookDetailView, GenreListView

urlpatterns = [
    path('', BookListView.as_view()),
    path('genres/', GenreListView.as_view()),
    path('<int:pk>/', BookDetailView.as_view()),
]