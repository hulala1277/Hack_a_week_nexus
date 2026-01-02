// Fetch and display budget data from Supabase
let allBudgets = [];

async function loadBudgetData() {
    try {
        const budgetList = document.getElementById("budgetList");
        budgetList.innerHTML = '<div class="loading">Loading budget data...</div>';

        // Fetch from Supabase with error handling
        let budgets = [];
        try {
            budgets = await supabase.getAll("budgets");
        } catch (fetchError) {
            console.error("Error details:", fetchError);
            throw new Error(`Failed to load budget data: ${fetchError.message}`);
        }

        allBudgets = Array.isArray(budgets) ? budgets : [];

        if (allBudgets.length === 0) {
            budgetList.innerHTML = '<div class="no-data">No budget data available.</div>';
            updateSummary([]);
            return;
        }

        displayBudgets(allBudgets);
        updateSummary(allBudgets);
    } catch (error) {
        console.error("Error loading budget data:", error);
        document.getElementById("budgetList").innerHTML = 
            `<div class="error">⚠️ ${error.message}<br><small>Make sure your Supabase table "budgets" exists and is accessible.</small></div>`;
    }
}

function displayBudgets(budgets) {
    const budgetList = document.getElementById("budgetList");
    budgetList.innerHTML = '';

    if (!budgets || budgets.length === 0) {
        budgetList.innerHTML = '<div class="no-data">No budget items found.</div>';
        return;
    }

    budgets.forEach(budget => {
        const spent = parseFloat(budget.spent_amount) || 0;
        const allocated = parseFloat(budget.allocated_amount) || 0;
        const percentage = allocated > 0 ? ((spent / allocated) * 100).toFixed(1) : 0;
        const location = `${budget.municipality || ""}, ${budget.district || ""}, ${budget.province || ""}`.replace(/^,|,$/g, "").trim();

        const budgetCard = document.createElement("div");
        budgetCard.className = "budget-card";
        
        budgetCard.innerHTML = `
            <div class="budget-item-header">
                <h3 class="budget-category">${budget.sector || "Budget Item"}</h3>
                <span class="budget-department">${budget.fiscal_year || "FY"}</span>
            </div>
            <div class="budget-location">
                📍 ${location || "All Locations"}
            </div>
            <div class="budget-details">
                <div class="budget-detail">
                    <span class="label">Allocated:</span>
                    <span class="amount">NPR ${allocated.toLocaleString()}</span>
                </div>
                <div class="budget-detail">
                    <span class="label">Spent:</span>
                    <span class="amount spent">NPR ${spent.toLocaleString()}</span>
                </div>
                <div class="budget-detail">
                    <span class="label">Remaining:</span>
                    <span class="amount remaining">NPR ${(allocated - spent).toLocaleString()}</span>
                </div>
            </div>
            <div class="budget-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${Math.min(percentage, 100)}%"></div>
                </div>
                <span class="progress-text">${percentage}% spent</span>
            </div>
        `;

        budgetList.appendChild(budgetCard);
    });
}

function updateSummary(budgets) {
    let totalBudget = 0;
    let totalSpent = 0;

    budgets.forEach(budget => {
        totalBudget += parseFloat(budget.allocated_amount) || 0;
        totalSpent += parseFloat(budget.spent_amount) || 0;
    });

    document.getElementById("totalBudget").textContent = `NPR ${totalBudget.toLocaleString()}`;
    document.getElementById("totalSpent").textContent = `NPR ${totalSpent.toLocaleString()}`;
    document.getElementById("totalRemaining").textContent = `NPR ${(totalBudget - totalSpent).toLocaleString()}`;
}

// Load budget data on page load
document.addEventListener("DOMContentLoaded", loadBudgetData);
