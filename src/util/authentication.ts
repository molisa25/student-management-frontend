export const useIsAuthenticated = (): boolean => {
    const accessToken = localStorage.getItem('token');
    return Boolean(accessToken);
};
