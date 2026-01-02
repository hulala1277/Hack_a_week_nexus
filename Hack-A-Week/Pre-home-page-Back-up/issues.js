let allIssues = [];

function capitalizeCategory(category) {
    return category || 'Uncategorized';
}

async function loadIssues() {
    try {
        const issuesList = document.getElementById("issuesList");
        issuesList.innerHTML = '<div class="loading">Loading issues...</div>';

        let issues = [];
        try {
            issues = await supabase.getAll("issues");
        } catch (fetchError) {
            console.error("Error details:", fetchError);
            throw new Error(`Failed to load issues: ${fetchError.message}`);
        }

        allIssues = Array.isArray(issues) ? issues : [];

        if (allIssues.length === 0) {
            issuesList.innerHTML = '<div class="no-data">No issues found. Be the first to report one! <a href="raise-issue.html">Click here to raise an issue</a></div>';
            return;
        }

        displayIssues(allIssues);
    } catch (error) {
        console.error("Error loading issues:", error);
        document.getElementById("issuesList").innerHTML = 
            `<div class="error">⚠️ ${error.message}<br><small>Make sure your Supabase table "issues" exists and is accessible.</small></div>`;
    }
}

function displayIssues(issues) {
    const issuesList = document.getElementById("issuesList");
    issuesList.innerHTML = '';

    if (!issues || issues.length === 0) {
        issuesList.innerHTML = '<div class="no-data">No issues match your filters. <a href="raise-issue.html">Raise a new issue</a></div>';
        return;
    }

    issues.forEach(issue => {
        const issueCard = document.createElement("div");
        issueCard.className = `issue-card status-${(issue.status || "open").toLowerCase().replace(" ", "-")}`;
        
        const createdDate = issue.created_at ? new Date(issue.created_at).toLocaleDateString() : "Unknown date";
        const location = `${issue.municipality || ""}, ${issue.district || ""}, ${issue.province || ""}`.replace(/^,|,$/g, "").trim();
        
        const statusDisplay = issue.status ? issue.status.charAt(0).toUpperCase() + issue.status.slice(1) : "Open";
        
        issueCard.innerHTML = `
            <div class="issue-header">
                <h3 class="issue-title">${issue.title || "Untitled Issue"}</h3>
                <span class="issue-status">${statusDisplay}</span>
            </div>
            <p class="issue-description">${issue.description || "No description provided"}</p>
            <div class="issue-footer">
                <span class="issue-location">📍 ${location || "Location not specified"}</span>
                <span class="issue-date">${createdDate}</span>
            </div>
            <div class="issue-category">
                <span class="category-tag">🏷️ ${capitalizeCategory(issue.category) || "Uncategorized"}</span>
            </div>
        `;

        issuesList.appendChild(issueCard);
    });
}

document.getElementById("searchInput").addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = allIssues.filter(issue => 
        (issue.title?.toLowerCase().includes(searchTerm)) ||
        (issue.description?.toLowerCase().includes(searchTerm)) ||
        (issue.location?.toLowerCase().includes(searchTerm))
    );
    displayIssues(filtered);
});

document.getElementById("statusFilter").addEventListener("change", (e) => {
    const selectedStatus = e.target.value;
    const filtered = selectedStatus 
        ? allIssues.filter(issue => issue.status === selectedStatus)
        : allIssues;
    displayIssues(filtered);
});

document.addEventListener("DOMContentLoaded", loadIssues);
