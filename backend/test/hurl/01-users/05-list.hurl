# Create first user
POST {{API_BASE}}/users
Content-Type: application/json
{
    "username": "0105{{rn}}{{rs}}user1",
    "password": "0105{{rn}}{{rs}}pass1"
}

HTTP 200
[Asserts]
jsonpath "$.id" isInteger
jsonpath "$.username" == "0105{{rn}}{{rs}}user1"
jsonpath "$.jwt.access" isString
jsonpath "$.jwt.refresh" isString
[Captures]
user1_id: jsonpath "$.id"
user1_jwt_access: jsonpath "$.jwt.access"

# Create second user
POST {{API_BASE}}/users
Content-Type: application/json
{
    "username": "0105{{rn}}{{rs}}user2",
    "password": "0105{{rn}}{{rs}}pass2"
}

HTTP 200
[Asserts]
jsonpath "$.id" isInteger
jsonpath "$.username" == "0105{{rn}}{{rs}}user2"
jsonpath "$.jwt.access" isString
jsonpath "$.jwt.refresh" isString
[Captures]
user2_id: jsonpath "$.id"
user2_jwt_access: jsonpath "$.jwt.access"

# Create third user
POST {{API_BASE}}/users
Content-Type: application/json
{
    "username": "0105{{rn}}{{rs}}user3",
    "password": "0105{{rn}}{{rs}}pass3"
}

HTTP 200
[Asserts]
jsonpath "$.id" isInteger
jsonpath "$.username" == "0105{{rn}}{{rs}}user3"
jsonpath "$.jwt.access" isString
jsonpath "$.jwt.refresh" isString
[Captures]
user3_id: jsonpath "$.id"
user3_jwt_access: jsonpath "$.jwt.access"

# Create fourth user
POST {{API_BASE}}/users
Content-Type: application/json
{
    "username": "0105{{rn}}{{rs}}user4",
    "password": "0105{{rn}}{{rs}}pass4"
}

HTTP 200
[Asserts]
jsonpath "$.id" isInteger
jsonpath "$.username" == "0105{{rn}}{{rs}}user4"
jsonpath "$.jwt.access" isString
jsonpath "$.jwt.refresh" isString
[Captures]
user4_id: jsonpath "$.id"
user4_jwt_access: jsonpath "$.jwt.access"

# User 1 follows User 2
POST {{API_BASE}}/followers
Authorization: Bearer {{user1_jwt_access}}
Content-Type: application/json
{
    "userId": {{user2_id}}
}

HTTP 200

# Get all users visible to user1
# This might include recommended users based on reading activity
GET {{API_BASE}}/users
Authorization: Bearer {{user1_jwt_access}}

HTTP 200
[Asserts]
jsonpath "$.users" isCollection
# Must contain at least user2 (followed)
jsonpath "$.users[*].id" includes {{user2_id}}
# Check if user2 has followed=true
jsonpath "$.users[?(@.id=={{user2_id}})].followed" includes true
# Check total count
jsonpath "$.total" isInteger

# User 1 gets recommendations which may include user3 (not followed)
GET {{API_BASE}}/users
Authorization: Bearer {{user1_jwt_access}}

HTTP 200
[Asserts]
jsonpath "$.users" isCollection
# Check if response includes user3 with followed=false
jsonpath "$.users[?(@.id=={{user3_id}})].followed" includes false

# Test with limit and offset parameters
GET {{API_BASE}}/users?limit=2&offset=0
Authorization: Bearer {{user1_jwt_access}}

HTTP 200
[Asserts]
jsonpath "$.users" isCollection
jsonpath "$.users[*]" count <= 2
jsonpath "$.total" isInteger

# Test with ordering parameters
GET {{API_BASE}}/users?orderDirection=desc&orderField=id
Authorization: Bearer {{user1_jwt_access}}

HTTP 200
[Asserts]
jsonpath "$.users" isCollection
jsonpath "$.total" isInteger

# User 4 follows User 1
POST {{API_BASE}}/followers
Authorization: Bearer {{user4_jwt_access}}
Content-Type: application/json
{
    "userId": {{user1_id}}
}

HTTP 200

# User 4 follows User 2
POST {{API_BASE}}/followers
Authorization: Bearer {{user4_jwt_access}}
Content-Type: application/json
{
    "userId": {{user2_id}}
}

HTTP 200

# User 1 follows User 4
POST {{API_BASE}}/followers
Authorization: Bearer {{user1_jwt_access}}
Content-Type: application/json
{
    "userId": {{user4_id}}
}

HTTP 200

# Get user list for user1 - should see followed users
GET {{API_BASE}}/users
Authorization: Bearer {{user1_jwt_access}}

HTTP 200
[Asserts]
jsonpath "$.users" isCollection
# Check user2 is followed
jsonpath "$.users[?(@.id=={{user2_id}})].followed" includes true
# Check user4 is followed
jsonpath "$.users[?(@.id=={{user4_id}})].followed" includes true
# Check if user3 appears, it should not be followed
jsonpath "$.users[?(@.id=={{user3_id}})].followed" includes false

# Test with invalid auth token
GET {{API_BASE}}/users
Authorization: Bearer invalid_token

HTTP 401

# Test with missing auth token
GET {{API_BASE}}/users

HTTP 401
