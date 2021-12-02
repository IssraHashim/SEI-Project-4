from django.urls import path
from .views import AuthorListView, AuthorDetailView

urlpatterns = [
    path('', AuthorListView.as_view()),
    path('<int:pk>/', AuthorDetailView.as_view()),
]