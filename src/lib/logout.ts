import axios from 'axios';

export const logoutUser = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return;

    try {
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}Auth/logout`, {
            refreshToken,
        });
        localStorage.removeItem('refreshToken'); // Only on success
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Logout failed:', {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message,
            });
        } else {
            console.error('Unexpected error during logout:', error);
        }
    }
};
