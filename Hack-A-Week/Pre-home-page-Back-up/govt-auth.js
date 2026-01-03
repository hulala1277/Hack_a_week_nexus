// Government Authentication System
const SUPABASE_URL = "https://sbumbhthxjnwkqwyecrl.supabase.co";
const SUPABASE_KEY = "sb_publishable_fWdR3zNDfIEkCsqxS9D0PA_O87eGktd";

class GovtAuthManager {
    constructor() {
        this.supabaseUrl = SUPABASE_URL;
        this.supabaseKey = SUPABASE_KEY;
        this.currentUser = null;
        this.initializeAuth();
    }

    // Initialize auth by checking if user is already logged in
    async initializeAuth() {
        const token = localStorage.getItem('govt_auth_token');
        const userId = localStorage.getItem('govt_user_id');
        
        if (token && userId) {
            try {
                const user = await this.getUserById(userId);
                if (user) {
                    this.currentUser = user;
                }
            } catch (error) {
                console.log('Session expired, clearing auth');
                this.logout();
            }
        }
    }

    // Sign up new government official
    async signup(fullName, department, position, email, password) {
        try {
            // Validate input
            if (!fullName || !department || !position || !email || !password) {
                throw new Error('All fields are required');
            }

            if (password.length < 6) {
                throw new Error('Password must be at least 6 characters');
            }

            // Check if user already exists
            const existingUser = await this.getUserByEmail(email);
            if (existingUser) {
                throw new Error('Email already registered');
            }

            // Hash password (in production, use proper password hashing on backend)
            const hashedPassword = btoa(password); // Simple encoding for demo

            // Create user record
            const userData = {
                full_name: fullName,
                department: department,
                position: position,
                email: email,
                password_hash: hashedPassword,
                account_type: 'government',
                created_at: new Date().toISOString(),
                is_active: true
            };

            // Insert into govt_officials table
            const response = await fetch(`${this.supabaseUrl}/rest/v1/govt_officials`, {
                method: 'POST',
                headers: {
                    'apikey': this.supabaseKey,
                    'Authorization': `Bearer ${this.supabaseKey}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=representation'
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Signup failed');
            }

            const user = await response.json();
            
            // Auto-login after signup
            this.currentUser = user[0];
            localStorage.setItem('govt_auth_token', btoa(email + ':' + password));
            localStorage.setItem('govt_user_id', user[0].id);
            localStorage.setItem('govt_user_email', email);

            return { success: true, user: user[0] };
        } catch (error) {
            console.error('Signup error:', error);
            throw error;
        }
    }

    // Login government official
    async login(email, password) {
        try {
            if (!email || !password) {
                throw new Error('Email and password are required');
            }

            // Find user by email
            const user = await this.getUserByEmail(email);
            if (!user) {
                throw new Error('Invalid email or password');
            }

            // Verify password (simple comparison for demo)
            const hashedPassword = btoa(password);
            if (user.password_hash !== hashedPassword) {
                throw new Error('Invalid email or password');
            }

            // Check if account is active
            if (!user.is_active) {
                throw new Error('Account is inactive. Contact administrator.');
            }

            // Set auth data
            this.currentUser = user;
            localStorage.setItem('govt_auth_token', btoa(email + ':' + password));
            localStorage.setItem('govt_user_id', user.id);
            localStorage.setItem('govt_user_email', email);

            return { success: true, user: user };
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    // Get user by email
    async getUserByEmail(email) {
        try {
            const response = await fetch(
                `${this.supabaseUrl}/rest/v1/govt_officials?email=eq.${email}`,
                {
                    headers: {
                        'apikey': this.supabaseKey,
                        'Authorization': `Bearer ${this.supabaseKey}`,
                    }
                }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch user');
            }

            const users = await response.json();
            return users.length > 0 ? users[0] : null;
        } catch (error) {
            console.error('Get user error:', error);
            return null;
        }
    }

    // Get user by ID
    async getUserById(userId) {
        try {
            const response = await fetch(
                `${this.supabaseUrl}/rest/v1/govt_officials?id=eq.${userId}`,
                {
                    headers: {
                        'apikey': this.supabaseKey,
                        'Authorization': `Bearer ${this.supabaseKey}`,
                    }
                }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch user');
            }

            const users = await response.json();
            return users.length > 0 ? users[0] : null;
        } catch (error) {
            console.error('Get user by ID error:', error);
            return null;
        }
    }

    // Logout
    logout() {
        this.currentUser = null;
        localStorage.removeItem('govt_auth_token');
        localStorage.removeItem('govt_user_id');
        localStorage.removeItem('govt_user_email');
    }

    // Check if user is authenticated
    isAuthenticated() {
        return this.currentUser !== null && localStorage.getItem('govt_auth_token') !== null;
    }

    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }
}

// Initialize auth manager
const authManager = new GovtAuthManager();

// Handle Login Form
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('govtLoginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Handle Signup Form
    const signupForm = document.getElementById('govtSignupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
});

// Handle login submission
async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('authMessage');
    const spinner = document.getElementById('spinner');
    const loginBtn = document.getElementById('loginBtn');

    try {
        // Show loading state
        spinner.style.display = 'block';
        loginBtn.disabled = true;
        messageDiv.className = 'auth-message';

        // Attempt login
        const result = await authManager.login(email, password);

        // Show success message
        messageDiv.className = 'auth-message success';
        messageDiv.textContent = 'Login successful! Redirecting...';

        // Redirect to government dashboard after 2 seconds
        setTimeout(() => {
            window.location.href = 'govt-dashboard.html';
        }, 2000);
    } catch (error) {
        // Show error message
        messageDiv.className = 'auth-message error';
        messageDiv.textContent = error.message;
        
        // Reset form state
        spinner.style.display = 'none';
        loginBtn.disabled = false;
    }
}

// Handle signup submission
async function handleSignup(e) {
    e.preventDefault();
    
    const fullName = document.getElementById('fullName').value.trim();
    const department = document.getElementById('department').value.trim();
    const position = document.getElementById('position').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const messageDiv = document.getElementById('authMessage');
    const spinner = document.getElementById('spinner');
    const signupBtn = document.getElementById('signupBtn');

    try {
        // Validate passwords match
        if (password !== confirmPassword) {
            throw new Error('Passwords do not match');
        }

        // Show loading state
        spinner.style.display = 'block';
        signupBtn.disabled = true;
        messageDiv.className = 'auth-message';

        // Attempt signup
        const result = await authManager.signup(fullName, department, position, email, password);

        // Show success message
        messageDiv.className = 'auth-message success';
        messageDiv.textContent = 'Account created successfully! Redirecting...';

        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
            window.location.href = 'govt-dashboard.html';
        }, 2000);
    } catch (error) {
        // Show error message
        messageDiv.className = 'auth-message error';
        messageDiv.textContent = error.message;
        
        // Reset form state
        spinner.style.display = 'none';
        signupBtn.disabled = false;
    }
}

// Add translations for authentication
if (typeof translations !== 'undefined') {
    translations.en = {
        ...translations.en,
        'govt-login-title': 'Government Login',
        'govt-login-subtitle': 'Sign in with your government credentials',
        'govt-signup-title': 'Government Sign Up',
        'govt-signup-subtitle': 'Create your government account',
        'label-email': 'Email',
        'placeholder-email': 'your.email@govt.gov',
        'label-password': 'Password',
        'placeholder-password': 'Enter your password',
        'label-confirm-password': 'Confirm Password',
        'placeholder-confirm-password': 'Confirm password',
        'label-fullname': 'Full Name',
        'placeholder-fullname': 'Your full name',
        'label-department': 'Department',
        'placeholder-department': 'e.g., Ministry of Health',
        'label-position': 'Position',
        'placeholder-position': 'e.g., Officer',
        'hint-password': 'Password must be at least 6 characters',
        'btn-login': 'Login',
        'btn-signup': 'Sign Up',
        'no-account': 'Don\'t have an account?',
        'already-account': 'Already have an account?',
        'link-signup': 'Sign Up',
        'link-login': 'Login',
        'back-home': 'Back to Home'
    };

    translations.ne = {
        ...translations.ne,
        'govt-login-title': 'सरकारी लगइन',
        'govt-login-subtitle': 'आपको सरकारी प्रमाणपत्र दिएर साइन इन गर्नुहोस्',
        'govt-signup-title': 'सरकारी साइन अप',
        'govt-signup-subtitle': 'आपको सरकारी खाता सिर्जना गर्नुहोस्',
        'label-email': 'इमेल',
        'placeholder-email': 'your.email@govt.gov',
        'label-password': 'पासवर्ड',
        'placeholder-password': 'आपको पासवर्ड दर्ज गर्नुहोस्',
        'label-confirm-password': 'पासवर्ड पुष्टि गर्नुहोस्',
        'placeholder-confirm-password': 'पासवर्ड पुष्टि गर्नुहोस्',
        'label-fullname': 'पूरा नाम',
        'placeholder-fullname': 'आपको पूरा नाम',
        'label-department': 'विभाग',
        'placeholder-department': 'जस्तै, स्वास्थ्य मन्त्रालय',
        'label-position': 'पद',
        'placeholder-position': 'जस्तै, अधिकृत',
        'hint-password': 'पासवर्ड कम्तिमा 6 क्यारेक्टर हुनुपर्छ',
        'btn-login': 'लगइन गर्नुहोस्',
        'btn-signup': 'साइन अप गर्नुहोस्',
        'no-account': 'खाता छैन?',
        'already-account': 'पहिले नै खाता छ?',
        'link-signup': 'साइन अप',
        'link-login': 'लगइन',
        'back-home': 'होमपृष्ठमा फर्कनुहोस्'
    };
}
