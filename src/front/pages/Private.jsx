import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const {store} = useGlobalReducer()
    const navigate = useNavigate()
    
    useEffect(() => {
        console.log(store.user)
        if (!store.token){
            navigate("/")
        }   
    },[store.token, navigate])
    return(<div className="text-center mt-5">
        <h1>Esto es el private solo puedes acceder si dispones de un token nano</h1>
        <h2>Buenas tardes, {store.user}</h2>        
    </div>)
}