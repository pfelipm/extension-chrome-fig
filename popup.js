// popup.js

// Lista de dominios de Google donde se sabe que funciona el forzado de idioma.
const knownWorkingDomains = [
    'admin.google.com',
    'analytics.google.com',
    'calendar.google.com',
    'classroom.google.com',
    'console.cloud.google.com',
    'datastudio.google.com',
    'docs.google.com', // Incluye Docs, Sheets, Slides, Forms, Drawings y Vids
    'drive.google.com',
    'gemini.google.com',
    'keep.google.com',
    'notebook.google.com',
    'photos.google.com',
    'script.google.com',
    'sites.google.com',
    'tasks.google.com'
];

// Lista de idiomas disponibles.
const languages = [
    { code: 'en', name: 'English', flag: 'gb' },
    { code: 'es', name: 'Español', flag: 'es' },
    { code: 'fr', name: 'Français', flag: 'fr' },
    { code: 'de', name: 'Deutsch', flag: 'de' },
    { code: 'pt', name: 'Português (PT)', flag: 'pt' },
    { code: 'pt-BR', name: 'Português (BR)', flag: 'br' },
    { code: 'it', name: 'Italiano', flag: 'it' },
    { code: 'ja', name: '日本語', flag: 'jp' },
    { code: 'zh-CN', name: '中文 (简体)', flag: 'cn' },
    { code: 'zh-TW', name: '中文 (繁體)', flag: 'tw' },
    { code: 'ru', name: 'Русский', flag: 'ru' },
    { code: 'ar', name: 'العربية', flag: 'sa' },
    { code: 'hi', name: 'हिन्दी', flag: 'in' },
    { code: 'ko', name: '한국어', flag: 'kr' },
    { code: 'nl', name: 'Nederlands', flag: 'nl' },
    // --- Idiomas europeos añadidos ---
    { code: 'bg', name: 'Български', flag: 'bg' }, // Búlgaro
    { code: 'cs', name: 'Čeština', flag: 'cz' }, // Checo
    { code: 'da', name: 'Dansk', flag: 'dk' }, // Danés
    { code: 'el', name: 'Ελληνικά', flag: 'gr' }, // Griego
    { code: 'et', name: 'Eesti', flag: 'ee' }, // Estonio
    { code: 'fi', name: 'Suomi', flag: 'fi' }, // Finlandés
    { code: 'hr', name: 'Hrvatski', flag: 'hr' }, // Croata
    { code: 'hu', name: 'Magyar', flag: 'hu' }, // Húngaro
    { code: 'is', name: 'Íslenska', flag: 'is' }, // Islandés
    { code: 'lt', name: 'Lietuvių', flag: 'lt' }, // Lituano
    { code: 'lv', name: 'Latviešu', flag: 'lv' }, // Letón
    { code: 'no', name: 'Norsk', flag: 'no' }, // Noruego
    { code: 'pl', name: 'Polski', flag: 'pl' }, // Polaco
    { code: 'ro', name: 'Română', flag: 'ro' }, // Rumano
    { code: 'sk', name: 'Slovenčina', flag: 'sk' }, // Eslovaco
    { code: 'sl', name: 'Slovenščina', flag: 'si' }, // Esloveno
    { code: 'sr', name: 'Српски', flag: 'rs' }, // Serbio
    { code: 'sv', name: 'Svenska', flag: 'se' }, // Sueco
    { code: 'tr', name: 'Türkçe', flag: 'tr' }, // Turco
    { code: 'uk', name: 'Українська', flag: 'ua' }, // Ucraniano
    // --- Idiomas del mundo añadidos ---
    { code: 'bn', name: 'বাংলা', flag: 'bd' }, // Bengalí
    { code: 'id', name: 'Bahasa Indonesia', flag: 'id' }, // Indonesio
    { code: 'ur', name: 'اردو', flag: 'pk' }, // Urdu
    { code: 'vi', name: 'Tiếng Việt', flag: 'vn' }, // Vietnamita
    { code: 'th', name: 'ไทย', flag: 'th' }, // Tailandés
    { code: 'fa', name: 'فارسی', flag: 'ir' }, // Persa
    // --- Idiomas con banderas locales ---
    { code: 'ca', name: 'Català', flag: 'ad', local_flag: 'icons/banderas/català.svg' },
    { code: 'eu', name: 'Euskara', flag: 'es-pv', local_flag: 'icons/banderas/euskara.svg' },
    { code: 'gl', name: 'Galego', flag: 'es-ga', local_flag: 'icons/banderas/galego.svg' }
];


