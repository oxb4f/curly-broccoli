# Create first user
POST {{API_BASE}}/users
Content-Type: application/json
{
    "username": "0601{{rn}}{{rs}}user1",
    "password": "0601{{rn}}{{rs}}pass1"
}

HTTP 200
[Captures]
user1_id: jsonpath "$.id"
user1_jwt_access: jsonpath "$.jwt.access"

# Create second user
POST {{API_BASE}}/users
Content-Type: application/json
{
    "username": "0601{{rn}}{{rs}}user2",
    "password": "0601{{rn}}{{rs}}pass2"
}

HTTP 200
[Captures]
user2_id: jsonpath "$.id"
user2_jwt_access: jsonpath "$.jwt.access"

# User 1 follows User 2
POST {{API_BASE}}/followers
Authorization: Bearer {{user1_jwt_access}}
Content-Type: application/json
{
    "userId": {{user2_id}}
}

HTTP 200
[Asserts]
jsonpath "$.id" isInteger
jsonpath "$.userId" == {{user2_id}}
jsonpath "$.followerId" == {{user1_id}}

# Try to follow the same user again (should fail)
POST {{API_BASE}}/followers
Authorization: Bearer {{user1_jwt_access}}
Content-Type: application/json
{
    "userId": {{user2_id}}
}

HTTP 422
[Asserts]
jsonpath "$.error.type" == "VALIDATION"
jsonpath "$.error.payload.message" == "Already following"

# Try to follow a non-existent user
POST {{API_BASE}}/followers
Authorization: Bearer {{user1_jwt_access}}
Content-Type: application/json
{
    "userId": 999999
}

HTTP 500
