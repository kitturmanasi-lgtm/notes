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

// Serve index.html with Firebase config and enhancements injected
app.get('/', (req, res) => {
  fs.readFile('index.html', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading file');
    }
    
    // Replace the placeholder API key with the actual one
    let updatedData = data.replace(
      'AIzaSyBVVKhJzO6UtOFH2-7x7x7x7x7x7x7x7x7', 
      process.env.GOOGLE_API_KEY
    );
    
    // Inject Firebase integration and Looker Studio enhancement
    const firebaseIntegration = `
    <script>
    // Firebase Authentication Integration
    document.addEventListener('DOMContentLoaded', function() {
        // Override existing login handler
        const originalHandleLogin = window.handleLogin;
        window.handleLogin = async function() {
            const email = document.getElementById('loginUsername').value.trim();
            const password = document.getElementById('loginPassword').value;
            
            if (!email || !password) {
                showPopup(\`
                    <div class="text-center">
                        <div class="text-4xl mb-4 text-red-500">⚠️</div>
                        <h3 class="text-lg font-semibold mb-2">Missing Information</h3>
                        <p class="text-gray-600">Please enter both email and password</p>
                    </div>
                \`);
                return;
            }
            
            if (window.login) {
                try {
                    const result = await window.login(email, password);
                    if (result && result.success) {
                        hideAllPages();
                        document.getElementById('whoAreYouPage').classList.remove('hidden');
                    }
                } catch (error) {
                    console.error('Login failed:', error);
                    originalHandleLogin(); // Fallback to original
                }
            } else {
                originalHandleLogin(); // Fallback when Firebase not loaded
            }
        };
        
        // Override existing signup handler
        const originalHandleSignUp = window.handleSignUp;
        window.handleSignUp = async function() {
            const email = document.getElementById('signupEmail').value.trim();
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (!email || !password || !confirmPassword) {
                showPopup(\`
                    <div class="text-center">
                        <div class="text-4xl mb-4 text-red-500">⚠️</div>
                        <h3 class="text-lg font-semibold mb-2">Missing Information</h3>
                        <p class="text-gray-600">Please fill in all required fields</p>
                    </div>
                \`);
                return;
            }
            
            if (password !== confirmPassword) {
                showPopup(\`
                    <div class="text-center">
                        <div class="text-4xl mb-4 text-red-500">⚠️</div>
                        <h3 class="text-lg font-semibold mb-2">Password Mismatch</h3>
                        <p class="text-gray-600">Passwords do not match</p>
                    </div>
                \`);
                return;
            }
            
            if (window.signup) {
                try {
                    const result = await window.signup(email, password);
                    if (result && result.success) {
                        setTimeout(() => showLogin(), 3000);
                    }
                } catch (error) {
                    console.error('Signup failed:', error);
                    originalHandleSignUp(); // Fallback to original
                }
            } else {
                originalHandleSignUp(); // Fallback when Firebase not loaded
            }
        };
        
        // Override showDashboard to add Looker Studio iframe for students
        const originalShowDashboard = window.showDashboard;
        window.showDashboard = function() {
            originalShowDashboard();
            
            // Add Looker Studio iframe for student users
            if (window.currentUserType === 'student') {
                setTimeout(() => {
                    const content = document.getElementById('dashboardContent');
                    if (content && !document.getElementById('looker-studio-section')) {
                        const lookerSection = document.createElement('div');
                        lookerSection.id = 'looker-studio-section';
                        lookerSection.innerHTML = \`
                            <div class="mt-8 bg-white rounded-xl card-shadow p-6">
                                <h3 class="text-2xl font-bold text-gray-800 mb-6">📊 Interactive Financial Analytics</h3>
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <iframe width="100%" height="450"
                                            src="https://lookerstudio.google.com/embed/reporting/c3a77ba9-5446-42f4-b7f0-260b6bb2e084/page/pb7XF"
                                            frameborder="0"
                                            style="border:0; min-width: 600px;"
                                            allowfullscreen
                                            sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox">
                                    </iframe>
                                </div>
                                <p class="text-sm text-gray-600 mt-4">🔗 Interactive financial data visualization powered by Looker Studio</p>
                            </div>
                        \`;
                        content.appendChild(lookerSection);
                    }
                }, 200);
            }
        };
    });
    </script>`;
    
    // Inject the Firebase integration script before the closing body tag
    updatedData = updatedData.replace('</body>', firebaseIntegration + '\n</body>');
    
    res.send(updatedData);
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Fiscality server running on http://0.0.0.0:${PORT}`);
});