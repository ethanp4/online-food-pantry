import { useContext, useReducer, useRef, useState } from "react";
import { LoginContext } from "../components/TokenProvider";
import GenericModal from "../components/GenericModal";

const initialLoginState = {
  username: '',
  password: '',
  isAdmin: false // user / admin in db
}

const initialModalState = {
  title: 'Missing Title',
  desc: 'Missing Description',
  redirect: '' //either empty string for no redirect or a path like '/home'
}

function formReducer(state, action) {
  switch (action.type) {
    case 'updateField':
      return {
        ...state,
        [action.field]: action.value
      }
    case 'reset':
      return initialLoginState
    default:
      return state
  }
}

export default function TestLogin() {
  const {token, setToken} = useContext(LoginContext)
  const modal = useRef();
  const [modalState, setModalState] = useState(initialModalState)
  const [formState, setFormState] = useReducer(formReducer, initialLoginState)

  const [profileInfo, setProfileInfo] = useState([])

  function handleFormChange(e) {
    const { name, type, value, checked } = e.target
    setFormState({
      type: 'updateField',
      field: name,
      //if its a checkbox, then use "checked" instead of "value"
      value: type === 'checkbox' ? checked : value,
    })
  }

  const tryLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/login', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });
  
      const data = await response.json();
      console.log(data)
      if (response.ok) {
        setToken(data.accessToken)
        setModalState({
          title: "Login successful",
          desc: `Welcome: ${data.user.username}`
        })
      } else {
        setModalState({
          title: "Login unsuccessful",
          desc: data.message
        })
      }
    } catch (error) {
      //error making request
      setModalState({
        title: "Login unsuccessful",
        desc: error.message
      })
    } finally {
      //show the modal to display the state of the attempt
      modal.current.showModal();
    }
  }

  const tryRegister = async (e) => {
    e.preventDefault()
    
    try {
      const response = await fetch('http://localhost:5001/register', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });
  
      const data = await response.json();
      console.log(data)
      if (response.ok) {
        setToken(data.accessToken)
        setModalState({
          title: "Registration successful",
          desc: `Welcome: ${data.user.username}`
        })
      } else {
        setModalState({
          title: "Registration unsuccessful",
          desc: data.message
        })
      }
    } catch (error) {
      setModalState({
        title: "Registration unsuccessful",
        desc: error.message
      })
    } finally {
      modal.current.showModal();
    }
  }

  return (
    <div>
      <GenericModal ref={modal} {...modalState} />
      <h3>Test Login</h3>
      <form>
        <input value={formState.username} onChange={handleFormChange} type="text" name="username" placeholder="username"></input><br/>
        <input value={formState.password} onChange={handleFormChange} type="text" name="password" placeholder="password"></input><br/>
        <label>
          Admin: (only for register)
          <input checked={formState.isAdmin} onChange={handleFormChange} type="checkbox" name="isAdmin"/>
        </label><br/>
        <button onClick={(e) => tryRegister(e)}>Register</button>
        <button onClick={(e) => tryLogin(e)}>Login</button>
      </form>
      <button onClick={(e) => tryGetProfile(e)}>Get profile</button>
      <div>
        {profileInfo ? profileInfo : "No profile info"}
      </div>
    </div>
  )
}