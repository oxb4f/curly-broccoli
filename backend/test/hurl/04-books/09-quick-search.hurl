# Create user
POST {{API_BASE}}/users
Content-Type: application/json
{
    "username": "0409{{rn}}{{rs}}user1",
    "password": "0409{{rn}}{{rs}}pass1"
}

HTTP 200
[Captures]
jwtAccess: jsonpath "$.jwt.access"

# Create book 1
POST {{API_BASE}}/books
Authorization: Bearer {{jwtAccess}}
Content-Type: application/json
{
    "title": "0409{{rn}}{{rs}}super_popular_non_fiction",
    "description": "0409{{rn}}{{rs}}description1",
    "author": "J.K. Rowling",
    "genre": "Fantasy",
    "isbn": "9780596520939",
    "numberOfPages": 309,
    "imageUrl": "https://example.com/image1.png"
}

HTTP 200
[Asserts]
jsonpath "$.id" isNumber
jsonpath "$.title" == "0409{{rn}}{{rs}}super_popular_non_fiction"
jsonpath "$.description" == "0409{{rn}}{{rs}}description1"
jsonpath "$.author" == "J.K. Rowling"
jsonpath "$.genre" == "Fantasy"
jsonpath "$.isbn" == "9780596520939"
jsonpath "$.numberOfPages" == 309
jsonpath "$.imageUrl" == "https://example.com/image1.png"

# Create book 2
POST {{API_BASE}}/books
Authorization: Bearer {{jwtAccess}}
Content-Type: application/json
{
    "title": "0409{{rn}}{{rs}}book2",
    "description": "0409{{rn}}{{rs}}description2",
    "author": "George Orwell",
    "genre": "Dystopian",
    "isbn": "9780596520939",
    "numberOfPages": 328,
    "imageUrl": "https://example.com/image2.png"
}

HTTP 200
[Asserts]
jsonpath "$.id" isNumber
jsonpath "$.title" == "0409{{rn}}{{rs}}book2"
jsonpath "$.description" == "0409{{rn}}{{rs}}description2"
jsonpath "$.author" == "George Orwell"
jsonpath "$.genre" == "Dystopian"
jsonpath "$.isbn" == "9780596520939"
jsonpath "$.numberOfPages" == 328
jsonpath "$.imageUrl" == "https://example.com/image2.png"

# Create book 3
POST {{API_BASE}}/books
Authorization: Bearer {{jwtAccess}}
Content-Type: application/json
{
    "title": "0409{{rn}}{{rs}}book3",
    "description": "0409{{rn}}{{rs}}description3",
    "author": "J.R.R. Tolkien",
    "genre": "Fantasy",
    "isbn": "9780596520946",
    "numberOfPages": 1178,
    "imageUrl": "https://example.com/image3.png"
}

HTTP 200
[Asserts]
jsonpath "$.id" isNumber
jsonpath "$.title" == "0409{{rn}}{{rs}}book3"
jsonpath "$.description" == "0409{{rn}}{{rs}}description3"
jsonpath "$.author" == "J.R.R. Tolkien"
jsonpath "$.genre" == "Fantasy"
jsonpath "$.isbn" == "9780596520946"
jsonpath "$.numberOfPages" == 1178
jsonpath "$.imageUrl" == "https://example.com/image3.png"

# Create book 4
POST {{API_BASE}}/books
Authorization: Bearer {{jwtAccess}}
Content-Type: application/json
{
    "title": "0409{{rn}}{{rs}}book4",
    "description": "0409{{rn}}{{rs}}description4",
    "author": "0409{{rn}}{{rs}}author4",
    "genre": "0409{{rn}}{{rs}}genre4",
    "isbn": "097522980X",
    "numberOfPages": 400,
    "imageUrl": "https://example.com/image4.png"
}

HTTP 200
[Asserts]
jsonpath "$.id" isNumber
jsonpath "$.title" == "0409{{rn}}{{rs}}book4"
jsonpath "$.description" == "0409{{rn}}{{rs}}description4"
jsonpath "$.author" == "0409{{rn}}{{rs}}author4"
jsonpath "$.genre" == "0409{{rn}}{{rs}}genre4"
jsonpath "$.isbn" == "097522980X"
jsonpath "$.numberOfPages" == 400
jsonpath "$.imageUrl" == "https://example.com/image4.png"

# Create book 5
POST {{API_BASE}}/books
Authorization: Bearer {{jwtAccess}}
Content-Type: application/json
{
    "title": "0409{{rn}}{{rs}}book5",
    "description": "0409{{rn}}{{rs}}description5",
    "author": "0409{{rn}}{{rs}}author5",
    "genre": "0409{{rn}}{{rs}}genre5",
    "numberOfPages": 500,
    "imageUrl": "https://example.com/image5.png"
}

HTTP 200
[Asserts]
jsonpath "$.id" isNumber
jsonpath "$.title" == "0409{{rn}}{{rs}}book5"
jsonpath "$.description" == "0409{{rn}}{{rs}}description5"
jsonpath "$.author" == "0409{{rn}}{{rs}}author5"
jsonpath "$.genre" == "0409{{rn}}{{rs}}genre5"
jsonpath "$.numberOfPages" == 500
jsonpath "$.imageUrl" == "https://example.com/image5.png"

# Quick search by title
GET {{API_BASE}}/books/quick-search?term=popular_non_fiction
Authorization: Bearer {{jwtAccess}}

HTTP 200
[Asserts]
jsonpath "$.books[0].id" isNumber
jsonpath "$.books[0].title" contains "super_popular_non_fiction"
jsonpath "$.books[0].description" contains "description1"
jsonpath "$.books[0].author" contains "J.K. Rowling"
jsonpath "$.books[0].genre" contains "Fantasy"
jsonpath "$.books[0].imageUrl" == "https://example.com/image1.png"

# Quick search by genre and author
GET {{API_BASE}}/books/quick-search?term=best_genre
Authorization: Bearer {{jwtAccess}}

HTTP 200
[Asserts]
jsonpath "$.books[0].id" isNumber
jsonpath "$.books[0].title" contains "super_popular_non_fiction"
jsonpath "$.books[0].description" contains "description1"
jsonpath "$.books[0].author" contains "J.K. Rowling"
jsonpath "$.books[0].genre" contains "Fantasy"

# Search by author
GET {{API_BASE}}/books/quick-search?term=J.K. Rowling
Authorization: Bearer {{jwtAccess}}

HTTP 200
[Asserts]
jsonpath "$.books[0].title" contains "super_popular_non_fiction"
jsonpath "$.books[0].description" contains "description1"
jsonpath "$.books[0].author" contains "J.K. Rowling"
jsonpath "$.books[0].genre" contains "Fantasy"
