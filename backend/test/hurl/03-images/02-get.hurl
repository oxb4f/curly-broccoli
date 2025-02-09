# Create user
POST {{API_BASE}}/users
Content-Type: application/json
{
    "username": "0302{{rn}}{{rs}}user2",
    "password": "0302{{rn}}{{rs}}pass2"
}

HTTP 200
[Captures]
jwtAccess: jsonpath "$.jwt.access"

# Create image
POST {{API_BASE}}/images
Authorization: Bearer {{jwtAccess}}
[MultipartFormData]
image: file,image.png; image/png

HTTP 200
[Asserts]
jsonpath "$.url" isString
[Captures]
imageUrl: jsonpath "$.url"

# Get image
GET {{imageUrl}}

HTTP 200

# API Image not found
GET {{API_BASE}}/images/12345

HTTP 404
