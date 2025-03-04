import { createUser, getUserByUsername } from "../model/usermodel.js"
import { hash, compare} from "bcrypt"
// import { sign } from "jsonwebtoken"
import pkg from 'jsonwebtoken'
const { sign } = pkg

const accessSecret = process.env.ACCESS_TOKEN_SECRET

//add user to db if possible then create auth token
export const signUp = async (req, res) => {
  const username = req.body.username
  if (await getUserByUsername(username)) { return res.status(500).json({ message: "That username already exists"}); }
  const hashedPassword = await hash(req.body.password, 10)
  const email = req.body.email
  const type = "user" //when signing up, only possible type is user
  const result = await createUser(username, hashedPassword, email, type)
  if (result) { //error handling for now, result: boolean
    res = await postAuth(username, type, res)
  } else {
    res.status(500).json({message: "Failed to create user"})
  }
}

//verify login then create auth token
export const login = async (req, res) => {
  const username = req.body.username
  const password = req.body.password
  const targetUser = await getUserByUsername(username)
  if (!targetUser) { res.status(500).json({message: "User does not exist"}) }
  const type = targetUser[0].type
  if (!await compare(password, targetUser[0].hashedPassword)) {
    return res.status(500).json({message: "Incorrect password"})
  }
  console.log(`User ${username} logged in as ${type}`)
  res = await postAuth(username, type, res)
}

//function to create auth token after either login or signup
export const postAuth = async (username, type, res) => {
  const userJWT = { username: username, type: type }
  const accessToken = sign(userJWT, accessSecret)

  return res.status(201).json({ 
    message: `Successfully authenticated as ${type}`, 
    accessToken: accessToken 
  })
}

export const updateProfile = async (req, res) => {
  
}