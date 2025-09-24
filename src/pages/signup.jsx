import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      await axios.post("http://localhost:5000/api/auth/signup", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed. Please try again.");
      console.error("Signup error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Create Account</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            placeholder="Full name"
            className="form-input"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        
        <div className="form-group">
          <input
            type="email"
            placeholder="Email address"
            className="form-input"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
        
        <div className="form-group">
          <input
            type="password"
            placeholder="Create password"
            className="form-input"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>
        
        <button 
          type="submit"
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </button>
      </form>
      
      <p className="text-center mt-2">
        Already have an account? <Link to="/login" style={{color: '#3498db', textDecoration: 'none'}}>Login here</Link>
      </p>
    </div>
  );
}