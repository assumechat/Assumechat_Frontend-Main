
interface User {
    id: string;
    name: string;
    email: string;
}

interface UserState {
    user: User | null;
    isAuthenticated: boolean;
    accessToken: string | null;
}

export type {
    UserState,
    User
};