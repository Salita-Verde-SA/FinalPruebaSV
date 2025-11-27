import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Bienvenido al Panel de Control</h1>
            <p style={styles.subtitle}>Selecciona un módulo para comenzar a trabajar</p>

            <div style={styles.grid}>
                <DashboardCard 
                    title="Productos" 
                    count="Gestión" 
                    icon="📦" 
                    link="/products" 
                    color="#3498db"
                />
                <DashboardCard 
                    title="Pedidos" 
                    count="Próximamente" 
                    icon="📄" 
                    link="/orders" 
                    color="#95a5a6"
                />
                <DashboardCard 
                    title="Clientes" 
                    count="Próximamente" 
                    icon="👥" 
                    link="/clients" 
                    color="#95a5a6"
                />
            </div>
        </div>
    );
};

// Tarjeta simple para el dashboard
// eslint-disable-next-line
const DashboardCard = ({ title, count, icon, link, color }) => (
    <Link to={link} style={{ textDecoration: 'none' }}>
        <div style={{ ...styles.card, borderTop: `4px solid ${color}` }}>
            <div style={styles.icon}>{icon}</div>
            <h3 style={styles.cardTitle}>{title}</h3>
            <span style={{ color: color, fontWeight: 'bold' }}>{count}</span>
        </div>
    </Link>
);

const styles = {
    container: { textAlign: 'center', padding: '40px 0' },
    title: { color: '#2c3e50', marginBottom: '10px' },
    subtitle: { color: '#7f8c8d', marginBottom: '50px' },
    grid: { 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '30px', 
        flexWrap: 'wrap' 
    },
    card: {
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
        width: '200px',
        transition: 'transform 0.2s',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    icon: { fontSize: '3rem', marginBottom: '15px' },
    cardTitle: { margin: '0 0 10px 0', color: '#333' }
};

export default HomePage;