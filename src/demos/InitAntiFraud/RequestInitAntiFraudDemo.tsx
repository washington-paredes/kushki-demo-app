import {init} from "@kushki/js-sdk";
import {requestInitAntiFraud, SiftScienceObject} from "@kushki/js-sdk/AntiFraud";
import {useState} from "react";
import {preStyle} from "../BrandsByMerchant/BrandsByMerchantDemo.tsx";

export const RequestInitAntiFraud = () => {
    const [disableButton, setDisableButton] = useState<boolean>(false);
    const [response, setResponse] = useState<string>("");

    const onRequestInitAntiFraud = async () => {
        setDisableButton(true);
        setResponse("");

        try {
            const kushkiInstance = await init({
                inTest: true,
                publicCredentialId: "eda2b0b0c5f3426483a678c82cc8a5ef"
            });

            const response: SiftScienceObject = await requestInitAntiFraud(
                kushkiInstance,
                "45423425623321"
            );

            setResponse(JSON.stringify(response));
        } catch (error: any) {
            setResponse(error.message);
        } finally {
            setDisableButton(false);
        }
    };

    return (
        <div>
            <h3 className={"title-demo"}>Request Init AntiFraud</h3>
            <button
                className={
                    "mui-btn mui-btn--primary mui-btn--small button-border action-button"
                }
                disabled={disableButton}
                onClick={onRequestInitAntiFraud}
            >
                requestInitAntiFraud
            </button>
            <pre style={preStyle}>{response}</pre>
        </div>
    );
};
