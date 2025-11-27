import PropTypes from 'prop-types';
import Navbar from './Navbar';

const MainLayout = ({ children }) => {
    return (
        <div style={styles.wrapper}>
            <Navbar />
            
            <main style={styles.main}>
                <div style={styles.contentContainer}>
                    {children}
                </div>
            </main>
            
            <footer style={styles.footer}>
                <p>&copy; {new Date().getFullYear()} Sistema de Gestión E-Commerce. Versión 1.0.0</p>
            </footer>
        </div>
    );
};

MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = {
    wrapper: { 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh', 
        fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        backgroundColor: '#f8f9fa'
    },
    main: { 
        flex: 1, 
        padding: '30px 20px' 
    },
    contentContainer: {
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%'
    },
    footer: { 
        textAlign: 'center', 
        padding: '20px', 
        backgroundColor: '#fff', 
        color: '#7f8c8d', 
        fontSize: '0.9rem',
        borderTop: '1px solid #eee'
    }
};

export default MainLayout;