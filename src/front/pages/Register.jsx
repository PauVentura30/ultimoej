import React, { useEffect, useState } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";

export const Home = () => {

    const { store, dispatch } = useGlobalReducer()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    
    
    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await signup(email, password)
            const data = await response.json()
            dispatch({type:"signup_access", payload:{user: data.user}})
            setEmail("")
            setPassword("")
            navigate("/login")
        } catch (error) {
            console.error("Error en el registro", error)
        }
    } 
    
    const signup = async(email, password) => {

    const response = await fetch(import.meta.env.VITE_BACKEND_URL + "api/signup", {
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
                                <h2 className="mb-3">Registro</h2>
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
                                        Registrarse
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}; 