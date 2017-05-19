# CRUDNS

`CRUDNS is a self hosted open source DNS platform which consist of a web based
interface and a REST API. This will facilitate Individuals/Organizations with easy
management of zone records through a web interface and remotely via a REST API.
Initially this platform supports “BIND” backend.`

## API Documentation

**Show Records**
----
  Returns json data about all the Records in a Domain.

* **URL**

  api/v1/dashboard/records/:domain/

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `domain=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[
  {
    "id": 25,
    "zone": "google.com",
    "ttl": 3600,
    "type": "CNAME",
    "host": "blog",
    "mx_priority": null,
    "data": "domains.tumblr.com.",
    "primary_ns": null,
    "resp_person": null,
    "serial": null,
    "refresh": null,
    "retry": null,
    "expire": null,
    "minimum": null,
    "domain": 3
  }
]`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{
  "non_field_errors": [
    "Server Error. Please try again later."
  ]
}`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "api/v1/dashboard/records/google.com/",
      dataType: "json",
      type : "GET",
      headers: {
                Accept: 'application/json',
                Authorization: `Token ${token}`
            },
      success : function(r) {
        console.log(r);
      }
    });
  ```
 
**Show Record**
----
  Returns json data about a Records in a Domain.

* **URL**

  api/v1/dashboard/dns/:id/

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
  "id": 26,
  "domain": "google.com",
  "zone": "google.com",
  "ttl": 3600,
  "type": "CNAME",
  "host": "www",
  "mx_priority": null,
  "data": "ghs.google.com.",
  "primary_ns": null,
  "resp_person": null,
  "serial": null,
  "refresh": null,
  "retry": null,
  "expire": null,
  "minimum": null
}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{
  "non_field_errors": [
    "Server Error. Please try again later."
  ]
}`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "api/v1/dashboard/dns/26/",
      dataType: "json",
      type : "GET",
      headers: {
                Accept: 'application/json',
                Authorization: `Token ${token}`
            },
      success : function(r) {
        console.log(r);
      }
    });
  ```
  
**Update Record**
----
  Update a Records in a Domain.

* **URL**

  api/v1/dashboard/dns/:id/

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
  "id": 26,
  "domain": "google.com",
  "zone": "google.com",
  "ttl": 180,
  "type": "CNAME",
  "host": "www",
  "mx_priority": null,
  "data": "ghs.google.com.",
  "primary_ns": null,
  "resp_person": null,
  "serial": null,
  "refresh": null,
  "retry": null,
  "expire": null,
  "minimum": null
}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{
  "non_field_errors": [
    "Server Error. Please try again later."
  ]
}`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "api/v1/dashboard/dns/26/",
      dataType: "json",
      type : "POST",
      data : {
              "id": 26,
              "domain": "google.com",
              "zone": "google.com",
              "ttl": 180,
              "type": "CNAME",
              "host": "www",
              "mx_priority": null,
              "data": "ghs.google.com.",
              "primary_ns": null,
              "resp_person": null,
              "serial": null,
              "refresh": null,
              "retry": null,
              "expire": null,
              "minimum": null
              },
      headers: {
                Accept: 'application/json',
                Authorization: `Token ${token}`
            },
      success : function(r) {
        console.log(r);
      }
    });
  ```

