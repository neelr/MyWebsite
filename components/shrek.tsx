'use client';

import { useEffect, useState } from "react";

export default function Shrek() {
    let [keys, updateKeys] = useState([""])
    useEffect(() => {
        // check if user typed in "shrek"
        const listener = (event: KeyboardEvent) => {
            let newKeys = keys.concat([event.key]).slice(-5);
            if (newKeys.join("") === "shrek")
                document.body.innerHTML = "<div style='height:100vh;width:100vw;display:flex;'><img src='/yes.svg' style='height:100vh; margin-right:auto;margin-left:auto;'/></div>";
            updateKeys(newKeys);
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    }, [keys]);
    return <></>;
}