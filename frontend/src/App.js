import { useState } from "react";

function App() {
  const [preference, setPreference] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call backend AI recommendation API
    const res = await fetch("http://localhost:5000/recommend-ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ preference })
    });

    const data = await res.json();
    setRecommendations(data);
  };

  return (
    <div style={{
      maxWidth: "700px",
      margin: "50px auto",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      textAlign: "center",
      backgroundColor: "#f0f4f8",
      padding: "30px",
      borderRadius: "12px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
    }}>
      <h1 style={{ color: "#1a73e8", marginBottom: "20px" }}>
        Product Recommendation System
      </h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
        <input
          type="text"
          value={preference}
          onChange={(e) => setPreference(e.target.value)}
          placeholder="Enter preference (e.g., phone under $500)"
          style={{
            width: "70%",
            padding: "12px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
        />
        <button
          type="submit"
          style={{
            padding: "12px 20px",
            marginLeft: "10px",
            backgroundColor: "#1a73e8",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Get Recommendations
        </button>
      </form>

      <h2 style={{ color: "#333", marginBottom: "20px" }}>Recommended Products</h2>
      {recommendations.length === 0 ? (
        <p style={{ color: "#666" }}>No recommendations yet.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
          {recommendations.map((p, index) => (
            <div key={index} style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "12px",
              width: "200px",
              boxShadow: "0 3px 10px rgba(0,0,0,0.1)"
            }}>
              <h3 style={{ color: "#1a73e8", marginBottom: "10px" }}>{p.name}</h3>
              <p style={{ fontSize: "18px", fontWeight: "bold" }}>${p.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
