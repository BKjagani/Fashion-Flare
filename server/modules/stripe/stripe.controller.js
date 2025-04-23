import Stripe from "stripe";
import "dotenv/config";
import Order from "../order/order.model.js";
import Cart from "../cart/Cart.model.js";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const checkoutSession = async (req, res) => {
  try {
    const { price, email } = req.body;
    const cart = await Cart.find({userEmail : email})
    const simplifiedCart = cart.map((item) => ({
        productId: item.product._id.toString(),
        quantity: item.quantity,
      }));
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Total Price",
            },
            unit_amount: parseFloat(price) * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: email,
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
      metadata : {cart : JSON.stringify(simplifiedCart),}
    });
    return res.status(200).json({ id: session.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "stripe checkout error" });
  }
};

const verifySession = async (req, res) => {
  try {
    const { sessionId, userEmail } = req.body;
    
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const productList = JSON.parse(session.metadata.cart);
    if (session.payment_status === "paid") {
      const response = await Order.create({
        userEmail,
        products : productList,
        totalAmount: session.amount_total / 100, // in INR
        paymentId: session.id,
        status: "paid",
        createdAt: new Date(),
      });
      await Cart.deleteMany({ userEmail });
      return res
        .status(200)
        .json({ message: "Order saved successfully", response });
    } else {
      return res.status(400).json({ message: "Payment not completed" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "server error" });
  }
};

export { checkoutSession, verifySession };
