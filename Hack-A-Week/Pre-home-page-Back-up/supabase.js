// Supabase Client Configuration
const SUPABASE_URL = "https://sbumbhthxjnwkqwyecrl.supabase.co";
const SUPABASE_KEY = "sb_publishable_fWdR3zNDfIEkCsqxS9D0PA_O87eGktd";

class SupabaseClient {
    constructor(url, key) {
        this.url = url;
        this.key = key;
    }

    async request(table, method = "GET", data = null, params = {}) {
        const headers = {
            "apikey": this.key,
            "Authorization": `Bearer ${this.key}`,
            "Content-Type": "application/json",
        };

        try {
            // Build URL with query parameters
            let url = `${this.url}/rest/v1/${table}`;
            const queryParams = new URLSearchParams();
            
            // Add default ordering if it's a GET request
            if (method === "GET" && !params.order) {
                queryParams.append("order", "created_at.desc");
            }
            
            // Add custom parameters
            Object.keys(params).forEach(key => {
                queryParams.append(key, params[key]);
            });
            
            if (queryParams.toString()) {
                url += `?${queryParams.toString()}`;
            }

            const response = await fetch(url, {
                method,
                headers,
                body: data ? JSON.stringify(data) : null,
            });

            // Handle different status codes
            if (response.status === 404) {
                throw new Error(`Table "${table}" not found. Please ensure the table exists in your Supabase database.`);
            }

            if (response.status === 401) {
                throw new Error("Authentication failed. Please check your Supabase credentials.");
            }

            if (!response.ok) {
                const errorBody = await response.text();
                throw new Error(`Supabase Error (${response.status}): ${errorBody || response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Supabase Request Error:", error);
            throw error;
        }
    }

    async getAll(table, params = {}) {
        return await this.request(table, "GET", null, params);
    }

    async insert(table, data) {
        if (!data || Object.keys(data).length === 0) {
            throw new Error("No data provided for insertion.");
        }
        return await this.request(table, "POST", data);
    }
}

const supabase = new SupabaseClient(SUPABASE_URL, SUPABASE_KEY);
