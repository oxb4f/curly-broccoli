POST {{API_BASE}}/users
Content-Type: application/json
{
    "username": "0411{{rn}}{{rs}}user1",
    "password": "0411{{rn}}{{rs}}pass1"
}

HTTP 200
[Captures]
jwtAccess1: jsonpath "$.jwt.access"
userId1: jsonpath "$.id"

POST {{API_BASE}}/users
Content-Type: application/json
{
    "username": "0411{{rn}}{{rs}}user2",
    "password": "0411{{rn}}{{rs}}pass2"
}

HTTP 200
[Captures]
jwtAccess2: jsonpath "$.jwt.access"
userId2: jsonpath "$.id"

GET {{API_BASE}}/books/private/filters
Authorization: Bearer {{jwtAccess1}}
[QueryStringParams]
userId: {{userId1}}

HTTP 200
[Captures]
initialGenresCount1: jsonpath "$.genres" count
initialAuthorsCount1: jsonpath "$.authors" count
initialTotal1: jsonpath "$.total"
[Asserts]
jsonpath "$.genres" isCollection
jsonpath "$.authors" isCollection
jsonpath "$.numberOfPagesMin" isNumber
jsonpath "$.numberOfPagesMax" isNumber
jsonpath "$.total" isNumber
jsonpath "$.total" == 0

GET {{API_BASE}}/books/private/filters
[QueryStringParams]
userId: {{userId1}}

HTTP 401

POST {{API_BASE}}/books
Authorization: Bearer {{jwtAccess1}}
Content-Type: application/json
{
    "title": "0411{{rn}}{{rs}}book1",
    "description": "0411{{rn}}{{rs}}description1",
    "author": "0411{{rn}}{{rs}}author1",
    "genre": "0411{{rn}}{{rs}}genre1",
    "isbn": "0411{{rn}}{{rs}}isbn1",
    "numberOfPages": 100,
    "imageUrl": "https://example.com/image1.png"
}

HTTP 200
[Captures]
bookId1: jsonpath "$.id"

GET {{API_BASE}}/books/private/filters
Authorization: Bearer {{jwtAccess1}}
[QueryStringParams]
userId: {{userId1}}

HTTP 200
[Asserts]
jsonpath "$.genres" isCollection
jsonpath "$.authors" isCollection
jsonpath "$.numberOfPagesMin" isNumber
jsonpath "$.numberOfPagesMax" isNumber
jsonpath "$.total" isNumber
jsonpath "$.genres" includes "0411{{rn}}{{rs}}genre1"
jsonpath "$.authors" includes "0411{{rn}}{{rs}}author1"
jsonpath "$.numberOfPagesMin" == 100
jsonpath "$.numberOfPagesMax" == 100
jsonpath "$.total" == 1

POST {{API_BASE}}/books
Authorization: Bearer {{jwtAccess1}}
Content-Type: application/json
[Options]
delay: 500
{
    "title": "0411{{rn}}{{rs}}book2",
    "description": "0411{{rn}}{{rs}}description2",
    "author": "0411{{rn}}{{rs}}author2",
    "genre": "0411{{rn}}{{rs}}genre2",
    "isbn": "0411{{rn}}{{rs}}isbn2",
    "numberOfPages": 250,
    "imageUrl": "https://example.com/image2.png"
}

HTTP 200
[Captures]
bookId2: jsonpath "$.id"

GET {{API_BASE}}/books/private/filters
Authorization: Bearer {{jwtAccess1}}
[QueryStringParams]
userId: {{userId1}}

HTTP 200
[Asserts]
jsonpath "$.genres" isCollection
jsonpath "$.authors" isCollection
jsonpath "$.numberOfPagesMin" isNumber
jsonpath "$.numberOfPagesMax" isNumber
jsonpath "$.total" isNumber
jsonpath "$.genres" includes "0411{{rn}}{{rs}}genre1"
jsonpath "$.genres" includes "0411{{rn}}{{rs}}genre2"
jsonpath "$.authors" includes "0411{{rn}}{{rs}}author1"
jsonpath "$.authors" includes "0411{{rn}}{{rs}}author2"
jsonpath "$.numberOfPagesMin" == 100
jsonpath "$.numberOfPagesMax" == 250
jsonpath "$.total" == 2

POST {{API_BASE}}/books
Authorization: Bearer {{jwtAccess1}}
Content-Type: application/json
[Options]
delay: 500
{
    "title": "0411{{rn}}{{rs}}book3",
    "description": "0411{{rn}}{{rs}}description3",
    "author": "0411{{rn}}{{rs}}author1",
    "genre": "0411{{rn}}{{rs}}genre3",
    "isbn": "0411{{rn}}{{rs}}isbn3",
    "numberOfPages": 1,
    "imageUrl": "https://example.com/image3.png"
}

