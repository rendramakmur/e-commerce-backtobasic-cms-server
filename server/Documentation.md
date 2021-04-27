# BackToBasic CMS Documentation

  BackToBasic CMS is an content management system for BackToBasic ecommerce website.
  
  This REST API has:
  - RESTful endpoint for CRUD operations.
  - JSON formatted response.

  Tech to build this REST API:
  - NodeJS
  - Sequelize
  - PostgreSQL

  ## RESTful endpoints
    User:
    POST /login
    POST /register

    Products:
    POST /products
    GET /products
    GET /products/:id
    PUT /products/:id
    DELETE /products/:id

    Banners:
    POST /banners
    GET /banners
    GET /banners/:id
    PUT /banners/:id
    DELETE /banners/:id

    Carts:
    GET /carts
    POST /carts/:productId
    PATCH /carts/:id
    DELETE /carts/:id

----

# 1. POST /login
**This is login end-point**

* ## URL:

  /login

* ## Method:

  `POST`

*  ## URL Params

    None

*  ## Request Header

    None

* ## Request Body

  **Required:**

  ```
  {
    "email": "<email to get insert into>",
    "password": "<password to get insert into>"
  }
  ```

* ## Success Response:

  * **Code:** 200<br/>
    **Output:**
    ```
    {
      access_token: <generated access token>,
      id: <user id>
      name: <user full_name>,
      email: <user email>,
      role: <user role>
    }
    ```

* ## Error Response:

  * **Code:** 400 Bad Request <br />
    **Output:** 
    ```
    {
      "message": "Email/password is invalid"
    }
    ```

  OR

  * **Code:** 500 Internal Server Error <br />
    **Output:**
    ```
    { "message" : "Internal Server Error" }
    ```

<br />

# 2. POST /register
**This end point let you creat an account.**

* ## URL:

  /register

* ## Method:

  `POST`

*  ## URL Params

  None

*  ## Request Header

  None

* ## Request Body

  **Required:**

  ```
  {
    "full_name": "<full_name to get insert into>",
    "email": "<email to get insert into>",
    "password": "<password to get insert into>"
  }
  ```

* ## Success Response:

  * **Code:** 201<br/>
    **Output:**
    ```
    {
      "id": <given id by system>,
      "full_name": "<posted first_name>",
      "email": "<posted email>"
    }
    ```

* ## Error Response:

  * **Code:** 400 Bad Request <br />
    **Output:** 
    ```
    [
      { "message" : "<validation requirement message>" }
    ]
    ```

  OR

  * **Code:** 500 Internal Server Error <br />
    **Output:**
    ```
    { "message" : "Internal Server Error" }
    ```

<br />

# 3. POST /products
**The function of this route is to create a new product.**

* ## URL:

  /products

* ## Method:

  `POST`

*  ## URL Params

   **Required:**

   None

*  ## Request Header

   **Required:**

   ```
   {
      "headers": "access_token"
   }
   ```

* ## Request Body

  **Required:**

  ```
  {
    "name": "<name to get insert into>",
    "category": "<category to get insert into>",    
    "image_url": "<image_url to get insert into>",
    "price": "<price to get insert into>",
    "stock": "<stock to get insert into>",
    "UserId": "<current user logged in id>"
  }
  ```

* ## Success Response:

  * **Code:** 201<br/>
    **Output:**
    ```
    {
      "id": <given id by system>,
      "name": "<posted name>",
      "category": "<posted category>",
      "image_url": "<posted image_url>",
      "price": "<posted price>",
      "stock": "<posted stock>",
      "UserId": "<posted UserId>",
      "createdAt": "2021-03-20T16:08:30.149Z",
      "updatedAt": "2021-03-20T16:08:30.149Z"
    }
    ```

* ## Error Response:

  * **Code:** 400 Bad Request <br />
    **Output:** 
    ```
    [
      { "message" : "<validation requirement message>" }
    ]
    ```

  OR

  * **Code:** 403 Forbidden <br />
    **Output:** 
    ```
    [
      { "message" : "You are not an admin" }
    ]
    ```

  OR

  * **Code:** 500 Internal Server Error <br />
    **Output:**
    ```
    { "message" : "Internal Server Error" }
    ```

