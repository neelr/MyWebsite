import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { Box, Text, Link as TLink } from "theme-ui";
import { Url } from "url";

interface Children {
    children: React.ReactNode;
    active?: boolean;
    href?: string;
}

const A = (props: any) => <TLink style={{ textDecoration: "underline" }} target="_blank" {...props} />;

export default function Sidebar({ active }: { active: number }) {
    return (<>
        <Box sx={{
            borderTop: ["1px solid", 0],
            borderRight: [0, "1px solid"],
            borderColor: ["muted", "muted"],
            ml: "auto",
            mr: ["auto", 0],
            pt: ["20px", 0],
            pr: [0, 3],
            flexDirection: "column",
            width: ["90vw", "10vw"],
            display: ["none", "block"],
        }}>
            <Box sx={{
                width: "10vw",
                display: "flex",
            }}>
                <Image src="/static/self.jpg" width={100} height={100} alt="Neel Redkar" style={{
                    width: "8vw",
                    height: "8vw",
                    borderRadius: "50%",
                    justifySelf: "center",
                    marginTop: "10px",
                    marginBottom: "10px",
                    marginRight: "auto",
                    marginLeft: "auto",
                }} />
            </Box>
            {
                [["Hello!", "/"], ["Notebook", "https://notebook.neelr.dev"], ["Résume", "/resume.pdf"]].map((item, index) => {
                    return (
                        <ActiveLink href={item[1] ?? `/${item[0].toLowerCase() === "home" ? "" : item[0].toLowerCase()
                            }`} active={active === index} key={index}>
                            {item[0]}
                        </ActiveLink>
                    )
                })
            }
            <hr />
            <A target="_blank" href="https://github.com/neelr">github</A> / <A target="_blank" href="https://twitter.com/_neelr_">twitter</A> / <A target="_blank" href="https://www.linkedin.com/in/neelr01/">linkedin</A> / <A target="_blank" href="https://www.instagram.com/neelr01/">insta</A> / <A target="_blank" href="https://www.facebook.com/neel.redkar.16/">facebook</A>
        </Box>
        <Box sx={{
            borderBottom: "1px solid",
            borderColor: "muted",
            ml: "auto",
            mr: "auto",
            pt: "20px",
            width: "90vw",
            display: ["flex", "none"],
            mb: "10px",
            pb: "10px",
            flexDirection: "column",
        }}>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
                {
                    [["Hello!", "/"], ["Projects"], ["Notebook", "https://notebook.neelr.dev"], ["Résume"]].map((item, index, a) => {
                        return (<Box sx={{ display: "flex" }} key={index}>
                            <ActiveLink href={item[1] ?? `/${item[0].toLowerCase() === "home" ? "" : item[0].toLowerCase()
                                }`} active={active === index}>
                                {item[0]}
                            </ActiveLink>
                            {index !== a.length - 1 ? <Text sx={{ px: "10px" }}>/</Text> : null}
                        </Box>
                        )
                    })
                }
            </Box>
            <span>
                <A target="_blank" href="https://github.com/neelr">github</A> / <A target="_blank" href="https://twitter.com/_neelr_">twitter</A> / <A target="_blank" href="https://www.linkedin.com/in/neelr01/">linkedin</A> / <A target="_blank" href="https://www.instagram.com/neelr01/">insta</A> / <A target="_blank" href="https://www.facebook.com/neel.redkar.16/">facebook</A>
            </span>
        </Box>
    </>
    )
}

let ActiveLink: FC<Children> = ({ children, href, active = false }) => {
    return (
        <Box>
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