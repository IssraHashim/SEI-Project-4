from django.urls import path
from .views import AuthorAddView, AuthorListView, AuthorDetailView

urlpatterns = [
    path('', AuthorListView.as_view()),
    path('<int:pk>/', AuthorDetailView.as_view()),
    path('<int:pk>/like/', AuthorAddView.as_view()),

]