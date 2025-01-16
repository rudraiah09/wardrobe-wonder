const SellerRequest = require('../models/sellerRequestSchema');
const Seller = require('../models/sellerSchema');

// Create seller request
async function createSellerRequest(req, res) {
    try {
        const { username, email, password, shopname } = req.body;

        if (!username || !email || !password || !shopname) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const existingRequest = await SellerRequest.findOne({ email });
        const existingSeller = await Seller.findOne({ email });

        if (existingRequest || existingSeller) {
            return res.status(400).json({ message: "Email is already in use." });
        }

        const newRequest = new SellerRequest({ username, email, password, shopname });
        await newRequest.save();
        res.status(201).json({ message: "Seller request submitted successfully." });
    } catch (error) {
        console.error("Error creating seller request:", error);
        res.status(500).json({ message: "Server error", error });
    }
}

// Fetch all seller requests
async function getSellerRequests(req, res) {
    try {
        console.log("seller re  ")
        const requests = await SellerRequest.find();
        res.status(200).json(requests);
    } catch (error) {
        console.error("Error fetching seller requests:", error);
        res.status(500).json({ message: "Server error", error });
    }
}

// Approve seller request
   

async function approveSellerRequest(req, res)  {
    try {
        const { id } = req.params;
        
   console.log(id);
        // Find the seller request by ID
        const request = await SellerRequest.findById(id);
        // Mark the seller request as approved
      

        // Now, create a new seller entry based on the approved seller request
        const newSeller = new Seller({
            username: request.username,
            email: request.email,
            password: request.password,  // Assuming password is already hashed before saving
            shopname: request.shopname,
            products: [], // Default empty array for products, this can be updated later
        });

        // Save the new seller
        await newSeller.save();

        // Optionally, you can delete the seller request if you no longer need it
        await SellerRequest.findByIdAndDelete(id);

        res.json({ message: "Seller request approved and seller created successfully" });
    } catch (error) {
        console.error('Error approving seller request:', error);
        res.status(500).json({ message: "Error approving seller request" });
    }
};



// Reject seller request
async function rejectSellerRequest(req, res) {
    const { id } = req.params;
    console.log(id);

    try {
        const request = await SellerRequest.findById(id);

        if (!request) {
            return res.status(404).json({ message: "Seller request not found." });
        }

        await SellerRequest.findByIdAndDelete(id);
        res.status(200).json({ message: "Seller request rejected successfully." });
    } catch (error) {
        console.error("Error rejecting seller request:", error);
        res.status(500).json({ message: "Server error", error });
    }
}



module.exports = {
    createSellerRequest,
    getSellerRequests,
    approveSellerRequest,
    rejectSellerRequest,
};
