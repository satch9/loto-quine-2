import React, { useState } from 'react';
import Axios from 'axios';
import Cookies from 'universal-cookie';


const Register = ({ setIsAuth }: any) => {

    const cookies = new Cookies()
    const [user, setUser] = useState({})

    const register = (event: any) => {
        console.log('user', user)
        event?.preventDefault()

        console.log('VITE_API_URL', `${import.meta.env.VITE_API_URL}/api/users/register`)

        Axios.post(`${import.meta.env.VITE_API_URL}/api/users/register`, user).then((res) => {
            console.log('res', res)
            const { token, id, firstName, lastName, username, password } =
                res.data
            cookies.set('token', token)
            cookies.set('userId', id)
            cookies.set('username', username)
            cookies.set('firstName', firstName)
            cookies.set('lastName', lastName)
            cookies.set('password', password)
        })
        setIsAuth(true);
        event.target.reset()
    }

    return (
        <div className="register">
            <label className="register-title">Enregistrement</label>
            <form onSubmit={register}>
                <input
                    placeholder="Nom"
                    name="nom"
                    onChange={(event) => {
                        setUser({ ...user, lastName: event.target.value });
                    }}
                />
                <input
                    placeholder="Prénom"
                    onChange={(event) => {
                        setUser({ ...user, firstName: event.target.value });
                    }}
                />
                <input
                    placeholder="Nom d'utilisateur"
                    onChange={(event) => {
                        setUser({ ...user, username: event.target.value });
                    }}
                />
                <input
                    placeholder="email"
                    onChange={(event) => {
                        setUser({ ...user, email: event.target.value });
                    }}
                    type="email"
                />
                <input
                    placeholder="Mot de passe"
                    type="password"
                    onChange={(event) => {
                        setUser({ ...user, password: event.target.value });
                    }}
                />
                <button className="register-form-button" > Valider</button>
            </form>
        </div>
    )
}

export default Register