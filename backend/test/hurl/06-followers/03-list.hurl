# Create first user
POST {{API_BASE}}/users
Content-Type: application/json
{
    "username": "0603{{rn}}{{rs}}user1",
    "password": "0603{{rn}}{{rs}}pass1"
}

HTTP 200
[Captures]
user1_id: jsonpath "$.id"
user1_jwt_access: jsonpath "$.jwt.access"

# Create second user
POST {{API_BASE}}/users
Content-Type: application/json
{
    "username": "0603{{rn}}{{rs}}user2",
    "password": "0603{{rn}}{{rs}}pass2"
}

HTTP 200
[Captures]
user2_id: jsonpath "$.id"
user2_jwt_access: jsonpath "$.jwt.access"

# Create third user
POST {{API_BASE}}/users
Content-Type: application/json
{
    "username": "0603{{rn}}{{rs}}user3",
    "password": "0603{{rn}}{{rs}}pass3"
}

HTTP 200
[Captures]
user3_id: jsonpath "$.id"
user3_jwt_access: jsonpath "$.jwt.access"

# User 1 follows User 2
POST {{API_BASE}}/followers
Authorization: Bearer {{user1_jwt_access}}
Content-Type: application/json
{
    "userId": {{user2_id}}
}

HTTP 200

# User 3 follows User 2
POST {{API_BASE}}/followers
Authorization: Bearer {{user3_jwt_access}}
Content-Type: application/json
{
    "userId": {{user2_id}}
}

HTTP 200

# List User 2's followers
GET {{API_BASE}}/followers/followers?userId={{user2_id}}
Authorization: Bearer {{user1_jwt_access}}

HTTP 200
[Asserts]
jsonpath "$.total" == 2
jsonpath "$.data" count == 2
jsonpath "$.data[0].user.id" == {{user2_id}}
jsonpath "$.data[1].user.id" == {{user2_id}}

# List User 1's following
GET {{API_BASE}}/followers/following?userId={{user1_id}}
Authorization: Bearer {{user1_jwt_access}}

HTTP 200
[Asserts]
jsonpath "$.total" == 1
jsonpath "$.data" count == 1
jsonpath "$.data[0].follower.id" == {{user1_id}}
jsonpath "$.data[0].user.id" == {{user2_id}}

# Test with limit and offset
GET {{API_BASE}}/followers/followers?userId={{user2_id}}&limit=1&offset=0
Authorization: Bearer {{user1_jwt_access}}

HTTP 200
[Asserts]
jsonpath "$.total" == 2
jsonpath "$.data" count == 1

# Test with order direction
GET {{API_BASE}}/followers/followers?userId={{user2_id}}&orderDirection=desc
Authorization: Bearer {{user1_jwt_access}}

HTTP 200
[Asserts]
jsonpath "$.total" == 2
jsonpath "$.data" count == 2

# Test for a user with no followers
GET {{API_BASE}}/followers/followers?userId={{user1_id}}
Authorization: Bearer {{user1_jwt_access}}

HTTP 200
[Asserts]
jsonpath "$.total" == 0
jsonpath "$.data" count == 0
