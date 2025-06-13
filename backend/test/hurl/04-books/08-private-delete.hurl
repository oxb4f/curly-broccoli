# Create user
POST {{API_BASE}}/users
Content-Type: application/json
{
    "username": "0408{{rn}}{{rs}}user1",
    "password": "0408{{rn}}{{rs}}pass1"
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
    "title": "0408{{rn}}{{rs}}book1",
    "description": "0408{{rn}}{{rs}}description1",
    "author": "0408{{rn}}{{rs}}author1",
    "genre": "0408{{rn}}{{rs}}genre1",
    "isbn": "9780596520700",
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

# Delete book
DELETE {{API_BASE}}/books/private/{{userBookId}}
Authorization: Bearer {{jwtAccess}}

HTTP 200

# Show deleted book
GET {{API_BASE}}/books/private/{{userBookId}}
Authorization: Bearer {{jwtAccess}}

HTTP 404

# Delete book that does not exist
DELETE {{API_BASE}}/books/private/1
Authorization: Bearer {{jwtAccess}}

HTTP 404

# Create another user
POST {{API_BASE}}/users
Content-Type: application/json
{
    "username": "0408{{rn}}{{rs}}user2",
    "password": "0408{{rn}}{{rs}}pass2"
}

HTTP 200
[Captures]
jwtAccess2: jsonpath "$.jwt.access"

# Delete book that does not belong to user
DELETE {{API_BASE}}/books/private/{{userBookId}}
Authorization: Bearer {{jwtAccess2}}

HTTP 404

# Delete book without authorization
DELETE {{API_BASE}}/books/private/{{userBookId}}

HTTP 401
