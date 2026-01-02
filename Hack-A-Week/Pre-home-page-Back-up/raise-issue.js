// Handle form submission for raising issues
const form = document.getElementById("raiseIssueForm");
const submitBtn = document.getElementById("submitBtn");
const successMessage = document.getElementById("successMessage");
const errorMessage = document.getElementById("errorMessage");
const errorText = document.getElementById("errorText");
const charCountSpan = document.getElementById("charCount");

// Update character count
document.getElementById("description").addEventListener("input", (e) => {
    charCountSpan.textContent = e.target.value.length;
});

// Form submission
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Hide previous messages
    successMessage.style.display = "none";
    errorMessage.style.display = "none";

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Submitting...</span>';

    try {
        // Collect form data
        const issueData = {
            title: document.getElementById("title").value.trim(),
            description: document.getElementById("description").value.trim(),
            location: document.getElementById("location").value.trim(),
            category: document.getElementById("category").value,
            impact_level: document.getElementById("impact").value,
            status: "Pending", // Initial status
            votes: 0, // Initial vote count
            created_at: new Date().toISOString(),
        };

        // Validate data
        if (!issueData.title || !issueData.description || !issueData.location || !issueData.category || !issueData.impact_level) {
            throw new Error("Please fill in all required fields.");
        }

        // Insert into Supabase
        const response = await supabase.insert("issues", issueData);

        if (response && response.length > 0) {
            // Success
            successMessage.style.display = "flex";
            form.reset();
            charCountSpan.textContent = "0";

            // Scroll to success message
            successMessage.scrollIntoView({ behavior: "smooth", block: "center" });

            // Redirect to home page after 3 seconds
            setTimeout(() => {
                window.location.href = "First-Page.html";
            }, 3000);
        } else {
            throw new Error("Failed to submit issue. Please try again.");
        }
    } catch (error) {
        console.error("Form submission error:", error);
        errorText.textContent = error.message || "An error occurred while submitting your issue. Please try again.";
        errorMessage.style.display = "flex";
        errorMessage.scrollIntoView({ behavior: "smooth", block: "center" });
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Submit Issue Anonymously</span>';
    }
});

// Form validation on input
const inputs = document.querySelectorAll(".form-input, .form-textarea, .form-select");
inputs.forEach((input) => {
    input.addEventListener("blur", function () {
        if (this.hasAttribute("required") && !this.value.trim()) {
            this.classList.add("input-error");
        } else {
            this.classList.remove("input-error");
        }
    });

    input.addEventListener("input", function () {
        this.classList.remove("input-error");
    });
});
