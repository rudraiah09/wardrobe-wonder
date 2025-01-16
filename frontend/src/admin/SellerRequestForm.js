import { useState } from 'react';
import axios from 'axios';
import './SellerRequestForm.css';


function SellerRequestForm() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        shopname: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Submitting data:", formData); // Debug: Log form data
            const response = await axios.post('http://localhost:3020/sellerRequest', formData);
            console.log("Response:", response.data); // Debug: Log response
            setMessage(response.data.message);
        } catch (error) {
            console.error("Error:", error.response || error.message); // Debug: Log detailed error
            if (error.response && error.response.data.message) {
                setMessage(error.response.data.message);
            } else {
                setMessage('An error occurred. Please try again.');
            }
        }
    };
    

    return (
        <div className='center-container'>
        <div className="seller-request-form">
            <h2>Seller Request Form</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="shopname"
                    placeholder="Shop Name"
                    value={formData.shopname}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Submit Request</button>
            </form>
        </div>
        </div>
    );
}

export default SellerRequestForm;
