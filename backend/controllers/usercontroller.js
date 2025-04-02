import { createUser, getUserByUsername, getProfileByUsername, getProfileById, setUserProfileById } from "../model/usermodel.js"
import { compare } from "bcrypt"
import pkg from 'jsonwebtoken'
import { getUserById } from "./admincontroller.js"
const { sign, verify } = pkg

const accessSecret = process.env.ACCESS_TOKEN_SECRET

//add user to db if possible then create auth token
export const signUp = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(500).json({ message: "Missing username or password" })
  }

  const targetUser = await getUserByUsername(username)
  if (targetUser) { return res.status(500).json({ message: "That username already exists" }); }

  const accessToken = req.headers.authorization
  let type = "user" //default type
  let authorized = false

  //apply the type if the request was made by an admin
  if (accessToken) {
    try {
      const tokenType = verify(accessToken, accessSecret)['type']
      console.log(tokenType)
      console.log(req.body)
      if (tokenType === "admin") { authorized = true }
      if (authorized && req.body.type) {
        if (req.body.type == "admin" || req.body.type == "user") {
          type = req.body.type
        } else {
          return res.status(500).json({ message: "Invalid type" })
        }
      }
    } catch (err) { }
  }

  //create the user
  const newUser = await createUser(username, password, type)
  if (newUser) {
    //if the request was made by an admin, then postAuth is skipped 
    if (authorized) {
      return res.status(200).json({
        message: "Successfully created admin",
        user: {
          id: newUser.id,
          username: newUser.username,
          password: password,
          type: newUser.type
        }
      })
    } else {
      res = await postAuth(newUser, res)
    }
  } else {
    res.status(500).json({ message: "Failed to create user" })
  }
}

//verify login then create auth token
export const login = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(500).json({ message: "Missing username or password" })
  }

  const targetUser = await getUserByUsername(username)
  if (!targetUser) { return res.status(500).json({ message: "An account with that username doesnt exist" }) }
  if (!await compare(password, targetUser.hashedPassword)) {
    return res.status(500).json({ message: "Incorrect password" })
  }
  // console.log(`User ${username} logged in as ${type}`)
  res = await postAuth(targetUser, res)
}

//function to create auth token after either login or signup
export const postAuth = async (user, res) => {
  const { id, username, type } = user
  const userJWT = { id: id, username: username, type: type }
  const accessToken = sign(userJWT, accessSecret)
  return res.status(201).json({
    message: `Login successful`,
    user: userJWT,
    accessToken: accessToken
  })
}

export const updateProfile = async (req, res) => {
  const accessToken = req.headers.authorization
  if (!accessToken) { return res.status(500).json({ message: "Unauthorized" }) }
  try {
    const { id } = verify(accessToken, accessSecret)
    // let targetProfile = await getProfileById(id)
    // if (!targetProfile) { return res.status(500).json({ message: "Unauthorized" }) }
    const validKeys = ["first_name", "last_name", "email", "phone_number", "address", "region", "country_of_origin", "spoken_language", "referrer"]

    //check if keys are valid, modifying the profile object as it goes
    for (var key in req.body) {
      if (!validKeys.includes(key)) {
        return res.status(500).json({ message: "Invalid key: " + key })
      } 
    }

    //if all keys were valid, then finally set the profile
    const updatedProfile = await setUserProfileById(id, req.body)
    if (updatedProfile) {
      res.status(200).json({ message: "Profile updated", updatedProfile})
    } else {
      res.status(500).json({ message: "Failed to update profile" })
    }
  } catch (err) {
    res.status(500).json({ message: "Unauthorized" })
  }
}

export const getProfile = async (req, res) => {
  const accessToken = req.headers.authorization
  if (!accessToken) { return res.status(500).json({ message: "Unauthorized" }) }
  try {
    const { username } = verify(accessToken, accessSecret)
    const targetUser = await getProfileByUsername(username)
    if (!targetUser) { return res.status(500).json({ message: "User not found" }) }
    return res.status(200).json({ ...targetUser })
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Unauthorized" })
    } else {
      return res.status(500).json({ message: "Failed to get profile" })
    }
  }
}
