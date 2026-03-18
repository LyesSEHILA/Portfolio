/* js/main.js */
document.addEventListener('DOMContentLoaded', () => {
    // --- GESTION DE LA LANGUE (i18n) ---
    let currentLang = localStorage.getItem('portfolio_lang') || 'fr';
    
    const updateLanguage = (lang) => {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                // Si l'élément a une icône, on la préserve
                const icon = el.querySelector('i');
                if (icon) {
                    el.innerHTML = '';
                    el.appendChild(icon);
                    el.appendChild(document.createTextNode(' ' + translations[lang][key]));
                } else {
                    el.textContent = translations[lang][key];
                }
            }
        });
        
        // Mise à jour du bouton de langue
        const langText = document.querySelector('.lang-text');
        if (langText) langText.textContent = lang === 'fr' ? 'EN' : 'FR';
        
        // On rafraîchit les mises à jour récentes pour la langue
        renderUpdates(lang);
    };

    const langBtn = document.getElementById('lang-switch');
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            currentLang = currentLang === 'fr' ? 'en' : 'fr';
            localStorage.setItem('portfolio_lang', currentLang);
            updateLanguage(currentLang);
        });
    }

    // 0. DONNÉES DES MISES À JOUR
    const UPDATES = [
        {
            title: { fr: "Sécurité & Certifications", en: "Security & Certs" },
            desc: { 
                fr: "Séance 7 : Enjeux de sécurité digitale et ressources de préparation.", 
                en: "Session 7: Digital security challenges and preparation resources." 
            },
            link: "travaux.html",
            icon: "fas fa-shield-alt",
            color: "#ef4444", // Rouge
            isNew: true
        },
        {
            title: { fr: "Funnel Marketing & KPI", en: "Marketing Funnel & KPI" },
            desc: { 
                fr: "Séance 6 : Analyse du tunnel de conversion et indicateurs de performance.", 
                en: "Session 6: Conversion funnel analysis and performance indicators." 
            },
            link: "travaux.html",
            icon: "fas fa-chart-line",
            color: "#10b981", // Vert
            isNew: false
        },
        {
            title: { fr: "Système CRM SaaS", en: "SaaS CRM System" },
            desc: { 
                fr: "Architecture multi-client et gestion commerciale complète.", 
                en: "Multi-client architecture and complete sales management." 
            },
            link: "projets.html",
            icon: "fas fa-layer-group",
            color: "#6366f1", // Indigo
            isNew: false
        }
    ];

    const renderUpdates = (lang) => {
        const container = document.getElementById('updates-container');
        if (!container) return;
        
        container.innerHTML = ''; // Clear
        UPDATES.slice(0, 3).forEach(update => {
            const card = document.createElement('div');
            card.className = 'card';
            card.style.borderTop = `3px solid ${update.color}`;
            
            card.innerHTML = `
                ${update.isNew ? `<span class="badge-new">${lang === 'fr' ? 'Nouveau' : 'New'}</span>` : ''}
                <h3><i class="${update.icon}" style="color: ${update.color}; margin-right: 10px;"></i>${update.title[lang]}</h3>
                <p style="font-size: 0.9rem; margin-top: 10px; color: #cbd5e1;">${update.desc[lang]}</p>
                <a href="${update.link}" class="btn" style="background: ${update.color}; padding: 0.6rem 1.2rem; margin-top: 1rem;">
                    ${update.link.includes('projets') 
                        ? (lang === 'fr' ? 'Voir le projet' : 'View project') 
                        : (lang === 'fr' ? 'Accéder au cours' : 'Access course')}
                </a>
            `;
            container.appendChild(card);
        });
    };

    // Initialisation
    updateLanguage(currentLang);

    // 2. Gestion du menu actif
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        if(link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // 2. Effet d'apparition au scroll (Intersection Observer)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card, .project-card, .reveal').forEach(el => {
        observer.observe(el);
    });
});