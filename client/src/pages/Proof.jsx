 import { useState } from "react";
import axios from "axios";

const API = "http://localhost:3000/api";

const Proof = () => {
  const [proofUrl, setProofUrl] = useState("");
  const [response, setResponse] = useState("");

  const taskId = localStorage.getItem("taskId");

  const handleSubmit = async () => {
    if (!proofUrl) return alert("Enter proof URL");

    try {
      const res = await axios.post(
        `${API}/${taskId}/submit-proof`,
        {
          proofUrl: proofUrl
        }
      );

      setResponse(`Status: ${res.data.status}`);
    } catch (err) {
      console.log(err);
      setResponse("Submission failed");
    }
  };

  return (
    <div>
      <h2>Submit Proof</h2>

      <input
        type="text"
        placeholder="Paste image URL..."
        value={proofUrl}
        onChange={(e) => setProofUrl(e.target.value)}
      />

      <button onClick={handleSubmit}>
        Submit Proof
      </button>

      <p>{response}</p>
    </div>
  );
};

export default Proof;