import React from 'react';
import useGlobalReducer from '../path/to/your/useGlobalReducer';

const ProductCard = ({ product }) => {
  // Hook para acceder al dispatcher del estado global
  const { dispatch } = useGlobalReducer();
  
  // Función para agregar el producto al carrito de compras
  const addToCart = () => {
    dispatch({
      type: 'add_to_cart',
      payload: {
        ...product,
        quantity: 1,
      }
    });
  };
  
  return (
    // Contenedor principal de la tarjeta con efectos hover
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      // Imagen del producto con renderizado condicional
      {product.image && (
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 object-cover"
        />
      )}
      
      // Contenido de la tarjeta con información del producto
      <div className="p-4">
        // Nombre del producto como título
        <h3 className="font-medium text-lg">{product.name}</h3>
        
        // Descripción del producto
        <p className="text-gray-600 text-sm mb-2">{product.description}</p>
        
        // Footer con precio y botón de agregar al carrito
        <div className="flex justify-between items-center">
          // Precio del producto destacado
          <span className="font-bold">${product.price}</span>
          
          // Botón para agregar producto al carrito
          <button
            onClick={addToCart}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;