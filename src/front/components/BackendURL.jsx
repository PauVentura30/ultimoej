import React, { Component } from "react";
import envFile from "../../../docs/assets/env-file.png"

// Componente para mostrar texto con estilo oscuro
const Dark = ({children}) => <span className="bg-dark text-white px-1 rounded">{children}</span>;

// Componente que muestra instrucciones para configurar la variable de entorno BACKEND_URL
export const BackendURL = () => (
	<div className="mt-5 pt-5 w-50 mx-auto">
		<h2>Missing BACKEND_URL env variable</h2>
		<p>Here's a video tutorial on <a target="_blank" href="https://www.awesomescreenshot.com/video/16498567?key=72dbf905fe4fa6d3224783d02a8b1b9c">how to update your backend URL environment variable.</a></p>
		<p>There's a file called <Dark>.env</Dark> that contains the environmental variables for your project.</p>
		<p>There's one variable called <Dark>BACKEND_URL</Dark> that needs to be manually set by yourself.</p>
		
		{/* Lista de pasos para configurar la variable de entorno */}
		<ol>
			<li>Make sure you backend is running on port 3001.</li>
			<li>Open your API and copy the API host.</li>
			<li>Open the .env file (do not open the .env.example)</li>
			<li>Add a new variable VITE_BACKEND_URL=<Dark>your api host</Dark></li>
			<li>Replace <Dark>your api host</Dark> with the public API URL of your flask backend sever running at port 3001</li>
		</ol>
		
		{/* Imagen de ejemplo mostrando el archivo .env */}
		<div className="w-100">
		<img src={envFile} className="w-100"/>
		</div>
		<p>Note: If you are publishing your website to Heroku, Render.com or any other hosting you probably need to follow other steps.</p>
	</div>
);