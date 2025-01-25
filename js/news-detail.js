// news-detail.js
async function loadNewsDetail() {
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

            // Title first
            const title = document.createElement('h1');
            title.textContent = newsItem.title[currentLanguage];
            title.className = 'news-detail-title';

            // Date as subtitle
            const date = document.createElement('div');
            date.className = 'news-detail-subtitle';
            date.textContent = formatDate(newsItem, currentLanguage);

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
            description.className = 'news-detail-description';

            textContainer.appendChild(description);

            bottomWrapper.appendChild(imageContainer);
            bottomWrapper.appendChild(textContainer);

            // Append in order: title, subtitle, bottom content
            detailContainer.appendChild(title);
            detailContainer.appendChild(date);
            detailContainer.appendChild(bottomWrapper);
        } else {
            console.error('News item not found');
        }
    } catch (error) {
        console.error('Error loading news detail:', error);
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