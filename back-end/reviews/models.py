from django.db import models


# Create your models here.
class Review(models.Model):
    book = models.ForeignKey(
        'books.Book', 
        related_name='reviews', 
        on_delete=models.CASCADE
    )
    review = models.TextField(max_length=3500, default=None)
    created_at = models.DateTimeField(auto_now_add=True)
    rating = models.PositiveIntegerField(default=None)
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name='reviews',
        on_delete=models.CASCADE
    )

    
    def __str__(self):
        return f'{self.book} - {self.rating}'