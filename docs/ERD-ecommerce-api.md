# ERD E-Commerce API

## Storage

- I'll use a NoSQL database (MongoDB). MongoDB is a tool that can manage document-oriented information, store or retrieve information.

## Schema

I'll need at least the following documents to implement the service:

**Users**
| FIELD | TYPE |
|--------|------|
| name | String |
| email | String(unique) |
| profileImage | String |
| password | String |
| confirmPassword | String |
| passwordChangeAt | Date |
| role | String |
| active | Boolean |

<br/>

**Categories**
| FIELD | TYPE |
|--------|------|
| name | String |
| slug | String |

<br/>

**SubCategories**
| FIELD | TYPE |
|--------|------|
| name | String |
| slug | String |
| category | ref(Category) |

<br/>

**Brand**
| FIELD | TYPE |
|--------|------|
| name | String|
| slug | String |
| image | String |

<br/>

**Product**
| FIELD | TYPE |
|--------|------|
| title | String |
| slug | String |
| description | String |
| quantity | Number |
| sold | Number |
| price | Number |
| priceAfterDiscount | Number |
| colors | String |
| imageCover | String |
| images | String |
| category | ref(Category) |
| subcategories | ref(SubCategory) |
| brand | ref(Brand) |
| ratingsAverage | Number |
| ratingsQuantity | Number |

## Server

A simple HTTP server is responsible for authentication, serving stored data, and potentially ingesting and serving analytics data.

- Node.js is selected for implementing the server for speed of development.
- Express.js is the web server framework.
- MongoDB NoSQL database.
- Mongoose as [ORM](https://medium.com/@julianam.tyler/what-is-the-difference-between-odm-and-orm-267bbb7778b0).

### Auth

I'll use JWT to implement authentication and authorization system .

### API

I will build Api as [REST API](https://medium.com/edureka/what-is-rest-api-d26ea9000ee6).

**Auth**

```
/signIn  [POST]
/signUp  [POST]
/signOut [POST]
/forgetPassword [POST]
/resetPassword [POST]
```

## Hosting

The code will be hosted on GitHub.
