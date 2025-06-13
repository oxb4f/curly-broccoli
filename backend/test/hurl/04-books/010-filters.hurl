# Test filters endpoint - capture initial state
GET {{API_BASE}}/books/filters

HTTP 200
[Captures]
initialGenresCount: jsonpath "$.genres" count
initialAuthorsCount: jsonpath "$.authors" count
initialTotal: jsonpath "$.total"
[Asserts]
jsonpath "$.genres" isCollection
jsonpath "$.authors" isCollection
jsonpath "$.numberOfPagesMin" isNumber
jsonpath "$.numberOfPagesMax" isNumber
jsonpath "$.total" isNumber

# Create user to add books
POST {{API_BASE}}/users
Content-Type: application/json
{
    "username": "0410{{rn}}{{rs}}user1",
    "password": "0410{{rn}}{{rs}}pass1"
}

HTTP 200
[Captures]
jwtAccess: jsonpath "$.jwt.access"

# Create first book with specific genre and author
POST {{API_BASE}}/books
Authorization: Bearer {{jwtAccess}}
Content-Type: application/json
{
    "title": "0410{{rn}}{{rs}}book1",
    "description": "0410{{rn}}{{rs}}description1",
    "author": "0410{{rn}}{{rs}}author1",
    "genre": "0410{{rn}}{{rs}}genre1",
    "isbn": "9780596520687",
    "numberOfPages": 100,
    "imageUrl": "https://example.com/image1.png"
}

HTTP 200

# Test filters endpoint with one book added
GET {{API_BASE}}/books/filters

HTTP 200
[Asserts]
jsonpath "$.genres" isCollection
jsonpath "$.authors" isCollection
jsonpath "$.numberOfPagesMin" isNumber
jsonpath "$.numberOfPagesMax" isNumber
jsonpath "$.total" isNumber
jsonpath "$.genres" count >= {{initialGenresCount}}
jsonpath "$.authors" count >= {{initialAuthorsCount}}
jsonpath "$.genres" includes "0410{{rn}}{{rs}}genre1"
jsonpath "$.authors" includes "0410{{rn}}{{rs}}author1"
jsonpath "$.total" >= {{initialTotal}}

# Create second book with different genre, same author, different page count
POST {{API_BASE}}/books
Authorization: Bearer {{jwtAccess}}
Content-Type: application/json
[Options]
delay: 500
{
    "title": "0410{{rn}}{{rs}}book2",
    "description": "0410{{rn}}{{rs}}description2",
    "author": "0410{{rn}}{{rs}}author1",
    "genre": "0410{{rn}}{{rs}}genre2",
    "isbn": "0471958697",
    "numberOfPages": 250,
    "imageUrl": "https://example.com/image2.png"
}

HTTP 200

# Test filters endpoint with two books added
GET {{API_BASE}}/books/filters

HTTP 200
[Asserts]
jsonpath "$.genres" isCollection
jsonpath "$.authors" isCollection
jsonpath "$.numberOfPagesMin" isNumber
jsonpath "$.numberOfPagesMax" isNumber
jsonpath "$.total" isNumber
jsonpath "$.genres" includes "0410{{rn}}{{rs}}genre1"
jsonpath "$.genres" includes "0410{{rn}}{{rs}}genre2"
jsonpath "$.authors" includes "0410{{rn}}{{rs}}author1"
jsonpath "$.total" >= {{initialTotal}}

# Create third book with different author, new genre, edge case page count
POST {{API_BASE}}/books
Authorization: Bearer {{jwtAccess}}
Content-Type: application/json
[Options]
delay: 500
{
    "title": "0410{{rn}}{{rs}}book3",
    "description": "0410{{rn}}{{rs}}description3",
    "author": "0410{{rn}}{{rs}}author2",
    "genre": "0410{{rn}}{{rs}}genre3",
    "isbn": "9781861972712",
    "numberOfPages": 1,
    "imageUrl": "https://example.com/image3.png"
}

HTTP 200

# Test filters endpoint with three books - verify multiple authors/genres
GET {{API_BASE}}/books/filters