<br />

# 4. GET /products
**This route will show all the products from database.**

* ## URL:

  /products

* ## Method:

  `GET`

*  ## URL Params

   **Required:**

   None

*  ## Request Header

   **Required:**

   ```
   {
      "headers": "access_token"
   }
   ```

* ## Request Body

  **Required:**

  None

* ## Success Response:

  * **Code:** 200<br/>
    **Output:**
    ```
    [
      {
        "id": 1,
        "name": "<product name>",
        "category": "<product category>",
        "image_url": "<product image_url>",
        "price": "<product price>",
        "stock": "<product stock>",
        "UserId": "<product UserId>"
      },
      {
        "id": 2,
        "name": "<product name>",
        "category": "<product category>",
        "image_url": "<product image_url>",
        "price": "<product price>",
        "stock": "<product stock>",
        "UserId": "<product UserId>"
      },
      ...
    ]
    ```

* ## Error Response:

  * **Code:** 500 Internal Server Error <br />
    **Output:**
    ```
    { "message" : "Internal Server Error" }
    ```

<br />

# 5. GET /products/:id
**Main function of this route is getting a spesific product by product id.**

* ## URL:

  /products/:id

* ## Method:

  `GET`

*  ## URL Params

   **Required:**

   "id" = [integer]

*  ## Request Header

   **Required:**

   ```
   {
      "headers": "access_token"
   }
   ```

* ## Request Body

  **Required:**

  None

* ## Success Response:

  * **Code:** 200<br/>
    **Output:**
    ```
    {
      "id": 1,
      "name": "<product name>",
      "category": "<product category>",
      "image_url": "<product image_url>",
      "price": "<product price>",
      "stock": "<product stock>",
      "UserId": "<product UserId>",
      "createdAt": "2021-03-20T16:08:30.149Z",
      "updatedAt": "2021-03-20T16:08:30.149Z"
    }
    ```

* ## Error Response:

  * **Code:** 403 Forbidden <br />
    **Output:** 
    ```
    [
      { "message" : "You are not an admin" }
    ]
    ```

  OR

  * **Code:** 404 Not Found <br />
    **Output:** 
    ```
    [
      { "message": "Product not found!" }
    ]
    ```
  OR

  * **Code:** 500 Internal Server Error <br />
    **Output:**
    ```
    { "message" : "Internal Server Error" }
    ```
<br />

# 6. PUT /products/:id
**The function of this route is updating all the record of the product.**

* ## URL:

  /products/:id

* ## Method:

  `PUT`

*  ## URL Params

   **Required:**

   "id" = [integer]

*  ## Request Header

   **Required:**

   ```
   {
    "headers": "access_token"
   }
   ```

* ## Request Body

  **Required:**

  ```
  {
    "name": "<name to get insert into>",
    "category": "<category to get insert into>",
    "image_url": "<image_url to get insert into>",
    "price": "<price to get insert into>",
    "stock": "<stock to get insert into>"
  }
  ```

* ## Success Response:

  * **Code:** 200<br/>
    **Output:**
    ```
    {
      "id": 1,
      "name": "<updated product name>",
      "category": "<updated product category>",
      "image_url": "<updated product image_url>",
      "price": "<updated product price>",
      "stock": "<updated product stock>",
      "createdAt": "2021-02-20T16:08:30.149Z",
      "updatedAt": "2021-02-20T16:08:30.149Z"
    }
    ```

* ## Error Response:

  * **Code:** 403 Forbidden <br />
    **Output:** 
    ```
    [
      { "message" : "You are not an admin" }
    ]
    ```

  OR

  * **Code:** 400 Bad Request <br />
    **Output:**
    ```
    [
      { "message" : "<validation requirement message>" }
    ]
    ```

  OR

  * **Code:** 404 Not Found <br />
    **Output:**
    ```
    { "message": "Product not found!" }
    ```
  
  OR

  * **Code:** 500 Internal Server Error <br />
    **Output:**
    ```
    { message : "Internal Server Error" }
    ```

