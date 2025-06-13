# Create user
POST {{API_BASE}}/users
Content-Type: application/json
{
    "username": "0405{{rn}}{{rs}}user1",
    "password": "0405{{rn}}{{rs}}pass1"
}

HTTP 200
[Captures]
jwtAccess: jsonpath "$.jwt.access"
userId: jsonpath "$.id"

# Create book
POST {{API_BASE}}/books
Authorization: Bearer {{jwtAccess}}
Content-Type: application/json
{
    "title": "0405{{rn}}{{rs}}book1",
    "description": "0405{{rn}}{{rs}}description1",
    "author": "0405{{rn}}{{rs}}author1",
    "genre": "0405{{rn}}{{rs}}genre1",
    "isbn": "9780596520823",
    "numberOfPages": 100,
    "imageUrl": "https://example.com/image1.png"
}

HTTP 200
[Captures]
bookId: jsonpath "$.id"

# List user books
GET {{API_BASE}}/books/private
Authorization: Bearer {{jwtAccess}}
[QueryStringParams]
userId: {{userId}}

HTTP 200
[Asserts]
jsonpath "$.books" count >= 1
[Captures]
userBookId: jsonpath "$.books[0].id"

# Show book
GET {{API_BASE}}/books/private/{{userBookId}}
Authorization: Bearer {{jwtAccess}}

HTTP 200
[Asserts]
jsonpath "$.id" == {{userBookId}}
jsonpath "$.title" isString
jsonpath "$.description" isString
jsonpath "$.author" isString
jsonpath "$.genre" isString
jsonpath "$.isbn" isString
jsonpath "$.numberOfPages" isNumber
jsonpath "$.imageUrl" isString
jsonpath "$.isFavorite" isBoolean
jsonpath "$.rating" exists
jsonpath "$.review" exists
jsonpath "$.isRead" isBoolean
jsonpath "$.userId" isNumber

# Show book that does not exist
GET {{API_BASE}}/books/private/1
Authorization: Bearer {{jwtAccess}}

HTTP 404
