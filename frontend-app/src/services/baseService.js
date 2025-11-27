import axiosClient from '../config/axiosClient';

/**
 * Clase Base para servicios CRUD.
 * Espejo del BaseControllerImpl del backend.
 * Permite reutilizar la lógica de conexión para cualquier entidad.
 */
class BaseService {
    /**
     * @param {string} endpoint - La URL base del recurso (ej: '/products', '/clients')
     */
    constructor(endpoint) {
        this.endpoint = endpoint;
    }

    /**
     * Obtiene todos los registros (GET /)
     * Equivalente a BaseControllerImpl.get_all
     */
    async getAll() {
        // axiosClient ya devuelve response.data gracias al interceptor
        return await axiosClient.get(this.endpoint);
    }

    /**
     * Obtiene un registro por ID (GET /{id})
     * Equivalente a BaseControllerImpl.get_one
     */
    async getById(id) {
        return await axiosClient.get(`${this.endpoint}/${id}`);
    }

    /**
     * Crea un nuevo registro (POST /)
     * Equivalente a BaseControllerImpl.create
     */
    async create(data) {
        return await axiosClient.post(this.endpoint, data);
    }

    /**
     * Actualiza un registro existente (PUT /{id})
     * Equivalente a BaseControllerImpl.update
     */
    async update(id, data) {
        return await axiosClient.put(`${this.endpoint}/${id}`, data);
    }

    /**
     * Elimina un registro (DELETE /{id})
     * Equivalente a BaseControllerImpl.delete
     */
    async delete(id) {
        return await axiosClient.delete(`${this.endpoint}/${id}`);
    }
}

export default BaseService;