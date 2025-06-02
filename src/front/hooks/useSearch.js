import { useEffect } from 'react';
import useGlobalReducer from './useGlobalReducer';

// Hook personalizado para manejar toda la funcionalidad de búsqueda de productos
export function useSearch() {
  // Accede al estado global y dispatcher
  const { store, dispatch } = useGlobalReducer();

  // Función principal para filtrar productos basándose en un término de búsqueda
  const searchProducts = (searchTerm, products = []) => {
    console.log("🔍 Buscando productos con término:", searchTerm);
    
    // Si no hay término de búsqueda, limpia la búsqueda y retorna todos los productos
    if (!searchTerm || !searchTerm.trim()) {
      dispatch({ type: 'CLEAR_SEARCH' });
      return products;
    }

    // Activa el estado de búsqueda en progreso
    dispatch({ type: 'SET_SEARCHING', payload: true });

    try {
      // Normaliza el término de búsqueda para comparación
      const term = searchTerm.toLowerCase().trim();
      
      // Filtra productos que coincidan en nombre, marca o colores
      const filteredProducts = products.filter(product => {
        return (
          product.name?.toLowerCase().includes(term) ||
          product.brand?.toLowerCase().includes(term) ||
          product.colors?.some(color => color.toLowerCase().includes(term))
        );
      });

      console.log("📋 Productos encontrados:", filteredProducts.length);
      
      // Guarda los resultados de búsqueda en el estado global
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

  // Función para extraer el término de búsqueda desde los parámetros de la URL
  const getSearchTermFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('search') || '';
  };

  // Función para limpiar completamente el estado de búsqueda
  const clearSearch = () => {
    dispatch({ type: 'CLEAR_SEARCH' });
    
    // Limpia también el parámetro de búsqueda de la URL
    const url = new URL(window.location);
    url.searchParams.delete('search');
    window.history.replaceState({}, '', url);
  };

  // Efecto para sincronizar el estado con la URL al cargar el componente
  useEffect(() => {
    const urlSearchTerm = getSearchTermFromURL();
    if (urlSearchTerm && urlSearchTerm !== store.searchTerm) {
      dispatch({ 
        type: 'SET_SEARCH_TERM', 
        payload: urlSearchTerm 
      });
    }
  }, []);

  // Retorna el estado y funciones de búsqueda para uso en componentes
  return {
    // Estado actual de búsqueda
    searchTerm: store.searchTerm,
    searchResults: store.searchResults,
    isSearching: store.isSearching,
    
    // Funciones para manejar búsquedas
    searchProducts,
    getSearchTermFromURL,
    clearSearch
  };
}