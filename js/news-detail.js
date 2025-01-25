// news-detail.js
async function loadNewsDetail() {
    // Retrieve the stored language or default to 'fr'
    currentLanguage = localStorage.getItem('language') || 'fr';

    const urlParams = new URLSearchParams(window.location.search);
    const newsId = urlParams.get('id');

    try {
        const response = await fetch('../ressources/news.json');
        const newsData = await response.json();

        const newsItem = newsData.news.find(item => item.id === parseInt(newsId));

        if (newsItem) {
            const detailContainer = document.getElementById('newsDetail');

            const contentWrapper = document.createElement('div');
            contentWrapper.className = 'news-detail-content';

            // Title with translation attribute
            const title = document.createElement('h1');
            title.textContent = newsItem.title[currentLanguage];
            title.setAttribute('data-translate', 'newsTitle' + newsItem.id);
            title.className = 'news-detail-title';

            // Date as subtitle with translation attribute
            const date = document.createElement('div');
            date.className = 'news-detail-subtitle';
            date.textContent = formatDate(newsItem, currentLanguage);
            date.setAttribute('data-translate', 'newsDate' + newsItem.id);

            const bottomWrapper = document.createElement('div');
            bottomWrapper.className = 'news-detail-bottom-wrapper';

            const imageContainer = document.createElement('div');
            imageContainer.className = 'news-detail-image-container';

            const image = document.createElement('img');
            image.src = newsItem.image;
            image.alt = newsItem.title[currentLanguage];
            image.className = 'news-detail-image';
            imageContainer.appendChild(image);

            const textContainer = document.createElement('div');
            textContainer.className = 'news-detail-text';

            const description = document.createElement('p');
            description.textContent = newsItem.description[currentLanguage];
            description.setAttribute('data-translate', 'newsDescription' + newsItem.id);
            description.className = 'news-detail-description';

            textContainer.appendChild(description);

            bottomWrapper.appendChild(imageContainer);
            bottomWrapper.appendChild(textContainer);

            // Append in order: title, subtitle, bottom content
            detailContainer.appendChild(title);
            detailContainer.appendChild(date);
            detailContainer.appendChild(bottomWrapper);

            // Update translations object to include these new keys
            translations.fr['newsTitle' + newsItem.id] = newsItem.title.fr;
            translations.en['newsTitle' + newsItem.id] = newsItem.title.en;
            translations.fr['newsDescription' + newsItem.id] = newsItem.description.fr;
            translations.en['newsDescription' + newsItem.id] = newsItem.description.en;

            // Ensure currentLanguage is set before applying translations
            currentLanguage = localStorage.getItem('language') || 'fr';

            // Apply translations to ensure dynamic content is translated
            applyTranslations(currentLanguage);

            // Update language display
            updateLanguageDisplay(currentLanguage);
        } else {
            console.error('News item not found');
        }
    } catch (error) {
        console.error('Error loading news detail:', error);
    }
}

function setLanguage(lang) {
    currentLanguage = lang;
    document.getElementById('currentLang').textContent = lang.toUpperCase();

    localStorage.setItem('language', lang);
    applyTranslations(lang);
    updateLanguageDisplay(lang);
    hideLanguageModal();

    // Reload news if on news pages to update with new language
    const isNewsPage = window.location.pathname.includes('news.html');
    const isNewsDetailPage = window.location.pathname.includes('news-detail.html');

    if (isNewsPage) {
        loadNews();
    } else if (isNewsDetailPage) {
        loadNewsDetail();
    }
}

// Reuse the formatDate function from script.js
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

// Load news detail on page load
document.addEventListener('DOMContentLoaded', loadNewsDetail);