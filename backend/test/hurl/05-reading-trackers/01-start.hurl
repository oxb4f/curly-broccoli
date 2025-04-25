# Create user
POST {{API_BASE}}/users
Content-Type: application/json
{
    "username": "0501{{rn}}{{rs}}user1",
    "password": "0501{{rn}}{{rs}}pass1"
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
    "title": "0501{{rn}}{{rs}}book1",
    "description": "0501{{rn}}{{rs}}description1",
    "author": "0501{{rn}}{{rs}}author1",
    "genre": "0501{{rn}}{{rs}}genre1",
    "isbn": "0501{{rn}}{{rs}}isbn1",
    "numberOfPages": 100,
    "imageUrl": "https://example.com/image1.png"
}

HTTP 200
[Asserts]
jsonpath "$.id" isNumber
jsonpath "$.title" == "0501{{rn}}{{rs}}book1"
jsonpath "$.description" == "0501{{rn}}{{rs}}description1"
jsonpath "$.author" == "0501{{rn}}{{rs}}author1"
jsonpath "$.genre" == "0501{{rn}}{{rs}}genre1"
jsonpath "$.isbn" == "0501{{rn}}{{rs}}isbn1"
jsonpath "$.numberOfPages" == 100
jsonpath "$.imageUrl" == "https://example.com/image1.png"

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

# Start reading tracker
POST {{API_BASE}}/books/{{userBookId}}/readingTrackers/start
Authorization: Bearer {{jwtAccess}}

HTTP 200
[Asserts]
jsonpath "$.id" exists
jsonpath "$.id" isInteger
jsonpath "$.userBookId" == {{userBookId}}
jsonpath "$.state" == "reading"
jsonpath "$.finishedAt" == null

# Start already started reading tracker
POST {{API_BASE}}/books/{{userBookId}}/readingTrackers/start
Authorization: Bearer {{jwtAccess}}

HTTP 409

# Start reading tracker with invalid user book ID
POST {{API_BASE}}/books/1/readingTrackers/start
Authorization: Bearer {{jwtAccess}}

HTTP 404

# Start reading without authorization
POST {{API_BASE}}/books/{{userBookId}}/readingTrackers/start

HTTP 401

# Create another user
POST {{API_BASE}}/users
Content-Type: application/json
{
    "username": "0501{{rn}}{{rs}}user2",
    "password": "0501{{rn}}{{rs}}pass2"
}

HTTP 200
[Captures]
jwtAccess2: jsonpath "$.jwt.access"

# Start reading tracker from another user
POST {{API_BASE}}/books/{{userBookId}}/readingTrackers/start
Authorization: Bearer {{jwtAccess2}}

HTTP 404
