"use client"

import { signOutFunc } from "@/actions/sign-out";
import LoginModal from "@/components/UI/modals/login.modal";
import RegistrationModal from "@/components/UI/modals/registration.modal";
import { siteConfig } from "@/config/site.config";
import { useAuthStore } from "@/store/auth.store";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@heroui/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const Logo = () => {
  return (
    <Image 
        src="/logo.svg" 
        alt="logo" 
        width={26} 
        height={26}
        priority />
    );
};

const getNavItems = () => {
    const pathname = usePathname();

    return siteConfig.navItems.map((nav) => { 
        const isActive = pathname === nav.href
        return (
            <NavbarItem key={nav.label}>
                <Link 
                    color="foreground" 
                    href={nav.href}
                    className={`px-3 py-1
                        ${isActive ? "text-blue-500" : "text-foreground"}
                        hover:text-blue-300 
                        transition-colors
                        duration-200
                    `}>
                    {nav.label}
                </Link>
            </NavbarItem>
        )}
    )
}


export default function Header() {
    const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const { isAuth, session, status, setAuthState } = useAuthStore();

    const handleSignOut = async () => {
        try {
            await signOutFunc();
        } catch (error) {
            console.error("Error signing out:", error);
        }
        setAuthState('unauthenticated', null);
    }

    return (
        <Navbar>
            <NavbarBrand>
                <Link href="/">
                    <Logo />
                    {siteConfig.title}
                </Link>
            </NavbarBrand>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {getNavItems()}
            </NavbarContent>
            
           
              <NavbarContent justify="end">
                { status === "loading" ?  
                    <p>Loading...</p> : 
                    isAuth ? 
                        <>
                            <p>Welcome, {session?.user?.email}!</p><NavbarItem className="hidden lg:flex">
                            <Button 
                                as={Link} 
                                color="secondary" 
                                href="#" 
                                variant="flat"
                                onPress={handleSignOut}
                                >
                                Log out
                            </Button>
                        </NavbarItem>
                        </>
                    : 
                       <>
                        <NavbarItem className="hidden lg:flex">
                            <Button 
                                as={Link} 
                                color="secondary" 
                                href="#" 
                                variant="flat"
                                onPress={() => setIsLoginOpen(true)}>
                                Login
                            </Button>
                        </NavbarItem>
                        <NavbarItem>
                            <Button 
                                as={Link} 
                                color="primary" 
                                href="#" 
                                variant="flat"
                                onPress={() => setIsRegistrationOpen(true)}>
                                Registration
                            </Button>
                        </NavbarItem>
                    </>
                }
            </NavbarContent>
            <RegistrationModal isOpen={isRegistrationOpen} onClose={() => setIsRegistrationOpen(false)} />
            <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
        </Navbar>
    );
}
