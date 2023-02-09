import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/Auth/useAuth"

export const ProtectElement = ({ children }: { children: JSX.Element }) => {
    const auth = useAuth();
    const location = useLocation();

    if(!auth.email) {
        console.log("aqui")
        return <Navigate to="/login" state={{ from: location }} replace/>;
    }
    
     return children;
}