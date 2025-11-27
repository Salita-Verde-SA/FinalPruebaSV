import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ProductsPage from '../pages/ProductsPage';

// Componentes Placeholder para rutas aún no implementadas
const ComingSoon = ({ title }) => (
    <div style={{ textAlign: 'center', padding: '50px', color: '#7f8c8d' }}>
        <h2>🚧 Módulo de {title}</h2>
        <p>Esta funcionalidad está en desarrollo.</p>
    </div>
);

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            
            {/* Rutas placeholder para que el menú funcione sin errores */}
            <Route path="/orders" element={<ComingSoon title="Pedidos" />} />
            <Route path="/clients" element={<ComingSoon title="Clientes" />} />
            
            <Route path="*" element={<h1 style={{textAlign: 'center'}}>404 - Página no encontrada</h1>} />
        </Routes>
    );
};

export default AppRoutes;