<br />

# 7. DELETE /products/:id
**This route will delete the product by product id.**

* ## URL:

  /products/:id

* ## Method:

  `DELETE`

*  ## URL Params

   **Required:**

   "id" = [integer]

*  ## Request Header

   **Required:**

   ```
   {
      "headers": "access_token"
   }
   ```

* ## Request Body

  **Required:**

  None

* ## Success Response:

  * **Code:** 200<br/>
    **Output:**
    ```
    { "message" : 'Success. Product has been deleted' }
    ```

* ## Error Response:

  * **Code:** 403 Forbidden <br />
    **Output:** 
    ```
    [
      { "message" : "You are not an admin" }
    ]
    ```

  OR

  * **Code:** 404 Not Found <br />
    **Output:**
    ```
    { "message": "Product not found!" }
    ```
  
  OR

  * **Code:** 500 Internal Server Error <br />
    **Output:**
    ```
    { "message" : "Internal Server Error" }
    ```

<br />

# 8. POST /banners
**The function of this route is to create a new banner.**

* ## URL:

  /banners

* ## Method:

  `POST`

*  ## URL Params

   **Required:**

   None

*  ## Request Header

   **Required:**

   ```
   {
      "headers": "access_token"
   }
   ```

* ## Request Body

  **Required:**

  ```
  {
    "title": "<title to get insert into>",
    "status": "<status to get insert into>",
    "image_url": "<image_url to get insert into>",
    "UserId": "<current user logged in id>"
  }
  ```

* ## Success Response:

  * **Code:** 201<br/>
    **Output:**
    ```
    {
      "id": <given id by system>,
      "title": "<posted title>",
      "status": "<posted status>",
      "image_url": "<posted image_url>",
      "UserId": "<posted UserId>",
      "createdAt": "2021-03-20T16:08:30.149Z",
      "updatedAt": "2021-03-20T16:08:30.149Z"
    }
    ```

* ## Error Response:

  * **Code:** 400 Bad Request <br />
    **Output:** 
    ```
    [
      { "message" : "<validation requirement message>" }
    ]
    ```

  OR

  * **Code:** 403 Forbidden <br />
    **Output:** 
    ```
    [
      { "message" : "You are not an admin" }
    ]
    ```

  OR

  * **Code:** 500 Internal Server Error <br />
    **Output:**
    ```
    { "message" : "Internal Server Error" }
    ```

<br />

# 9. GET /banners
**This route will show all the banners from database.**

* ## URL:

  /banners

* ## Method:

  `GET`

*  ## URL Params

   **Required:**

   None

*  ## Request Header

   **Required:**

   ```
   {
      "headers": "access_token"
   }
   ```

* ## Request Body

  **Required:**

  None

* ## Success Response:

  * **Code:** 200<br/>
    **Output:**
    ```
    [
      {
        "id": 1,
        "title": "<banner title>",
        "status": "<banner status>",
        "image_url": "<banner image_url>",
        "UserId": "<banner UserId>"
      },
      {
        "id": 2,
        "title": "<banner title>",
        "status": "<banner status>",
        "image_url": "<banner image_url>",
        "UserId": "<banner UserId>"
      },
      ...
    ]
    ```

* ## Error Response:

  * **Code:** 500 Internal Server Error <br />
    **Output:**
    ```
    { "message" : "Internal Server Error" }
    ```

<br />

# 10. GET /banners/:id
**Main function of this route is getting a spesific banner by banner id.**

* ## URL:

  /banners/:id

* ## Method:

  `GET`

*  ## URL Params

   **Required:**

   "id" = [integer]

*  ## Request Header

   **Required:**

   ```
   {
      "headers": "access_token"
   }
   ```

* ## Request Body

  **Required:**

  None

* ## Success Response:

  * **Code:** 200<br/>
    **Output:**
    ```
    {
      "id": 1,
      "name": "<banner name>",
      "status": "<banner status>",
      "image_url": "<banner image_url>",
      "UserId": "<banner UserId>",
      "createdAt": "2021-03-20T16:08:30.149Z",
      "updatedAt": "2021-03-20T16:08:30.149Z"
    }
    ```

