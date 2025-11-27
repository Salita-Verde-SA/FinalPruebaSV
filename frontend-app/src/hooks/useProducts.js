import { useState, useCallback } from 'react';
import ProductService from '../services/productService';

/**
 * Custom Hook para gestionar la lógica de Productos.
 * Equivalente a la capa de Servicios del Backend, pero adaptada a React.
 * Maneja el estado (loading, error, data) y expone las funciones del servicio.
 */
export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Usamos useCallback para que esta función no se recree en cada render
    // y sea seguro ponerla en dependencias de useEffect.
    const getProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await ProductService.getAll();
            setProducts(data);
        } catch (err) {
            console.error(err);
            setError(err.message || 'Error al cargar productos');
        } finally {
            setLoading(false);
        }
    }, []);

    // Función para crear un producto
    const createProduct = async (productData) => {
        setLoading(true);
        try {
            const newProduct = await ProductService.create(productData);
            // Actualizamos el estado local agregando el nuevo producto
            // Esto evita tener que recargar toda la lista del servidor
            setProducts(prev => [...prev, newProduct]);
            return newProduct;
        } catch (err) {
            setError(err.message || 'Error al crear producto');
            throw err; // Re-lanzamos para que el formulario sepa que falló
        } finally {
            setLoading(false);
        }
    };

    // Función para eliminar un producto
    const deleteProduct = async (id) => {
        // No activamos loading global para que no parpadee toda la pantalla,
        // pero podrías hacerlo si prefieres.
        try {
            await ProductService.delete(id);
            // Actualización optimista: quitamos el item de la lista localmente
            setProducts(prev => prev.filter(product => product.id_key !== id));
        } catch (err) {
            setError(err.message || 'Error al eliminar producto');
        }
    };

    return {
        products,
        loading,
        error,
        getProducts,
        createProduct,
        deleteProduct
    };
};