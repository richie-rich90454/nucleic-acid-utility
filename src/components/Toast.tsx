import React, {useState, useEffect} from "react";
export default function Toast(){
    let [message, setMessage]=useState<string>("");
    let [visible, setVisible]=useState<boolean>(false);
    useEffect(()=>{
        function handleToast(e: Event){
            let detail=(e as CustomEvent).detail as string;
            setMessage(detail);
            setVisible(true);
            setTimeout(()=> setVisible(false), 2500);
        }
        window.addEventListener("show-toast", handleToast);
        return ()=> window.removeEventListener("show-toast", handleToast);
    }, []);
    return (
        <div id="toast" className={`toast${visible?" toast-visible":""}`} role="status" aria-live="polite">
            {message}
        </div>
    );
}