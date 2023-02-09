import { useState } from 'react';
import './App.css'
import Cookies from 'universal-cookie'
import { StreamChat } from 'stream-chat'
import { Chat } from "stream-chat-react"

import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'

function App() {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [isAuth, setIsAuth] = useState(false);
  const client = StreamChat.getInstance("j2x5y4tbnv5x")

  if (token) {
    client.connectUser(
      {
        id: cookies.get("userId"),
        name: cookies.get("username"),
        firstName: cookies.get("firstName"),
        lastName: cookies.get("lastName"),
        password: cookies.get("password"),
      },
      token
    )
      .then((user) => {
        setIsAuth(true)
      })
  }

  return (
    <div className="App">
      {
        isAuth ?
          (
            <Chat client={client}>
              <Home />
            </Chat>
          ) :
          <>
            <Register setIsAuth={setIsAuth} />
            <Login setIsAuth={setIsAuth} />
          </>
      }

    </div>
  )
}

export default App
