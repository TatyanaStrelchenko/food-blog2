"use client"

import { siteConfig } from "@/config/site.config";
import { usePathname } from "next/navigation";

export const Title = () => {
   const pathname = usePathname();

   const currentNavItem = siteConfig.navItems.find(
     (item) => item.href === pathname
   );

    const pageTitle = currentNavItem ? currentNavItem.label : siteConfig.title;
    return (
        <div className="w-full flex my-6 justify-center">
            <h1 className="text-2xl font-bold mb-12">
                {pageTitle}
            </h1>
        </div>
    );
};
