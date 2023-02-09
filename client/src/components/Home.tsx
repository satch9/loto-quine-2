import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className="home">
            <div className="newGame">
                <Link to="/settings">Nouvelle partie</Link>
            </div>
            <div className="listGame">
                <Link to="#">Liste des parties</Link>
            </div>
        </div>
    )
}

export default Home