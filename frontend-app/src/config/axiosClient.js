import axios from 'axios';

// Creamos una instancia única de axios.
// Esto nos permite configurar la URL base una sola vez para toda la app.
const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    // Timeout de 10 segundos para no dejar la app colgada si el back falla
    timeout: 10000, 
});

// INTERCEPTORES (La parte "Pro")
// Funcionan como los Middlewares de tu backend, pero en el frontend.

// 1. Interceptor de Petición (Request)
// Se ejecuta ANTES de que la petición salga de tu app.
axiosClient.interceptors.request.use(
    (config) => {
        // Aquí podrías agregar lógica global, como inyectar un token de autenticación
        // const token = localStorage.getItem('token');
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 2. Interceptor de Respuesta (Response)
// Se ejecuta CUANDO el backend responde, antes de llegar a tus componentes.
axiosClient.interceptors.response.use(
    (response) => {
        // Si la respuesta es exitosa, simplemente devolvemos los datos.
        // Esto simplifica el código en los servicios: response.data en vez de response
        return response.data;
    },
    (error) => {
        // Manejo centralizado de errores.
        // Si tu backend devuelve 404 o 500, lo atrapamos aquí primero.
        if (error.response) {
            // El servidor respondió con un código de estado fuera del rango 2xx
            console.error('Error de API:', error.response.data);
            
            // Si el error es 401 (No autorizado), podríamos redirigir al login automáticamente
            if (error.response.status === 401) {
                console.warn('Sesión expirada o no autorizada');
                // window.location.href = '/login'; 
            }
        } else if (error.request) {
            // La petición se hizo pero no hubo respuesta (Back caído o sin internet)
            console.error('No se recibió respuesta del servidor. Verifica tu conexión.');
        } else {
            console.error('Error al configurar la petición:', error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosClient;