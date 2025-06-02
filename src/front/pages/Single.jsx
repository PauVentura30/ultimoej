import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import rigoImageUrl from "../assets/img/rigo-baby.jpg"
import useGlobalReducer from "../hooks/useGlobalReducer";

// Componente para mostrar detalles individuales de un elemento específico
export const Single = props => {
  // Hook para acceder al estado global de la aplicación
  const { store } = useGlobalReducer()

  // Hook para obtener el parámetro 'theId' desde la URL
  const { theId } = useParams()
  
  // Busca el todo específico en el store usando el ID de la URL
  const singleTodo = store.todos.find(todo => todo.id === parseInt(theId));

  return (
    <div className="container text-center">
      {/* Título dinámico que muestra el título del todo encontrado */}
      <h1 className="display-4">Todo: {singleTodo?.title}</h1>
      
      {/* Línea separadora visual */}
      <hr className="my-4" />

      {/* Enlace de navegación que regresa a la página principal */}
      <Link to="/">
        <span className="btn btn-primary btn-lg" href="#" role="button">
          Back home
        </span>
      </Link>
    </div>
  );
};

// Validación de tipos para las props del componente
Single.propTypes = {
  // Prop 'match' definida pero no utilizada en el componente
  match: PropTypes.object
};