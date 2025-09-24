import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import UserForm from "../components/userform.jsx";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios.interceptors.request.use(
      config => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    fetchUsers();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/auth/users");
      setUsers(res.data);
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem("token");
        navigate("/login");
      }
      console.error("Error fetching users:", err);
      setMessage("Error loading users");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (form) => {
    try {
      await axios.post("http://localhost:5000/api/auth/add-user", form);
      setMessage("User added successfully");
      fetchUsers();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Error adding user:", err);
      setMessage(err.response?.data?.error || "Error adding user");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    
    try {
      await axios.delete(`http://localhost:5000/api/auth/users/${id}`);
      setMessage("User deleted successfully");
      fetchUsers();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Error deleting user:", err);
      setMessage("Error deleting user");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2 className="dashboard-title">User Management Dashboard</h2>
        <div className="dashboard-actions">
          <Link to="/login" className="btn btn-secondary">Login</Link>
          <Link to="/signup" className="btn btn-secondary">Signup</Link>
          <button onClick={handleLogout} className="btn btn-logout">Logout</button>
        </div>
      </div>

      {message && (
        <div className={message.includes("Error") ? "error-message" : "success-message"}>
          {message}
        </div>
      )}

      <div className="card mb-3">
        <UserForm onSubmit={handleAdd} />
      </div>

      <div className="user-list">
        <div className="user-list-header">
          <h3>Users List ({users.length} users)</h3>
        </div>
        
        <div className="user-list-content">
          {loading ? (
            <div className="text-center">Loading users...</div>
          ) : users.length === 0 ? (
            <div className="text-center">No users found</div>
          ) : (
            users.map((user) => (
              <div key={user._id} className="user-item">
                <div className="user-info">
                  <div className="user-name">{user.name}</div>
                  <div className="user-email">{user.email}</div>
                </div>
                <button 
                  onClick={() => handleDelete(user._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}