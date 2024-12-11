/** @format */

import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useEffect } from "react";
import { apiCreateOrder } from "../../apis";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import path from "../../ultils/path";

// This value is from the props in the UI
const style = { layout: "vertical" };

// function createOrder() {
//   // replace this url with your server
//   return fetch(
//     "https://react-paypal-js-storybook.fly.dev/api/paypal/create-order",
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       // use the "body" param to optionally pass additional order information
//       // like product ids and quantities
//       body: JSON.stringify({
//         cart: [
//           {
//             sku: "1blwyeo8",
//             quantity: 2,
//           },
//         ],
//       }),
//     }
//   )
//     .then((response) => response.json())
//     .then((order) => {
//       // Your code here after create the order
//       return order.id;
//     });
// }
// function onApprove(data) {
//   // replace this url with your server
//   return fetch(
//     "https://react-paypal-js-storybook.fly.dev/api/paypal/capture-order",
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         orderID: data.orderID,
//       }),
//     }
//   )
//     .then((response) => response.json())
//     .then((orderData) => {
//       // Your code here after capture the order
//     });
// }

// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({
  showSpinner,
  currency,
  amount,
  payload,
  setIsSuccessed,
}) => {
  const [{ isPending, options }, dispatch] = usePayPalScriptReducer();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, amount]);
  const handleSaveOrder = async () => {
    const res = await apiCreateOrder(payload);
    if (res.success) {
      setIsSuccessed(true);
      Swal.fire("Congrat !", "Order was created.", "success").then(() => {
        navigate(`/${path.MEMBER}/${path.HISTORY}`);
        setIsSuccessed(false);
      });
    }
  };

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[style, currency, amount]}
        fundingSource={undefined}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                { amount: { currency_code: currency, value: amount } },
              ],
            })
            .then((orderID) => orderID);
        }}
        onApprove={(data, actions) =>
          actions.order.capture().then((res) => {
            if (res.status === "COMPLETED") {
              handleSaveOrder();
            }
          })
        }
      />
    </>
  );
};

export default function Paypal({ amount, payload, setIsSuccessed }) {
  return (
    <div style={{ maxWidth: "750px", minHeight: "200px" }}>
      <PayPalScriptProvider
        options={{
          clientId:
            "AWoa_OVd7p_xCJArsUtsxEpy3AAslLV9zNqMS1drgFl953hGjYL2G2_hVpch6pPoUm8pVAhASgmObftr",
          components: "buttons",
          currency: "USD",
        }}
      >
        <ButtonWrapper
          payload={payload}
          currency={"USD"}
          amount={amount}
          showSpinner={false}
          setIsSuccessed={setIsSuccessed}
        />
      </PayPalScriptProvider>
    </div>
  );
}
