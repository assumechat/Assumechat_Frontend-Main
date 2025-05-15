
interface User {
    id: string;
    name: string;
    email: string;
}

interface UserState {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
}

export type {
    UserState,
    User
};