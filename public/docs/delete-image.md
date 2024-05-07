### Description

This endpoint is used to delete an image by providing the image name in the URL.

#### Request

- Method: DELETE
- Pathname: `/image/:name`
- Pathname Parameters:
  - `name`: The name of the image to be deleted.
- Headers:
  - `Authorization`: Bearer token (API token)

#### Response

The response is in JSON format with the following schema:

- Status: 200
- Content-Type: application/json
- `message`: A message indicating the status of the deletion.
- `deleted_image_name`: The name of the image that was deleted.
