export const siteConfig = {
    title: "Ukranian kitchen",
    description: "All about food",
    navItems: [
        {href: "/", label: "Recepies"},
        {href: "/ingredients", label: "Ingredients"},
        {href: "/about", label: "About"},
    ],
    pagesContent: {
        "/": {content: "Welcome to the Ukrainian kitchen"},
        "/ingredients": {content: "Explore the ingredients used in Ukrainian cuisine"},
        "/about": {
            content: `
                <p>Learn more about Ukrainian cuisine</p>
                <p>Ukrainian cuisine is known for its rich flavors and hearty ingredients.</p>
                <p>Some popular dishes include borscht, varenyky, and holodets.</p>
        `}
    }
};