// Elementos del DOM
const messageArea = document.getElementById('message-area');
const languageSelectionArea = document.getElementById('language-selection-area');
const favoriteLanguagesList = document.getElementById('favorite-languages-list');
const allLanguagesList = document.getElementById('all-languages-list');
const favoritesSection = document.getElementById('favorites-section');
const popupTitle = document.getElementById('popup-title');
const disableButton = document.getElementById('disable-button');

let favoriteLanguageCodes = [];

// Función para mostrar mensajes al usuario
function showMessage(message, type = 'info') {
    messageArea.textContent = message;
    messageArea.className = `message ${type}`;
    messageArea.style.display = 'block';
}

// Cargar favoritos desde chrome.storage
async function loadFavorites() {
    const data = await chrome.storage.local.get(['favoriteLanguages']);
    favoriteLanguageCodes = data.favoriteLanguages || [];
}

// Guardar favoritos en chrome.storage
async function saveFavorites() {
    await chrome.storage.local.set({ favoriteLanguages: favoriteLanguageCodes });
}

// Renderizar la lista de idiomas
function renderLanguages() {
    favoriteLanguagesList.innerHTML = '';
    allLanguagesList.innerHTML = '';

    const sortedLanguages = [...languages].sort((a, b) => a.name.localeCompare(b.name));

    let favoritesCount = 0;

    sortedLanguages.forEach(lang => {
        const listItem = document.createElement('li');
        listItem.dataset.langCode = lang.code;

        const flagSpan = document.createElement('span');
        flagSpan.className = 'flag';

        const flagImg = document.createElement('img');

        if (lang.local_flag) {
            flagImg.src = lang.local_flag;
        } else {
            flagImg.src = `https://flagcdn.com/w20/${lang.flag.toLowerCase()}.png`;
        }

        flagImg.alt = `${lang.name} flag`;
        flagImg.onerror = function() {
            this.style.display='none';
            const textFlag = document.createElement('span');
            textFlag.textContent = lang.flag.toUpperCase();
            textFlag.className = 'flag-fallback';
            flagSpan.appendChild(textFlag);
        }
        flagSpan.appendChild(flagImg);

        const nameSpan = document.createElement('span');
        nameSpan.className = 'name';
        nameSpan.textContent = lang.name;

        const favoriteButton = document.createElement('button');
        favoriteButton.className = 'favorite-btn';
        const isFavorite = favoriteLanguageCodes.includes(lang.code);
        favoriteButton.textContent = isFavorite ? '★' : '☆';
        favoriteButton.title = isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos';
        favoriteButton.addEventListener('click', (event) => {
            event.stopPropagation();
            toggleFavorite(lang.code);
        });

        listItem.appendChild(flagSpan);
        listItem.appendChild(nameSpan);
        listItem.appendChild(favoriteButton);

        listItem.addEventListener('click', () => {
            forceLanguage(lang.code);
        });

        if (isFavorite) {
            favoriteLanguagesList.appendChild(listItem);
            favoritesCount++;
        } else {
            allLanguagesList.appendChild(listItem);
        }
    });

    if (favoritesCount > 0) {
        favoritesSection.style.display = 'block';
    } else {
        favoritesSection.style.display = 'none';
    }
}

