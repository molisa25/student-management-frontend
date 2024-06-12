import React, {useEffect, useState} from 'react';
import axiosInstance from "../util/axios";

interface UserContextProps {
    user: {
        id: string;
        first_name: string;
        last_name: string;
        email: string;
    } | null;
    setUser: (user: any) => void;
}

export const UserContext = React.createContext<UserContextProps>({user: null, setUser: () => {}});

export const UserContextProvider = ({children}: { children: JSX.Element | JSX.Element[] }): JSX.Element => {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // fetch user data
                const response = await axiosInstance.get('/auth/fetch-user').catch((_) => {
                    setUser(null);
                });

                setData(response && response.data);
            } catch (error) {
            } finally {
            }
        };

        fetchUserData();
    }, []);

    const [user, setUser] = React.useState<{
        id: string;
        first_name: string;
        last_name: string;
        email: string;
    } | null>(null);

    React.useEffect(() => {
        if (data) {
            setUser(data.responseData);
        }
    }, [data]);

    const value: UserContextProps = React.useMemo(() => {
        return {
            user,
            setUser
        };
    }, [user, setUser]);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
