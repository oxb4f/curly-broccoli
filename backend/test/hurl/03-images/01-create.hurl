# Create user
POST {{API_BASE}}/users
Content-Type: application/json
{
    "username": "0301{{rn}}{{rs}}user1",
    "password": "0301{{rn}}{{rs}}pass1"
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

# Create image with invalid file
POST {{API_BASE}}/images
Authorization: Bearer {{jwtAccess}}
[MultipartFormData]
image: file,invalid-image.bin; application/octet-stream

HTTP 422
[Asserts]
jsonpath "$.error.type" == "VALIDATION"
jsonpath "$.error.payload" exists

# Cannot upload without authorization
POST {{API_BASE}}/images
[MultipartFormData]
image: file,image.png; image/png

HTTP 401