* ## Error Response:

  * **Code:** 403 Forbidden <br />
    **Output:** 
    ```
    [
      { "message" : "You are not an admin" }
    ]
    ```

  OR

  * **Code:** 404 Not Found <br />
    **Output:** 
    ```
    [
      { "message": "banner not found!" }
    ]
    ```
  OR

  * **Code:** 500 Internal Server Error <br />
    **Output:**
    ```
    { "message" : "Internal Server Error" }
    ```
<br />

# 11. PUT /banners/:id
**The function of this route is updating all the record of the banner.**

* ## URL:

  /banners/:id

* ## Method:

  `PUT`

*  ## URL Params

   **Required:**

   "id" = [integer]

*  ## Request Header

   **Required:**

   ```
   {
    "headers": "access_token"
   }
   ```

* ## Request Body

  **Required:**

  ```
  {
    "title": "<title to get insert into>",
    "status": "<status to get insert into>",
    "image_url": "<image_url to get insert into>"
  }
  ```

* ## Success Response:

  * **Code:** 200<br/>
    **Output:**
    ```
    {
      "id": 1,
      "title": "<updated banner title>",
      "status": "<updated banner status>",
      "image_url": "<updated banner image_url>",
      "createdAt": "2021-02-20T16:08:30.149Z",
      "updatedAt": "2021-02-20T16:08:30.149Z"
    }
    ```

* ## Error Response:

  * **Code:** 403 Forbidden <br />
    **Output:** 
    ```
    [
      { "message" : "You are not an admin" }
    ]
    ```

  OR

  * **Code:** 400 Bad Request <br />
    **Output:**
    ```
    [
      { "message" : "<validation requirement message>" }
    ]
    ```

  OR

  * **Code:** 404 Not Found <br />
    **Output:**
    ```
    { "message": "Banner not found!" }
    ```
  
  OR

  * **Code:** 500 Internal Server Error <br />
    **Output:**
    ```
    { "message" : "Internal Server Error" }
    ```

<br />

# 12. DELETE /banners/:id
**This route will delete the banner by banner id.**

* ## URL:

  /banners/:id

* ## Method:

  `DELETE`

*  ## URL Params

   **Required:**

   "id" = [integer]

*  ## Request Header

   **Required:**

   ```
   {
      "headers": "access_token"
   }
   ```

* ## Request Body

  **Required:**

  None

* ## Success Response:

  * **Code:** 200<br/>
    **Output:**
    ```
    { "message" : 'Success. Banner has been deleted' }
    ```

* ## Error Response:

  * **Code:** 403 Forbidden <br />
    **Output:** 
    ```
    [
      { "message" : "You are not an admin" }
    ]
    ```

  OR

  * **Code:** 404 Not Found <br />
    **Output:**
    ```
    { "message": "Banner not found!" }
    ```
  
  OR

  * **Code:** 500 Internal Server Error <br />
    **Output:**
    ```
    { "message" : "Internal Server Error" }
    ```

<br />

# 13. GET /carts
**This route will show all the carts from database.**

* ## URL:

  /carts

* ## Method:

  `GET`

*  ## URL Params

   **Required:**

   None

*  ## Request Header

   **Required:**

   ```
   {
      "headers": "access_token"
   }
   ```

* ## Request Body

  **Required:**

  None

* ## Success Response:

  * **Code:** 200<br/>
    **Output:**
    ```
    [
      {
        "id": 1,
        "UserId": "<cart UserId>",
        "ProductId": "<cart ProductId>",
        "quantity": "<cart quantity>",
        "Product": {
          "id": "<product id>",
          "name": "<product name>",
          "category": "<product category>",
          "image_url": "<product image_url>",
          "price": "<product price>",
          "stock": "<product stock>"
        }
      },
      {
        "id": 2,
        "UserId": "<cart UserId>",
        "ProductId": "<cart ProductId>",
        "quantity": "<cart quantity>",
        "Product": {
          "id": "<product id>",
          "name": "<product name>",
          "category": "<product category>",
          "image_url": "<product image_url>",
          "price": "<product price>",
          "stock": "<product stock>"
        }
      }
      ...
    ]
    ```

