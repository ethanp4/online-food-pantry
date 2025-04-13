import { useContext, useEffect, useReducer, useState } from "react"
import { LoginContext } from "../components/TokenProvider"
import { useTranslation } from "react-i18next"

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

const emptyProfileState = {
  first_name: null,
  last_name: null,
  email: null,
  phone_number: null,
  address: null,
  region: null,
  country_of_origin: null,
  spoken_language: null,
  referrer: null
}

function EditProfile({profile, setEdit, setProfile}) {
  const { t } = useTranslation()
  const {token} = useContext(LoginContext)
  const [profileState, setProfileState] = useReducer(editProfileReducer, profile)
  function handleFormChange(e) {
    const { name, value } = e.target
    setProfileState({
      type: 'updateField',
      field: name,
      value: value
    })
  }

  const saveProfile = async (e) => {
    e.preventDefault()
    const response = await fetch("http://localhost:5001/updateProfile", {
      method: "POST",
      headers: {
      'Content-Type': 'application/json',
      'Authorization': token
      },
      body: JSON.stringify({
        "first_name": profileState.first_name ? profileState.first_name : null,
        "last_name": profileState.last_name ? profileState.last_name : null,
        "email": profileState.email ? profileState.email : null,
        "phone_number": profileState.phone_number ? profileState.phone_number : null,
        "address": profileState.address ? profileState.address : null,
        "region": profileState.region ? profileState.region : null,
        "country_of_origin": profileState.country_of_origin ? profileState.country_of_origin : null,
        "spoken_language": profileState.spoken_language ? profileState.spoken_language : null,
        "referrer": profileState.referrer ? profileState.referrer : null
      })
    })

    const data = await response.json()
    if (response.ok) {
      console.log("Profile updated")
      setProfile(data.updatedProfile)
      setEdit(false)
    } else {
      console.log("Unable to update profile")
      setEdit(false)
    }
    console.log(data)
  }
  
  return(
    <div>
      <label>{t("profiledetails.firstname")}: <input name="first_name" onChange={handleFormChange}  type="text" value={profileState.first_name} /></label><br/>
      <label>{t("profiledetails.lastname")}: <input name="last_name" onChange={handleFormChange} type="text"  value={profileState.last_name} /></label><br/>
      <label>{t("profiledetails.email")}: <input name="email" onChange={handleFormChange} type="text" value={profileState.email} /></label><br/>
      <label>{t("profiledetails.phone")}: <input name="phone_number" onChange={handleFormChange} type="text" value={profileState.phone_number} /></label><br/>
      <label>{t("profiledetails.address")}: <input name="address" onChange={handleFormChange} type="text" value={profileState.address} /><input name="region" onChange={handleFormChange} type="text" value={profileState.region} /></label><br/>
      <label>{t("profiledetails.country")}: <input name="country_of_origin" onChange={handleFormChange} type="text" value={profileState.country_of_origin} /></label><br/>
      <label>{t("profiledetails.language")}: <input name="spoken_language" onChange={handleFormChange} type="text" value={profileState.spoken_language} /></label><br/>
      <label>{t("profiledetails.referrer")}: <input name="referrer" onChange={handleFormChange} type="text" value={profileState.referrer} /></label>
      <br/><button onClick={(e) => saveProfile(e)}>{t("buttons.save")}</button>
    </div>
  )
}

function DisplayProfile({profile}) {
  const { t } = useTranslation()
  return(
    <div>
      <label>{t("profiledetails.firstname")}: <span>{profile.first_name}</span></label><br/>
      <label>{t("profiledetails.lastname")}: <span>{profile.last_name}</span></label><br/>
      <label>{t("profiledetails.email")}: <span>{profile.email}</span></label><br/>
      <label>{t("profiledetails.phone")}: <span>{profile.phone_number}</span></label><br/>
      <label>{t("profiledetails.address")}: <span>{profile.address}</span><span>{profile.region}</span></label><br/>
      <label>{t("profiledetails.country")}: <span>{profile.country_of_origin}</span></label><br/>
      <label>{t("profiledetails.language")}: <span>{profile.spoken_language}</span></label><br/>
      <label>{t("profiledetails.referrer")}: <span>{profile.referrer}</span></label><br/>
    </div>
  )
}

export function Profile() {
  const { t } = useTranslation()
  const {token} = useContext(LoginContext)
  const [edit, setEdit] = useState(false)
  const [profile, setProfile] = useState(null)
  
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
        setProfile(data)
      } else {
        console.log("Unable to get profile")
        setProfile(emptyProfileState)
      }
    } catch (error) { }
  }

  useEffect(() => {
    getProfile();
  }, [token]);

  if (!token) return <div>{t("notlogged")}</div>

  if (!profile) return <div>{t("loadingprofile")}</div>

  return(
    <div>
      <h3>{t("welcome")}, {profile.username}</h3>
      <button onClick={ () => setEdit(!edit) }>{!edit ? t("buttons.editprofile") : t("buttons.cancel")}</button><br/>
      {edit && <EditProfile profile={profile} setEdit={setEdit} setProfile={setProfile} />}
      {!edit && <DisplayProfile profile={profile} />}
    </div>
  )
}