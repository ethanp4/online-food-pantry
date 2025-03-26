import { useContext, useEffect, useReducer, useState } from "react"
import { LoginContext } from "../components/TokenProvider"

function editProfileReducer(state, action) {
  switch (action.type) {
    case 'updateField':
      return {
        ...state,
        [action.field]: action.value
      }
    // case 'reset':
    //   return initialProfileState
    default:
      return state
  }
}

function EditProfile({profile, saveProfile}) {
  const [profileState, setProfileState] = useReducer(editProfileReducer, profile)
  function handleFormChange(e) {
    const { name, value } = e.target
    setProfileState({
      type: 'updateField',
      field: name,
      value: value
    })
  }
  return(
    <div>
      <label>First name: <input name="first_name" onChange={handleFormChange}  type="text" value={profileState.first_name} /></label><br/>
      <label>Last name: <input name="last_name" onChange={handleFormChange} type="text"  value={profileState.last_name} /></label><br/>
      <label>Email: <input name="email" onChange={handleFormChange} type="text" value={profileState.email} /></label><br/>
      <label>Phone number: <input name="phone_number" onChange={handleFormChange} type="text" value={profileState.phone_number} /></label><br/>
      <label>Address: <input name="address" onChange={handleFormChange} type="text" value={profileState.address} /><input name="region" onChange={handleFormChange} type="text" value={profileState.region} /></label><br/>
      <label>Country of origin: <input name="country_of_origin" onChange={handleFormChange} type="text" value={profileState.country_of_origin} /></label><br/>
      <label>Spoken language: <input name="spoken_language" onChange={handleFormChange} type="text" value={profileState.spoken_language} /></label><br/>
      <label>Referrer: <input name="referrer" onChange={handleFormChange} type="text" value={profileState.referrer} /></label>
      <br/><button onClick={(e, profileState) => saveProfile(e, profileState)}>Save Changes</button>
    </div>
  )
}

function DisplayProfile({profile}) {
  return(
    <div>
      <label>First name: <span>{profile.first_name}</span></label><br/>
      <label>Last name: <span>{profile.last_name}</span></label><br/>
      <label>Email: <span>{profile.email}</span></label><br/>
      <label>Phone number: <span>{profile.phone_number}</span></label><br/>
      <label>Address: <span>{profile.address}</span><span>{profile.region}</span></label><br/>
      <label>Country of origin: <span>{profile.country_of_origin}</span></label><br/>
      <label>Spoken language: <span>{profile.spoken_language}</span></label><br/>
      <label>Referrer: <span>{profile.referrer}</span></label><br/>
    </div>
  )
}

export function Profile() {
  const {token, setToken} = useContext(LoginContext)
  const [profile, setProfile] = useState(null)
  const [edit, setEdit] = useState(false)
  
  const getProfile = async () => {
    try {
      const response = await fetch('http://localhost:5001/profile', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        }
      })

      const data = await response.json();
      if (response.ok) {
        console.log("Got profile")
        setProfile(data['profile'])
      } else {
        console.log("Unable to get profile")
      }
    } catch (error) { }
  }

  const saveProfile = async(e, profile) => {
    e.preventDefault()
  }

  useEffect(() => {
    getProfile();
  }, [token]);

  if (!token) return <div>You arent logged in</div>

  if (!profile) return <div>Loading profile..</div>

      // address: "127 Address St"
  // country_of_origin: "France"
  // email: "janedoe@gmail.com"
  // first_name: "Jane"
  // id: 2
  // last_name: "Admin-Doe"
  // phone_number: "555-555-5555"
  // referrer: "France Govt"
  // region: "NW"
  // spoken_language: "French"
  // type: "admin"
  // user_id: 2
  // username: "admin"

  return(
    <div>
      <h3>Welcome {profile.username}</h3>
      <button onClick={ () => setEdit(!edit) }>{!edit ? "Edit profile" : "Cancel"}</button><br/>
      {edit && <EditProfile profile={profile} saveProfile={saveProfile} />}
      {!edit && <DisplayProfile profile={profile} />}
    </div>
  )
}