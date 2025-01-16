import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
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
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            
            <h2>Seller Requests</h2>
            <table>
                <thead>
                    <tr>
                        <th>Seller ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
               
            </table>
        </div>
    );
}

export default AdminDashboard;
