import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth/useAuth"

export const Login = () => {

    const auth = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const [email, setEmail] = useState<string | undefined>(undefined);
    const [password, setPassword] = useState<string | undefined>(undefined);

    if(auth.email) {
        const from = location.state?.from?.pathname || "/";

        navigate(from, { replace: true });
    }

    async function handleLogon(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        try {

            if(email && password)
                await auth.authenticate({ email, password });

        } catch (error) {
            
        }
    }

    return(
        <form>
            <input value={email} onChange={e => setEmail(e.target.value)} />
            <input value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={handleLogon}>Login</button>
        </form>
    )
}