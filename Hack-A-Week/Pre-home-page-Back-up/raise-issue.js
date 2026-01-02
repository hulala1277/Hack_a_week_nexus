// Insert into Supabase properly
const { data, error } = await supabase
  .from("issues")           // specify table
  .insert([issueData])      // must be an array of objects
  .select();                // ensures a JSON response

if (error) {
    console.error("Supabase Error:", error);
    throw new Error(`Failed to submit issue: ${error.message}`);
}

if (data && data.length > 0) {
    // Success
    successMessage.style.display = "flex";
    form.reset();
    charCountSpan.textContent = "0";

    successMessage.scrollIntoView({ behavior: "smooth", block: "center" });

    setTimeout(() => {
        window.location.href = "First-Page.html";
    }, 3000);
} else {
    throw new Error("Failed to submit issue. No data returned from Supabase.");
}
