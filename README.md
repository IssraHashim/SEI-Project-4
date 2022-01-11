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

![Screenshot 2021-12-01 at 11 05 53](https://user-images.githubusercontent.com/69866434/148952732-f4f21213-532d-4c1a-a6ac-eaeae4ae7266.png)



My wireframe included a show page for books and author, and a user collection page for users.


*Book page:*

<img width="997" alt="Screenshot 2021-12-21 at 13 11 15" src="https://user-images.githubusercontent.com/69866434/148952769-f841fe04-19ed-44e5-9a4f-aa5b8f9e01ed.png">



*Author page:*

<img width="1003" alt="Screenshot 2021-12-21 at 13 11 23" src="https://user-images.githubusercontent.com/69866434/148952839-45d1c004-6fa8-4c7e-a035-7851bb2d51b8.png">



*Collection page:*

<img width="994" alt="Screenshot 2021-12-21 at 13 11 51" src="https://user-images.githubusercontent.com/69866434/148952894-d1c82f42-b63c-47ba-b7d2-caab22d87c29.png">

<img width="999" alt="Screenshot 2021-12-21 at 13 11 57" src="https://user-images.githubusercontent.com/69866434/148952919-6cc9d0d3-22d2-4832-bf55-80f05a6c0d7d.png">



<br/>
<br/>


**Back-end:**

The option to follow authors and books meant storing the ‘followed authors’ and ‘liked books’ somewhere. When planning I first added the foreign key on my user model, but after working on it I realized it was more practical to store that information on the book and author model as opposed to the user model. This took the form of a many to many relationship with a foreign key sitting on the book and author model, both related to the user. I then added a populated serializer on the user model that would add the books and authors when making a user request.

followers key on book model, with a related_name of liked_books 

<img width="266" alt="Screenshot 2021-12-21 at 13 23 43" src="https://user-images.githubusercontent.com/69866434/148953003-757d3e0f-15c9-474c-83c4-74a3160b8464.png">

<br/>

followers key on author model, with a related_name of liked_authors 

<img width="268" alt="Screenshot 2021-12-21 at 13 17 02" src="https://user-images.githubusercontent.com/69866434/148953038-6f4093f6-dbc1-49d6-8e7a-46009f67b041.png">

<br/>


Populated serializer in user app that fills these two fields:

<img width="370" alt="Screenshot 2021-12-21 at 13 25 32" src="https://user-images.githubusercontent.com/69866434/148953096-708c5554-e978-41db-bdca-c65374a4df35.png">

<br/>
<br/>


***Front-end:***

One of the main challenges I had building this app was calculating the average rating of a book. I decided to do it on the front-end, which meant I had to extract every rating from a book’s review, and calculate the average rating of a book from there.
I stored every rating in a useState, which allows me to render the page again with a new average rating once a new review with a new rating is posted. 

<br/>

<img width="294" alt="Screenshot 2021-12-21 at 13 47 30" src="https://user-images.githubusercontent.com/69866434/148953143-12a3611f-e45f-4201-95ab-01ff358d0fd5.png">

<img width="589" alt="Screenshot 2021-12-21 at 13 47 17" src="https://user-images.githubusercontent.com/69866434/148953168-6215d658-8981-4d3f-934c-dda124da2674.png">


In the return function, I used conditional rendering with && so that if the book has ratings, the average rating will appear.

<br/>

<img width="820" alt="Screenshot 2021-12-21 at 13 51 45" src="https://user-images.githubusercontent.com/69866434/148953281-248b81af-4230-4f3e-86b7-d6f0941e54b5.png">



I had to use one more step to be able to use this average rating on the browse page, because I would need to first store the average rating of every book (using a for loop and storing them) somewhere and then set a certain number of books to show if the user filtered by a set rating:

I first stored all books in a new piece of state called allBooks

<br/>

<img width="391" alt="Screenshot 2021-12-21 at 13 56 06" src="https://user-images.githubusercontent.com/69866434/148953362-94115ccb-5806-4bbc-b13d-adc62683bc28.png">


And wrote my filter function so if a rating was ticked, it would show only the books with a minimum of that set rating, and if not to display all books.

<br/>

<img width="526" alt="Screenshot 2021-12-21 at 13 55 51" src="https://user-images.githubusercontent.com/69866434/148953415-e421defb-d67e-40e7-bbba-9eee6cab4098.png">


<br/>
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
