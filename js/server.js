const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.get('/api/github', async (req, res) => {
    try {
        const response = await axios.get('https://api.github.com/some-endpoint', {
            headers: {
                'Authorization': `token YOUR_GITHUB_TOKEN`
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching from GitHub');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const cors = require('cors');
app.use(cors());