from django.urls import path
from .views import AuthorListView

urlpatterns = [
    path('', AuthorListView.as_view()),
]