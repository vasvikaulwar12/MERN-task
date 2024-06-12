const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/products', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;

    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const products = response.data;

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const result = products.slice(startIndex, endIndex);

        res.json({
            page,
            limit,
            total: products.length,
            totalPages: Math.ceil(products.length / limit),
            data: result
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data from API' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});