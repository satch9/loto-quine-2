import React, { useState } from 'react'
import axios from "axios"
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const Settings = () => {
    const [settings, setSettings] = useState({ gameName: "", gameMaxBox: "", gameMaxPlayer: "", gamePriceBox: "", steps: {}, prizes: {}, isPrivate: true })
    const [formStepsValues, setFormStepsValues] = useState([{ gameSteps: "" }])
    const [formPrizesValues, setFormPrizesValues] = useState([{ gamePrizes: "" }])

    const handleSubmit = (event: any) => {
        event.preventDefault()

        console.log("settings", settings)
        console.log("formStepsValues", formStepsValues)
        console.log("formPrizesValues", formPrizesValues)
        settings['steps'] = formStepsValues
        settings['prizes'] = formPrizesValues

        let dt = new Date();
        let hostCookie = cookies.get('userId')

        axios.post(`${import.meta.env.VITE_API_URL}/api/parties/settings`, {
            name: settings.gameName,
            date_start: dt.toLocaleDateString(),
            date_end: "",
            winner: "", // c'est l'id du gagnant
            max_cards_by_player: settings.gameMaxBox,
            max_players: settings.gameMaxPlayer,
            value_card: settings.gamePriceBox,
            prizes: settings.prizes,
            steps: settings.steps,
            is_private: settings.isPrivate,
            numbers_called: "",
            host: hostCookie,
            status: "Created"

        }).then((res) => {
            console.log('res', res)
        })



    }

    const handleChange = (event: any, index: number, source: string) => {
        if (source === "steps") {
            const values = [...formStepsValues]
            values[index].gameSteps = event.target.value
            setFormStepsValues(values)
        } else {
            const values = [...formPrizesValues]
            values[index].gamePrizes = event.target.value
            setFormPrizesValues(values)
        }

    }

    const add = (event: any, source: string) => {
        event.preventDefault()

        if (source === "steps") {
            setFormStepsValues([...formStepsValues, { gameSteps: '' }])
        } else {
            setFormPrizesValues([...formPrizesValues, { gamePrizes: '' }])
        }

    }
    return (
        <div className="settings">
            <label className="settings-title">Paramétrages</label>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Nom de la partie"
                    onChange={(event) => {
                        setSettings({ ...settings, gameName: event.target.value });
                    }}
                />
                <input
                    placeholder="Nombre max de cartons par joueurs"
                    onChange={(event) => {
                        setSettings({ ...settings, gameMaxBox: event.target.value });
                    }}
                    type="number"
                    min={1}
                    max={6}
                />
                <input
                    placeholder="Nombre maximum de joueur"
                    onChange={(event) => {
                        setSettings({ ...settings, gameMaxPlayer: event.target.value });
                    }}
                    type="number"
                    min={0}
                />
                <input
                    placeholder="Valeur du carton"
                    onChange={(event) => {
                        setSettings({ ...settings, gamePriceBox: event.target.value });
                    }}
                    type="number"
                    min={0}
                    max={10}
                    step={0.5}
                />
                <div className="stepsTitlePlusButton">
                    <div className="steps-title">Définis les étapes</div>
                    <button className="plusButton" onClick={(event: any) => add(event, "steps")}>+</button>
                </div>

                <div className="steps">
                    {
                        formStepsValues.map((element: any, index: number) => (

                            <div className="stepSelectList" key={index}>

                                <select
                                    name="steps"
                                    value={element.gameSteps || ""}
                                    onChange={(event: any) => handleChange(event, index, "steps")}
                                >
                                    <option value="3-lignes">Ligne de 3 numéros</option>
                                    <option value="4-lignes">Ligne de 4 numéros</option>
                                    <option value="quine">Ligne entière</option>
                                    <option value="carton-plein">Carton plein</option>
                                </select>

                            </div>
                        ))


                    }


                </div>

                <div className="prizesTitlePlusButton">
                    <div className="prizes-title">Définis les lots</div>
                    <button className="plusButton" onClick={(event: any) => add(event, "prizes")}>+</button>
                </div>

                <div className="prizes">
                    {
                        formPrizesValues.map((element: any, index: number) => (

                            <div className="prizesInputList" key={index}>

                                <input

                                    placeholder="Lot"
                                    name="prizes"
                                    value={element.gamePrizes || ""}
                                    onChange={(event: any) => handleChange(event, index, "prizes")}
                                />

                            </div>
                        ))


                    }


                </div>
                <div className="privateGame">
                    <div className="privateGame-title">Partie privée</div>
                    <input
                        type="checkbox"
                        name="isPrivate"
                        onChange={(event) => {
                            setSettings({ ...settings, isPrivate: event.target.checked })
                        }}
                    />
                </div>



                <button className="register-form-button" > Valider</button>
            </form>
        </div >
    )
}

export default Settings