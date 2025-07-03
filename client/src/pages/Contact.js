import './Contact.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    email: '',
    message: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // You can save it later to a backend
    navigate('/');
  };

  return (
    <div className="page contact">
      <h1>Contact Me</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
        <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
        <input type="text" name="contactNumber" placeholder="Contact Number" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required />
        <textarea name="message" placeholder="Your Message" onChange={handleChange} required></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
  
}
