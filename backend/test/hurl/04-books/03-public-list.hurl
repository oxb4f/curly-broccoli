# Create user
POST {{API_BASE}}/users
Content-Type: application/json
{
    "username": "0403{{rn}}{{rs}}user1",
    "password": "0403{{rn}}{{rs}}pass1"
}

HTTP 200
[Captures]
jwtAccess: jsonpath "$.jwt.access"

# Create book
POST {{API_BASE}}/books
Authorization: Bearer {{jwtAccess}}
Content-Type: application/json
{
    "title": "0403{{rn}}{{rs}}book1",
    "description": "0403{{rn}}{{rs}}description1",
    "author": "0403{{rn}}{{rs}}author1",
    "genre": "0403{{rn}}{{rs}}genre1",
    "isbn": "0403{{rn}}{{rs}}isbn1",
    "numberOfPages": 100,
    "imageUrl": "https://example.com/image1.png"
}

HTTP 200

# Create book
POST {{API_BASE}}/books
Authorization: Bearer {{jwtAccess}}
Content-Type: application/json
[Options]
delay: 500
{
    "title": "0403{{rn}}{{rs}}book2",
    "description": "0403{{rn}}{{rs}}description2",
    "author": "0403{{rn}}{{rs}}author2",
    "genre": "0403{{rn}}{{rs}}genre2",
    "isbn": "0403{{rn}}{{rs}}isbn2",
    "numberOfPages": 200,
    "imageUrl": "https://example.com/image2.png"
}

HTTP 200
[Captures]
bookId: jsonpath "$.id"

# List books
GET {{API_BASE}}/books/public
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
jsonpath "$.books[*].isPrivateAdded" nth 0 isBoolean
jsonpath "$.books[0].isPrivateAdded" == true
jsonpath "$.books[1].isPrivateAdded" == true
jsonpath "$.total" >= 2

# List books with limit
GET {{API_BASE}}/books/public
Authorization: Bearer {{jwtAccess}}
[QueryStringParams]
limit: 1

HTTP 200
[Asserts]
jsonpath "$.books" count == 1
jsonpath "$.total" >= 2

# List books with limit and offset
GET {{API_BASE}}/books/public
Authorization: Bearer {{jwtAccess}}
[QueryStringParams]
limit: 1
offset: 1

HTTP 200
[Asserts]
jsonpath "$.books" count == 1
jsonpath "$.total" >= 2

# List books with offset
GET {{API_BASE}}/books/public
Authorization: Bearer {{jwtAccess}}
[QueryStringParams]
offset: 1

HTTP 200
[Asserts]
jsonpath "$.books" count >= 1
jsonpath "$.total" >= 2

# List books with order
GET {{API_BASE}}/books/public
Authorization: Bearer {{jwtAccess}}
[QueryStringParams]
orderField: createdAt
orderDirection: desc
limit: 2

HTTP 200
[Asserts]
jsonpath "$.books[0].title" == "0403{{rn}}{{rs}}book2"
jsonpath "$.books[1].title" == "0403{{rn}}{{rs}}book1"

# List books with order
GET {{API_BASE}}/books/public
Authorization: Bearer {{jwtAccess}}
[QueryStringParams]
orderField: createdAt
orderDirection: asc
limit: 2

HTTP 200
[Asserts]
jsonpath "$.books[0].title" != "0403{{rn}}{{rs}}book2"
jsonpath "$.books[1].title" != "0403{{rn}}{{rs}}book1"

# Create new user
POST {{API_BASE}}/users
Content-Type: application/json
{
    "username": "0403{{rn}}{{rs}}user2",
    "password": "0403{{rn}}{{rs}}pass2"
}

HTTP 200
[Captures]
jwtAccess2: jsonpath "$.jwt.access"

# List books with isAddedByUserId
GET {{API_BASE}}/books/public
Authorization: Bearer {{jwtAccess2}}

HTTP 200
[Asserts]
jsonpath "$.books[?(@.id == {{bookId}})].isPrivateAdded" includes false

# Add book to new user
POST {{API_BASE}}/books/public/add/{{bookId}}
Authorization: Bearer {{jwtAccess2}}

HTTP 200

# List books with isAddedByUserId
GET {{API_BASE}}/books/public
Authorization: Bearer {{jwtAccess2}}

HTTP 200
[Asserts]
jsonpath "$.books[?(@.id == {{bookId}})].isPrivateAdded" includes true

# List books with search term
GET {{API_BASE}}/books/public
Authorization: Bearer {{jwtAccess2}}
[QueryStringParams]
searchTerm: book1
orderField: id
limit: 8

HTTP 200
[Asserts]
jsonpath "$.books[*].title" includes "0403{{rn}}{{rs}}book1"
jsonpath "$.books[*]" count == 8

