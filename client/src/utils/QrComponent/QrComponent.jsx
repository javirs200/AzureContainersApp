import React, { useState } from "react";
import { Button } from "@mui/material";
import QRCode from "react-qr-code";

const QrComponent = ({ url }) => {

    const [show, setShow] = useState(false)

    if (!url) {
        url = 'http://192.168.1.144:80/'
    }

    return (
        <>
            <Button variant="text" onClick={() => { setShow(!show) }}>
                Share!!
            </Button>
            {show ?
                <section className="qrcode_section">
                    < h1 > Share this app</h1 >
                    <div className="qrcode_container" style={{ background: 'white', padding: '16px' }}>
                        <QRCode value={url} size={300} />
                    </div>
                </section >
                : ''}
        </>
    )


}
export default QrComponent