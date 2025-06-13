# Create user
POST {{API_BASE}}/users
Content-Type: application/json
{
    "username": "0503{{rn}}{{rs}}user1",
    "password": "0503{{rn}}{{rs}}pass1"
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
    "title": "0503{{rn}}{{rs}}book1",
    "description": "0503{{rn}}{{rs}}description1",
    "author": "0503{{rn}}{{rs}}author1",
    "genre": "0503{{rn}}{{rs}}genre1",
    "isbn": "9780596520786",
    "numberOfPages": 100,
    "imageUrl": "https://example.com/image1.png"
}

HTTP 200
[Asserts]
jsonpath "$.id" isNumber
jsonpath "$.title" == "0503{{rn}}{{rs}}book1"
jsonpath "$.description" == "0503{{rn}}{{rs}}description1"
jsonpath "$.author" == "0503{{rn}}{{rs}}author1"
jsonpath "$.genre" == "0503{{rn}}{{rs}}genre1"
jsonpath "$.isbn" == "9780596520786"
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
jsonpath "$.id" exists
jsonpath "$.id" isInteger
jsonpath "$.userBookId" == {{userBookId}}
jsonpath "$.state" == "reading"
jsonpath "$.finishedAt" == null
[Captures]
readingTrackerId: jsonpath "$.id"

# List reading trackers
GET {{API_BASE}}/books/{{userBookId}}/readingTrackers
Authorization: Bearer {{jwtAccess}}

HTTP 200
[Asserts]
jsonpath "$.trackers" count == 1

# Finish reading tracker
POST {{API_BASE}}/books/{{userBookId}}/readingTrackers/{{readingTrackerId}}/finish
Authorization: Bearer {{jwtAccess}}

HTTP 200
[Asserts]
jsonpath "$.id" exists

# List reading trackers
GET {{API_BASE}}/books/{{userBookId}}/readingTrackers
Authorization: Bearer {{jwtAccess}}
[QueryStringParams]
orderField: createdAt
orderDirection: desc
limit: 1
state: reading

HTTP 200
[Asserts]
jsonpath "$.trackers" count == 0

# Create another reading tracker
POST {{API_BASE}}/books/{{userBookId}}/readingTrackers/start
Authorization: Bearer {{jwtAccess}}

HTTP 200
[Asserts]
jsonpath "$.id" exists

# List reading trackers
GET {{API_BASE}}/books/{{userBookId}}/readingTrackers
Authorization: Bearer {{jwtAccess}}
[QueryStringParams]
orderField: createdAt
orderDirection: desc
limit: 1
state: finished

HTTP 200
[Asserts]
jsonpath "$.total" == 1
jsonpath "$.trackers" count == 1
jsonpath "$.trackers[0].id" == {{readingTrackerId}}
jsonpath "$.trackers[0].userBookId" == {{userBookId}}
jsonpath "$.trackers[0].state" == "finished"
jsonpath "$.trackers[0].finishedAt" != null

# List all reading trackers
GET {{API_BASE}}/books/{{userBookId}}/readingTrackers
Authorization: Bearer {{jwtAccess}}
[QueryStringParams]
orderField: createdAt
orderDirection: desc

HTTP 200
[Asserts]
jsonpath "$.trackers" count == 2
jsonpath "$.total" == 2

# List all trackers with limit
GET {{API_BASE}}/books/{{userBookId}}/readingTrackers
Authorization: Bearer {{jwtAccess}}
[QueryStringParams]
orderField: createdAt
orderDirection: desc
limit: 1

HTTP 200
[Asserts]
jsonpath "$.trackers" count == 1
jsonpath "$.total" == 2

# List all trackers with offset
GET {{API_BASE}}/books/{{userBookId}}/readingTrackers
Authorization: Bearer {{jwtAccess}}
[QueryStringParams]
orderField: createdAt
orderDirection: desc
offset: 1

HTTP 200
[Asserts]
jsonpath "$.trackers" count == 1
jsonpath "$.total" == 2
