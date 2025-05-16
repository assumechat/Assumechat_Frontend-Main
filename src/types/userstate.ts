type User = {
    _id: string;
    email: string;
    name: string;
    emailVerified: boolean;
    refreshTokens: string;
    userDataId: string;
};

interface UserState {
    user: User | null;
    isAuthenticated: boolean;
    accessToken: string | null;
}

export type {
    UserState,
    User
};