HTTP 200
[Captures]
bookId3: jsonpath "$.id"

GET {{API_BASE}}/books/private/filters
Authorization: Bearer {{jwtAccess1}}
[QueryStringParams]
userId: {{userId1}}

HTTP 200
[Asserts]
jsonpath "$.genres" isCollection
jsonpath "$.authors" isCollection
jsonpath "$.numberOfPagesMin" isNumber
jsonpath "$.numberOfPagesMax" isNumber
jsonpath "$.total" isNumber
jsonpath "$.genres" includes "0411{{rn}}{{rs}}genre1"
jsonpath "$.genres" includes "0411{{rn}}{{rs}}genre2"
jsonpath "$.genres" includes "0411{{rn}}{{rs}}genre3"
jsonpath "$.authors" includes "0411{{rn}}{{rs}}author1"
jsonpath "$.authors" includes "0411{{rn}}{{rs}}author2"
jsonpath "$.numberOfPagesMin" == 1
jsonpath "$.numberOfPagesMax" == 250
jsonpath "$.total" == 3

POST {{API_BASE}}/books
Authorization: Bearer {{jwtAccess2}}
Content-Type: application/json
[Options]
delay: 500
{
    "title": "0411{{rn}}{{rs}}book4",
    "description": "0411{{rn}}{{rs}}description4",
    "author": "0411{{rn}}{{rs}}author3",
    "genre": "0411{{rn}}{{rs}}genre4",
    "isbn": "0411{{rn}}{{rs}}isbn4",
    "numberOfPages": 500,
    "imageUrl": "https://example.com/image4.png"
}

HTTP 200
[Captures]
bookId4: jsonpath "$.id"

GET {{API_BASE}}/books/private/filters
Authorization: Bearer {{jwtAccess1}}
[QueryStringParams]
userId: {{userId1}}

HTTP 200
[Asserts]
jsonpath "$.genres" isCollection
jsonpath "$.authors" isCollection
jsonpath "$.numberOfPagesMin" isNumber
jsonpath "$.numberOfPagesMax" isNumber
jsonpath "$.total" isNumber
jsonpath "$.genres" includes "0411{{rn}}{{rs}}genre1"
jsonpath "$.genres" includes "0411{{rn}}{{rs}}genre2"
jsonpath "$.genres" includes "0411{{rn}}{{rs}}genre3"
jsonpath "$.genres" not includes "0411{{rn}}{{rs}}genre4"
jsonpath "$.authors" includes "0411{{rn}}{{rs}}author1"
jsonpath "$.authors" includes "0411{{rn}}{{rs}}author2"
jsonpath "$.authors" not includes "0411{{rn}}{{rs}}author3"
jsonpath "$.numberOfPagesMin" == 1
jsonpath "$.numberOfPagesMax" == 250
jsonpath "$.total" == 3

GET {{API_BASE}}/books/private/filters
Authorization: Bearer {{jwtAccess2}}
[QueryStringParams]
userId: {{userId2}}

HTTP 200
[Asserts]
jsonpath "$.genres" isCollection
jsonpath "$.authors" isCollection
jsonpath "$.numberOfPagesMin" isNumber
jsonpath "$.numberOfPagesMax" isNumber
jsonpath "$.total" isNumber
jsonpath "$.genres" includes "0411{{rn}}{{rs}}genre4"
jsonpath "$.genres" not includes "0411{{rn}}{{rs}}genre1"
jsonpath "$.genres" not includes "0411{{rn}}{{rs}}genre2"
jsonpath "$.genres" not includes "0411{{rn}}{{rs}}genre3"
jsonpath "$.authors" includes "0411{{rn}}{{rs}}author3"
jsonpath "$.authors" not includes "0411{{rn}}{{rs}}author1"
jsonpath "$.authors" not includes "0411{{rn}}{{rs}}author2"
jsonpath "$.numberOfPagesMin" == 500
jsonpath "$.numberOfPagesMax" == 500
jsonpath "$.total" == 1

GET {{API_BASE}}/books/private/filters
Authorization: Bearer {{jwtAccess1}}
[QueryStringParams]
userId: {{userId2}}

HTTP 200
[Asserts]
jsonpath "$.genres" includes "0411{{rn}}{{rs}}genre4"
jsonpath "$.authors" includes "0411{{rn}}{{rs}}author3"
jsonpath "$.total" == 1

GET {{API_BASE}}/books/private/filters
Authorization: Bearer {{jwtAccess1}}

HTTP 422
[Asserts]
jsonpath "$.error.type" == "VALIDATION"
