# SEI Project 4 - Bookopedia

[Link](https://thisbookopedia.herokuapp.com/)

<br/>

***Timeframe***

7 Days

<br/>

***Brief***

Build a full stack application storing data in an SQL database using Python and Django for the backend and React on Front end
Timeframe: 1 week

<br/>

***Overview & Concept***

The final and solo project of my software engineering immersive course is a book review website where users can follow authors and add books to their own collections. I wanted users to be able to Create, Add, Update, and Delete content.

<br/>

***Technologies used***

- Back-end:
  - Django
  - Django REST Framework
  - PostgreSQL
  - Psycopg2
  - pyJWT
  - Python

- Front-end :
  - JavaScript
  - React
  - React Bootstrap
  - React Router Dom
  - CSS
  - Axios
  - Cloudinary

<br/>
<br/>

***Approach Taken***


**Planning:**

I started drafting an Entity Relationship Diagram of how my backend should be set up to make my app work. My backend would have 4 apps and a custom user model. I realized I needed to have multiple one to many relationships between different models, which meant more serializers so that I could have more nested information in my requests. 

<br/>




My wireframe included a show page for books and author, and a user collection page for users.


Book page:



Author page:



Collection page:



<br/>
<br/>


**Back-end:**

The option to follow authors and books meant storing the ‘followed authors’ and ‘liked books’ somewhere. When planning I first added the foreign key on my user model, but after working on it I realized it was more practical to store that information on the book and author model as opposed to the user model. This took the form of a many to many relationship with a foreign key sitting on the book and author model, both related to the user. I then added a populated serializer on the user model that would add the books and authors when making a user request.

followers key on book model, with a related_name of liked_books 

followers key on author model, with a related_name of liked_authors 


Populated serializer in user app that fills these two fields:

<br/>
<br/>


***Front-end:***

One of the main challenges I had building this app was calculating the average rating of a book. I decided to do it on the front-end, which meant I had to extract every rating from a book’s review, and calculate the average rating of a book from there.
I stored every rating in a useState, which allows me to render the page again with a new average rating once a new review with a new rating is posted. 


In the return function, I used conditional rendering with && so that if the book has ratings, the average rating will appear.



I had to use one more step to be able to use this average rating on the browse page, because I would need to first store the average rating of every book (using a for loop and storing them) somewhere and then set a certain number of books to show if the user filtered by a set rating:

I first stored all books in a new piece of state called allBooks


And wrote my filter function so if a rating was ticked, it would show only the books with a minimum of that set rating, and if not to display all books.

<br/>


**Some features I would have liked to add include:**

- Update function to user profile picture and username.
- Responsive app design. 
- Better styling when filtering and searching for a book.

<br/>

**Wins:**

- Adding ‘my collection’’ and ‘user profile’ with delete option.

<br/>

**Challenges:**

- Building the ‘filter by rating’ option on the index page.

<br/>

**Known bugs:**

- Users cannot change account information separately.
- Display is not similar when filtering by rating.

<br/>
<br/>


***Key learnings***

This last project of my bootcamp taught me how important planning ahead was, from the wireframes and EDR to the time spent working on back-end vs front-end. I have also learnt that it is sometimes easier to add a new view on the backend rather than trying to extract it from our front-end.
