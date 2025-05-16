import React from 'react';
import useGlobalReducer from '../path/to/your/useGlobalReducer'; // Ajusta esta ruta

const ProductCard = ({ product }) => {
  const { dispatch } = useGlobalReducer();
  
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
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {product.image && (
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="font-medium text-lg">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="font-bold">${product.price}</span>
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