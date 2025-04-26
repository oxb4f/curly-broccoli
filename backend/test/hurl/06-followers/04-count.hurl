# Create first user
POST {{API_BASE}}/users
Content-Type: application/json
{
    "username": "0604{{rn}}{{rs}}user1",
    "password": "0604{{rn}}{{rs}}pass1"
}

HTTP 200
[Captures]
user1_id: jsonpath "$.id"
user1_jwt_access: jsonpath "$.jwt.access"

# Create second user
POST {{API_BASE}}/users
Content-Type: application/json
{
    "username": "0604{{rn}}{{rs}}user2",
    "password": "0604{{rn}}{{rs}}pass2"
}

HTTP 200
[Captures]
user2_id: jsonpath "$.id"
user2_jwt_access: jsonpath "$.jwt.access"

# Create third user
POST {{API_BASE}}/users
Content-Type: application/json
{
    "username": "0604{{rn}}{{rs}}user3",
    "password": "0604{{rn}}{{rs}}pass3"
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

# User 2 follows User 1
POST {{API_BASE}}/followers
Authorization: Bearer {{user2_jwt_access}}
Content-Type: application/json
{
    "userId": {{user1_id}}
}

HTTP 200

# Count User 2's followers and following
GET {{API_BASE}}/followers/count?userId={{user2_id}}
Authorization: Bearer {{user1_jwt_access}}

HTTP 200
[Asserts]
jsonpath "$.followersCount" == 2
jsonpath "$.followingCount" == 1

# Count User 1's followers and following
GET {{API_BASE}}/followers/count?userId={{user1_id}}
Authorization: Bearer {{user1_jwt_access}}

HTTP 200
[Asserts]
jsonpath "$.followersCount" == 1
jsonpath "$.followingCount" == 1

# Count User 3's followers and following
GET {{API_BASE}}/followers/count?userId={{user3_id}}
Authorization: Bearer {{user1_jwt_access}}

HTTP 200
[Asserts]
jsonpath "$.followersCount" == 0
jsonpath "$.followingCount" == 1
