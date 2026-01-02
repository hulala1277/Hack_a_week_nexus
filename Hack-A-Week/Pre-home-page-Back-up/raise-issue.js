const { data, error } = await supabase
  .from("issues")
  .insert([issueData])
  .select();

if (error) {
    console.error("Supabase Error:", error);
    throw new Error(`Failed to submit issue: ${error.message}`);
}

if (data && data.length > 0) {
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
