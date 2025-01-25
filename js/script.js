/**
 * @constant {Object} translations
 * @description Contient les traductions pour différentes langues (français et anglais).
 * @property {Object} fr - Traductions en français.
 * @property {Object} en - Traductions en anglais.
 */
const translations = {
    fr: {
        welcome: "Bienvenue sur JAR",
        welcomeDescription: "JAR, un collectif de jeunes artistes orléanais.es, motivé.es par la volonté de " +
            "contribuer à la dynamisation de la scène artistique locale.\n" +
            "Nous avons fondé JAR pour offrir un espace de de rencontre, participatif," +
            " d’échange, de pratique et de découverte artistique à toutes et à tous.\n" +
            "\n" +
            "Nous souhaitons créer un environnement participatif où chacun peut s'initier" +
            " à l'art et rencontrer des artistes passionnés.\n",

        news: "Actualités",
        images: "Images",
        contact: "Contact",
        chooseLang: "Choisissez votre langue"
    },
    en: {
        welcome: "Welcome to JAR",
        welcomeDescription: "JAR, a collective of young artists from Orléans, driven by the desire " +
            "to invigorate the local art scene.\n" +
            "We founded JAR to provide a space for meeting, participation, exchange, artistic practice, " +
            "and discovery for everyone.\n" +
            "\n" +
            "We aim to create a participatory environment where anyone can explore art and " +
            "connect with passionate artists.",

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
    currentLanguage = lang;
    document.getElementById('currentLang').textContent = lang.toUpperCase();
    // Mettez à jour l'affichage des news avec la nouvelle langue
    if (newsData) {
        displayNews();
    }


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











// Update in script.js
function createNewsCard(newsItem) {
    const card = document.createElement('div');
    card.className = 'news-card';

    // Add data attribute for news ID
    card.setAttribute('data-news-id', newsItem.id);

    // Make card clickable
    card.addEventListener('click', () => {
        window.location.href = `news-detail.html?id=${newsItem.id}`;
    });
    card.style.cursor = 'pointer'; // Add pointer cursor to indicate clickability

    const image = document.createElement('img');
    image.src = newsItem.image;
    image.alt = newsItem.title[currentLanguage];
    image.className = 'news-image';

    const title = document.createElement('h2');
    title.textContent = newsItem.title[currentLanguage];
    title.className = 'news-title';

    const description = document.createElement('p');
    description.textContent = newsItem.description[currentLanguage];
    description.className = 'news-description';

    // Add date to the card
    const date = document.createElement('div');
    date.className = 'news-date';
    date.textContent = formatDate(newsItem, currentLanguage);

    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(date);

    return card;
}

// Date formatting function
function formatDate(newsItem, lang) {
    if (newsItem.startDate) {
        const start = new Date(newsItem.startDate);
        const end = newsItem.endDate ? new Date(newsItem.endDate) : null;

        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };

        if (!end) {
            return start.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', options);
        }

        // Check if dates are in same month and year
        if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
            const startFormat = start.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', { day: 'numeric' });
            const endFormat = end.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            return lang === 'fr'
                ? `Du ${startFormat} au ${endFormat}`
                : `From ${startFormat} to ${endFormat}`;
        }

        // Different months or years
        const startFormat = start.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', options);
        const endFormat = end.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', options);
        return lang === 'fr'
            ? `Du ${startFormat} au ${endFormat}`
            : `From ${startFormat} to ${endFormat}`;
    }
    return '';
}




let newsData = null;
let currentLanguage = localStorage.getItem('language') || 'fr';

async function loadNews() {
    try {
        const response = await fetch('../ressources/news.json');
        newsData = await response.json();
        displayNews();
    } catch (error) {
        console.error('Erreur lors du chargement des news:', error);
    }
}

function displayNews() {
    const newsContainer = document.createElement('div');
    newsContainer.className = 'news-container';

    newsData.news.forEach(item => {
        const newsCard = createNewsCard(item);
        newsContainer.appendChild(newsCard);
    });

    const mainContent = document.querySelector('main.content');
    // Supprime l'ancien contenu des news s'il existe
    const existingNews = document.querySelector('.news-container');
    if (existingNews) {
        existingNews.remove();
    }
    mainContent.appendChild(newsContainer);
}

// function createNewsCard(newsItem) {
//     const card = document.createElement('div');
//     card.className = 'news-card';
//
//     const image = document.createElement('img');
//     image.src = newsItem.image;
//     image.alt = newsItem.title[currentLanguage];
//     image.className = 'news-image';
//
//     const title = document.createElement('h2');
//     title.textContent = newsItem.title[currentLanguage];
//     title.className = 'news-title';
//
//     const description = document.createElement('p');
//     description.textContent = newsItem.description[currentLanguage];
//     description.className = 'news-description';
//
//     card.appendChild(image);
//     card.appendChild(title);
//     card.appendChild(description);
//
//     return card;
// }



// Ajoutez cet appel à la fin de votre script.js

document.addEventListener('DOMContentLoaded', () => {
    // On vérifie si nous sommes sur la page news.html
    const isNewsPage = window.location.pathname.includes('news.html');

    if (isNewsPage) {
        loadNews();
        applyTranslations(currentLanguage);
    }
});