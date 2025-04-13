# Create user
POST {{API_BASE}}/users
Content-Type: application/json
{
    "username": "0407{{rn}}{{rs}}user1",
    "password": "0407{{rn}}{{rs}}pass1"
}

HTTP 200
[Captures]
jwtAccess: jsonpath "$.jwt.access"

# Create book
POST {{API_BASE}}/books
Authorization: Bearer {{jwtAccess}}
Content-Type: application/json
{
    "title": "0407{{rn}}{{rs}}book1",
    "description": "0407{{rn}}{{rs}}description1",
    "author": "0407{{rn}}{{rs}}author1",
    "genre": "0407{{rn}}{{rs}}genre1",
    "isbn": "0407{{rn}}{{rs}}isbn1",
    "numberOfPages": 100,
    "imageUrl": "https://example.com/image1.png"
}

HTTP 200
[Captures]
bookId: jsonpath "$.id"

# Create another user
POST {{API_BASE}}/users
Content-Type: application/json
{
    "username": "0407{{rn}}{{rs}}user2",
    "password": "0407{{rn}}{{rs}}pass2"
}

HTTP 200
[Captures]
jwtAccess2: jsonpath "$.jwt.access"

# Add book to another user
POST {{API_BASE}}/books/public/add/{{bookId}}
Authorization: Bearer {{jwtAccess2}}

HTTP 200
[Captures]
userBookId: jsonpath "$.id"

# Get user book
GET {{API_BASE}}/books/private/{{userBookId}}
Authorization: Bearer {{jwtAccess2}}

HTTP 200
[Asserts]
jsonpath "$.id" == {{userBookId}}
jsonpath "$.isFavorite" == false
jsonpath "$.rating" == null
jsonpath "$.review" == null
jsonpath "$.isRead" == false
jsonpath "$.title" == "0407{{rn}}{{rs}}book1"
jsonpath "$.description" == "0407{{rn}}{{rs}}description1"
jsonpath "$.author" == "0407{{rn}}{{rs}}author1"
jsonpath "$.genre" == "0407{{rn}}{{rs}}genre1"
jsonpath "$.isbn" == "0407{{rn}}{{rs}}isbn1"
jsonpath "$.numberOfPages" == 100
jsonpath "$.imageUrl" == "https://example.com/image1.png"

# Add non-existing book
POST {{API_BASE}}/books/public/add/1
Authorization: Bearer {{jwtAccess2}}

HTTP 404

# Add already added book
POST {{API_BASE}}/books/public/add/{{bookId}}
Authorization: Bearer {{jwtAccess}}

HTTP 422