# Create additional books for filter testing
POST {{API_BASE}}/books
Authorization: Bearer {{jwtAccess}}
Content-Type: application/json
[Options]
delay: 500
{
    "title": "0403{{rn}}{{rs}}book3",
    "description": "0403{{rn}}{{rs}}description3",
    "author": "0403{{rn}}{{rs}}author1",
    "genre": "0403{{rn}}{{rs}}genre3",
    "isbn": "0403{{rn}}{{rs}}isbn3",
    "numberOfPages": 50,
    "imageUrl": "https://example.com/image3.png"
}

HTTP 200

POST {{API_BASE}}/books
Authorization: Bearer {{jwtAccess}}
Content-Type: application/json
[Options]
delay: 500
{
    "title": "0403{{rn}}{{rs}}book4",
    "description": "0403{{rn}}{{rs}}description4",
    "author": "0403{{rn}}{{rs}}author3",
    "genre": "0403{{rn}}{{rs}}genre1",
    "isbn": "0403{{rn}}{{rs}}isbn4",
    "numberOfPages": 300,
    "imageUrl": "https://example.com/image4.png"
}

HTTP 200

# Test filter by single genre
GET {{API_BASE}}/books/public
Authorization: Bearer {{jwtAccess}}
[QueryStringParams]
genre: 0403{{rn}}{{rs}}genre1

HTTP 200
[Asserts]
jsonpath "$.books" isCollection
jsonpath "$.books[*].genre" includes "0403{{rn}}{{rs}}genre1"
jsonpath "$.books[?(@.genre != '0403{{rn}}{{rs}}genre1')]" count == 0
jsonpath "$.total" >= 2

# Test filter by multiple genres
GET {{API_BASE}}/books/public
Authorization: Bearer {{jwtAccess}}
[QueryStringParams]
genre: 0403{{rn}}{{rs}}genre1
genre: 0403{{rn}}{{rs}}genre2

HTTP 200
[Asserts]
jsonpath "$.books" isCollection
jsonpath "$.books[*].genre" includes "0403{{rn}}{{rs}}genre1"
jsonpath "$.books[*].genre" includes "0403{{rn}}{{rs}}genre2"
jsonpath "$.total" >= 3

# Test filter by single author
GET {{API_BASE}}/books/public
Authorization: Bearer {{jwtAccess}}
[QueryStringParams]
author: 0403{{rn}}{{rs}}author1

HTTP 200
[Asserts]
jsonpath "$.books" isCollection
jsonpath "$.books[*].author" includes "0403{{rn}}{{rs}}author1"
jsonpath "$.books[?(@.author != '0403{{rn}}{{rs}}author1')]" count == 0
jsonpath "$.total" >= 2

# Test filter by multiple authors
GET {{API_BASE}}/books/public
Authorization: Bearer {{jwtAccess}}
[QueryStringParams]
author: 0403{{rn}}{{rs}}author1
author: 0403{{rn}}{{rs}}author2

HTTP 200
[Asserts]
jsonpath "$.books" isCollection
jsonpath "$.books[*].author" includes "0403{{rn}}{{rs}}author1"
jsonpath "$.books[*].author" includes "0403{{rn}}{{rs}}author2"
jsonpath "$.total" >= 3

# Test filter by minimum number of pages
GET {{API_BASE}}/books/public
Authorization: Bearer {{jwtAccess}}
[QueryStringParams]
numberOfPagesMin: 150

HTTP 200
[Asserts]
jsonpath "$.books" isCollection
jsonpath "$.books[*].numberOfPages" includes 200
jsonpath "$.books[*].numberOfPages" includes 300
jsonpath "$.books[?(@.numberOfPages < 150)]" count == 0
jsonpath "$.total" >= 2

# Test filter by maximum number of pages
GET {{API_BASE}}/books/public
Authorization: Bearer {{jwtAccess}}
[QueryStringParams]
numberOfPagesMax: 150

HTTP 200
[Asserts]
jsonpath "$.books" isCollection
jsonpath "$.books[*].numberOfPages" includes 100
jsonpath "$.books[*].numberOfPages" includes 50
jsonpath "$.books[?(@.numberOfPages > 150)]" count == 0
jsonpath "$.total" >= 2

# Test filter by page range
GET {{API_BASE}}/books/public
Authorization: Bearer {{jwtAccess}}
[QueryStringParams]
numberOfPagesMin: 75
numberOfPagesMax: 250

HTTP 200
[Asserts]
jsonpath "$.books" isCollection
jsonpath "$.books[*].numberOfPages" includes 100
jsonpath "$.books[*].numberOfPages" includes 200
jsonpath "$.books[?(@.numberOfPages < 75)]" count == 0
jsonpath "$.books[?(@.numberOfPages > 250)]" count == 0
jsonpath "$.total" >= 2

# Test combined filters: genre + author
GET {{API_BASE}}/books/public
Authorization: Bearer {{jwtAccess}}
[QueryStringParams]
genre: 0403{{rn}}{{rs}}genre1
author: 0403{{rn}}{{rs}}author1

