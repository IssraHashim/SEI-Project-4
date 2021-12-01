from django.db import models
from django.db.models.fields import CharField

# Create your models here.
class Author(models.Model):
    name = models.CharField(max_length=100, default=None)
    image = models.CharField(max_length=300, default=None)
    biography = models.TextField(max_length=600, default=None)
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name='authors',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f'{self.name}'