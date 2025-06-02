import useGlobalReducer from './useGlobalReducer';

// Hook personalizado para manejar toda la lógica de autenticación
export const useAuth = () => {
    // Accede al estado global y dispatcher
    const { store, dispatch } = useGlobalReducer();

    // Función para cerrar sesión del usuario
    const logout = () => {
        dispatch({ type: "logout" });
    };

    // Verifica si el usuario está autenticado basándose en la presencia del token
    const isLoggedIn = Boolean(store.token);

    // Obtiene los datos del usuario desde el store
    const user = store.user;

    // Sistema de debug para monitorear el estado de autenticación
    console.log('useAuth - Debug completo:', { 
        storeToken: store.token ? 'Token presente' : 'Sin token',
        storeUser: store.user,
        localStorageToken: localStorage.getItem('auth_token') ? 'Token presente' : 'Sin token',
        localStorageUserData: localStorage.getItem('user_data'),
        isLoggedIn 
    });

    // Retorna las propiedades y funciones de autenticación
    return {
        isLoggedIn,
        user,
        token: store.token,
        logout
    };
};