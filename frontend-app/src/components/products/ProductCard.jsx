import PropTypes from 'prop-types';
// Usamos estilos en línea o CSS modules para mantenerlo simple pero aislado.
// En un proyecto real podrías usar 'ProductCard.module.css'

const ProductCard = ({ product, onDelete }) => {
    // Extraemos los datos según tu ProductSchema del backend
    const { id_key, name, price, stock } = product;

    return (
        <div style={styles.card}>
            <div style={styles.content}>
                <h3 style={styles.title}>{name}</h3>
                <div style={styles.details}>
                    <p>Precio: <strong>${price.toFixed(2)}</strong></p>
                    <p>Stock: <span style={{ color: stock > 0 ? 'green' : 'red' }}>{stock}</span></p>
                </div>
            </div>
            <div style={styles.actions}>
                <button 
                    onClick={() => onDelete(id)} 
                    style={styles.deleteButton}
                    aria-label={`Eliminar ${name}`}
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
};

// VALIDACIÓN DE TIPOS (Muy importante para tu profesor estricto)
// Esto asegura que el frontend respeta el contrato de datos del backend.
ProductCard.propTypes = {
    product: PropTypes.shape({
        id_key: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        stock: PropTypes.number.isRequired,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
};

// Estilos simples para que se vea decente sin instalar librerías pesadas
const styles = {
    card: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        margin: '10px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: { margin: '0 0 8px 0', fontSize: '1.2rem' },
    details: { display: 'flex', gap: '20px', color: '#555' },
    deleteButton: {
        backgroundColor: '#ff4d4d',
        color: 'white',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '4px',
        cursor: 'pointer',
    }
};

export default ProductCard;