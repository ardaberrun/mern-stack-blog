# Mern Stack Blog

Express, Mongodb, Mongoose are used to built the server-side and React is used to built client-side but this project not completed yet :warning: .

### Todo

- [ ] Authentication



### Done ✓

- [x] Create a blog that can perform CRUD transactions.
- [x] Add some css to the login page
- [x] Filter by category 
- [x] Render blog posts as markdown
- [x] Markdown previewer
- [x] Pagination
- [x] Add about page
- [x] Get the picture and text of the about page with the api request.


## Getting started

1. Clone the repo.
2. Install dependencies on both server side and client side
3. Add the .env file to the root directory of both the server file and the client file. Secret login page path and secret api url is kept in .env file on client side. For example ,
```
   REACT_APP_SECRET_PAGE = secretlogin
   REACT_APP_SECRET_URL =  http://localhost:5000/
```  
MONGO_URI , PORT, SECRET_ADMIN_USERNAME, SECRET_ADMIN_PASSWORD is kept in .env file on server side. For example, 
```
MONGO_URI = mongodb+srv://<username>:<password>@cluster0.xicfl.mongodb.net/<dbname>?retryWrites=true&w=majority
PORT = 5000
SECRET_ADMIN_USERNAME = admin
SECRET_ADMIN_PASSWORD = 12345 
// I will perform the authentication procedures in the future using SECRET_ADMIN_USERNAME and SECRET_ADMIN_PASSWORD .
```
4. Start the server and client.
