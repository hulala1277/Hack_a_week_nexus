// Language translations
const translations = {
    en: {
        // Navigation
        'nav-public-issues': 'Public Issues',
        'nav-budget': 'Budget Tracker',
        'nav-about': 'About',
        'nav-govt-login': 'Govt. Login',
        'nav-home': 'Home',
        'nav-raise-issue': 'Raise Issue',
        'nav-responses': 'Responses',

        // First Page
        'hero-title': 'JANASUNWAI 360',
        'hero-subtitle': 'Speak Up Anonymously. Track Government Actions Transparently.',
        'feature-title-1': 'Submit Your Concerns',
        'feature-desc-1': 'Send suggestions or complaints anonymously.',
        'feature-title-2': "See Gov't Responses",
        'feature-desc-2': 'Track progress and official replies.',
        'feature-title-3': 'Budget Tracking',
        'feature-desc-3': 'Monitor government spending transparently.',
        'cta-raise': 'Raise Your Issue',
        'cta-view': 'View All Issues',

        // Raise Issue Page
        'form-title': 'Raise Your Issue Anonymously',
        'form-subtitle': 'Share your concerns with the government. Your identity is protected.',
        'label-title': 'Issue Title',
        'label-category': 'Category',
        'label-province': 'Province',
        'label-district': 'District',
        'label-municipality': 'Municipality',
        'label-description': 'Detailed Description',
        'label-impact': 'Impact Level',
        'label-attachments': 'Attachments (Optional)',
        'label-consent': 'I confirm that the information provided is true and accurate.',
        'btn-submit': 'Submit Issue Anonymously',
        'btn-cancel': 'Cancel',
        'placeholder-title': 'e.g., Broken Roads in Downtown',
        'placeholder-province': 'e.g., Bagmati',
        'placeholder-district': 'e.g., Kathmandu',
        'placeholder-municipality': 'e.g., Kathmandu Metropolitan City',
        'placeholder-description': 'Please provide a detailed description of the issue. Include any specific details that would help in addressing it.',
        'success-title': 'Issue Submitted Successfully!',
        'success-msg': 'Thank you for reporting. Your issue has been recorded and will be reviewed by the government.',
        'error-title': 'Error Submitting Issue',
        'privacy-title': '🔒 Your Privacy is Protected',
        'privacy-msg': 'Your submission is completely anonymous. We do not collect or store any personal information. Your identity will never be revealed to government officials or the public.',

        // View Issues Page
        'page-title-issues': 'All Public Issues',
        'page-subtitle-issues': 'Browse all reported issues and their status',

        // Budget Page
        'page-title-budget': 'Budget Tracker',
        'page-subtitle-budget': 'Track government spending and budget allocations',

        // Responses Page
        'page-title-responses': 'Government Responses',
        'page-subtitle-responses': 'Track the status of all government responses to public issues',

        // Authentication Pages
        'govt-login-title': 'Government Login',
        'govt-login-subtitle': 'Sign in with your government credentials',
        'govt-signup-title': 'Government Sign Up',
        'govt-signup-subtitle': 'Create your government account',
        'label-email': 'Email',
        'placeholder-email': 'your.email@govt.gov',
        'label-password': 'Password',
        'placeholder-password': 'Enter your password',
        'label-confirm-password': 'Confirm Password',
        'placeholder-confirm-password': 'Confirm password',
        'label-fullname': 'Full Name',
        'placeholder-fullname': 'Your full name',
        'label-department': 'Department',
        'placeholder-department': 'e.g., Ministry of Health',
        'label-position': 'Position',
        'placeholder-position': 'e.g., Officer',
        'hint-password': 'Password must be at least 6 characters',
        'btn-login': 'Login',
        'btn-signup': 'Sign Up',
        'no-account': "Don't have an account?",
        'already-account': 'Already have an account?',
        'link-signup': 'Sign Up',
        'link-login': 'Login',
        'back-home': 'Back to Home'
    },
    ne: {
        // Navigation
        'nav-public-issues': 'सार्वजनिक समस्याहरू',
        'nav-budget': 'बजेट ट्र्याकर',
        'nav-about': 'बारेमा',
        'nav-govt-login': 'सरकारी लगइन',
        'nav-home': 'होम',
        'nav-raise-issue': 'समस्या उठाउनुहोस्',
        'nav-responses': 'प्रतिक्रियाहरू',

        // First Page
        'hero-title': 'JANASUNWAI 360',
        'hero-subtitle': 'अनाम रूपमा आवाज उठाउनुहोस्। सरकारी कार्यहरु पारदर्शी रूपमा ट्र्याक गर्नुहोस्।',
        'feature-title-1': 'आफ्नो चिन्ता सार्वजनिक गर्नुहोस्',
        'feature-desc-1': 'अनाम रूपमा सुझाव वा गुनासो पठाउनुहोस्।',
        'feature-title-2': 'सरकारी प्रतिक्रिया हेर्नुहोस्',
        'feature-desc-2': 'प्रगति र आधिकारिक जवाफ ट्र्याक गर्नुहोस्।',
        'feature-title-3': 'बजेट ट्र्याकिङ्ग',
        'feature-desc-3': 'सरकारी खर्च पारदर्शी रूपमा अनुगमन गर्नुहोस्।',
        'cta-raise': 'आफ्नो समस्या उठाउनुहोस्',
        'cta-view': 'सबै समस्याहरू हेर्नुहोस्',

        // Raise Issue Page
        'form-title': 'अनाम रूपमा आफ्नो समस्या उठाउनुहोस्',
        'form-subtitle': 'सरकारसँग आफ्नो चिन्ता साझा गर्नुहोस्। आपको पहिचान सुरक्षित छ।',
        'label-title': 'समस्या शीर्षक',
        'label-category': 'श्रेणी',
        'label-province': 'प्रदेश',
        'label-district': 'जिल्ला',
        'label-municipality': 'नगरपालिका',
        'label-description': 'विस्तृत विवरण',
        'label-impact': 'प्रभाव स्तर',
        'label-attachments': 'संलग्नक (वैकल्पिक)',
        'label-consent': 'मी पुष्टि गर्छु कि दिएको जानकारी सत्य र सही छ।',
        'btn-submit': 'अनाम रूपमा समस्या सार्वजनिक गर्नुहोस्',
        'btn-cancel': 'रद्द गर्नुहोस्',
        'placeholder-title': 'उदाहरण: डाउनटाउन सडक भाँचिएको',
        'placeholder-province': 'उदाहरण: बागमती',
        'placeholder-district': 'उदाहरण: काठमाडौं',
        'placeholder-municipality': 'उदाहरण: काठमाडौं महानगरपालिका',
        'placeholder-description': 'समस्याको विस्तृत विवरण दिनुहोस्। समाधान गर्न मद्दत हुने विशेष विवरण समावेश गर्नुहोस्।',
        'success-title': 'समस्या सफलतापूर्वक सार्वजनिक गरियो!',
        'success-msg': 'रिपोर्ट गरिकोको लागि धन्यवाद। आपको समस्या दर्ज गरियो र सरकारले समीक्षा गर्नेछ।',
        'error-title': 'समस्या सार्वजनिक गर्दा त्रुटि',
        'privacy-title': '🔒 आपको गोपनीयता सुरक्षित छ',
        'privacy-msg': 'आपको सबमिशन पूर्णतः अनाम छ। हामी कुनै व्यक्तिगत जानकारी संग्रह वा भण्डार गर्दैनौं। आपको पहिचान सरकारी अधिकारी वा जनतालाई कहिले खुलाइने छैन।',

        // View Issues Page
        'page-title-issues': 'सबै सार्वजनिक समस्याहरू',
        'page-subtitle-issues': 'सबै रिपोर्ट गरिएका समस्याहरू र तिनको स्थिति ब्राउज गर्नुहोस्',

        // Budget Page
        'page-title-budget': 'बजेट ट्र्याकर',
        'page-subtitle-budget': 'सरकारी खर्च र बजेट आवंटन ट्र्याक गर्नुहोस्',

        // Responses Page
        'page-title-responses': 'सरकारी प्रतिक्रियाहरू',
        'page-subtitle-responses': 'सार्वजनिक समस्याहरूमा सरकारी प्रतिक्रियाहरूको स्थिति ट्र्याक गर्नुहोस्',

        // Authentication Pages
        'govt-login-title': 'सरकारी लगइन',
        'govt-login-subtitle': 'आपको सरकारी प्रमाणपत्र दिएर साइन इन गर्नुहोस्',
        'govt-signup-title': 'सरकारी साइन अप',
        'govt-signup-subtitle': 'आपको सरकारी खाता सिर्जना गर्नुहोस्',
        'label-email': 'इमेल',
        'placeholder-email': 'your.email@govt.gov',
        'label-password': 'पासवर्ड',
        'placeholder-password': 'आपको पासवर्ड दर्ज गर्नुहोस्',
        'label-confirm-password': 'पासवर्ड पुष्टि गर्नुहोस्',
        'placeholder-confirm-password': 'पासवर्ड पुष्टि गर्नुहोस्',
        'label-fullname': 'पूरा नाम',
        'placeholder-fullname': 'आपको पूरा नाम',
        'label-department': 'विभाग',
        'placeholder-department': 'जस्तै, स्वास्थ्य मन्त्रालय',
        'label-position': 'पद',
        'placeholder-position': 'जस्तै, अधिकृत',
        'hint-password': 'पासवर्ड कम्तिमा 6 क्यारेक्टर हुनुपर्छ',
        'btn-login': 'लगइन गर्नुहोस्',
        'btn-signup': 'साइन अप गर्नुहोस्',
        'no-account': 'खाता छैन?',
        'already-account': 'पहिले नै खाता छ?',
        'link-signup': 'साइन अप',
        'link-login': 'लगइन',
        'back-home': 'होमपृष्ठमा फर्कनुहोस्'
    }
};

