import { createContext, useState } from 'react';
import { useEffect } from 'react';

//sets up a variable that can be accessed from anywhere in the application
//once declared with the line
//const { token, setToken } = useContext(LoginContext)

const LoginContext = createContext();

const LoginProvider = ({children}) => {
  //set the initial value to whatever is in localstorage (ie page is reloaded)
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem('token');
    return storedToken ? storedToken : "";
  })

  //create an effect to update the localstorage whenever token is changed
  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token])

  //jsx returned in App.jsx
  return (
    <LoginContext.Provider value={{token, setToken}}>
      {children}
    </LoginContext.Provider>
  )
}

export {LoginContext, LoginProvider}