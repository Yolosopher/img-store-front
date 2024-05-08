### Description

This endpoint is used to retrieve information about all images.

#### Request

- Method: GET
- Pathname: `/image/all`
- Headers:
  - `Authorization`: Bearer token (API token)
- Query Params:
  - `access`: `public` or `private`

#### Response

The response of this request is a JSON array containing objects with the following schema:

- `_id`: The unique identifier of the image.
- `owner`: The identifier of the user who owns the image.
- `name`: The name of the image.
- `read_access`: The access level of the image (`private`, `public`, etc.).
- `created_at`: The timestamp indicating when the image was created.
