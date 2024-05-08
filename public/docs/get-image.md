### Description

This endpoint is used to retrieve a specific image by its name. Images with access set to `public` can be accessed by anyone, while images with access set to `private` require a valid API token provided in the request headers as a Bearer token.

#### Request

- Method: GET
- Pathname: `/image/:name`
- Pathname Parameters:
  - `name`: The name of the image.
- Headers?:
  - `Authorization`: Bearer token (API token)

#### Response

The response of this request is the binary image data, with the following additional headers:

- `Content-Type`:
  - Examples: `image/png` `image/jpeg` `image/gif` etc
