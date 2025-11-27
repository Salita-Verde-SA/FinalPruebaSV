import { useEffect, useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/products/ProductCard';
import ProductForm from '../components/products/ProductForm';

const ProductsPage = () => {
    // 1. Destructuramos todo lo necesario de nuestro Hook (Lógica de Negocio)
    const { products, loading, error, getProducts, createProduct, deleteProduct } = useProducts();
    
    // 2. Estado local para controlar la visibilidad del formulario
    const [showForm, setShowForm] = useState(false);

    // 3. Cargar productos al montar el componente
    useEffect(() => {
        getProducts();
    }, [getProducts]);

    // 4. Manejador para la creación de producto
    const handleCreate = async (data) => {
        try {
            await createProduct(data);
            setShowForm(false); // Cierra el formulario tras el éxito
        } catch (error) {
            // En un app real usarías un componente de Toast/Notificación
            alert("Error al guardar: " + error.message);
        }
    };

    // 5. Manejo de estados de carga inicial y errores críticos
    if (loading && products.length === 0) return <div style={{ padding: 20 }}>Cargando inventario...</div>;
    if (error) return <div style={{ color: 'red', padding: 20 }}>Error del sistema: {error}</div>;

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1 style={{ margin: 0 }}>Inventario de Productos</h1>
                
                {/* Botón "Nuevo Producto": Solo se muestra si el formulario está cerrado */}
                {!showForm && (
                    <button 
                        onClick={() => setShowForm(true)} 
                        style={styles.createButton}
                    >
                        + Nuevo Producto
                    </button>
                )}
            </div>

            {/* Formulario de Creación (Renderizado Condicional) */}
            {showForm && (
                <div style={{ marginBottom: '30px' }}>
                    <ProductForm 
                        onSubmit={handleCreate} 
                        onCancel={() => setShowForm(false)} 
                    />
                </div>
            )}

            {/* Listado de Productos */}
            {products.length === 0 && !showForm ? (
                <div style={styles.emptyState}>
                    <p>No hay productos registrados en el sistema.</p>
                    <p style={{ fontSize: '0.9rem', color: '#666' }}>Haz clic en "Nuevo Producto" para comenzar.</p>
                </div>
            ) : (
                <div className="product-list" style={styles.grid}>
                    {products.map((product) => (
                        <ProductCard 
                            key={product.id_key} 
                            product={product} 
                            onDelete={deleteProduct} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

// Estilos básicos para mantener el orden sin dependencias externas
const styles = {
    createButton: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: 'bold',
    },
    emptyState: {
        textAlign: 'center',
        padding: '40px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px dashed #ccc',
        color: '#555',
    },
    grid: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
    }
};

export default ProductsPage;