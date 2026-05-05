import { useState } from "react";
import axios from "axios";

const Proof = () => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState("");

  const handleSubmit = async () => {
    if (!file) return alert("Select file first");

    const formData = new FormData();
    formData.append("proof", file);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/proof",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResponse(res.data.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Submit Proof</h2>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={handleSubmit}>Submit Proof</button>

      <p>{response}</p>
    </div>
  );
};

export default Proof;