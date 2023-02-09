import { useState } from 'react'
import Cookies from "universal-cookie"
import axios from "axios"

const Login = ({ setIsAuth }: any) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const cookies = new Cookies()

    const login = (event: any) => {
        event?.preventDefault()

        axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`, {
            username,
            password,
        }).then((res) => {
            console.log('res', res)
            const { token, userId, firstName, lastName, username, hashedPassword } =
                res.data
            cookies.set('token', token)
            cookies.set('userId', userId)
            cookies.set('username', username)
            cookies.set('firstName', firstName)
            cookies.set('lastName', lastName)
            cookies.set('password', hashedPassword)
        })
        setIsAuth(true);
        event.target.reset()
    }
    return (
        <div className="login">
            <label className="login-title">Connexion</label>
            <form onSubmit={login}>
                <input
                    name='username'
                    placeholder="Nom d'utilisateur"
                    onChange={(event) => setUsername(event.target.value)}
                />
                <input
                    name='password'
                    placeholder="Mot de passe"
                    type="password"
                    onChange={(event) => setPassword(event.target.value)}
                />
                <button className="login-form-button" > Valider</button>
            </form>
        </div>
    )
}

export default Login