// Alternar estado de favorito
async function toggleFavorite(langCode) {
    const index = favoriteLanguageCodes.indexOf(langCode);
    if (index > -1) {
        favoriteLanguageCodes.splice(index, 1);
    } else {
        favoriteLanguageCodes.push(langCode);
    }
    await saveFavorites();
    renderLanguages();
}

// Función para forzar el idioma en la pestaña actual
function forceLanguage(langCode) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (chrome.runtime.lastError || !tabs[0]?.url) {
            showMessage("No se pudo obtener la URL de la pestaña activa.", 'error');
            return;
        }
        try {
            let currentUrl = new URL(tabs[0].url);

            if (!currentUrl.protocol.startsWith('http')) {
                showMessage("No se puede modificar la URL en esta página (ej: chrome://).", 'warning');
                return;
            }

            currentUrl.searchParams.set('hl', langCode);
            currentUrl.searchParams.set('forcehl', '1');

            chrome.tabs.update(tabs[0].id, { url: currentUrl.toString() }, () => {
                if (chrome.runtime.lastError) {
                    showMessage(`Error al actualizar la pestaña: ${chrome.runtime.lastError.message}`, 'error');
                } else {
                    window.close();
                }
            });
        } catch (error) {
            showMessage("URL de la pestaña no válida.", 'error');
        }
    });
}

// Función para restablecer el idioma de la página
function resetLanguage() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (chrome.runtime.lastError || !tabs[0]?.url) {
            showMessage("No se pudo obtener la URL de la pestaña activa.", 'error');
            return;
        }
        try {
            let currentUrl = new URL(tabs[0].url);

            currentUrl.searchParams.delete('hl');
            currentUrl.searchParams.delete('forcehl');

            chrome.tabs.update(tabs[0].id, { url: currentUrl.toString() }, () => {
                if (chrome.runtime.lastError) {
                    showMessage(`Error al actualizar la pestaña: ${chrome.runtime.lastError.message}`, 'error');
                } else {
                    window.close();
                }
            });
        } catch (error) {
            showMessage("URL de la pestaña no válida.", 'error');
        }
    });
}


// Inicialización cuando el popup se carga
document.addEventListener('DOMContentLoaded', async () => {
    await loadFavorites();

    disableButton.addEventListener('click', resetLanguage);

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (chrome.runtime.lastError || !tabs || !tabs[0]?.url) {
            showMessage("No se pudo acceder a la pestaña actual.", 'error');
            languageSelectionArea.style.display = 'none';
            popupTitle.textContent = "Error";
            return;
        }

        try {
            const currentUrl = new URL(tabs[0].url);
            const hostname = currentUrl.hostname;

            if (!currentUrl.protocol.startsWith('http')) {
                 showMessage("Esta extensión no funciona en páginas internas del navegador.", 'info');
                 languageSelectionArea.style.display = 'none';
                 return;
            }

            const isLanguageForced = currentUrl.searchParams.has('hl') && currentUrl.searchParams.has('forcehl');
            disableButton.disabled = !isLanguageForced;

            const isKnownCompatible = knownWorkingDomains.some(domain => hostname === domain || hostname.endsWith('.' + domain));

            if (isKnownCompatible) {
                showMessage(`Modificando idioma para ${hostname}.`, 'info');
                languageSelectionArea.style.display = 'block';
                renderLanguages();
            } else if (hostname.includes('google.com')) {
                showMessage(`Servicio: ${hostname}. El forzado de idioma podría no funcionar aquí.`, 'warning');
                languageSelectionArea.style.display = 'block';
                renderLanguages();
            } else {
                showMessage("Esta extensión está diseñada para servicios de Google.", 'info');
                languageSelectionArea.style.display = 'none';
                popupTitle.textContent = "Servicio no compatible";
            }
        } catch (error) {
            showMessage("La URL de la pestaña actual no es válida.", 'error');
            languageSelectionArea.style.display = 'none';
            popupTitle.textContent = "Error de URL";
        }
    });
});