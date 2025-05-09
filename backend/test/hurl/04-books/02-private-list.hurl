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
userId: jsonpath "$.id"

# Create book
POST {{API_BASE}}/books
Authorization: Bearer {{jwtAccess}}
Content-Type: application/json
[Options]
delay: 500
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
[QueryStringParams]
userId: {{userId}}

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
userId: {{userId}}
limit: 1

HTTP 200
[Asserts]
jsonpath "$.books" count == 1
jsonpath "$.total" == 2
[Captures]
userBookId: jsonpath "$.books[0].id"

# List books with limit and offset
GET {{API_BASE}}/books/private
Authorization: Bearer {{jwtAccess}}
[QueryStringParams]
userId: {{userId}}
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
userId: {{userId}}
offset: 1

HTTP 200
[Asserts]
jsonpath "$.books" count == 1
jsonpath "$.total" == 2

# List books with order
GET {{API_BASE}}/books/private
Authorization: Bearer {{jwtAccess}}
[QueryStringParams]
userId: {{userId}}
orderField: createdAt
orderDirection: desc
limit: 2
offset: 0

HTTP 200
[Asserts]
jsonpath "$.books[0].title" == "0402{{rn}}{{rs}}book2"
jsonpath "$.books[1].title" == "0402{{rn}}{{rs}}book1"
[Captures]
bookId: jsonpath "$.books[0].id"

# List books with order
GET {{API_BASE}}/books/private
Authorization: Bearer {{jwtAccess}}
[QueryStringParams]
userId: {{userId}}
orderField: createdAt
orderDirection: asc
limit: 2
offset: 0

HTTP 200
[Asserts]
jsonpath "$.books[0].title" == "0402{{rn}}{{rs}}book1"
jsonpath "$.books[1].title" == "0402{{rn}}{{rs}}book2"

# Make book favorite
PATCH {{API_BASE}}/books/private/{{bookId}}
Authorization: Bearer {{jwtAccess}}
Content-Type: application/json
[QueryStringParams]
userId: {{userId}}
{
    "isFavorite": true
}

HTTP 200

# List books with order by isFavorite
GET {{API_BASE}}/books/private
Authorization: Bearer {{jwtAccess}}
[QueryStringParams]
userId: {{userId}}
orderField: isFavorite
orderDirection: desc
limit: 2
offset: 0

HTTP 200
[Asserts]
jsonpath "$.books[0].title" == "0402{{rn}}{{rs}}book2"

GET {{API_BASE}}/books/private
Authorization: Bearer {{jwtAccess}}
[QueryStringParams]
userId: {{userId}}
orderField: isFavorite
orderDirection: asc
limit: 2
offset: 0

HTTP 200
[Asserts]
jsonpath "$.books[0].title" == "0402{{rn}}{{rs}}book1"

# List books with isReadingTrackerStarted
GET {{API_BASE}}/books/private
Authorization: Bearer {{jwtAccess}}
[QueryStringParams]
userId: {{userId}}

HTTP 200
[Asserts]
jsonpath "$.books[?(@.id == {{userBookId}})].isReadingTrackerStarted" includes false

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

# List books with isReadingTrackerStarted
GET {{API_BASE}}/books/private
Authorization: Bearer {{jwtAccess}}
[QueryStringParams]
userId: {{userId}}

HTTP 200
[Asserts]
jsonpath "$.books[?(@.id == {{userBookId}})].isReadingTrackerStarted" includes true
