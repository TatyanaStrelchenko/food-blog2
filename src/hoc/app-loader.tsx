"use client"

import { useAuthStore } from "@/store/auth.store";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

interface IProps {
    children: React.ReactNode;
}

export const AppLoader = ({children}: IProps) => {
    const {data: session, status} = useSession();
    const {setAuthState} = useAuthStore();

    useEffect(() => {
        setAuthState(status, session);
    }, [session, status, setAuthState]);

    return (
        <>
            {children}
        </>
    );
};
