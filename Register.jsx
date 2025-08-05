import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function Register() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <PayPalScriptProvider options={{ "client-id": "YOUR_PAYPAL_CLIENT_ID" }}>
        <PayPalButtons
          style={{ layout: "horizontal" }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [{ amount: { value: "30.00" } }],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then(details => {
              alert("Payment completed by " + details.payer.name.given_name);
            });
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}

export default Register;