import React, {useState} from "react";
import useGlobalReducer from "../hooks/useGlobalReducer"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const{store, dispatch} = useGlobalReducer("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await login(email, password)
			const data = await response.json()
            console.log(data)
            dispatch({type:"login", payload:{user: data.user, token: data.access_token}})
            navigate("/private")
        } catch (error) {
            console.error("Error en el login"), error
        }
    }

    const login = async(email, password) => {

        const response = await fetch(import.meta.env.VITE_BACKEND_URL + "api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })
        return response
    }

    return (
            <div className="text-center mt-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <img
                                        src={rigoImageUrl}
                                        className="mb-3"
                                        alt="Rigo Baby"
                                        style={{ height: "150px" }}
                                    />
                                    <h2 className="mb-3">Inicio de sesion</h2>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Contraseña"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                        >
                                            Inicio de sesion
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )}