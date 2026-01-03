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
            let url = `${this.url}/rest/v1/${table}`;
            const queryParams = new URLSearchParams();
            
            if (method === "GET" && !params.order) {
                queryParams.append("order", "created_at.desc");
            }
            
            Object.keys(params).forEach(key => {
                queryParams.append(key, params[key]);
            });
            
            if (queryParams.toString()) {
                url += `?${queryParams.toString()}`;
            }

            console.log(`Making ${method} request to: ${url}`);
            console.log(`Request data:`, data);

            // Ask Supabase to return the inserted representation for POSTs
            if (method === 'POST') {
                headers['Prefer'] = 'return=representation';
            }

            const response = await fetch(url, {
                method,
                headers,
                body: data ? JSON.stringify(data) : null,
            });

            if (response.status === 404) {
                throw new Error(`Table "${table}" not found. Please ensure the table exists in your Supabase database.`);
            }

            if (response.status === 401) {
                throw new Error("Authentication failed. Check your Supabase credentials.");
            }

            if (response.status === 403) {
                throw new Error("Permission denied. Check your Supabase RLS policies.");
            }

            if (!response.ok) {
                const errorBody = await response.text();
                throw new Error(`Supabase Error (${response.status}): ${errorBody || response.statusText}`);
            }

            // Some responses (e.g., 204 No Content) have empty bodies.
            // Use response.text() and parse only when content exists to avoid
            // "Unexpected end of JSON input" errors when calling response.json().
            const text = await response.text();
            if (!text) {
                console.log(`Empty response body from ${table} (status ${response.status})`);
                return method === 'GET' ? [] : null;
            }

            let responseData;
            try {
                responseData = JSON.parse(text);
            } catch (parseErr) {
                console.warn(`Could not parse JSON response from ${table}:`, parseErr);
                return text;
            }

            console.log(`Response from ${table}:`, responseData);
            return responseData;
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