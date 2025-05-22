import { useEffect } from 'react';
import useGlobalReducer from './useGlobalReducer';

// Hook personalizado para manejar búsquedas
export function useSearch() {
  const { store, dispatch } = useGlobalReducer();

  // Función para buscar productos localmente
  const searchProducts = (searchTerm, products = []) => {
    console.log("🔍 Buscando productos con término:", searchTerm);
    
    if (!searchTerm || !searchTerm.trim()) {
      dispatch({ type: 'CLEAR_SEARCH' });
      return products; // Devolver todos los productos si no hay término
    }

    dispatch({ type: 'SET_SEARCHING', payload: true });

    try {
      const term = searchTerm.toLowerCase().trim();
      
      const filteredProducts = products.filter(product => {
        return (
          product.name?.toLowerCase().includes(term) ||
          product.brand?.toLowerCase().includes(term) ||
          product.colors?.some(color => color.toLowerCase().includes(term))
        );
      });

      console.log("📋 Productos encontrados:", filteredProducts.length);
      
      dispatch({ 
        type: 'SET_SEARCH_RESULTS', 
        payload: filteredProducts 
      });

      return filteredProducts;

    } catch (error) {
      console.error("❌ Error en búsqueda:", error);
      dispatch({ type: 'SET_SEARCHING', payload: false });
      return products;
    }
  };

  // Función para obtener el término de búsqueda de la URL
  const getSearchTermFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('search') || '';
  };

  // Función para limpiar la búsqueda
  const clearSearch = () => {
    dispatch({ type: 'CLEAR_SEARCH' });
    // Limpiar la URL también
    const url = new URL(window.location);
    url.searchParams.delete('search');
    window.history.replaceState({}, '', url);
  };

  // Efecto para sincronizar con la URL al cargar el componente
  useEffect(() => {
    const urlSearchTerm = getSearchTermFromURL();
    if (urlSearchTerm && urlSearchTerm !== store.searchTerm) {
      dispatch({ 
        type: 'SET_SEARCH_TERM', 
        payload: urlSearchTerm 
      });
    }
  }, []);

  return {
    // Estado
    searchTerm: store.searchTerm,
    searchResults: store.searchResults,
    isSearching: store.isSearching,
    
    // Funciones
    searchProducts,
    getSearchTermFromURL,
    clearSearch
  };
}