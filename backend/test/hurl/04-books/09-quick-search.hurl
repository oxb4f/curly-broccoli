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
    "author": "0409{{rn}}{{rs}}best_author",
    "genre": "0409{{rn}}{{rs}}best_genre",
    "isbn": "0409{{rn}}{{rs}}isbn1",
    "numberOfPages": 100,
    "imageUrl": "https://example.com/image1.png"
}

HTTP 200
[Asserts]
jsonpath "$.id" isNumber
jsonpath "$.title" == "0409{{rn}}{{rs}}super_popular_non_fiction"
jsonpath "$.description" == "0409{{rn}}{{rs}}description1"
jsonpath "$.author" == "0409{{rn}}{{rs}}best_author"
jsonpath "$.genre" == "0409{{rn}}{{rs}}best_genre"
jsonpath "$.isbn" == "0409{{rn}}{{rs}}isbn1"
jsonpath "$.numberOfPages" == 100
jsonpath "$.imageUrl" == "https://example.com/image1.png"

# Create book 2
POST {{API_BASE}}/books
Authorization: Bearer {{jwtAccess}}
Content-Type: application/json
{
    "title": "0409{{rn}}{{rs}}book2",
    "description": "0409{{rn}}{{rs}}description2",
    "author": "0409{{rn}}{{rs}}author2",
    "genre": "0409{{rn}}{{rs}}genre2",
    "isbn": "0409{{rn}}{{rs}}isbn2",
    "numberOfPages": 200,
    "imageUrl": "https://example.com/image2.png"
}

HTTP 200
[Asserts]
jsonpath "$.id" isNumber
jsonpath "$.title" == "0409{{rn}}{{rs}}book2"
jsonpath "$.description" == "0409{{rn}}{{rs}}description2"
jsonpath "$.author" == "0409{{rn}}{{rs}}author2"
jsonpath "$.genre" == "0409{{rn}}{{rs}}genre2"
jsonpath "$.isbn" == "0409{{rn}}{{rs}}isbn2"
jsonpath "$.numberOfPages" == 200
jsonpath "$.imageUrl" == "https://example.com/image2.png"

# Create book 3
POST {{API_BASE}}/books
Authorization: Bearer {{jwtAccess}}
Content-Type: application/json
{
    "title": "0409{{rn}}{{rs}}book3",
    "description": "0409{{rn}}{{rs}}description3",
    "author": "0409{{rn}}{{rs}}author3",
    "genre": "0409{{rn}}{{rs}}genre3",
    "isbn": "0409{{rn}}{{rs}}isbn3",
    "numberOfPages": 300,
    "imageUrl": "https://example.com/image3.png"
}

HTTP 200
[Asserts]
jsonpath "$.id" isNumber
jsonpath "$.title" == "0409{{rn}}{{rs}}book3"
jsonpath "$.description" == "0409{{rn}}{{rs}}description3"
jsonpath "$.author" == "0409{{rn}}{{rs}}author3"
jsonpath "$.genre" == "0409{{rn}}{{rs}}genre3"
jsonpath "$.isbn" == "0409{{rn}}{{rs}}isbn3"
jsonpath "$.numberOfPages" == 300
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
    "isbn": "0409{{rn}}{{rs}}isbn4",
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
jsonpath "$.isbn" == "0409{{rn}}{{rs}}isbn4"
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
    "isbn": "0409{{rn}}{{rs}}isbn5",
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
jsonpath "$.isbn" == "0409{{rn}}{{rs}}isbn5"
jsonpath "$.numberOfPages" == 500
jsonpath "$.imageUrl" == "https://example.com/image5.png"

# Quick search by title
GET {{API_BASE}}/books/quick-search?term=popular_non_fiction
Authorization: Bearer {{jwtAccess}}

HTTP 200
[Asserts]
jsonpath "$.books[0].id" isNumber
jsonpath "$.books[0].title" == "0409{{rn}}{{rs}}super_popular_non_fiction"
jsonpath "$.books[0].description" == "0409{{rn}}{{rs}}description1"
jsonpath "$.books[0].author" == "0409{{rn}}{{rs}}best_author"
jsonpath "$.books[0].genre" == "0409{{rn}}{{rs}}best_genre"

# Quick search by genre and author
GET {{API_BASE}}/books/quick-search?term=best
Authorization: Bearer {{jwtAccess}}

HTTP 200
[Asserts]
jsonpath "$.books[0].id" isNumber
jsonpath "$.books[0].title" == "0409{{rn}}{{rs}}super_popular_non_fiction"
jsonpath "$.books[0].description" == "0409{{rn}}{{rs}}description1"
jsonpath "$.books[0].author" == "0409{{rn}}{{rs}}best_author"
jsonpath "$.books[0].genre" == "0409{{rn}}{{rs}}best_genre"
