
"use client"

import { siteConfig } from "@/config/site.config";
import { usePathname } from "next/navigation";
import DOMPurify from "isomorphic-dompurify";
import parse from "html-react-parser";

export const PageContent = () => {
    const pathname = usePathname();
    const pageContent = siteConfig.pagesContent[pathname as keyof typeof siteConfig.pagesContent];

    if (!pageContent) {
        return null;
    }

    const cleanerHTML = DOMPurify.sanitize(pageContent.content);

    return (
        <div> {parse(cleanerHTML)} </div>
    );
}
