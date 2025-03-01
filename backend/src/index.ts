import express, { Application } from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT;
const BASE_URL = process.env.BASE_URL;

app.use(cors());
app.use(express.json());

app.get('/recipes', async (req, res) => {
    try {
        const { ingredient, country, category } = req.query;
        let url = `${BASE_URL}/search.php?s=`;

        if (ingredient) url = `${BASE_URL}/filter.php?i=${ingredient}`;
        if (country) url = `${BASE_URL}/filter.php?a=${country}`;
        if (category) url = `${BASE_URL}/filter.php?c=${category}`;

        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch recipes'});
    }
});

app.get('/recipe/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const url = `${BASE_URL}/lookup.php?i=${id}`;
    
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch recipe details' });
    }   
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});