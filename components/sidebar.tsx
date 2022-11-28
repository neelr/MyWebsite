import { FC } from "react";
import { Box, Text } from "theme-ui";

interface Children {
    children: React.ReactNode;
    active?: boolean;
}

export default function Sidebar() {
    return (
        <Box sx={{
            borderRight: "1px solid",
            borderColor: "highlight",
            ml: "auto",
            pr: 3,
            flexDirection: "column"
        }}>
            <ActiveLink active={true}>Hello!</ActiveLink>
            <ActiveLink>Projects</ActiveLink>
            <ActiveLink>Notebook</ActiveLink>
            <ActiveLink>Résume</ActiveLink>
        </Box>
    )
}

let ActiveLink: FC<Children> = ({ children, active = false }) => {
    return (
        <Box sx={{
            pr: 4,
        }}>
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
        </Box>
    )
}