# Create user
POST {{API_BASE}}/users
Content-Type: application/json
{
    "username": "0402{{rn}}{{rs}}user1",
    "password": "0402{{rn}}{{rs}}pass1"
}

HTTP 200
[Captures]
jwtAccess: jsonpath "$.jwt.access"

# Create book
POST {{API_BASE}}/books
Authorization: Bearer {{jwtAccess}}
Content-Type: application/json
{
    "title": "0402{{rn}}{{rs}}book1",
    "description": "0402{{rn}}{{rs}}description1",
    "author": "0402{{rn}}{{rs}}author1",
    "genre": "0402{{rn}}{{rs}}genre1",
    "isbn": "0402{{rn}}{{rs}}isbn1",
    "numberOfPages": 100,
    "imageUrl": "https://example.com/image1.png"
}

HTTP 200

# Create book
POST {{API_BASE}}/books
Authorization: Bearer {{jwtAccess}}
Content-Type: application/json
{
    "title": "0402{{rn}}{{rs}}book2",
    "description": "0402{{rn}}{{rs}}description2",
    "author": "0402{{rn}}{{rs}}author2",
    "genre": "0402{{rn}}{{rs}}genre2",
    "isbn": "0402{{rn}}{{rs}}isbn2",
    "numberOfPages": 200,
    "imageUrl": "https://example.com/image2.png"
}

HTTP 200

# List books
GET {{API_BASE}}/books/private
Authorization: Bearer {{jwtAccess}}

HTTP 200
[Asserts]
jsonpath "$.books" isCollection
jsonpath "$.books[*].id" nth 0 isNumber
jsonpath "$.books[*].title" nth 0 isString
jsonpath "$.books[*].description" nth 0 isString
jsonpath "$.books[*].author" nth 0 isString
jsonpath "$.books[*].genre" nth 0 isString
jsonpath "$.books[*].isbn" nth 0 isString
jsonpath "$.books[*].numberOfPages" nth 0 isNumber
jsonpath "$.books[*].imageUrl" nth 0 isString
jsonpath "$.books[*].isRead" nth 0 isBoolean
jsonpath "$.books[*].isFavorite" nth 0 isBoolean
jsonpath "$.total" == 2

# List books with limit
GET {{API_BASE}}/books/private
Authorization: Bearer {{jwtAccess}}
[QueryStringParams]
limit: 1

HTTP 200
[Asserts]
jsonpath "$.books" count == 1
jsonpath "$.total" == 2

# List books with limit and offset
GET {{API_BASE}}/books/private
Authorization: Bearer {{jwtAccess}}
[QueryStringParams]
limit: 1
offset: 1

HTTP 200
[Asserts]
jsonpath "$.books" count == 1
jsonpath "$.total" == 2

# List books with offset
GET {{API_BASE}}/books/private
Authorization: Bearer {{jwtAccess}}
[QueryStringParams]
offset: 1

HTTP 200
[Asserts]
jsonpath "$.books" count == 1
jsonpath "$.total" == 2
