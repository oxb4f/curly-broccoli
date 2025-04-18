# Create user
POST {{API_BASE}}/users
Content-Type: application/json
{
    "username": "0502{{rn}}{{rs}}user1",
    "password": "0502{{rn}}{{rs}}pass1"
}

HTTP 200
[Captures]
jwtAccess: jsonpath "$.jwt.access"

# Create book
POST {{API_BASE}}/books
Authorization: Bearer {{jwtAccess}}
Content-Type: application/json
{
    "title": "0502{{rn}}{{rs}}book1",
    "description": "0502{{rn}}{{rs}}description1",
    "author": "0502{{rn}}{{rs}}author1",
    "genre": "0502{{rn}}{{rs}}genre1",
    "isbn": "0502{{rn}}{{rs}}isbn1",
    "numberOfPages": 100,
    "imageUrl": "https://example.com/image1.png"
}

HTTP 200
[Asserts]
jsonpath "$.id" isNumber
jsonpath "$.title" == "0502{{rn}}{{rs}}book1"
jsonpath "$.description" == "0502{{rn}}{{rs}}description1"
jsonpath "$.author" == "0502{{rn}}{{rs}}author1"
jsonpath "$.genre" == "0502{{rn}}{{rs}}genre1"
jsonpath "$.isbn" == "0502{{rn}}{{rs}}isbn1"
jsonpath "$.numberOfPages" == 100
jsonpath "$.imageUrl" == "https://example.com/image1.png"

# List user books
GET {{API_BASE}}/books/private
Authorization: Bearer {{jwtAccess}}

HTTP 200
[Asserts]
jsonpath "$.books" count >= 1
[Captures]
userBookId: jsonpath "$.books[0].id"

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
[Captures]
readingTrackerId: jsonpath "$.id"

# Change state to paused
POST {{API_BASE}}/books/{{userBookId}}/readingTrackers/{{readingTrackerId}}/pause
Authorization: Bearer {{jwtAccess}}

HTTP 200
[Asserts]
jsonpath "$.id" exists
jsonpath "$.id" isInteger
jsonpath "$.userBookId" == {{userBookId}}
jsonpath "$.state" == "paused"
jsonpath "$.finishedAt" != null

# Resume reading tracker
POST {{API_BASE}}/books/{{userBookId}}/readingTrackers/{{readingTrackerId}}/resume
Authorization: Bearer {{jwtAccess}}

HTTP 200
[Asserts]
jsonpath "$.id" exists
jsonpath "$.id" isInteger
jsonpath "$.userBookId" == {{userBookId}}
jsonpath "$.state" == "reading"
jsonpath "$.finishedAt" == null

# Change state to finished
POST {{API_BASE}}/books/{{userBookId}}/readingTrackers/{{readingTrackerId}}/finish
Authorization: Bearer {{jwtAccess}}

HTTP 200
[Asserts]
jsonpath "$.id" exists
jsonpath "$.id" isInteger
jsonpath "$.userBookId" == {{userBookId}}
jsonpath "$.state" == "finished"
jsonpath "$.finishedAt" isString

# Cannot change state from finished to paused
POST {{API_BASE}}/books/{{userBookId}}/readingTrackers/{{readingTrackerId}}/pause
Authorization: Bearer {{jwtAccess}}

HTTP 409

# Cannot change state from finished to reading
POST {{API_BASE}}/books/{{userBookId}}/readingTrackers/{{readingTrackerId}}/resume
Authorization: Bearer {{jwtAccess}}

HTTP 409
