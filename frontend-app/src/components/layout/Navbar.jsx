import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    // Función para saber si el link está activo (para pintarlo de otro color)
    const isActive = (path) => location.pathname === path;

    return (
        <nav style={styles.nav}>
            <div style={styles.container}>
                <Link to="/" style={styles.logo}>
                    🛒 E-Commerce <span style={{ fontWeight: 'normal', fontSize: '0.8em' }}>Panel</span>
                </Link>
                
                <div style={styles.links}>
                    <NavLink to="/" active={isActive('/')}>Inicio</NavLink>
                    <NavLink to="/products" active={isActive('/products')}>Productos</NavLink>
                    {/* Estos son placeholders para mostrar que la arquitectura escala */}
                    <NavLink to="/orders" active={isActive('/orders')}>Pedidos</NavLink>
                    <NavLink to="/clients" active={isActive('/clients')}>Clientes</NavLink>
                </div>
            </div>
        </nav>
    );
};

// Componente interno para no repetir estilos
// eslint-disable-next-line
const NavLink = ({ to, children, active }) => (
    <Link 
        to={to} 
        style={{ 
            ...styles.link, 
            ...(active ? styles.activeLink : {}) 
        }}
    >
        {children}
    </Link>
);

const styles = {
    nav: { 
        backgroundColor: '#2c3e50', 
        padding: '1rem 0', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
    },
    container: { 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '0 20px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
    },
    logo: { 
        color: '#ecf0f1', 
        textDecoration: 'none', 
        fontSize: '1.5rem', 
        fontWeight: 'bold',
        letterSpacing: '1px'
    },
    links: { 
        display: 'flex', 
        gap: '20px' 
    },
    link: { 
        color: '#bdc3c7', 
        textDecoration: 'none', 
        fontSize: '1rem', 
        transition: 'color 0.3s',
        padding: '5px 10px',
        borderRadius: '4px'
    },
    activeLink: { 
        color: '#fff', 
        backgroundColor: 'rgba(255,255,255,0.1)',
        fontWeight: '500'
    }
};

export default Navbar;