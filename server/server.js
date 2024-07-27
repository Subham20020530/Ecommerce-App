const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.post("/contact", (req, res) => {
  const { name, phone, email, address, message } = req.body;

  console.log("Form data received:", { name, phone, email, address, message });

  res.status(200).json({ message: "Form submitted successfully!" });
});

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  try {
    const amount = calculateOrderAmount(items);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error.message);
    res.status(500).json({ error: "Unable to create payment intent" });
  }
});

const calculateOrderAmount = (items) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
