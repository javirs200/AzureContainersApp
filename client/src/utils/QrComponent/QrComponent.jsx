import React, { useState } from "react";
import { Button } from "@mui/material";
import QRCode from "react-qr-code";

const QrComponent = () => {

    const [show, setShow] = useState(false)

    let url = window.location.href

    if (!url) {
        url = 'url no encontrada'
    }

    return (
        <>
            <Button variant="text" onClick={() => { setShow(!show) }}>
                Share!!
            </Button>
            {show ?
                <section className="qrcode_section">
                    < h1 > Share this app</h1 >
                    <div className="qrcode_container">
                        <QRCode value={url} size={300} />
                    </div>
                </section >
                : ''}
        </>
    )


}
export default QrComponent