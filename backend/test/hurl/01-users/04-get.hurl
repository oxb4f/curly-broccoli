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
jsonpath "$.social" == null
jsonpath "$.social" == null
jsonpath "$.imageUrl" == null

# User not found with valid access token
GET {{API_BASE}}/users/12345
Authorization: Bearer {{jwtAccess}}

HTTP 404

POST {{API_BASE}}/users
Content-Type: application/json
{
    "username": "0114{{rn}}{{rs}}user2",
    "password": "0114{{rn}}{{rs}}pass2"
}

HTTP 200
[Captures]
jwtAccess2: jsonpath "$.jwt.access"

# User not found with invalid access token
GET {{API_BASE}}/users/{{userId}}
Authorization: Bearer {{jwtAccess2}}

HTTP 404

