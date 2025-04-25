# Create user
POST {{API_BASE}}/users
Content-Type: application/json
{
    "username": "0504{{rn}}{{rs}}user1",
    "password": "0504{{rn}}{{rs}}pass1"
}

HTTP 200
[Captures]
jwtAccess: jsonpath "$.jwt.access"
userId: jsonpath "$.id"

# Create book
POST {{API_BASE}}/books
Authorization: Bearer {{jwtAccess}}
Content-Type: application/json
{
    "title": "0504{{rn}}{{rs}}book1",
    "description": "0504{{rn}}{{rs}}description1",
    "author": "0504{{rn}}{{rs}}author1",
    "genre": "0504{{rn}}{{rs}}genre1",
    "isbn": "0504{{rn}}{{rs}}isbn1",
    "numberOfPages": 100,
    "imageUrl": "https://example.com/image1.png"
}

HTTP 200
[Asserts]
jsonpath "$.id" isNumber
jsonpath "$.title" == "0504{{rn}}{{rs}}book1"
jsonpath "$.description" == "0504{{rn}}{{rs}}description1"
jsonpath "$.author" == "0504{{rn}}{{rs}}author1"
jsonpath "$.genre" == "0504{{rn}}{{rs}}genre1"
jsonpath "$.isbn" == "0504{{rn}}{{rs}}isbn1"
jsonpath "$.numberOfPages" == 100
jsonpath "$.imageUrl" == "https://example.com/image1.png"

# List user books
GET {{API_BASE}}/books/private
Authorization: Bearer {{jwtAccess}}
[QueryStringParams]
userId: {{userId}}

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
jsonpath "$.readingRecords" count == 0
[Captures]
readingTrackerId: jsonpath "$.id"

# Pause reading tracker
POST {{API_BASE}}/books/{{userBookId}}/readingTrackers/{{readingTrackerId}}/pause
Authorization: Bearer {{jwtAccess}}
[Options]
delay: 1000

HTTP 200
[Asserts]
jsonpath "$.readingRecords" count == 1
jsonpath "$.readingRecords[0].id" exists
jsonpath "$.readingRecords[0].createdAt" isString
jsonpath "$.readingRecords[0].duration" >= 1000

# Resume reading tracker
POST {{API_BASE}}/books/{{userBookId}}/readingTrackers/{{readingTrackerId}}/resume
Authorization: Bearer {{jwtAccess}}

HTTP 200
[Asserts]
jsonpath "$.readingRecords" count == 1
jsonpath "$.readingRecords[0].id" exists
jsonpath "$.readingRecords[0].createdAt" isString
jsonpath "$.readingRecords[0].duration" >= 1000

# Pause reading tracker
POST {{API_BASE}}/books/{{userBookId}}/readingTrackers/{{readingTrackerId}}/pause
Authorization: Bearer {{jwtAccess}}
[Options]
delay: 1000

HTTP 200
[Asserts]
jsonpath "$.readingRecords" count == 2
jsonpath "$.readingRecords[0].id" exists
jsonpath "$.readingRecords[0].createdAt" isString
jsonpath "$.readingRecords[0].duration" >= 1000

# Resume reading tracker
POST {{API_BASE}}/books/{{userBookId}}/readingTrackers/{{readingTrackerId}}/resume
Authorization: Bearer {{jwtAccess}}

HTTP 200
[Asserts]
jsonpath "$.readingRecords" count == 2
jsonpath "$.readingRecords[0].id" exists
jsonpath "$.readingRecords[0].createdAt" isString
jsonpath "$.readingRecords[0].duration" >= 1000

# Finish reading tracker
POST {{API_BASE}}/books/{{userBookId}}/readingTrackers/{{readingTrackerId}}/finish
Authorization: Bearer {{jwtAccess}}
[Options]
delay: 1000

HTTP 200
[Asserts]
jsonpath "$.readingRecords" count == 3
jsonpath "$.readingRecords[0].id" exists
jsonpath "$.readingRecords[0].createdAt" isString
jsonpath "$.readingRecords[0].duration" >= 1000
jsonpath "$.state" == "finished"
