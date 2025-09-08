"use client"

import { useAuthStore } from "@/store/auth.store";
import { useIngredientStore } from "@/store/ingredient.store";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

interface IProps {
    children: React.ReactNode;
}

export const AppLoader = ({children}: IProps) => {
    const {data: session, status} = useSession();
    const { loadIngredients}= useIngredientStore();
    const {isAuth, setAuthState} = useAuthStore();

    useEffect(() => {
        setAuthState(status, session);
    }, [session, status, setAuthState]);

    useEffect(() => {
        if(isAuth) {
            loadIngredients();
        }
    }, [isAuth, loadIngredients]);


    return (
        <>
            {children}
        </>
    );
};
