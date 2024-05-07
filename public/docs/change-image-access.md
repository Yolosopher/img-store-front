### Description

This endpoint is used to change the access level of an image by its name.

#### Request

- Method: PATCH
- Pathname: `/image/:name`
- Parameters:
  - `name`: The name of the image whose access level needs to be changed.
- Headers:
  - `Authorization`: Bearer token (API token)

#### Response

The response of this request is in JSON format with the following schema:

- `message`: A message indicating the status of the access change.
- `image_name`: The name of the image whose access level was changed.
- `new_access`: The new access level of the image.
