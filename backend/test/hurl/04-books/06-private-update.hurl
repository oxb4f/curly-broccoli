# Create user
POST {{API_BASE}}/users
Content-Type: application/json
{
    "username": "0406{{rn}}{{rs}}user1",
    "password": "0406{{rn}}{{rs}}pass1"
}

HTTP 200
[Captures]
jwtAccess: jsonpath "$.jwt.access"

# Create book
POST {{API_BASE}}/books
Authorization: Bearer {{jwtAccess}}
Content-Type: application/json
{
    "title": "0406{{rn}}{{rs}}book1",
    "description": "0406{{rn}}{{rs}}description1",
    "author": "0406{{rn}}{{rs}}author1",
    "genre": "0406{{rn}}{{rs}}genre1",
    "isbn": "0406{{rn}}{{rs}}isbn1",
    "numberOfPages": 100,
    "imageUrl": "https://example.com/image1.png"
}

HTTP 200

# List user books
GET {{API_BASE}}/books/private
Authorization: Bearer {{jwtAccess}}

HTTP 200
[Asserts]
jsonpath "$.books" count >= 1
[Captures]
userBookId: jsonpath "$.books[0].id"

# Update book
PATCH {{API_BASE}}/books/private/{{userBookId}}
Authorization: Bearer {{jwtAccess}}
Content-Type: application/json
{
    "title": "0406{{rn}}{{rs}}book2",
    "description": "0406{{rn}}{{rs}}description2",
    "author": "0406{{rn}}{{rs}}author2",
    "genre": "0406{{rn}}{{rs}}genre2",
    "isFavorite": true,
    "rating": 4,
    "review": "0406{{rn}}{{rs}}review2",
    "imageUrl": "https://example.com/image2.png",
    "numberOfPages": 200,
    "isbn": "0406{{rn}}{{rs}}isbn2",
    "isRead": true
}

HTTP 200
[Asserts]
jsonpath "$.id" == {{userBookId}}
jsonpath "$.title" == "0406{{rn}}{{rs}}book2"
jsonpath "$.description" == "0406{{rn}}{{rs}}description2"
jsonpath "$.author" == "0406{{rn}}{{rs}}author2"
jsonpath "$.genre" == "0406{{rn}}{{rs}}genre2"
jsonpath "$.isbn" == "0406{{rn}}{{rs}}isbn2"
jsonpath "$.numberOfPages" == 200
jsonpath "$.imageUrl" == "https://example.com/image2.png"
jsonpath "$.isFavorite" == true
jsonpath "$.rating" == 4
jsonpath "$.review" == "0406{{rn}}{{rs}}review2"
jsonpath "$.isRead" == true

# Get book
GET {{API_BASE}}/books/private/{{userBookId}}
Authorization: Bearer {{jwtAccess}}

HTTP 200
[Asserts]
jsonpath "$.id" == {{userBookId}}
jsonpath "$.title" == "0406{{rn}}{{rs}}book2"
jsonpath "$.description" == "0406{{rn}}{{rs}}description2"
jsonpath "$.author" == "0406{{rn}}{{rs}}author2"
jsonpath "$.genre" == "0406{{rn}}{{rs}}genre2"
jsonpath "$.isbn" == "0406{{rn}}{{rs}}isbn2"
jsonpath "$.numberOfPages" == 200
jsonpath "$.imageUrl" == "https://example.com/image2.png"
jsonpath "$.isFavorite" == true
jsonpath "$.rating" == 4
jsonpath "$.review" == "0406{{rn}}{{rs}}review2"
jsonpath "$.isRead" == true

# Update book which does not exist
PATCH {{API_BASE}}/books/private/1
Authorization: Bearer {{jwtAccess}}
Content-Type: application/json
{
    "title": "0406{{rn}}{{rs}}book3",
    "description": "0406{{rn}}{{rs}}description3"
}

HTTP 404

# Update with invalid title (cannot be null)
PATCH {{API_BASE}}/books/private/{{userBookId}}
Authorization: Bearer {{jwtAccess}}
Content-Type: application/json
{
    "title": null
}

HTTP 422

# Update with invalid author (cannot be null)
PATCH {{API_BASE}}/books/private/{{userBookId}}
Authorization: Bearer {{jwtAccess}}
Content-Type: application/json
{
    "author": null
}

HTTP 422

# Update with invalid number of pages (cannot be null)
PATCH {{API_BASE}}/books/private/{{userBookId}}
Authorization: Bearer {{jwtAccess}}
Content-Type: application/json
{
    "numberOfPages": null
}

HTTP 422

# Set other fields to null
PATCH {{API_BASE}}/books/private/{{userBookId}}
Authorization: Bearer {{jwtAccess}}
Content-Type: application/json
{
    "description": null,
    "imageUrl": null,
    "genre": null,
    "isbn": null
}

HTTP 200

# isFavorite should be boolean
PATCH {{API_BASE}}/books/private/{{userBookId}}
Authorization: Bearer {{jwtAccess}}
Content-Type: application/json
{
    "isFavorite": "not a boolean"
}

HTTP 422

# Rating should be number
PATCH {{API_BASE}}/books/private/{{userBookId}}
Authorization: Bearer {{jwtAccess}}
Content-Type: application/json
{
    "rating": "not a number"
}

HTTP 422

# Rating should be between 1 and 5
PATCH {{API_BASE}}/books/private/{{userBookId}}
Authorization: Bearer {{jwtAccess}}
Content-Type: application/json
{
    "rating": 6
}

HTTP 422

# isRead should be boolean
PATCH {{API_BASE}}/books/private/{{userBookId}}
Authorization: Bearer {{jwtAccess}}
Content-Type: application/json
{
    "isRead": "not a boolean"
}

HTTP 422

# Unable to update without authorization
PATCH {{API_BASE}}/books/private/{{userBookId}}
Content-Type: application/json
{
    "title": "0406{{rn}}{{rs}}book4"
}

HTTP 401
