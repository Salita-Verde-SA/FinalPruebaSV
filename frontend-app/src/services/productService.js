import BaseService from './baseService';

/**
 * Servicio específico para Productos.
 * Hereda toda la funcionalidad CRUD de BaseService.
 */
class ProductService extends BaseService {
    constructor() {
        // Llamamos al constructor padre con el endpoint correspondiente
        // Esto debe coincidir con el prefix definido en tu main.py: prefix="/products"
        super('/products');
    }

    // Si tuvieras métodos específicos que NO son CRUD (ej: buscar por nombre),
    // los agregarías aquí. Por ejemplo:
    // async getFeatured() {
    //     return await axiosClient.get(`${this.endpoint}/featured`);
    // }
}

// Exportamos una instancia única (Singleton pattern) para usarla en toda la app
export default new ProductService();