from django.db import models

# Create your models here.
class Book(models.Model):
    GC_CHOICES = (
        ('Biography', 'Biography'),
        ('Business', 'Business'),
        ('Classics', 'Classics'),
        ('Comics', 'Comics'),
        ('Fantasy', 'Fantasy'),
        ('Fiction', 'Fiction'),
        ('History', 'History'),
        ('Horror', 'Horror'),
        ('Memoir', 'Memoir'),
        ('Mystery', 'Mystery'),
        ('Nonfiction', 'Nonfiction'),
        ('Poetry', 'Poetry'),
        ('Romance', 'Romance'),
        ('Science Fiction', 'Science Fiction'),
        ('Thriller', 'Thriller'),
        ('Young Adults', 'Young Adults'),
    )
    title = models.CharField(max_length=200, default=None)
    author = models.ForeignKey(
        'authors.Author',
        related_name='books',
        on_delete=models.CASCADE
    )
    image = models.CharField(max_length=200, default=None)
    publication_year = models.PositiveIntegerField(default=None)
    description = models.TextField(max_length=1000, default=None)
    genre = models.CharField(max_length=50, choices=GC_CHOICES, default=None)
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name='liked_books',
        on_delete=models.CASCADE
    )
    followers = models.ManyToManyField(
        'jwt_auth.User',
        related_name='liked_books',
        blank=True
    )
    

    def __str__(self):
        return f'{self.title}'

