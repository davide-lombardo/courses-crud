# Courses crud

## Node.Js Project by Davide Lombardo

### REST API for an education provider

## :bookmark_tabs: Index

- [About the project](#floppy_disk-about-the-project)
- [Installation](#inbox_tray-installation) 
- [API Documentation](#mag-api-documentation) 
- [Libraries](#books-libraries) 
- [License](#page_facing_up-license) 
- [Issues](#warning-issues) 
- [Contact Me](#email-contact-me)

## :floppy_disk: About the project
The scope of this project was to create an API to organize and recall the courses provided by the name of the course , the course type or the university in which it takes place. 
The API is based on 3 Schemas: 
- Course type -> defines the type of the course
- University -> contains the name of the University
- Course -> data of the course : name , type, universities that provide it. 

Using the correct [endpoints](#mag-api-documentation) you can Create, Read, Update or Delete (CRUD). Using queries is possible to search through the courses. 

For this course were used Node.Js with Express.Js framework and MongoDB as database. 


## :inbox_tray: Installation

In order to install the API Node.Js is required and you may need an online Database, i suggest MongoDB Atlas. 

- You don't have  Node.Js ? No problem, download it here: [Node.Js](https://nodejs.org/en/download).

- Need an online Database ? Login of create an account on [MongoDB Atlas ](https://www.mongodb.com/atlas/database), create your database, go to Connect -> Drivers and save the connection string provided we will need it later.

After those steps you are all set up

### 1 - Clone the repository 

```
git clone https://github.com/davide-lombardo/courses-crud.git

```

### 2 -  Install the dependencies 

```
npm install
```

### 3 - Start the server

```
npm start
```

### 4 - Connect to your MongoDB 
If it doesn't exist create a `.env` file and insert the environment variables, there is a `.env_example` to help you do it. 

### 5 - Test it with a client
You can use something like Postman([download it here!](https://www.postman.com/downloads/)) or Insomnia, to begin to use the API, simply by typing: 
```
localhost:3000/desiredEndpoint
```

## :mag: API documentation
### Course Type

| Method | Endpoint | Result |
| ------ | -------- | ------ |
| POST| /api/courseTypes/ | create a new course type | 
| PATCH | /api/courseTypes/:id | modify a course type |
| DELETE | /api/courseTypes/:id | delete a course type |
| GET | /api/courseTypes/ | get all course types |
| GET | /api/courseTypes/:id | get a single course type |

### University

| Method | Endpoint | Result |
| ------ | -------- | ------ |
| POST| /api/universities/ | create a new university | 
| PATCH | /api/universities/:id | modify a university |
| DELETE | /api/universities/:id | delete a university |
| GET | /api/universities/ | get all universities |
| GET | /api/universities/:id | get a single university |

### Course

| Method | Endpoint | Result |
| ------ | -------- | ------ |
| POST| /api/courses/ | create a new course | 
| PATCH | /api/courses/:id | modify a course |
| DELETE | /api/courses/:id | delete a course |
| GET | /api/courses/ | get all courses |
| GET | /api/courses/:id | get a single course |

### Queries

| Method | Endpoint | Result |
| ------ | -------- | ------ |
| GET | /api/courses?typeId=example123 | get all courses of a type |
| GET | /api/courses?universityId=example123 | get all courses of a university |
| GET | /api/courses?typeId=example123&universityId=example123 | get all courses of a type in a university |

## :books: Libraries
- [Express.Js](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [Http-Status-Codes](https://github.com/prettymuchbryce/http-status-codes#readme)
- [dotenv](https://github.com/motdotla/dotenv#readme)
- [Validator.js](https://github.com/validatorjs/validator.js)
- [Morgan](https://github.com/expressjs/morgan#readme)
- [Helmet](https://helmetjs.github.io/)
- [express-mongo-sanitize](https://github.com/fiznool/express-mongo-sanitize#readme)
- [Jest](https://jestjs.io/)
- [Supertest](https://github.com/ladjs/supertest#readme)

## :page_facing_up: License

- [MIT](https://choosealicense.com/licenses/mit/)

## :warning: Issues

At the moment the project should run without problems. In case you find some issues let me know!


## :email: Contact me

- My Linkedin Profile: [Linkedin](https://www.linkedin.com/in/lombardo-davide/)

## Node.Js Project by Davide Lombardo

### REST API for an education provider

## :bookmark_tabs: Index

- [About the project](#floppy_disk-about-the-project)
- [Installation](#inbox_tray-installation) 
- [API Documentation](#mag-api-documentation) 
- [Libraries](#books-libraries) 
- [License](#page_facing_up-license) 
- [Issues](#warning-issues) 
- [Contact Me](#email-contact-me)

## :floppy_disk: About the project
The scope of this project was to create an API to organize and recall the courses provided by the name of the course , the course type or the university in which it takes place. 
The API is based on 3 Schemas: 
- Course type -> defines the type of the course
- University -> contains the name of the University
- Course -> data of the course : name , type, universities that provide it. 

Using the correct [endpoints](#mag-api-documentation) you can Create, Read, Update or Delete (CRUD). Using queries is possible to search through the courses. 

For this course were used Node.Js with Express.Js framework and MongoDB as database. 


## :inbox_tray: Installation

In order to install the API Node.Js is required and you may need an online Database, i suggest MongoDB Atlas. 

- You don't have  Node.Js ? No problem, download it here: [Node.Js](https://nodejs.org/en/download).

- Need an online Database ? Login of create an account on [MongoDB Atlas ](https://www.mongodb.com/atlas/database), create your database, go to Connect -> Drivers and save the connection string provided we will need it later.

After those steps you are all set up

### 1 - Clone the repository 

```
git clone https://github.com/davide-lombardo/courses-crud.git

```

### 2 -  Install the dependencies 

```
npm install
```

### 3 - Start the server

```
npm start
```

### 4 - Connect to your MongoDB 
If it doesn't exist create a `.env` file and insert the environment variables, there is a `.env_example` to help you do it. 

### 5 - Test it with a client
You can use something like Postman([download it here!](https://www.postman.com/downloads/)) or Insomnia, to begin to use the API, simply by typing: 
```
localhost:3000/desiredEndpoint
```

## :mag: API documentation
### Course Type

| Method | Endpoint | Result |
| ------ | -------- | ------ |
| POST| /api/courseTypes/ | create a new course type | 
| PATCH | /api/courseTypes/:id | modify a course type |
| DELETE | /api/courseTypes/:id | delete a course type |
| GET | /api/courseTypes/ | get all course types |
| GET | /api/courseTypes/:id | get a single course type |

### University

| Method | Endpoint | Result |
| ------ | -------- | ------ |
| POST| /api/universities/ | create a new university | 
| PATCH | /api/universities/:id | modify a university |
| DELETE | /api/universities/:id | delete a university |
| GET | /api/universities/ | get all universities |
| GET | /api/universities/:id | get a single university |

### Course

| Method | Endpoint | Result |
| ------ | -------- | ------ |
| POST| /api/courses/ | create a new course | 
| PATCH | /api/courses/:id | modify a course |
| DELETE | /api/courses/:id | delete a course |
| GET | /api/courses/ | get all courses |
| GET | /api/courses/:id | get a single course |

### Queries

| Method | Endpoint | Result |
| ------ | -------- | ------ |
| GET | /api/courses?typeId=example123 | get all courses of a type |
| GET | /api/courses?universityId=example123 | get all courses of a university |
| GET | /api/courses?typeId=example123&universityId=example123 | get all courses of a type in a university |

## :books: Libraries
- [Express.Js](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [Http-Status-Codes](https://github.com/prettymuchbryce/http-status-codes#readme)
- [dotenv](https://github.com/motdotla/dotenv#readme)
- [Validator.js](https://github.com/validatorjs/validator.js)
- [Morgan](https://github.com/expressjs/morgan#readme)
- [Helmet](https://helmetjs.github.io/)
- [express-mongo-sanitize](https://github.com/fiznool/express-mongo-sanitize#readme)
- [Jest](https://jestjs.io/)
- [Supertest](https://github.com/ladjs/supertest#readme)

## :page_facing_up: License

- [MIT](https://choosealicense.com/licenses/mit/)

## :warning: Issues

At the moment the project should run without problems. In case you find some issues let me know!


## :email: Contact me

- My Linkedin Profile: [Linkedin](https://www.linkedin.com/in/lombardo-davide/)
