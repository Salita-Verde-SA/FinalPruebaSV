/**
 * Modelo de Producto para el Frontend.
 * Espejo de: Final2025Python/schemas/product_schema.py
 */
export const initialProductState = {
    name: '',
    price: 0,
    stock: 0,
    category_id: 1 // Valor por defecto o null si prefieres obligar a seleccionar
};

// Si usáramos TypeScript esto sería una interface.
// En JS puro, esto sirve como documentación y valor inicial para formularios.