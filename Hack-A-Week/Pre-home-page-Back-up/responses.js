// Fetch and display government responses from Supabase
let allResponses = [];

async function loadResponses() {
    try {
        const responsesList = document.getElementById("responsesList");
        responsesList.innerHTML = '<div class="loading">Loading responses...</div>';

        // Fetch from Supabase
        const responses = await supabase.getAll("responses");
        allResponses = responses;

        if (responses.length === 0) {
            responsesList.innerHTML = '<div class="no-data">No responses yet. Check back soon!</div>';
            return;
        }

        displayResponses(responses);
    } catch (error) {
        console.error("Error loading responses:", error);
        document.getElementById("responsesList").innerHTML = 
            '<div class="error">Failed to load responses. Please try again later.</div>';
    }
}

function displayResponses(responses) {
    const responsesList = document.getElementById("responsesList");
    responsesList.innerHTML = '';

    if (responses.length === 0) {
        responsesList.innerHTML = '<div class="no-data">No responses match your filters.</div>';
        return;
    }

    responses.forEach(response => {
        const statusColor = {
            'Seen': '#1e90ff',
            'In Review': '#ff6b6b',
            'Action Taken': '#2ecc71'
        };

        const responseCard = document.createElement("div");
        responseCard.className = `response-card status-${response.status?.toLowerCase().replace(" ", "-") || "pending"}`;
        
        responseCard.innerHTML = `
            <div class="response-header">
                <div class="response-status-badge" style="background-color: ${statusColor[response.status] || '#999'}">
                    ${response.status || "Pending"}
                </div>
                <h3 class="response-title">${response.issue_title || "Issue Response"}</h3>
            </div>
            <p class="response-body">${response.response_text || "No response details available"}</p>
            <div class="response-footer">
                <span class="response-department">🏛️ ${response.department || "Government Department"}</span>
                <span class="response-date">${new Date(response.response_date || response.created_at).toLocaleDateString()}</span>
            </div>
        `;

        responsesList.appendChild(responseCard);
    });
}

// Status filter functionality
document.getElementById("responseFilter").addEventListener("change", (e) => {
    const selectedStatus = e.target.value;
    const filtered = selectedStatus 
        ? allResponses.filter(response => response.status === selectedStatus)
        : allResponses;
    displayResponses(filtered);
});

// Load responses on page load
document.addEventListener("DOMContentLoaded", loadResponses);
