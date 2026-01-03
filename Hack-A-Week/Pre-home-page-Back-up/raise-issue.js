(function () {
    const form = document.getElementById('raiseIssueForm');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    const charCountSpan = document.getElementById('charCount');

    const titleEl = document.getElementById('title');
    const categoryEl = document.getElementById('category');
    const provinceEl = document.getElementById('province');
    const districtEl = document.getElementById('district');
    const municipalityEl = document.getElementById('municipality');
    const descriptionEl = document.getElementById('description');
    const impactEl = document.getElementById('impact_level');

    if (!form) return console.warn('Raise issue form not found');

    // live character count
    if (descriptionEl && charCountSpan) {
        descriptionEl.addEventListener('input', () => {
            charCountSpan.textContent = descriptionEl.value.length.toString();
        });
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const issueData = {
            title: titleEl?.value?.trim() || null,
            category: categoryEl?.value || null,
            province: provinceEl?.value?.trim() || null,
            district: districtEl?.value?.trim() || null,
            municipality: municipalityEl?.value?.trim() || null,
            description: descriptionEl?.value?.trim() || null,
            impact_level: impactEl?.value || null,
            attachments: null,
            created_at: new Date().toISOString()
        };

        try {
            console.log('Submitting issue to Supabase...', issueData);

            const response = await supabase.insert('issues', issueData);

            console.log('Supabase insert response:', response);

            const inserted = Array.isArray(response) ? response.length > 0 : !!response;

            if (inserted) {
                if (successMessage) successMessage.style.display = 'flex';
                if (errorMessage) errorMessage.style.display = 'none';
                form.reset();
                if (charCountSpan) charCountSpan.textContent = '0';
                if (successMessage) successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

                setTimeout(() => {
                    window.location.href = 'First-Page.html';
                }, 3000);
            } else {
                throw new Error('Failed to submit issue. No data returned from Supabase.');
            }
        } catch (err) {
            console.error('Supabase Error:', err);
            if (errorMessage) errorMessage.style.display = 'flex';
            if (successMessage) successMessage.style.display = 'none';
            if (errorText) errorText.textContent = err?.message || 'An error occurred while submitting your issue.';
        }
    });
})();
