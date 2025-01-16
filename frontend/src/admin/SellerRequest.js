import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './sellerRequest.css';

function SellerRequests1() {
    const [sellerRequests, setSellerRequests] = useState([]);

    useEffect(() => {
        async function fetchRequests() {
            try {
                const response = await axios.get('http://localhost:3020/sellerRequests');
                setSellerRequests(response.data);
            } catch (error) {
                console.error('Error fetching seller requests:', error);
            }
        }

        fetchRequests();
    }, []);

    const handleApprove = async (sellerId) => {
        try {
            await axios.post(`http://localhost:3020/sellerRequests/approve`, { sellerId });
            setSellerRequests((prev) =>
                prev.filter((request) => request.id !== sellerId)
            );
            alert('Seller request approved!');
        } catch (error) {
            console.error('Error approving seller request:', error);
            alert('Failed to approve seller request.');
        }
    };

    const handleReject = async (sellerId) => {
        try {
            await axios.post(`http://localhost:3020/sellerRequests/reject`, { sellerId });
            setSellerRequests((prev) =>
                prev.filter((request) => request.id !== sellerId)
            );
            alert('Seller request rejected!');
        } catch (error) {
            console.error('Error rejecting seller request:', error);
            alert('Failed to reject seller request.');
        }
    };

    return (
        <div className="seller-requests-container">
            <div className="seller-requests">
                <h1>Seller Requests</h1>
                <table>
                    <thead>
                        <tr>
                           
                            <th>Name</th>
                            <th>Shop Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sellerRequests.map((request) => (
                            <tr key={request.id}>
                                
                                <td>{request.username}</td>
                                <td>{request.shopname}</td>
                                <td>{request.email}</td>
                                <td>
                                    <button onClick={() => handleApprove(request.id)}>Approve</button>
                                    <button onClick={() => handleReject(request.id)}>Reject</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SellerRequests1;
