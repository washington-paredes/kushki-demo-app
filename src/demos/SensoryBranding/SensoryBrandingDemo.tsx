import {requestInitCardBrandingAnimation} from "@kushki/js-sdk/CardAnimation";
import {useState} from "react";

export const SensoryBrandingDemo = () => {
    const [disableMcButton, setDisableMcButton] = useState<boolean>(false);
    const [disableVisaButton, setDisableVisaButton] = useState<boolean>(false);
    const [mcError, setMcError] = useState<string>("");
    const [visaError, setVisaError] = useState<string>("");

    const onRequestMcBrandAnimation = async () => {
        setDisableMcButton(true);
        setMcError("");

        try {
            await requestInitCardBrandingAnimation({
                background: "",
                brand: "mastercard",
                sonicCue: "",
                type: ""
            });
        } catch (error: any) {
            setMcError(error.message);
        } finally {
            setDisableMcButton(false);
        }
    };

    const onRequestVisaBrandAnimation = async () => {
        setDisableVisaButton(true);
        setVisaError("");

        try {
            await requestInitCardBrandingAnimation({
                brand: "visa",
                checkmark: true,
                checkmarkTextOption: "",
                color: "",
                constrained: true,
                languageCode: "",
                sound: true
            });
        } catch (error: any) {
            setVisaError(error.message);
        } finally {
            setDisableVisaButton(false);
        }
    };

    return (
        <div>
            <h3 className={"title-demo"}>Request Brand Animation</h3>
            <div className="mui-container-fluid">
                <h3>MasterCard</h3>
                <div className="mui-row">
                    <div className="mui-col-md-12 text-center">
                        <button
                            className={"mui-btn mui-btn--primary demo-button-xs"}
                            disabled={disableMcButton}
                            onClick={onRequestMcBrandAnimation}
                        >
                            MasterCard Animación
                        </button>
                    </div>
                </div>
            </div>
            <div className={"animation-container"}>
                {disableMcButton && <div id="mastercard-sensory-branding"/>}
                {mcError && <p>{mcError}</p>}
            </div>
            <div className="mui-container-fluid">
                <h3>Visa</h3>
                <div className="mui-row">
                    <div className="mui-col-md-12 text-center">
                        <button
                            className={"mui-btn mui-btn--primary demo-button-xs"}
                            disabled={disableVisaButton}
                            onClick={onRequestVisaBrandAnimation}
                        >
                            Visa Animación
                        </button>
                    </div>
                </div>
            </div>
            <div className={"animation-container"}>
                {disableVisaButton && <div id="visa-sensory-branding"/>}
                {visaError && <p>{visaError} </p>}
            </div>
        </div>
    );
};
