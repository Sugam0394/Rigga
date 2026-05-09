import { useState } from "react";
import axios from "axios";

const Proof = () => {
  const [proofUrl, setProofUrl] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ correct key
  const taskBoxId = localStorage.getItem("activeTaskBoxId");

  const handleSubmit = async () => {
    if (!proofUrl) return alert("Enter proof URL");
    if (!taskBoxId) return alert("Task not found");

    setLoading(true);

    try {
      const res = await axios.post(
        `/api/${taskBoxId}/submit-proof`, // ✅ correct endpoint
        {
          proofUrl: proofUrl,
        }
      );

      setResponse(`Status: ${res.data.status}`);
    } catch (err) {
      console.error(err);
      setResponse("Submission failed");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Submit Proof</h2>

      <input
        type="text"
        placeholder="Paste image URL..."
        value={proofUrl}
        onChange={(e) => setProofUrl(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
        }}
      />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Submitting..." : "Submit Proof"}
      </button>

      <p>{response}</p>
    </div>
  );
};

export default Proof;