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
            setSellerRequests((prevRequests) =>
                prevRequests.filter((request) => request._id !== sellerId)
            );
            alert('Seller request approved!');
        } catch (error) {
            console.error('Error approving seller request:', error);
            alert('Failed to approve seller request.');
        }
    };

    const handleReject = async (sellerId) => {
        try {
            await axios.delete(`http://localhost:3020/sellerRequests/reject/${sellerId}`);
            setSellerRequests((prevRequests) =>
                prevRequests.filter((request) => request._id !== sellerId)
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
                {sellerRequests.length > 0 ? (
                    <div className="sellers-list">
                        {sellerRequests.map((request) => (
                            <div key={request._id} className="seller-request-card">
                                <p>
                                    <strong>Name:</strong> {request.username}
                                </p>
                                <p>
                                    <strong>Shop Name:</strong> {request.shopname}
                                </p>
                                <p>
                                    <strong>Email:</strong> {request.email}
                                </p>
                                <div>
                                    <button
                                        onClick={() => handleApprove(request._id)}
                                        className="approve-button"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => handleReject(request._id)}
                                        className="reject-button"
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="empty-message">No seller requests found.</p>
                )}
            </div>
        </div>
    );
}

export default SellerRequests1;
