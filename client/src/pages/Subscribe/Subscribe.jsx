import { useState } from "react";
import { useNavigate } from "react-router-dom";

 import api from "../../services/api";
 import { useAuth } from "../../context/AuthContext";

const Subscribe = () => {
  const navigate = useNavigate();

  const { refreshUser } = useAuth();

  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    try {
      setLoading(true);

      // CREATE ORDER
      const { data } = await api.post("/create-order");

      const { orderId, razorpayKey } = data;

      // OPEN RAZORPAY
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
          }
        },

        theme: {
          color: "#f97316",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.log("SUBSCRIPTION ERROR:", error);

      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          RIGGA PRO
        </h1>

        <div className="space-y-4 mb-8 text-zinc-300">
          <p>✓ 20+ premium challenges</p>
          <p>✓ Photo leak consequences</p>
          <p>✓ Family WhatsApp escalation</p>
          <p>✓ AI proof verification</p>
          <p>✓ Real accountability</p>
        </div>

        <div className="border border-orange-500 rounded-xl p-6 text-center">
          <h2 className="text-4xl font-bold mb-2">
            ₹199
          </h2>

          <p className="text-zinc-400 mb-6">
            per month
          </p>

          <button
            onClick={handleSubscribe}
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 transition-all py-3 rounded-xl font-semibold"
          >
            {loading ? "Processing..." : "Subscribe Now →"}
          </button>
        </div>

        <button
          onClick={() => navigate("/challenges")}
          className="mt-6 text-zinc-400 hover:text-white transition-all"
        >
          ← Back to challenges
        </button>
      </div>
    </div>
  );
};

export default Subscribe;