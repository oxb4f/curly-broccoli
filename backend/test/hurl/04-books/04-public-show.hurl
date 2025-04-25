# Create user
POST {{API_BASE}}/users
Content-Type: application/json
{
    "username": "0404{{rn}}{{rs}}user1",
    "password": "0404{{rn}}{{rs}}pass1"
}

HTTP 200
[Captures]
jwtAccess: jsonpath "$.jwt.access"

# Create book
POST {{API_BASE}}/books
Authorization: Bearer {{jwtAccess}}
Content-Type: application/json
{
    "title": "0404{{rn}}{{rs}}book1",
    "description": "0404{{rn}}{{rs}}description1",
    "author": "0404{{rn}}{{rs}}author1",
    "genre": "0404{{rn}}{{rs}}genre1",
    "isbn": "0404{{rn}}{{rs}}isbn1",
    "numberOfPages": 100,
    "imageUrl": "https://example.com/image1.png"
}

HTTP 200
[Captures]
bookId: jsonpath "$.id"

# Show book
GET {{API_BASE}}/books/public/{{bookId}}
Authorization: Bearer {{jwtAccess}}

HTTP 200
[Asserts]
jsonpath "$.id" == {{bookId}}
jsonpath "$.title" isString
jsonpath "$.description" isString
jsonpath "$.author" isString
jsonpath "$.genre" isString
jsonpath "$.isbn" isString
jsonpath "$.numberOfPages" isNumber
jsonpath "$.imageUrl" isString
jsonpath "$.isPrivateAdded" isBoolean
jsonpath "$.isPrivateAdded" == true

# Show book that does not exist
GET {{API_BASE}}/books/public/1
Authorization: Bearer {{jwtAccess}}

HTTP 404

# Create new user
POST {{API_BASE}}/users
Content-Type: application/json
{
    "username": "0404{{rn}}{{rs}}user2",
    "password": "0404{{rn}}{{rs}}pass2"
}

HTTP 200
[Captures]
jwtAccess2: jsonpath "$.jwt.access"

# Show book
GET {{API_BASE}}/books/public/{{bookId}}
Authorization: Bearer {{jwtAccess2}}

HTTP 200
[Asserts]
jsonpath "$.isPrivateAdded" isBoolean
jsonpath "$.isPrivateAdded" == false

# Add book to new user
POST {{API_BASE}}/books/public/add/{{bookId}}
Authorization: Bearer {{jwtAccess2}}

HTTP 200

# Show book
GET {{API_BASE}}/books/public/{{bookId}}
Authorization: Bearer {{jwtAccess2}}

HTTP 200
[Asserts]
jsonpath "$.isPrivateAdded" isBoolean
jsonpath "$.isPrivateAdded" == true

