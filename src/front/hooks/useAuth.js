// Hook personalizado para manejar la autenticación
import useGlobalReducer from './useGlobalReducer';

export const useAuth = () => {
    const { store, dispatch } = useGlobalReducer();

    // Función para hacer logout 
    const logout = () => {
        dispatch({ type: "logout" });
    };

    // Verificar si está logueado
    const isLoggedIn = Boolean(store.token);

    // Obtener usuario
    const user = store.user;

    // Debug mejorado
    console.log('useAuth - Debug completo:', { 
        storeToken: store.token ? 'Token presente' : 'Sin token',
        storeUser: store.user,
        localStorageToken: localStorage.getItem('auth_token') ? 'Token presente' : 'Sin token',
        localStorageUserData: localStorage.getItem('user_data'),
        isLoggedIn 
    });

    return {
        isLoggedIn,
        user,
        token: store.token,
        logout
    };
};