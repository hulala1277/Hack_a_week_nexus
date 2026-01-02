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

    // Validate form
    if (!form.checkValidity()) {
        errorText.textContent = "Please fill in all required fields correctly.";
        errorMessage.style.display = "flex";
        return;
    }

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Submitting...</span>';

    try {
        // Collect form data - matching the actual database schema
        const issueData = {
            title: document.getElementById("title").value.trim(),
            description: document.getElementById("description").value.trim(),
            category: document.getElementById("category").value.trim() || "Other",
            province: document.getElementById("province").value.trim(),
            district: document.getElementById("district").value.trim(),
            municipality: document.getElementById("municipality").value.trim(),
            status: "pending",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };

        // Validate required data
        if (!issueData.title || !issueData.description || !issueData.category || 
            !issueData.province || !issueData.district || !issueData.municipality) {
            throw new Error("Please fill in all required fields.");
        }

        if (issueData.title.length < 5) {
            throw new Error("Issue title must be at least 5 characters long.");
        }

        if (issueData.description.length < 20) {
            throw new Error("Description must be at least 20 characters long.");
        }

        console.log("DEBUG: Submitting issue data:", JSON.stringify(issueData, null, 2));

        // Insert into Supabase using the custom client
        const response = await supabase.insert("issues", issueData);

        console.log("Response from Supabase:", response);

        if (response && Array.isArray(response) && response.length > 0) {
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
            throw new Error("Failed to submit issue. Please ensure your Supabase 'issues' table is properly configured.");
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
