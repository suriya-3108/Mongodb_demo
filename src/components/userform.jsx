import { useState } from "react";

export default function UserForm({ onSubmit }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields including password");
      return;
    }
    
    setIsSubmitting(true);
    try {
      await onSubmit(form);
      setForm({ name: "", email: "", password: "" });
    } catch (error) {
      console.error("Error in form submission:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h3 style={{marginBottom: '1.5rem', color: '#2c3e50'}}>Add New User</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            placeholder="Full name"
            className="form-input"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        
        <div className="form-group">
          <input
            type="email"
            placeholder="Email address"
            className="form-input"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
        
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            className="form-input"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding User..." : "Add User"}
        </button>
      </form>
    </div>
  );
}