# Create first user
POST {{API_BASE}}/users
Content-Type: application/json
{
    "username": "0602{{rn}}{{rs}}user1",
    "password": "0602{{rn}}{{rs}}pass1"
}

HTTP 200
[Captures]
user1_id: jsonpath "$.id"
user1_jwt_access: jsonpath "$.jwt.access"

# Create second user
POST {{API_BASE}}/users
Content-Type: application/json
{
    "username": "0602{{rn}}{{rs}}user2",
    "password": "0602{{rn}}{{rs}}pass2"
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
[Captures]
follow_id: jsonpath "$.id"

# User 1 unfollows User 2
DELETE {{API_BASE}}/followers?id={{follow_id}}
Authorization: Bearer {{user1_jwt_access}}

HTTP 200
[Asserts]
jsonpath "$.result" == true

# Try to unfollow again with the same ID (should fail)
DELETE {{API_BASE}}/followers?id={{follow_id}}
Authorization: Bearer {{user1_jwt_access}}

HTTP 404
[Asserts]
jsonpath "$.error.type" == "NOT_FOUND"

# Try to unfollow with invalid ID
DELETE {{API_BASE}}/followers?id=999999
Authorization: Bearer {{user1_jwt_access}}

HTTP 404
[Asserts]
jsonpath "$.error.type" == "NOT_FOUND"
