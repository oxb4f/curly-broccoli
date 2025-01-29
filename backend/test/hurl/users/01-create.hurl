# Create user
POST {{API_BASE}}/users
Content-Type: application/json
{
    "username": "0101{{rn}}{{rs}}user1",
    "password": "0101{{rn}}{{rs}}pass1"
}

HTTP 200
[Asserts]
jsonpath "$.id" isInteger
jsonpath "$.username" == "0101{{rn}}{{rs}}user1"
jsonpath "$.jwt.access" isString
jsonpath "$.jwt.refresh" isString

# Create duplicate
POST {{API_BASE}}/users
Content-Type: application/json
{
    "username": "0101{{rn}}{{rs}}user1",
    "password": "0101{{rn}}{{rs}}pass1"
}

HTTP 422
[Asserts]
jsonpath "$.error.type" == "DUPLICATED"
jsonpath "$.error.payload" exists

# Invalid body
POST {{API_BASE}}/users
Content-Type: application/json
{
    "username": "",
    "password": ""
}

HTTP 422
[Asserts]
jsonpath "$.error.type" == "VALIDATION"
jsonpath "$.error.payload" exists

# Invalid body
POST {{API_BASE}}/users
Content-Type: application/json
{
    "username": "a",
    "password": "b"
}

HTTP 422
[Asserts]
jsonpath "$.error.type" == "VALIDATION"
jsonpath "$.error.payload" exists