HTTP 200
[Asserts]
jsonpath "$.genres" isCollection
jsonpath "$.authors" isCollection
jsonpath "$.numberOfPagesMin" isNumber
jsonpath "$.numberOfPagesMax" isNumber
jsonpath "$.total" isNumber
jsonpath "$.genres" includes "0410{{rn}}{{rs}}genre1"
jsonpath "$.genres" includes "0410{{rn}}{{rs}}genre2"
jsonpath "$.genres" includes "0410{{rn}}{{rs}}genre3"
jsonpath "$.authors" includes "0410{{rn}}{{rs}}author1"
jsonpath "$.authors" includes "0410{{rn}}{{rs}}author2"
jsonpath "$.numberOfPagesMin" <= 1
jsonpath "$.numberOfPagesMax" >= 250
jsonpath "$.total" >= {{initialTotal}}

# Create fourth book with maximum page count to test upper boundary
POST {{API_BASE}}/books
Authorization: Bearer {{jwtAccess}}
Content-Type: application/json
[Options]
delay: 500
{
    "title": "0410{{rn}}{{rs}}book4",
    "description": "0410{{rn}}{{rs}}description4",
    "author": "0410{{rn}}{{rs}}author3",
    "genre": "0410{{rn}}{{rs}}genre1",
    "isbn": "0851310419",
    "numberOfPages": 99999,
    "imageUrl": "https://example.com/image4.png"
}

HTTP 200

# Test filters endpoint with maximum page count book
GET {{API_BASE}}/books/filters

HTTP 200
[Asserts]
jsonpath "$.genres" isCollection
jsonpath "$.authors" isCollection
jsonpath "$.numberOfPagesMin" isNumber
jsonpath "$.numberOfPagesMax" isNumber
jsonpath "$.total" isNumber
jsonpath "$.genres" includes "0410{{rn}}{{rs}}genre1"
jsonpath "$.genres" includes "0410{{rn}}{{rs}}genre2"
jsonpath "$.genres" includes "0410{{rn}}{{rs}}genre3"
jsonpath "$.authors" includes "0410{{rn}}{{rs}}author1"
jsonpath "$.authors" includes "0410{{rn}}{{rs}}author2"
jsonpath "$.authors" includes "0410{{rn}}{{rs}}author3"
jsonpath "$.numberOfPagesMin" <= 1
jsonpath "$.numberOfPagesMax" >= 99999
jsonpath "$.total" >= {{initialTotal}}

# Create book with duplicate title to test that total counts distinct titles
POST {{API_BASE}}/books
Authorization: Bearer {{jwtAccess}}
Content-Type: application/json
[Options]
delay: 500
{
    "title": "0410{{rn}}{{rs}}book1",
    "description": "0410{{rn}}{{rs}}description5",
    "author": "0410{{rn}}{{rs}}author4",
    "genre": "0410{{rn}}{{rs}}genre4",
    "isbn": "9780062315007",
    "numberOfPages": 500,
    "imageUrl": "https://example.com/image5.png"
}

HTTP 200

# Test filters endpoint with duplicate title - verify all our test data is included
GET {{API_BASE}}/books/filters

HTTP 200
[Asserts]
jsonpath "$.genres" isCollection
jsonpath "$.authors" isCollection
jsonpath "$.numberOfPagesMin" isNumber
jsonpath "$.numberOfPagesMax" isNumber
jsonpath "$.total" isNumber
jsonpath "$.genres" includes "0410{{rn}}{{rs}}genre1"
jsonpath "$.genres" includes "0410{{rn}}{{rs}}genre2"
jsonpath "$.genres" includes "0410{{rn}}{{rs}}genre3"
jsonpath "$.genres" includes "0410{{rn}}{{rs}}genre4"
jsonpath "$.authors" includes "0410{{rn}}{{rs}}author1"
jsonpath "$.authors" includes "0410{{rn}}{{rs}}author2"
jsonpath "$.authors" includes "0410{{rn}}{{rs}}author3"
jsonpath "$.authors" includes "0410{{rn}}{{rs}}author4"
jsonpath "$.numberOfPagesMin" <= 1
jsonpath "$.numberOfPagesMax" >= 99999
jsonpath "$.total" >= {{initialTotal}}

# Test that filters endpoint doesn't require authentication
GET {{API_BASE}}/books/filters

HTTP 200
[Asserts]
jsonpath "$.genres" isCollection
jsonpath "$.authors" isCollection
jsonpath "$.numberOfPagesMin" isNumber
jsonpath "$.numberOfPagesMax" isNumber
jsonpath "$.total" isNumber