* ## Error Response:

  * **Code:** 500 Internal Server Error <br />
    **Output:**
    ```
    { "message" : "Internal Server Error" }
    ```

<br />

# 14. POST /carts/productId
**The function of this route is to create a new cart for user.**

* ## URL:

  /carts/:productId

* ## Method:

  `POST`

*  ## URL Params

   **Required:**

   "productId" = [integer]

*  ## Request Header

   **Required:**

   ```
   {
      "headers": "access_token"
   }
   ```

* ## Request Body

  **Required:**

  None

* ## Success Response:

  * **Code:** 201<br/>
    **Output:**
    ```
    {
      "id": <given id by system>,
      "UserId": "<posted UserId>",
      "ProductId": "<posted ProductId>",
      "createdAt": "2021-03-20T16:08:30.149Z",
      "updatedAt": "2021-03-20T16:08:30.149Z"
    }
    ```

* ## Error Response:

  * **Code:** 400 Bad Request <br />
    **Output:** 
    ```
    [
      { "message" : "<validation requirement message>" }
    ]
    ```

  OR

  * **Code:** 403 Forbidden <br />
    **Output:** 
    ```
    [
      { "message" : "You are not an admin" }
    ]
    ```

  OR

  * **Code:** 500 Internal Server Error <br />
    **Output:**
    ```
    { "message" : "Internal Server Error" }
    ```

<br />

# 15. PATCH /carts/:id
**The function of this route is updating quantity the record of the banner.**

* ## URL:

  /carts/:id

* ## Method:

  `PATCH`

*  ## URL Params

   **Required:**

   "id" = [integer]

*  ## Request Header

   **Required:**

   ```
   {
    "headers": "access_token"
   }
   ```

* ## Request Body

  **Required:**

  ```
  {
    "quantity": "<title to get insert into>"
  }
  ```

* ## Success Response:

  * **Code:** 200<br/>
    **Output:**
    ```
    {
      "id": 1,
      "UserId": "<cart UserId>",
      "ProductId": "<cart ProductId>",
      "quantity": "<cart quantity>"
    }
    ```

* ## Error Response:

  * **Code:** 403 Forbidden <br />
    **Output:** 
    ```
    [
      { "message" : "You are not an admin" }
    ]
    ```

  OR

  * **Code:** 400 Bad Request <br />
    **Output:**
    ```
    [
      { "message" : "<validation requirement message>" }
    ]
    ```
  OR

  * **Code:** 400 Bad Request <br />
    **Output:**
    ```
    { "message" : "Current stock left is <product stock left>" }
    ```
    
  OR

  * **Code:** 404 Not Found <br />
    **Output:**
    ```
    { "message": "Banner not found!" }
    ```
  
  OR

  * **Code:** 500 Internal Server Error <br />
    **Output:**
    ```
    { "message" : "Internal Server Error" }
    ```

<br />

# 16. DELETE /carts/:id
**This route will delete the banner by banner id.**

* ## URL:

  /carts/:id

* ## Method:

  `DELETE`

*  ## URL Params

   **Required:**

   "id" = [integer]

*  ## Request Header

   **Required:**

   ```
   {
      "headers": "access_token"
   }
   ```

* ## Request Body

  **Required:**

  None

* ## Success Response:

  * **Code:** 200<br/>
    **Output:**
    ```
    { "message" : 'Success. Cart has been deleted.' }
    ```

* ## Error Response:

  * **Code:** 403 Forbidden <br />
    **Output:** 
    ```
    [
      { "message" : "You are not an admin" }
    ]
    ```

  OR

  * **Code:** 404 Not Found <br />
    **Output:**
    ```
    { "message": "Cart not found!" }
    ```
  
  OR

  * **Code:** 500 Internal Server Error <br />
    **Output:**
    ```
    { "message" : "Internal Server Error" }
    ```

<br />