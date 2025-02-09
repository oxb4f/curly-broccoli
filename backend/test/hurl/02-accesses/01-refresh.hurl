# Create user
POST {{API_BASE}}/users
Content-Type: application/json
{
    "username": "0201{{rn}}{{rs}}user1",
    "password": "0201{{rn}}{{rs}}pass1"
}

HTTP 200
[Asserts]
jsonpath "$.id" isInteger
jsonpath "$.accessId" isInteger
jsonpath "$.username" == "0201{{rn}}{{rs}}user1"
jsonpath "$.jwt.access" isString
jsonpath "$.jwt.refresh" isString
[Captures]
accessId: jsonpath "$.accessId"
jwtAccess: jsonpath "$.jwt.access"
refreshToken: jsonpath "$.jwt.refresh"

# Refresh
POST {{API_BASE}}/accesses/{{accessId}}/refresh
Content-Type: application/json
Authorization: Bearer {{jwtAccess}}
{
    "refresh": "{{refreshToken}}"
}

HTTP 200
[Asserts]
jsonpath "$.jwt.access" isString
jsonpath "$.jwt.refresh" isString

# Invalid refresh token
POST {{API_BASE}}/accesses/{{accessId}}/refresh
Content-Type: application/json
Authorization: Bearer {{jwtAccess}}
{
    "refresh": "test"
}

HTTP 401
[Asserts]
jsonpath "$.error.type" == "AUTH"
jsonpath "$.error.payload" exists
