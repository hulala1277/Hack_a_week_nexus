// Fetch and display government responses from Supabase
let allResponses = [];

async function loadResponses() {
    try {
        const responsesList = document.getElementById("responsesList");
        responsesList.innerHTML = '<div class="loading">Loading responses...</div>';

        // Fetch from Supabase with error handling
        let responses = [];
        try {
            responses = await supabase.getAll("responses");
        } catch (fetchError) {
            console.error("Error details:", fetchError);
            throw new Error(`Failed to load responses: ${fetchError.message}`);
        }

        allResponses = Array.isArray(responses) ? responses : [];

        if (allResponses.length === 0) {
            responsesList.innerHTML = '<div class="no-data">No responses yet. Check back soon!</div>';
            return;
        }

        displayResponses(allResponses);
    } catch (error) {
        console.error("Error loading responses:", error);
        document.getElementById("responsesList").innerHTML = 
            `<div class="error">⚠️ ${error.message}<br><small>Make sure your Supabase table "responses" exists and is accessible.</small></div>`;
    }
}

function displayResponses(responses) {
    const responsesList = document.getElementById("responsesList");
    responsesList.innerHTML = '';

    if (!responses || responses.length === 0) {
        responsesList.innerHTML = '<div class="no-data">No responses match your filters.</div>';
        return;
    }

    responses.forEach(response => {
        const responseCard = document.createElement("div");
        responseCard.className = `response-card`;
        
        const responseDate = response.created_at;
        const formattedDate = responseDate ? new Date(responseDate).toLocaleDateString() : "Unknown date";
        
        responseCard.innerHTML = `
            <div class="response-header">
                <div class="response-status-badge">
                    Response to Issue #${response.issue_id || "Unknown"}
                </div>
            </div>
            <p class="response-body">${response.message || "No response details available"}</p>
            <div class="response-footer">
                <span class="response-official">👤 Official ID: ${response.official_id || "Unknown"}</span>
                <span class="response-date">${formattedDate}</span>
            </div>
        `;

        responsesList.appendChild(responseCard);
    });
}

// Status filter functionality
document.getElementById("responseFilter").addEventListener("change", (e) => {
    const selectedStatus = e.target.value;
    // Note: responses table doesn't have a status column
    // This filter is kept for UI consistency but doesn't filter
    displayResponses(allResponses);
});

// Load responses on page load
document.addEventListener("DOMContentLoaded", loadResponses);
