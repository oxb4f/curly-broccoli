# Create first user
POST {{API_BASE}}/users
Content-Type: application/json
{
    "username": "0701{{rn}}{{rs}}user1",
    "password": "0701{{rn}}{{rs}}pass1"
}

HTTP 200
[Captures]
user1_id: jsonpath "$.id"
user1_jwt_access: jsonpath "$.jwt.access"

# Create second user
POST {{API_BASE}}/users
Content-Type: application/json
{
    "username": "0701{{rn}}{{rs}}user2",
    "password": "0701{{rn}}{{rs}}pass2"
}

HTTP 200
[Captures]
user2_id: jsonpath "$.id"
user2_jwt_access: jsonpath "$.jwt.access"

# Create third user
POST {{API_BASE}}/users
Content-Type: application/json
{
    "username": "0701{{rn}}{{rs}}user3",
    "password": "0701{{rn}}{{rs}}pass3"
}

HTTP 200
[Captures]
user3_id: jsonpath "$.id"
user3_jwt_access: jsonpath "$.jwt.access"

# User 3 follows User 1
POST {{API_BASE}}/followers
Authorization: Bearer {{user3_jwt_access}}
Content-Type: application/json
{
    "userId": {{user1_id}}
}

HTTP 200

# User 1 follows User 2
POST {{API_BASE}}/followers
Authorization: Bearer {{user1_jwt_access}}
Content-Type: application/json
{
    "userId": {{user2_id}}
}

HTTP 200

# User 1 follows User 3
POST {{API_BASE}}/followers
Authorization: Bearer {{user1_jwt_access}}
Content-Type: application/json
{
    "userId": {{user3_id}}
}

HTTP 200

# List events by user 3
GET {{API_BASE}}/events
Authorization: Bearer {{user3_jwt_access}}
[QueryStringParams]
orderField: createdAt
orderDirection: desc
limit: 10

HTTP 200
[Asserts]
jsonpath "$.total" == 2
jsonpath "$.data" count == 2
jsonpath "$.data[*].fromUser" count >= 1
jsonpath "$.data[*].fromUser.id" includes {{user1_id}}
jsonpath "$.data[*].toUserId" includes {{user3_id}}
jsonpath "$.data[*].payload" count >= 1
jsonpath "$.data[0].payload" exists
jsonpath "$.data[*].name" includes "followers.create"

# User 1 add book
POST {{API_BASE}}/books
Authorization: Bearer {{user1_jwt_access}}
Content-Type: application/json
{
    "title": "0701{{rn}}{{rs}}book1",
    "description": "0701{{rn}}{{rs}}description1",
    "author": "0701{{rn}}{{rs}}author1",
    "genre": "0701{{rn}}{{rs}}genre1",
    "isbn": "0701{{rn}}{{rs}}isbn1",
    "numberOfPages": 100,
    "imageUrl": "https://example.com/image1.png"
}

HTTP 200
[Asserts]
jsonpath "$.id" isNumber
jsonpath "$.title" == "0701{{rn}}{{rs}}book1"
jsonpath "$.description" == "0701{{rn}}{{rs}}description1"
jsonpath "$.author" == "0701{{rn}}{{rs}}author1"
jsonpath "$.genre" == "0701{{rn}}{{rs}}genre1"
jsonpath "$.isbn" == "0701{{rn}}{{rs}}isbn1"
jsonpath "$.numberOfPages" == 100
jsonpath "$.imageUrl" == "https://example.com/image1.png"

# List events by user 3
GET {{API_BASE}}/events
Authorization: Bearer {{user3_jwt_access}}
[QueryStringParams]
orderField: createdAt
orderDirection: desc
limit: 10

HTTP 200
[Asserts]
jsonpath "$.total" == 3
jsonpath "$.data" count == 3
jsonpath "$.data[*].fromUser" count >= 1
jsonpath "$.data[*].fromUser.id" includes {{user1_id}}
jsonpath "$.data[*].toUserId" includes {{user3_id}}
jsonpath "$.data[*].payload" count >= 1
jsonpath "$.data[0].payload" exists
jsonpath "$.data[*].name" includes "user_books.add"

# List books
GET {{API_BASE}}/books/private
Authorization: Bearer {{user1_jwt_access}}
[QueryStringParams]
userId: {{user1_id}}

HTTP 200
[Captures]
user1_book_id: jsonpath "$.books[0].id"

# Start reading tracker
POST {{API_BASE}}/books/{{user1_book_id}}/readingTrackers/start
Authorization: Bearer {{user1_jwt_access}}

HTTP 200

# List events by user 3
GET {{API_BASE}}/events
Authorization: Bearer {{user3_jwt_access}}
[QueryStringParams]
orderField: createdAt
orderDirection: desc
limit: 10

HTTP 200
[Asserts]
jsonpath "$.total" == 4
jsonpath "$.data" count == 4
jsonpath "$.data[*].fromUser" count >= 1
jsonpath "$.data[*].fromUser.id" includes {{user1_id}}
jsonpath "$.data[*].toUserId" includes {{user3_id}}
jsonpath "$.data[*].payload" count >= 1
jsonpath "$.data[0].payload" exists
jsonpath "$.data[*].name" includes "reading_trackers.start"
