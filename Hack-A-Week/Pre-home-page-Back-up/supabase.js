// Supabase Client Configuration - Using localStorage for demo
const supabase = {
    getAll: async (table) => {
        const data = localStorage.getItem(table);
        return data ? JSON.parse(data) : [];
    },
    insert: async (table, data) => {
        const existing = await supabase.getAll(table);
        const newData = Array.isArray(data) ? data : [data];
        const updated = [...existing, ...newData.map(item => ({ ...item, id: Date.now() + Math.random() }))];
        localStorage.setItem(table, JSON.stringify(updated));
        return newData;
    }
};
