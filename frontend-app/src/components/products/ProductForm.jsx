import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { initialProductState } from '../../models/productModel';

const ProductForm = ({ onSubmit, initialData = null, onCancel }) => {
    // Si viene initialData es "Edición", si no, usamos el modelo vacío ("Creación")
    const [formData, setFormData] = useState(initialData || initialProductState);
    const [errors, setErrors] = useState({});

    // Validación manual que imita las reglas de Pydantic del backend
    const validate = () => {
        const newErrors = {};
        if (!formData.name || formData.name.length < 1) newErrors.name = "El nombre es obligatorio";
        if (formData.price <= 0) newErrors.price = "El precio debe ser mayor a 0";
        if (formData.stock < 0) newErrors.stock = "El stock no puede ser negativo";
        
        setErrors(newErrors);
        // Retorna true si no hay claves en el objeto de errores
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(formData);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Convertimos a número si es price/stock/category_id
        const isNumber = ['price', 'stock', 'category_id'].includes(name);
        setFormData(prev => ({
            ...prev,
            [name]: isNumber ? parseFloat(value) || 0 : value
        }));
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <h3>{initialData ? 'Editar Producto' : 'Nuevo Producto'}</h3>
            
            <div style={styles.group}>
                <label>Nombre:</label>
                <input 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    style={styles.input}
                />
                {errors.name && <span style={styles.error}>{errors.name}</span>}
            </div>

            <div style={styles.group}>
                <label>Precio:</label>
                <input 
                    type="number" 
                    name="price" 
                    step="0.01"
                    value={formData.price} 
                    onChange={handleChange}
                    style={styles.input}
                />
                {errors.price && <span style={styles.error}>{errors.price}</span>}
            </div>

            <div style={styles.group}>
                <label>Stock:</label>
                <input 
                    type="number" 
                    name="stock" 
                    value={formData.stock} 
                    onChange={handleChange}
                    style={styles.input}
                />
                {errors.stock && <span style={styles.error}>{errors.stock}</span>}
            </div>

            {/* Campo oculto o selector para Category ID */}
            <input type="hidden" name="category_id" value={formData.category_id} />

            <div style={styles.actions}>
                <button type="button" onClick={onCancel} style={styles.cancelBtn}>Cancelar</button>
                <button type="submit" style={styles.submitBtn}>Guardar</button>
            </div>
        </form>
    );
};

ProductForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    initialData: PropTypes.object,
};

const styles = {
    form: { border: '1px solid #ccc', padding: '20px', borderRadius: '8px', backgroundColor: '#f9f9f9', marginBottom: '20px' },
    group: { marginBottom: '15px' },
    input: { width: '100%', padding: '8px', marginTop: '5px' },
    error: { color: 'red', fontSize: '0.8rem' },
    actions: { display: 'flex', gap: '10px', marginTop: '10px' },
    submitBtn: { padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', cursor: 'pointer' },
    cancelBtn: { padding: '10px 20px', backgroundColor: '#6c757d', color: '#fff', border: 'none', cursor: 'pointer' }
};

export default ProductForm;