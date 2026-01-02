// Fetch and display all issues from Supabase
let allIssues = [];

async function loadIssues() {
    try {
        const issuesList = document.getElementById("issuesList");
        issuesList.innerHTML = '<div class="loading">Loading issues...</div>';

        // Fetch from Supabase
        const issues = await supabase.getAll("issues");
        allIssues = issues;

        if (issues.length === 0) {
            issuesList.innerHTML = '<div class="no-data">No issues found. Be the first to report one!</div>';
            return;
        }

        displayIssues(issues);
    } catch (error) {
        console.error("Error loading issues:", error);
        document.getElementById("issuesList").innerHTML = 
            '<div class="error">Failed to load issues. Please try again later.</div>';
    }
}

function displayIssues(issues) {
    const issuesList = document.getElementById("issuesList");
    issuesList.innerHTML = '';

    if (issues.length === 0) {
        issuesList.innerHTML = '<div class="no-data">No issues match your filters.</div>';
        return;
    }

    issues.forEach(issue => {
        const issueCard = document.createElement("div");
        issueCard.className = `issue-card status-${issue.status?.toLowerCase().replace(" ", "-") || "pending"}`;
        
        issueCard.innerHTML = `
            <div class="issue-header">
                <h3 class="issue-title">${issue.title || "Untitled Issue"}</h3>
                <span class="issue-status">${issue.status || "Pending"}</span>
            </div>
            <p class="issue-description">${issue.description || "No description provided"}</p>
            <div class="issue-footer">
                <span class="issue-location">📍 ${issue.location || "Location not specified"}</span>
                <span class="issue-date">${new Date(issue.created_at).toLocaleDateString() || "Unknown date"}</span>
            </div>
            <div class="issue-votes">
                <span class="votes-count">👍 ${issue.votes || 0} support</span>
            </div>
        `;

        issuesList.appendChild(issueCard);
    });
}

// Search functionality
document.getElementById("searchInput").addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = allIssues.filter(issue => 
        issue.title?.toLowerCase().includes(searchTerm) ||
        issue.description?.toLowerCase().includes(searchTerm) ||
        issue.location?.toLowerCase().includes(searchTerm)
    );
    displayIssues(filtered);
});

// Status filter functionality
document.getElementById("statusFilter").addEventListener("change", (e) => {
    const selectedStatus = e.target.value;
    const filtered = selectedStatus 
        ? allIssues.filter(issue => issue.status === selectedStatus)
        : allIssues;
    displayIssues(filtered);
});

// Load issues on page load
document.addEventListener("DOMContentLoaded", loadIssues);
