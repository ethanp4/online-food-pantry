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

#### `/register` - POST
Attempt to create an account, authenticates after if successful<br>
Request and response json are the same as `/login`