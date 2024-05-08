### Description

This endpoint is used to upload an image by providing image file and access type

#### Request

- Method: POST
- Pathname: `/image/upload`
- Content-Type: `multipart/form-data`
- Body Parameters:
  - `access`: The type of access for the uploaded image `public` or `private`.
  - `image`: The image file to be uploaded.
- Headers:
  - `Authorization`: Bearer token (API token)

#### Response

The response of this request is in JSON format with the following schema:

- `message`: A message indicating the status of the upload.
- `image_name`: The name of the uploaded image.
