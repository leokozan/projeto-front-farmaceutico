import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
    allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
    const userRole = localStorage.getItem("role"); // Obtém a role armazenada

    if (!userRole) {
        return <Navigate to="/" replace />; // Redireciona para login se não estiver autenticado
    }

    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/" replace />; // Redireciona se não tiver permissão
    }

    return <Outlet />; // Renderiza a rota protegida se tiver permissão
};

export default ProtectedRoute;
