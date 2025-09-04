import { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';

function Form() {
  // State to hold form input values
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    age: '',
    password: ''
  });

  const navigate = useNavigate();
  const { id } = useParams(); // Get user ID from route params (used for update)

  /**
   * Fetch user data from backend when updating
   * Only runs if 'id' exists (update scenario)
   */
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`/api/v1/user/getUser/${id}`);
      setFormData(response.data.data); // Populate form with existing user data
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to fetch user data");
    }
  };

  // State to track form submission status (for loading / disabled state)
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Handles input change for all form fields
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  /**
   * Handles form submission for both add and update
   * Uses PUT if 'id' exists (update), otherwise POST (add)
   * @param {Event} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const apiCall = id
      ? axios.put(`/api/v1/user/updateUser/${id}`, formData) // Update existing user
      : axios.post('/api/v1/user/addUser', formData);       // Add new user

    apiCall
      .then(response => {
        console.log('Success:', response.data);
        toast.success(response.data.message || "Operation completed successfully");
        navigate("/"); // Redirect to home after success
      })
      .catch(error => {
        if (error.response) {
          console.log('Backend says:', error.response.data.message);
          console.log('Status code:', error.response.status);
          toast.error(error.response.data.message || "Something went wrong");
        } else {
          console.log('Network error:', error.message);
          toast.error("Network error occurred");
        }
      })
      .finally(() => {
        setIsSubmitting(false); // Reset submission state
      });
  };

  /**
   * Fetch user data when component mounts or when 'id' changes
   * Ensures correct form data is shown for update scenarios
   */
  useEffect(() => {
    if (id) {
      fetchUserData();
    }
  }, [id]); // Depend on 'id' so effect re-runs if route param changes

  return (
    <div className="h-[600px] bg-background flex items-center justify-center p-6 mt-15">
      {/* Form container */}
      <div className="bg-card border border-border rounded-lg shadow-lg p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Add yourself to USERS</h2>
          <p className="text-muted-foreground">Join us and be part of our community</p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Your public display name"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full h-12 px-4 py-3 bg-input border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-all duration-200"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full h-12 px-4 py-3 bg-input border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-all duration-200"
            />
          </div>

          {/* Age */}
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-foreground mb-2">
              Age
            </label>
            <input
              id="age"
              name="age"
              type="number"
              placeholder="Your age"
              value={formData.age}
              onChange={handleChange}
              required
              className="w-full h-12 px-4 py-3 bg-input border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-all duration-200"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Create a secure password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full h-12 px-4 py-3 bg-input border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-all duration-200"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-md transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-6"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
                Submitting...
              </div>
            ) : (
              'Submit'
            )}
          </button>
        </div>

        {/* Footer */}
      </div>
    </div>
  );
}

export default Form;