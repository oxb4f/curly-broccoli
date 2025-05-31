# Create user 1
POST {{API_BASE}}/users
Content-Type: application/json
{
    "username": "0106{{rn}}{{rs}}needless",
    "password": "0106{{rn}}{{rs}}pass1"
}

HTTP 200
[Asserts]
jsonpath "$.id" isInteger
jsonpath "$.username" == "0106{{rn}}{{rs}}needless"
jsonpath "$.jwt.access" isString
jsonpath "$.jwt.refresh" isString
[Captures]
userId1: jsonpath "$.id"
jwtAccess: jsonpath "$.jwt.access"

# Success update user 1
PATCH {{API_BASE}}/users/{{userId1}}
Content-Type: application/json
Authorization: Bearer {{jwtAccess}}
{
    "firstName": "Artdain",
    "lastName": "Dry5Tune",
    "imageUrl": "https://example.com/image.jpg"
}

HTTP 200
[Asserts]
jsonpath "$.id" isInteger
jsonpath "$.firstName" == "Artdain"
jsonpath "$.lastName" == "Dry5Tune"
jsonpath "$.imageUrl" == "https://example.com/image.jpg"

# Create user 2
POST {{API_BASE}}/users
Content-Type: application/json
{
    "username": "0106{{rn}}{{rs}}thomasNeNevada",
    "password": "0106{{rn}}{{rs}}pass1"
}

HTTP 200
[Asserts]
jsonpath "$.id" isInteger
jsonpath "$.username" == "0106{{rn}}{{rs}}thomasNeNevada"
jsonpath "$.jwt.access" isString
jsonpath "$.jwt.refresh" isString
[Captures]
userId2: jsonpath "$.id"

# Create user 3
POST {{API_BASE}}/users
Content-Type: application/json
{
    "username": "0106{{rn}}{{rs}}edwardcreatine",
    "password": "0106{{rn}}{{rs}}pass1"
}

HTTP 200
[Asserts]
jsonpath "$.id" isInteger
jsonpath "$.username" == "0106{{rn}}{{rs}}edwardcreatine"
jsonpath "$.jwt.access" isString
jsonpath "$.jwt.refresh" isString
[Captures]
userId3: jsonpath "$.id"

# Quick search by username
GET {{API_BASE}}/users/quick-search?term=need
Authorization: Bearer {{jwtAccess}}

HTTP 200
[Asserts]
jsonpath "$.users[0].username" contains "needless"

# Quick search by username
GET {{API_BASE}}/users/quick-search?term=creati
Authorization: Bearer {{jwtAccess}}

HTTP 200
[Asserts]
jsonpath "$.users[0].username" contains "creati"

# Quick search by last name
GET {{API_BASE}}/users/quick-search?term=Dry5Tune
Authorization: Bearer {{jwtAccess}}

HTTP 200
[Asserts]
jsonpath "$.users[0].lastName" == "Dry5Tune"
jsonpath "$.users[0].imageUrl" == "https://example.com/image.jpg"

# Quick search by username
GET {{API_BASE}}/users/quick-search?term=Nevada
Authorization: Bearer {{jwtAccess}}

HTTP 200
[Asserts]
jsonpath "$.users[0].username" contains "Nevada"
jsonpath "$.users[0].imageUrl" == null
