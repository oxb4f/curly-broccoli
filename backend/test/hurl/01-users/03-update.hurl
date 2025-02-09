# Create user
POST {{API_BASE}}/users
Content-Type: application/json
{
    "username": "0103{{rn}}{{rs}}user1",
    "password": "0103{{rn}}{{rs}}pass1"
}

HTTP 200
[Asserts]
jsonpath "$.id" isInteger
jsonpath "$.username" == "0103{{rn}}{{rs}}user1"
jsonpath "$.jwt.access" isString
jsonpath "$.jwt.refresh" isString
[Captures]
userId: jsonpath "$.id"
accessId: jsonpath "$.accessId"
jwtAccess: jsonpath "$.jwt.access"
refreshToken: jsonpath "$.jwt.refresh"

# Success update
PATCH {{API_BASE}}/users/{{userId}}
Content-Type: application/json
Authorization: Bearer {{jwtAccess}}
{
    "username": "0103{{rn}}{{rs}}user2",
    "firstName": "TestFirst103",
    "lastName": "TestLast103",
    "birthday": "2020-02-20",
    "social": {
        "telegram": "https://test.example",
        "instagram": "https://test.example"
    },
    "imageUrl": "https://test.example"
}

HTTP 200
[Asserts]
jsonpath "$.id" isInteger
jsonpath "$.username" == "0103{{rn}}{{rs}}user2"
jsonpath "$.firstName" == "TestFirst103"
jsonpath "$.lastName" == "TestLast103"
jsonpath "$.birthday" == "2020-02-20T00:00:00.000Z"
jsonpath "$.social.telegram" == "https://test.example"
jsonpath "$.social.instagram" == "https://test.example"
jsonpath "$.imageUrl" == "https://test.example"

# Update to the same username
PATCH {{API_BASE}}/users/{{userId}}
Content-Type: application/json
Authorization: Bearer {{jwtAccess}}
{
    "username": "0103{{rn}}{{rs}}user2"
}

HTTP 200
[Asserts]
jsonpath "$.username" == "0103{{rn}}{{rs}}user2"

# Cannot update username to null
PATCH {{API_BASE}}/users/{{userId}}
Content-Type: application/json
Authorization: Bearer {{jwtAccess}}
{
    "username": null
}

HTTP 422

# Update firstName and lastName to null
PATCH {{API_BASE}}/users/{{userId}}
Content-Type: application/json
Authorization: Bearer {{jwtAccess}}
{
    "firstName": null,
    "lastName": null
}

HTTP 200
[Asserts]
jsonpath "$.firstName" == null
jsonpath "$.lastName" == null

# Should return not found for non-existing user
PATCH {{API_BASE}}/users/1
Content-Type: application/json
Authorization: Bearer {{jwtAccess}}
{
    "firstName": "TestFirst103"
}

HTTP 404

# Create another user
POST {{API_BASE}}/users
Content-Type: application/json
{
    "username": "0103{{rn}}{{rs}}user3",
    "password": "0103{{rn}}{{rs}}pass3"
}

HTTP 200
[Captures]
userId1: jsonpath "$.id"

# Update username to existing value
PATCH {{API_BASE}}/users/{{userId}}
Content-Type: application/json
Authorization: Bearer {{jwtAccess}}
{
    "username": "0103{{rn}}{{rs}}user3"
}

HTTP 422

# Update another user
PATCH {{API_BASE}}/users/{{userId1}}
Content-Type: application/json
Authorization: Bearer {{jwtAccess}}
{
    "username": "0103{{rn}}{{rs}}user3"
}

HTTP 404

# Cannot set nullable username
PATCH {{API_BASE}}/users/{{userId}}
Content-Type: application/json
Authorization: Bearer {{jwtAccess}}
{
    "username": null
}

HTTP 422

# Social cannot be null
PATCH {{API_BASE}}/users/{{userId}}
Content-Type: application/json
Authorization: Bearer {{jwtAccess}}
{
    "social": null
}

HTTP 422

# Social can accept object with null values
PATCH {{API_BASE}}/users/{{userId}}
Content-Type: application/json
Authorization: Bearer {{jwtAccess}}
{
    "social": {
        "instagram": null,
        "telegram": null
    }
}

HTTP 200
[Asserts]
jsonpath "$.social.instagram" == null
jsonpath "$.social.telegram" == null

# Social can be updated with one value at a time
PATCH {{API_BASE}}/users/{{userId}}
Content-Type: application/json
Authorization: Bearer {{jwtAccess}}
{
    "social": {
        "instagram": "https://test.example"
    }
}

HTTP 200
[Asserts]
jsonpath "$.social.instagram" == "https://test.example"

# Birthday should be a valid date
PATCH {{API_BASE}}/users/{{userId}}
Content-Type: application/json
Authorization: Bearer {{jwtAccess}}
{
    "birthday": "test"
}

HTTP 422

# Birthday should be a valid date
PATCH {{API_BASE}}/users/{{userId}}
Content-Type: application/json
Authorization: Bearer {{jwtAccess}}
{
    "birthday": "2020-02-20T00:00:00.000Z"
}

HTTP 200

# Birthday can be null
PATCH {{API_BASE}}/users/{{userId}}
Content-Type: application/json
Authorization: Bearer {{jwtAccess}}
{
    "birthday": null
}

HTTP 200
