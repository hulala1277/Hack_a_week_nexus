// Supabase Client Configuration
const SUPABASE_URL = "https://sbumbhthxjnwkqwyecrl.supabase.co";
const SUPABASE_KEY = "sb_publishable_fWdR3zNDfIEkCsqxS9D0PA_O87eGktd";

class SupabaseClient {
    constructor(url, key) {
        this.url = url;
        this.key = key;
    }

    async request(table, method = "GET", data = null) {
        const headers = {
            "apikey": this.key,
            "Authorization": `Bearer ${this.key}`,
            "Content-Type": "application/json",
        };

        try {
            const response = await fetch(`${this.url}/rest/v1/${table}`, {
                method,
                headers,
                body: data ? JSON.stringify(data) : null,
            });

            if (!response.ok) {
                throw new Error(`Supabase Error: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Supabase Request Error:", error);
            throw error;
        }
    }

    async getAll(table) {
        return await this.request(table, "GET");
    }

    async insert(table, data) {
        return await this.request(table, "POST", data);
    }
}

const supabase = new SupabaseClient(SUPABASE_URL, SUPABASE_KEY);
