const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files
app.use(express.static('.'));

// API endpoint to get Firebase config
app.get('/api/config', (req, res) => {
  res.json({
    apiKey: process.env.GOOGLE_API_KEY,
    authDomain: "fiscality-a7952.firebaseapp.com",
    projectId: "fiscality-a7952",
    storageBucket: "fiscality-a7952.firebasestorage.app",
    messagingSenderId: "885932899890",
    appId: "1:885932899890:web:77fdf2b50e44e8f701862b"
  });
});

// Serve index.html with Firebase config injected
app.get('/', (req, res) => {
  fs.readFile('index.html', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading file');
    }
    
    // Replace the placeholder API key with the actual one
    const updatedData = data.replace(
      'AIzaSyBVVKhJzO6UtOFH2-7x7x7x7x7x7x7x7x7', 
      process.env.GOOGLE_API_KEY
    );
    
    res.send(updatedData);
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Fiscality server running on http://0.0.0.0:${PORT}`);
});