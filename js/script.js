/**
 * @constant {Object} translations
 * @description Contient les traductions pour différentes langues (français et anglais).
 * @property {Object} fr - Traductions en français.
 * @property {Object} en - Traductions en anglais.
 */
const translations = {
    fr: {
        welcome: "Bienvenue sur JAR",
        news: "Actualités",
        images: "Images",
        contact: "Contact",
        chooseLang: "Choisissez votre langue"
    },
    en: {
        welcome: "Welcome to JAR",
        news: "News",
        images: "Images",
        contact: "Contact",
        chooseLang: "Choose your language"
    }
};

/**
 * @function toggleMenu
 * @description Bascule la visibilité du menu hamburger en ajoutant ou supprimant la classe 'active' sur l'élément contenant les liens de navigation.
 */
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

/**
 * @function initializeLanguage
 * @description Initialise la gestion de la langue en fonction des préférences de l'utilisateur ou du paramètre par défaut.
 *              Met à jour l'affichage, applique les traductions et affiche le modal de sélection de langue pour la première visite.
 */
function initializeLanguage() {
    const storedLang = localStorage.getItem('language');
    const currentLang = storedLang || 'fr'; // Défaut à français si pas de langue stockée

    // Met à jour l'affichage de la langue actuelle dans la navbar
    updateLanguageDisplay(currentLang);

    // Applique les traductions immédiatement
    applyTranslations(currentLang);

    // Affiche le modal uniquement si c'est la première visite
    if (!localStorage.getItem('visited')) {
        showLanguageModal();
        localStorage.setItem('visited', 'true');
    }
}

/**
 * @function showLanguageModal
 * @description Affiche la fenêtre modale pour la sélection de la langue en modifiant son style CSS.
 */
function showLanguageModal() {
    const modal = document.getElementById('languageModal');
    modal.style.display = 'flex';
}


/**
 * @function hideLanguageModal
 * @description Masque la fenêtre modale pour la sélection de la langue en modifiant son style CSS.
 */
function hideLanguageModal() {
    const modal = document.getElementById('languageModal');
    modal.style.display = 'none';
}


/**
 * @function setLanguage
 * @description Définit la langue sélectionnée par l'utilisateur, met à jour les traductions, l'affichage et masque le modal.
 * @param {string} lang - Code de la langue choisie (par exemple, 'fr' ou 'en').
 */
function setLanguage(lang) {
    localStorage.setItem('language', lang);
    applyTranslations(lang);
    updateLanguageDisplay(lang);
    hideLanguageModal();
}

/**
 * @function updateLanguageDisplay
 * @description Met à jour l'affichage de la langue actuelle dans l'interface utilisateur.
 * @param {string} lang - Code de la langue actuelle (par exemple, 'fr' ou 'en').
 */
function updateLanguageDisplay(lang) {
    const langDisplay = document.getElementById('currentLang');
    if (langDisplay) {
        langDisplay.textContent = lang.toUpperCase();
    }
}

/**
 * @function applyTranslations
 * @description Applique les traductions à tous les éléments de la page en fonction de la langue choisie.
 *              Met également à jour le titre de la page et le contenu du modal de sélection de langue.
 * @param {string} lang - Code de la langue sélectionnée (par exemple, 'fr' ou 'en').
 */
function applyTranslations(lang) {
    // Récupère la page actuelle
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Met à jour les éléments de navigation
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Met à jour le titre de la page selon la page actuelle
    const title = document.querySelector('h1');
    if (title) {
        if (currentPage === 'index.html') {
            title.textContent = translations[lang].welcome;
        } else if (currentPage === 'news.html') {
            title.textContent = translations[lang].news;
        } else if (currentPage === 'images.html') {
            title.textContent = translations[lang].images;
        } else if (currentPage === 'contact.html') {
            title.textContent = translations[lang].contact;
        }
    }

    // Met à jour le titre du modal de sélection de langue
    const modalTitle = document.querySelector('.modal-content h2');
    if (modalTitle) {
        modalTitle.textContent = translations[lang].chooseLang;
    }
}

/**
 * @event DOMContentLoaded
 * @description Initialise la langue au chargement de la page en appelant `initializeLanguage`.
 */
document.addEventListener('DOMContentLoaded', initializeLanguage);