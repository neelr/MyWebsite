import Link from "next/link";
import { FC } from "react";
import { Box, Text } from "theme-ui";
import { Url } from "url";

interface Children {
    children: React.ReactNode;
    active?: boolean;
    href?: string;
}

export default function Sidebar({ active }: { active: number }) {
    return (
        <Box sx={{
            borderTop: ["1px solid", 0],
            borderRight: [0, "1px solid"],
            borderColor: ["muted", "muted"],
            ml: "auto",
            mr: ["auto", 0],
            pt: ["20px", 0],
            pr: [0, 3],
            flexDirection: "column",
            width: ["90vw", "auto"]
        }}>
            {
                [["Hello!", "/"], ["Projects"], ["Notebook", "https://notebook.neelr.dev"], ["Résume"]].map((item, index) => {
                    return (
                        <ActiveLink href={item[1] ?? `/${item[0].toLowerCase() === "home" ? "" : item[0].toLowerCase()
                            }`} active={active === index} key={index}>
                            {item[0]}
                        </ActiveLink>
                    )
                })
            }
        </Box>
    )
}

let ActiveLink: FC<Children> = ({ children, href, active = false }) => {
    return (
        <Box sx={{
            pr: 2,
        }}
        >
            <Link style={{ textDecoration: "none" }} href={href ?? ""}>
                <Text sx={{
                    color: active ? "primary" : "text",
                    fontWeight: active ? "bold" : "normal",
                    ":hover": {
                        fontWeight: "bold",
                        cursor: "pointer"
                    },
                }}
                    as="p">{children}</Text>
                <Text sx={{
                    fontWeight: "bold",
                    visibility: "hidden",
                    height: 0
                }}
                    as="p">{children}</Text>
            </Link>
        </Box>
    )
}