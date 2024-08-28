const express = require('express');
const axios = require('axios');
const cors = require('cors');  

const app = express();
const port = 3001;
app.use(cors());
app.get('/ratings', async (req, res) => {
  try {
    const response = await axios.get('https://clist.by/coder/manojkumar2412/ratings/');
    
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});