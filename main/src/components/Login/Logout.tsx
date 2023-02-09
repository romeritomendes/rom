import { useAuth } from "../../context/Auth/useAuth";

export const Logout = () => {
    const auth = useAuth();

    auth.logout();
    return null;
}