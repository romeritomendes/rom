export interface IUser {
    token?: string;
    email?: string;
    level?: number;
}

export interface IContext extends IUser {
    authenticate: ({email, password}: {email:string, password: string}) => Promise<void>;
    logout: () => void;
}

export interface IAuthProvider {
    children: JSX.Element;
}