import { useEffect, useState } from "react";

export default function Shrek() {
    let [keys, updateKeys] = useState([""])
    useEffect(() => {
        // check if user typed in "shrek"
        const listener = (event: KeyboardEvent) => {
            keys.push(event.key);
            updateKeys(keys.slice(-5));
            if (keys.join("") === "shrek") {
                document.body.innerHTML = "<div style='height:100vh;width:100vw;display:flex;'><img src='/yes.svg' style='height:100vh; margin-right:auto;margin-left:auto;'/></div>";
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    }, [keys]);
    return <></>;
}