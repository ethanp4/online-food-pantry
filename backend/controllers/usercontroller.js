import { createUser, getUserByUsername } from "../model/usermodel.js"
import { hash, compare} from "bcrypt"
import pkg from 'jsonwebtoken'
const { sign } = pkg

const accessSecret = process.env.ACCESS_TOKEN_SECRET

//add user to db if possible then create auth token
export const signUp = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(500).json({ message: "Missing username or password" })
  }

  const targetUser = await getUserByUsername(username)
  if (targetUser) { return res.status(500).json({ message: "That username already exists"}); }
  
  const hashedPassword = await hash(req.body.password, 10)
  const type = "user" //when signing up, only possible type is user
  const newUser = await createUser(username, hashedPassword, type)
  if (newUser) { 
    res = await postAuth(newUser, res)
  } else {
    res.status(500).json({message: "Failed to create user"})
  }
}

//verify login then create auth token
export const login = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(500).json({ message: "Missing username or password" })
  }

  const targetUser = await getUserByUsername(username)
  if (!targetUser) { return res.status(500).json({message: "An account with that username doesnt exist"}) }
  if (!await compare(password, targetUser.hashedPassword)) {
    return res.status(500).json({message: "Incorrect password"})
  }
  // console.log(`User ${username} logged in as ${type}`)
  res = await postAuth(targetUser, res)
}

//function to create auth token after either login or signup
export const postAuth = async (user, res) => {
  const { id, username, type } = user
  const userJWT = { username: username, type: type }
  const accessToken = sign(userJWT, accessSecret)
  return res.status(201).json({ 
    message: `Login successful`, 
    user: {
      id: id,
      username: username,
      type: type
    },
    accessToken: accessToken 
  })
}

export const updateProfile = async (req, res) => {
  
}

export const getProfile = async (req, res) => {
  
}