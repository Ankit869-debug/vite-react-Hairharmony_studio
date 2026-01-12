// This is a simulated authentication service.
// In a real production app, these operations (hashing, token signing) MUST happen on a secure backend server.

const ADMIN_EMAIL = "admin@harmonystudio.com";
// In a real app, this would be a hashed password stored in a database
const ADMIN_PASSWORD_HASH = "admin"; // keeping it simple for this demo, matching previous requests

export const authService = {
    login: async (email, password) => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        if (email === ADMIN_EMAIL && (password === 'admin' || password === 'admin123')) {
            // Generate a mock JWT
            const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
            const payload = btoa(JSON.stringify({
                sub: "1234567890",
                name: "Admin",
                role: "owner",
                exp: Date.now() + (60 * 60 * 1000) // 1 hour expiry
            }));
            const signature = btoa("secret-signature");
            const token = `${header}.${payload}.${signature}`;

            localStorage.setItem('authToken', token);
            return { success: true, token };
        }

        return { success: false, error: 'Invalid email or password' };
    },

    logout: () => {
        localStorage.removeItem('authToken');
    },

    isAuthenticated: () => {
        const token = localStorage.getItem('authToken');
        if (!token) return false;

        try {
            // Verify expiry (basic check)
            const payload = JSON.parse(atob(token.split('.')[1]));
            if (Date.now() > payload.exp) {
                localStorage.removeItem('authToken');
                return false;
            }
            return true;
        } catch (e) {
            return false;
        }
    },

    getUser: () => {
        const token = localStorage.getItem('authToken');
        if (!token) return null;
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    }
};
