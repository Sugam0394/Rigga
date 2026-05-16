 import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

import "./Subscribe.css";

const Subscribe = () => {
  const navigate = useNavigate();

  const { user, refreshUser } = useAuth();

  const [loading, setLoading] = useState(false);

  // ALREADY PAID USER
  if (user?.subscriptionStatus === "paid") {
    return (
      <div className="subscribe-page">
        <div className="subscribe-card">
          <h1 className="subscribe-title">
            Already Pro!
          </h1>

          <p className="subscribe-month">
            You already have an active premium subscription.
          </p>

          <button
            onClick={() => navigate("/challenges")}
            className="subscribe-btn"
          >
            Back to Challenges
          </button>
        </div>
      </div>
    );
  }

  const handleSubscribe = async () => {
    try {
      setLoading(true);

      // CREATE ORDER
      const { data } = await api.post("/create-order");

      const { orderId, razorpayKey } = data;

      // CHECK RAZORPAY SDK
      if (!window.Razorpay) {
        alert("Razorpay SDK failed to load");

        setLoading(false);

        return;
      }

      // RAZORPAY OPTIONS
      const options = {
        key: razorpayKey,
        amount: 19900,
        currency: "INR",
        name: "Rigga Pro",
        description: "Premium Subscription",
        order_id: orderId,

        handler: async function (response) {
          try {
            // VERIFY PAYMENT
            await api.post("/verify", response);

            // REFRESH USER
            await refreshUser();

            // REDIRECT
            navigate("/challenges");
          } catch (error) {
            console.log("VERIFY ERROR:", error);

            alert("Payment verification failed");
          } finally {
            setLoading(false);
          }
        },

        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },

        theme: {
          color: "#f97316",
        },
      };

      // OPEN RAZORPAY
      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.log("SUBSCRIPTION ERROR:", error);

      alert("Something went wrong");

      setLoading(false);
    }
  };

  return (
    <div className="subscribe-page">
      <div className="subscribe-card">
        <h1 className="subscribe-title">
          RIGGA PRO
        </h1>

        <div className="subscribe-features">
          <p>✓ 20+ premium challenges</p>

          <p>✓ Photo leak consequences</p>

          <p>✓ Family WhatsApp escalation</p>

          <p>✓ AI proof verification</p>

          <p>✓ Real accountability</p>
        </div>

        <div className="subscribe-pricing">
          <h2 className="subscribe-price">
            ₹199
          </h2>

          <p className="subscribe-month">
            per month
          </p>

          <button
            onClick={handleSubscribe}
            disabled={loading}
            className="subscribe-btn"
          >
            {loading
              ? "Processing..."
              : "Subscribe Now →"}
          </button>
        </div>

        <button
          onClick={() => navigate("/challenges")}
          className="back-btn-subscribe"
        >
          ← Back to challenges
        </button>
      </div>
    </div>
  );
};

export default Subscribe;




 