HTTP 200
[Asserts]
jsonpath "$.books" isCollection
jsonpath "$.books[*].genre" includes "0403{{rn}}{{rs}}genre1"
jsonpath "$.books[*].author" includes "0403{{rn}}{{rs}}author1"
jsonpath "$.books[?(@.genre != '0403{{rn}}{{rs}}genre1')]" count == 0
jsonpath "$.books[?(@.author != '0403{{rn}}{{rs}}author1')]" count == 0
jsonpath "$.total" >= 1

# Test combined filters: genre + page range
GET {{API_BASE}}/books/public
Authorization: Bearer {{jwtAccess}}
[QueryStringParams]
genre: 0403{{rn}}{{rs}}genre1
numberOfPagesMin: 250

HTTP 200
[Asserts]
jsonpath "$.books" isCollection
jsonpath "$.books[*].genre" includes "0403{{rn}}{{rs}}genre1"
jsonpath "$.books[*].numberOfPages" includes 300
jsonpath "$.books[?(@.genre != '0403{{rn}}{{rs}}genre1')]" count == 0
jsonpath "$.books[?(@.numberOfPages < 250)]" count == 0
jsonpath "$.total" >= 1

# Test combined filters: author + page range
GET {{API_BASE}}/books/public
Authorization: Bearer {{jwtAccess}}
[QueryStringParams]
author: 0403{{rn}}{{rs}}author1
numberOfPagesMax: 100

HTTP 200
[Asserts]
jsonpath "$.books" isCollection
jsonpath "$.books[*].author" includes "0403{{rn}}{{rs}}author1"
jsonpath "$.books[?(@.author != '0403{{rn}}{{rs}}author1')]" count == 0
jsonpath "$.books[?(@.numberOfPages > 100)]" count == 0
jsonpath "$.total" >= 2

# Test combined filters: all filters together
GET {{API_BASE}}/books/public
Authorization: Bearer {{jwtAccess}}
[QueryStringParams]
genre: 0403{{rn}}{{rs}}genre1
author: 0403{{rn}}{{rs}}author3
numberOfPagesMin: 250
numberOfPagesMax: 350

HTTP 200
[Asserts]
jsonpath "$.books" isCollection
jsonpath "$.books[*].genre" includes "0403{{rn}}{{rs}}genre1"
jsonpath "$.books[*].author" includes "0403{{rn}}{{rs}}author3"
jsonpath "$.books[*].numberOfPages" includes 300
jsonpath "$.books[?(@.genre != '0403{{rn}}{{rs}}genre1')]" count == 0
jsonpath "$.books[?(@.author != '0403{{rn}}{{rs}}author3')]" count == 0
jsonpath "$.books[?(@.numberOfPages < 250)]" count == 0
jsonpath "$.books[?(@.numberOfPages > 350)]" count == 0
jsonpath "$.total" >= 1

# Test filters with pagination
GET {{API_BASE}}/books/public
Authorization: Bearer {{jwtAccess}}
[QueryStringParams]
genre: 0403{{rn}}{{rs}}genre1
limit: 1

HTTP 200
[Asserts]
jsonpath "$.books" count == 1
jsonpath "$.books[*].genre" includes "0403{{rn}}{{rs}}genre1"
jsonpath "$.total" >= 2

# Test filters with ordering - ascending by numberOfPages
GET {{API_BASE}}/books/public
Authorization: Bearer {{jwtAccess}}
[QueryStringParams]
author: 0403{{rn}}{{rs}}author1
orderField: numberOfPages
orderDirection: asc
limit: 2

HTTP 200
[Asserts]
jsonpath "$.books" isCollection
jsonpath "$.books" count == 2
jsonpath "$.books[*].author" includes "0403{{rn}}{{rs}}author1"
jsonpath "$.books[0].numberOfPages" == 50
jsonpath "$.books[1].numberOfPages" == 100
jsonpath "$.total" >= 2

# Test filters with search term
GET {{API_BASE}}/books/public
Authorization: Bearer {{jwtAccess}}
[QueryStringParams]
searchTerm: book
genre: 0403{{rn}}{{rs}}genre1
limit: 10

HTTP 200
[Asserts]
jsonpath "$.books" isCollection
jsonpath "$.books[*].genre" includes "0403{{rn}}{{rs}}genre1"
jsonpath "$.books[*].title" includes "0403{{rn}}{{rs}}book1"
jsonpath "$.total" >= 2

# Test empty result filters
GET {{API_BASE}}/books/public
Authorization: Bearer {{jwtAccess}}
[QueryStringParams]
genre: nonexistent-genre-0403{{rn}}{{rs}}

HTTP 200
[Asserts]
jsonpath "$.books" count == 0
jsonpath "$.total" == 0