// Initialize language
function initLanguage() {
    try {
        const savedLanguage = localStorage.getItem('language') || 'ne';
        if (translations[savedLanguage]) {
            setLanguage(savedLanguage);
        } else {
            setLanguage('ne');
        }
    } catch (error) {
        console.error('Error initializing language:', error);
        setLanguage('ne');
    }
}

// Set language
function setLanguage(lang) {
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    updatePageText(lang);
    updateLanguageToggle(lang);
}

// Update page text based on language
function updatePageText(lang) {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'A') {
                // For links, preserve href attribute
                element.textContent = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });

    // Update all placeholders with data-i18n-placeholder attribute
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[lang] && translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });
}

// Update language toggle display
function updateLanguageToggle(lang) {
    const langActive = document.querySelector('.lang-active');
    const langLink = document.querySelector('.lang-link');
    
    if (lang === 'ne') {
        if (langActive) langActive.textContent = 'नेपाली';
        if (langLink) langLink.textContent = 'ENG';
    } else {
        if (langActive) langActive.textContent = 'ENG';
        if (langLink) langLink.textContent = 'नेपाली';
    }
}

// Add language toggle event listeners
function setupLanguageToggle() {
    const langActive = document.querySelector('.lang-active');
    const langLink = document.querySelector('.lang-link');
    
    if (!langActive || !langLink) {
        console.warn('Language toggle elements not found');
        return;
    }
    
    langActive.addEventListener('click', (e) => {
        e.preventDefault();
        setLanguage('ne');
    });
    langActive.style.cursor = 'pointer';
    
    langLink.addEventListener('click', (e) => {
        e.preventDefault();
        setLanguage('en');
    });
    langLink.style.cursor = 'pointer';
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initLanguage();
        setupLanguageToggle();
    });
} else {
    // DOM is already loaded
    initLanguage();
    setupLanguageToggle();
}
