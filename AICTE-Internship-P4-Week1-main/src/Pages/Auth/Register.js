// ImprovedSignupPage.js (Enhancements applied without modifying the original file)
import Register from "./SignupPage";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { registerAPI } from "../../utils/ApiRequest";

const EnhancedRegister = () => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = values;
    
    if (!name || !email || !password) {
      toast.error("All fields are required!");
      return;
    }
    
    setLoading(true);
    try {
      const { data } = await axios.post(registerAPI, { name, email, password });
      
      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success("Registration Successful!");
        window.location.href = "/";
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return <Register handleChange={handleChange} handleSubmit={handleSubmit} values={values} loading={loading} />;
};

export default EnhancedRegister;
