# Create user
POST {{API_BASE}}/users
Content-Type: application/json
{
    "username": "0401{{rn}}{{rs}}user1",
    "password": "0401{{rn}}{{rs}}pass1"
}

HTTP 200
[Captures]
jwtAccess: jsonpath "$.jwt.access"

# Create book
POST {{API_BASE}}/books
Authorization: Bearer {{jwtAccess}}
Content-Type: application/json
{
    "title": "0401{{rn}}{{rs}}book1",
    "description": "0401{{rn}}{{rs}}description1",
    "author": "0401{{rn}}{{rs}}author1",
    "genre": "0401{{rn}}{{rs}}genre1",
    "isbn": "0306406152",
    "numberOfPages": 100,
    "imageUrl": "https://example.com/image1.png"
}

HTTP 200
[Asserts]
jsonpath "$.id" isNumber
jsonpath "$.title" == "0401{{rn}}{{rs}}book1"
jsonpath "$.description" == "0401{{rn}}{{rs}}description1"
jsonpath "$.author" == "0401{{rn}}{{rs}}author1"
jsonpath "$.genre" == "0401{{rn}}{{rs}}genre1"
jsonpath "$.isbn" == "0306406152"
jsonpath "$.numberOfPages" == 100
jsonpath "$.imageUrl" == "https://example.com/image1.png"

# Create book with invalid image URL
POST {{API_BASE}}/books
Authorization: Bearer {{jwtAccess}}
Content-Type: application/json
{
    "imageUrl": "invalid-image-url"
}

HTTP 422
[Asserts]
jsonpath "$.error.type" == "VALIDATION"
jsonpath "$.error.payload.message" == "Validation error"

# Book title should exist
POST {{API_BASE}}/books
Authorization: Bearer {{jwtAccess}}
Content-Type: application/json
{
    "description": "0401{{rn}}{{rs}}description2",
    "author": "0401{{rn}}{{rs}}author2",
    "genre": "0401{{rn}}{{rs}}genre2",
    "isbn": "0306406152",
    "numberOfPages": 100,
    "imageUrl": "https://example.com/image1.png"
}

HTTP 422
[Asserts]
jsonpath "$.error.type" == "VALIDATION"
jsonpath "$.error.payload.message" == "Validation error"

# Book author should exist
POST {{API_BASE}}/books
Authorization: Bearer {{jwtAccess}}
Content-Type: application/json
{
    "title": "0401{{rn}}{{rs}}book3",
    "description": "0401{{rn}}{{rs}}description3",
    "genre": "0401{{rn}}{{rs}}genre3",
    "isbn": "9791234567897",
    "numberOfPages": 100,
    "imageUrl": "https://example.com/image1.png"
}

HTTP 422
[Asserts]
jsonpath "$.error.type" == "VALIDATION"
jsonpath "$.error.payload.message" == "Validation error"

# Book number of pages should be a number
POST {{API_BASE}}/books
Authorization: Bearer {{jwtAccess}}
Content-Type: application/json
{
    "title": "0401{{rn}}{{rs}}book4",
    "description": "0401{{rn}}{{rs}}description4",
    "author": "0401{{rn}}{{rs}}author4",
    "genre": "0401{{rn}}{{rs}}genre4",
    "isbn": "1566199093",
    "imageUrl": "https://example.com/image1.png"
}

HTTP 422
[Asserts]
jsonpath "$.error.type" == "VALIDATION"
jsonpath "$.error.payload.message" == "Validation error"
