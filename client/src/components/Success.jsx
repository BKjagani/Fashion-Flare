import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { getCart } from "../services/cartApi";
import { verifyPayment } from "../services/paymentApi";

function Success() {
  const { isLoaded, user } = useUser();
  const location = useLocation();
  const sessionIdFromURL = new URLSearchParams(location.search).get("session_id");
  const [sessionId, setSessionId] = useState(sessionIdFromURL)

  useEffect(() => {
    async function fetchOrder() {
      try {
        const userEmail = user.primaryEmailAddress.emailAddress;
        if (!userEmail || !sessionId) return;
        const usedSessions = JSON.parse(localStorage.getItem("usedSessions")) || [];
        if (usedSessions.includes(sessionId)) return;

        const response = await getCart({ userEmail });
        console.log(response)
        await verifyPayment({ sessionId, userEmail });
        setSessionId(null)
        localStorage.setItem(
          "usedSessions",
          JSON.stringify([...usedSessions, sessionId])
        );
      } catch (error) {
        console.log(error);
      }
    }
    if (sessionId) {
      fetchOrder();
    }
  }, [isLoaded, sessionId, user]);

  if (!isLoaded) return <h1>Loading...</h1>;
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center success-page">
      <div className="card success-card text-center p-4 shadow-lg">
        <h2 className="text-success mb-3">🎉 Payment Successful!</h2>
        <p className="mb-4">
          Thank you for your purchase. Your payment was processed successfully.
        </p>
        <Link to="/" className="btn btn-primary">
          Go to Home
        </Link>
      </div>
    </div>
  );
}

export default Success;
