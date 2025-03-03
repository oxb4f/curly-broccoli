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
    "isbn": "0401{{rn}}{{rs}}isbn1",
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
jsonpath "$.isbn" == "0401{{rn}}{{rs}}isbn1"
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
    "description": "0401{{rn}}{{rs}}description1",
    "author": "0401{{rn}}{{rs}}author1",
    "genre": "0401{{rn}}{{rs}}genre1",
    "isbn": "0401{{rn}}{{rs}}isbn1",
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
    "title": "0401{{rn}}{{rs}}book1",
    "description": "0401{{rn}}{{rs}}description1",
    "genre": "0401{{rn}}{{rs}}genre1",
    "isbn": "0401{{rn}}{{rs}}isbn1",
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
    "title": "0401{{rn}}{{rs}}book1",
    "description": "0401{{rn}}{{rs}}description1",
    "author": "0401{{rn}}{{rs}}author1",
    "genre": "0401{{rn}}{{rs}}genre1",
    "isbn": "0401{{rn}}{{rs}}isbn1",
    "imageUrl": "https://example.com/image1.png"
}

HTTP 422
[Asserts]
jsonpath "$.error.type" == "VALIDATION"
jsonpath "$.error.payload.message" == "Validation error"
