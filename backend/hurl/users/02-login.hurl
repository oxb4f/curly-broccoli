# Create user
POST {{API_BASE}}/users
Content-Type: application/json
{
    "username": "0102{{rn}}{{rs}}user1",
    "password": "0102{{rn}}{{rs}}pass1"
}

HTTP 200
[Asserts]
jsonpath "$.id" isInteger
jsonpath "$.username" == "0102{{rn}}{{rs}}user1"
jsonpath "$.jwt.access" isString
jsonpath "$.jwt.refresh" isString

# Login
POST {{API_BASE}}/users/login
Content-Type: application/json
{
    "username": "0102{{rn}}{{rs}}user1",
    "password": "0102{{rn}}{{rs}}pass1"
}

HTTP 200
[Asserts]
jsonpath "$.id" isInteger
jsonpath "$.username" == "0102{{rn}}{{rs}}user1"
jsonpath "$.jwt.access" isString
jsonpath "$.jwt.refresh" isString

# Login with invalid credentials
POST {{API_BASE}}/users/login
Content-Type: application/json
{
    "username": "0102{{rn}}{{rs}}userdoesnotexist",
    "password": "0102{{rn}}{{rs}}pass1"
}

HTTP 401
[Asserts]
jsonpath "$.error.type" == "AUTH"
jsonpath "$.error.payload" exists
