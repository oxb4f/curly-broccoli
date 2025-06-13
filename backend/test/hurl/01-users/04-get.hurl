# Create user
POST {{API_BASE}}/users
Content-Type: application/json
{
    "username": "0104{{rn}}{{rs}}user1",
    "password": "0104{{rn}}{{rs}}pass1"
}

HTTP 200
[Asserts]
jsonpath "$.id" isInteger
jsonpath "$.username" == "0104{{rn}}{{rs}}user1"
jsonpath "$.jwt.access" isString
jsonpath "$.jwt.refresh" isString
[Captures]
userId: jsonpath "$.id"
accessId: jsonpath "$.accessId"
jwtAccess: jsonpath "$.jwt.access"
refreshToken: jsonpath "$.jwt.refresh"

# Success get
GET {{API_BASE}}/users/{{userId}}
Authorization: Bearer {{jwtAccess}}

HTTP 200
[Asserts]
jsonpath "$.id" isInteger
jsonpath "$.username" == "0104{{rn}}{{rs}}user1"
jsonpath "$.firstName" == null
jsonpath "$.lastName" == null
jsonpath "$.birthday" == null
jsonpath "$.social" exists
jsonpath "$.imageUrl" == null
jsonpath "$.numberOfReadBooks" == 0
jsonpath "$.numberOfFollowing" == 0
jsonpath "$.numberOfFollowers" == 0

# User not found with valid access token
GET {{API_BASE}}/users/12345
Authorization: Bearer {{jwtAccess}}

HTTP 404

# User update with valid values
PATCH {{API_BASE}}/users/{{userId}}
Content-Type: application/json
Authorization: Bearer {{jwtAccess}}
{
    "username": "0104{{rn}}{{rs}}user1",
    "firstName": "TestFirst104",
    "lastName": "TestLast104",
    "birthday": "2020-02-20",
    "social": {
        "telegram": "https://test.example",
        "instagram": "https://test.example"
    },
    "imageUrl": "https://test.example"
}

HTTP 200

# User get after update
GET {{API_BASE}}/users/{{userId}}
Authorization: Bearer {{jwtAccess}}

HTTP 200
[Asserts]
jsonpath "$.id" isInteger
jsonpath "$.username" == "0104{{rn}}{{rs}}user1"
jsonpath "$.social.instagram" == "https://test.example"
jsonpath "$.social.telegram" == "https://test.example"
jsonpath "$.imageUrl" == "https://test.example"
jsonpath "$.firstName" == "TestFirst104"
jsonpath "$.lastName" == "TestLast104"
jsonpath "$.birthday" == "2020-02-20T00:00:00.000Z"
jsonpath "$.numberOfReadBooks" == 0
jsonpath "$.numberOfFollowing" == 0
jsonpath "$.numberOfFollowers" == 0

# Create user to follow
POST {{API_BASE}}/users
Content-Type: application/json
{
    "username": "0104{{rn}}{{rs}}user3",
    "password": "0104{{rn}}{{rs}}pass3"
}

HTTP 200
[Asserts]
jsonpath "$.id" isInteger
jsonpath "$.username" == "0104{{rn}}{{rs}}user3"
jsonpath "$.jwt.access" isString
jsonpath "$.jwt.refresh" isString
[Captures]
user3_id: jsonpath "$.id"

# Get user to check followed
GET {{API_BASE}}/users/{{user3_id}}
Authorization: Bearer {{jwtAccess}}

HTTP 200
[Asserts]
jsonpath "$.followed" == false
jsonpath "$.followersId" == null
jsonpath "$.numberOfReadBooks" == 0
jsonpath "$.numberOfFollowing" == 0
jsonpath "$.numberOfFollowers" == 0

# User follows User 3
POST {{API_BASE}}/followers
Authorization: Bearer {{jwtAccess}}
Content-Type: application/json
{
    "userId": {{user3_id}}
}

HTTP 200

# Get user to check followed
GET {{API_BASE}}/users/{{user3_id}}
Authorization: Bearer {{jwtAccess}}

HTTP 200
[Asserts]
jsonpath "$.followed" == true
jsonpath "$.followersId" isInteger
jsonpath "$.numberOfReadBooks" == 0
jsonpath "$.numberOfFollowing" == 0
jsonpath "$.numberOfFollowers" == 1

# Get user1 to check their stats after following user3
GET {{API_BASE}}/users/{{userId}}
Authorization: Bearer {{jwtAccess}}

HTTP 200
[Asserts]
jsonpath "$.id" == {{userId}}
jsonpath "$.numberOfReadBooks" == 0
jsonpath "$.numberOfFollowing" == 1
jsonpath "$.numberOfFollowers" == 0

# Create a book
POST {{API_BASE}}/books
Authorization: Bearer {{jwtAccess}}
Content-Type: application/json
{
    "title": "0104{{rn}}{{rs}}readBookByUser1",
    "description": "A book user1 will read",
    "author": "0104{{rn}}{{rs}}readAuthor",
    "genre": "0104{{rn}}{{rs}}readGenre",
    "isbn": "9783161484100",
    "numberOfPages": 123,
    "imageUrl": "https://example.com/readbook.png"
}
HTTP 200
[Captures]
bookToReadId: jsonpath "$.id"

# Get user book id
GET {{API_BASE}}/books/private
Authorization: Bearer {{jwtAccess}}
[QueryStringParams]
userId: {{userId}}

HTTP 200
[Captures]
bookToReadId: jsonpath "$.books[0].id"

# Marks this book as read
PATCH {{API_BASE}}/books/private/{{bookToReadId}}
Authorization: Bearer {{jwtAccess}}
Content-Type: application/json
{
    "isRead": true
}
HTTP 200
[Asserts]
jsonpath "$.isRead" == true

# Get user1 (self)
GET {{API_BASE}}/users/{{userId}}
Authorization: Bearer {{jwtAccess}}
HTTP 200
[Asserts]
jsonpath "$.id" == {{userId}}
jsonpath "$.username" == "0104{{rn}}{{rs}}user1"
jsonpath "$.firstName" == "TestFirst104"
jsonpath "$.lastName" == "TestLast104"
jsonpath "$.birthday" == "2020-02-20T00:00:00.000Z"
jsonpath "$.social.instagram" == "https://test.example"
jsonpath "$.social.telegram" == "https://test.example"
jsonpath "$.imageUrl" == "https://test.example"
jsonpath "$.numberOfReadBooks" == 1
jsonpath "$.numberOfFollowing" == 1
jsonpath "$.numberOfFollowers" == 0

# Get user3 (other user)
GET {{API_BASE}}/users/{{user3_id}}
Authorization: Bearer {{jwtAccess}}
HTTP 200
[Asserts]
jsonpath "$.id" == {{user3_id}}
jsonpath "$.username" == "0104{{rn}}{{rs}}user3"
jsonpath "$.followed" == true
jsonpath "$.followersId" isInteger
jsonpath "$.numberOfReadBooks" == 0
jsonpath "$.numberOfFollowing" == 0
jsonpath "$.numberOfFollowers" == 1
