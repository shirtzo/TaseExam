const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000; 

app.use(express.static('public'));app.get('/', (_, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;