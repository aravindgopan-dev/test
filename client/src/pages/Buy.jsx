import React, { useState } from 'react';
import { PayPalButtons } from "@paypal/react-paypal-js";

function Buy() {
  const [sliderValue, setSliderValue] = useState(1); // Slider range value (1-100)
  const [credits, setCredits] = useState(1); // Default credit value

  const handleCreditChange = (e) => {
    const value = e.target.value;
    setSliderValue(value);

    // Apply an exponential scaling function to map 1-100 slider value to 1-1000 credits
    const scaledCredits = Math.round(1 + (Math.pow(value / 100, 3) * 999)); // Cubic scaling for rapid growth
    setCredits(scaledCredits);

    // Debugging logs
    console.log("Slider Value:", value);
    console.log("Scaled Credits:", scaledCredits);
  };

  return (
    <div className="p-6 max-w-sm mx-auto bg-base-100 rounded-xl shadow-lg space-y-4">
      <div className="text-xl font-semibold text-center mb-4">Buy Credits</div>
      <div className="text-center text-lg">
        Selected Credits: <span className="font-bold text-secondary">{credits}</span>
      </div>
      <div className="flex justify-center items-center mt-4">
        <input
          type="range"
          min={1}
          max={100}
          value={sliderValue}
          onChange={handleCreditChange}
          className="range range-secondary w-full"
        />
      </div>
      <PayPalButtons 
        style={{ layout: "horizontal" }} 
        createOrder={(data, actions) => {
          console.log("Creating order with amount:", credits.toFixed(2)); // Debugging log
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: credits.toFixed(2), // Ensure this is a string
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          const details = await actions.order.capture();
          console.log("Transaction completed by ", details.payer.name);
        }}
        onError={(err) => {
          console.error("PayPal Checkout onError", err);
        }}
      />
    </div>
  );
}

export default Buy;
