## Usage
1. Run the sql in `create_sample_database.sql` on a mysql database
2. Ensure you have ran `npm i` in both frontend and backend
3. Launch both with `npm run dev`

## Routes

#### `/item` - GET

Returns an array of all items in the database<br>
Example response json:
```
[
	{
		"id": 1,
		"name": "Apple",
		"max_per_person": -1,
		"count": 10
	},
]
```
#### `/addItem` - POST

Add an item to the database<br>
Example request json:
```
{
  name: "Apple",
  quantity: "10"
}
```
#### `/login` - POST

Attempt to authenticate with the backend<br>
Example request json:
```
{
  username: "Jane doe",
  password: "password123"
}
```
Response fields:
```
{
  "message": "Login successful",
  "user": { 
    id: 1,
    username: "Jane doe",
    type: "user"
  },
  "accessToken": ...
}
```

#### /addItem - POST
adds a new item with an automatically set id<br>
requires authorization header, name must be unique<br>
request example
```
{
	"name": "Cheese", 
	"quantity": 222
}
```
response<br>
![image](https://github.com/user-attachments/assets/5e67f622-ee1f-4641-90cd-857548513f96)

if success, returns the newly created item 

#### /editItem/:id - POST
edit one or multiple fields (depending on what is provided in the request) of a specific item by its id<br>
requires authorization header<br>
request example<br>
```
/editItem/3
{
	"name": "Banana",
	"count": 32
}
```
response is modified item<br>
![image](https://github.com/user-attachments/assets/857e8f8c-cf01-4e03-b80c-a3a7f190417e)

#### /deleteItem/:id - DELETE
deletes the specified item<br>
requires authorization header<br>
returns response from db<br>
![image](https://github.com/user-attachments/assets/46ba2e2c-8698-41f8-831d-849a629bdab3)

#### /register - POST
register and return an authorization token<br>
if an admin's authorization token is provided in the header, then "type" can be "admin", otherwise the type field cant be used<br>
example with admin header
```
{ 
	"username": "Not admin",
	"password": "password",
	"type": "admin"
}
```
![image](https://github.com/user-attachments/assets/7988464e-fd64-4128-a1be-7da0b3658bff)

without admin header
``` 
{ 
	"username": "Not admin",
	"password": "password",
}
```
![image](https://github.com/user-attachments/assets/1d05f173-9883-408f-a16f-4379dc2bb020)

#### /users - GET
returns a list of all users<br>
requires authorization header<br>
response<br>
![image](https://github.com/user-attachments/assets/604459dc-3291-4569-9204-855ed2b85e17)

#### /profile - GET
returns the profile of the authorization header that is used<br>
![image](https://github.com/user-attachments/assets/10c62bc8-7b85-4070-a0b2-9730ac9177f1)


