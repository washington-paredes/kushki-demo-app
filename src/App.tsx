import {useEffect, useState} from "react";
import {init, IKushki} from "@kushki/js-sdk";
import {initCardToken, ICard, CardOptions, TokenResponse} from "@kushki/js-sdk/Card";

function App() {
    const [token, setToken] = useState("");
    const [card, setCard] = useState<ICard>();
    const hostedFieldsStyles = {
        container: {
            display: "flex",
        },
        input: {
            fontSize: "12px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            height: "30px",
            width: "300px",
        },
        focus: {
            border: "1px solid #0077ff",
            outline: "none",
        },
        invalid: {
            border: "1px solid #ff0000",
        },
        deferred: {
            border: "1px solid #ccc",
            fontSize: "12px",
            "&#ksh-deferred-checkbox": {
                borderColor: "#ccc"
            },
            "&#ksh-deferred-checkbox>label": {
                fontSize: "12px",
                width: "max-content"
            },
            "&#ksh-deferred-creditType": {
                height: "30px",
                width: "300px",
            },
            "&#ksh-deferred-graceMonths": {
                height: "30px",
                width: "300px",
            },
            "&#ksh-deferred-months": {
                height: "30px",
                width: "300px",
            },
        },
    }
    const options: CardOptions = {
        styles: hostedFieldsStyles,
        fields: {
            cardholderName: {
                fieldType: "cardholderName",
                placeholder: "Card holder name",
                selector: "cardHolderName_id",
            },
            cardNumber: {
                fieldType: "cardNumber",
                placeholder: "Número de tarjeta",
                selector: "cardNumber_id",
            },
            cvv: {
                fieldType: "cvv",
                placeholder: "CVV",
                selector: "cvv_id",
            },
            deferred: {
                fieldType: "deferred",
                placeholder: "Diferido",
                selector: "deferred_id",
            },
            expirationDate: {
                fieldType: "expirationDate",
                placeholder: "Fecha de vencimiento",
                selector: "expirationDate_id",
            }
        },
        currency:"COP",
        amount:{
            iva:100,
            subtotalIva0:1000,
            subtotalIva:1000,
        }
    };

    useEffect(() => {
        //TODO: Change for your public merchant id
        init({inTest: true, publicCredentialId: "{{PUBLIC_MERCHANT_ID}}",})
            .then(async (kushkiInstance: IKushki) =>
                setCard(await initCardToken(kushkiInstance, options)));

    }, []);

    const getToken = () => {
        if (card) {
            card.requestToken().then((token: TokenResponse) => {
                setToken(token.token);
            });
        }
    };

  return (
      <>
          <div>
              <h1>Kushki Fields JS - DEMO</h1>
          </div>
          <div>
              <div id="cardHolderName_id"></div>
              <div id="cardNumber_id"></div>
              <div id="expirationDate_id"></div>
              <div id="cvv_id"></div>
              <div id="deferred_id"></div>
              <button onClick={() => getToken()}>
                  Pagar
              </button>
          </div>

          <hr/>
          <h3 data-testid="token">Token: {token}</h3>
          <hr/>
      </>
  )
}

export default App
