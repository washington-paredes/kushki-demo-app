import {init} from "@kushki/js-sdk";
import {requestBrandsByMerchant} from "@kushki/js-sdk/Card";
import {useState} from "react";

export const preStyle = {
    background: "#1e2024",
    color: "white",
    padding: "10px",
    "border-radius": "10px",
    "white-space": "pre-wrap",
};

export const BrandsByMerchantDemo = () => {
    const [response, setResponse] = useState<string>("")
    const onRequestBrandsByMerchant = async () => {
        try {
            const kushki = await init({
                inTest: true,
                publicCredentialId: "fb1155b79d114e03954be689f3af2ad2"
            })
            const response = await requestBrandsByMerchant(kushki)

            setResponse(JSON.stringify(response))
        } catch (e: any) {
            setResponse(e.message)
        }
    }

    return <div>
        <h1>KUSHKI V2 brands by merchant</h1>
        <button type="button" onClick={onRequestBrandsByMerchant}>
            RequestBrandsByMerchant
        </button>
        <pre style={preStyle}>{response}</pre>
    </div>
}
