import {hash} from "bcrypt"

console.log(await hash("asdf", 10))