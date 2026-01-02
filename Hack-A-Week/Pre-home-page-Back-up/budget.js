// Fetch and display budget data from Supabase
let allBudgets = [];

async function loadBudgetData() {
    try {
        const budgetList = document.getElementById("budgetList");
        budgetList.innerHTML = '<div class="loading">Loading budget data...</div>';

        // Fetch from Supabase
        const budgets = await supabase.getAll("budgets");
        allBudgets = budgets;

        if (budgets.length === 0) {
            budgetList.innerHTML = '<div class="no-data">No budget data available.</div>';
            updateSummary([]);
            return;
        }

        displayBudgets(budgets);
        updateSummary(budgets);
    } catch (error) {
        console.error("Error loading budget data:", error);
        document.getElementById("budgetList").innerHTML = 
            '<div class="error">Failed to load budget data. Please try again later.</div>';
    }
}

function displayBudgets(budgets) {
    const budgetList = document.getElementById("budgetList");
    budgetList.innerHTML = '';

    if (budgets.length === 0) {
        budgetList.innerHTML = '<div class="no-data">No budget items found.</div>';
        return;
    }

    budgets.forEach(budget => {
        const spent = budget.amount_spent || 0;
        const allocated = budget.amount_allocated || 0;
        const percentage = allocated > 0 ? ((spent / allocated) * 100).toFixed(1) : 0;

        const budgetCard = document.createElement("div");
        budgetCard.className = "budget-card";
        
        budgetCard.innerHTML = `
            <div class="budget-item-header">
                <h3 class="budget-category">${budget.category || "Budget Item"}</h3>
                <span class="budget-department">${budget.department || "Department"}</span>
            </div>
            <div class="budget-details">
                <div class="budget-detail">
                    <span class="label">Allocated:</span>
                    <span class="amount">NPR ${(allocated).toLocaleString()}</span>
                </div>
                <div class="budget-detail">
                    <span class="label">Spent:</span>
                    <span class="amount spent">NPR ${(spent).toLocaleString()}</span>
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
            <p class="budget-description">${budget.description || "No description"}</p>
        `;

        budgetList.appendChild(budgetCard);
    });
}

function updateSummary(budgets) {
    let totalBudget = 0;
    let totalSpent = 0;

    budgets.forEach(budget => {
        totalBudget += budget.amount_allocated || 0;
        totalSpent += budget.amount_spent || 0;
    });

    document.getElementById("totalBudget").textContent = `NPR ${totalBudget.toLocaleString()}`;
    document.getElementById("totalSpent").textContent = `NPR ${totalSpent.toLocaleString()}`;
    document.getElementById("totalRemaining").textContent = `NPR ${(totalBudget - totalSpent).toLocaleString()}`;
}

// Load budget data on page load
document.addEventListener("DOMContentLoaded", loadBudgetData);
