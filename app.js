// État global de l'application
const state = {
    currentScreen: 'welcome',
    previousScreen: null,
    quest: {
        avatar: null,
        interests: [],
        studyStyle: null,
        level: [],
        location: []
    },
    favorites: [],
    swipeLikes: [],
    swipeIndex: 0,
    swipeFormations: [],
    currentStep: 0,
    totalSteps: 5,
    darkMode: false
};

// Mapping domaines vers icônes
const domaineIcons = {
    'Commerce Marketing Finance': '💼',
    'Agriculture Environnement': '🌱',
    'Techniques de l\'information et de la communication - Arts': '🎨',
    'Vie et gestion des organisations': '🏢',
    'Sciences & technologies - santé': '🔬',
    'Santé Social Beauté Bien-être': '💆',
    'Sciences humaines et sociales': '📚',
    'Production industrielle - énergie électricité': '⚡',
    'Langues et International - L.E.A.': '🌍'
};

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 1000);
    //cache le header au chargement
    document.getElementById('header').style.display = 'none';
    
    loadDarkMode();
    loadFavorites();
    initExploreMode();
    initSwipeMode();
    updateProgress();
    updateNavbar();
});

// Dark Mode
function toggleDarkMode() {
    state.darkMode = !state.darkMode;
    document.body.classList.toggle('dark-mode', state.darkMode);
    document.querySelector('.dark-mode-icon').textContent = state.darkMode ? '☀️' : '🌙';
    localStorage.setItem('orientationQuest_darkMode', state.darkMode);
}

function loadDarkMode() {
    const saved = localStorage.getItem('orientationQuest_darkMode');
    if (saved === 'true') {
        state.darkMode = true;
        document.body.classList.add('dark-mode');
        document.querySelector('.dark-mode-icon').textContent = '☀️';
    }
}

// Navigation entre écrans
function showScreen(screenId) {
    state.previousScreen = state.currentScreen;
    state.currentScreen = screenId;
    
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    
    // Afficher le header uniquement sur les écrans du quiz
    const quizScreens = ['avatar', 'interests', 'studyStyle', 'level', 'location'];
    if (quizScreens.includes(screenId)) {
        document.getElementById('header').style.display = 'block';
    } else {
        document.getElementById('header').style.display = 'none';
    }
    
    if (screenId === 'swipe') {
        resetSwipe();
    }
    
    updateNavbar();
    window.scrollTo(0, 0);
}

function goBack() {
    if (state.previousScreen) {
        showScreen(state.previousScreen);
    } else {
        showScreen('welcome');
    }
}

function updateNavbar() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-screen') === state.currentScreen) {
            item.classList.add('active');
        }
    });
}

// Démarrer la quête
function startQuest() {
    state.quest = {
        avatar: null,
        interests: [],
        studyStyle: null,
        level: [],
        location: []
    };
    state.currentStep = 0;
    updateProgress();
    showScreen('avatar');
}

// Mise à jour de la barre de progression
function updateProgress() {
    const progressBar = document.getElementById('progress');
    if (progressBar) {
        const progress = (state.currentStep / state.totalSteps) * 100;
        progressBar.style.width = progress + '%';
    }
}

// Étape 1: Sélection avatar
function selectAvatar(emoji, name) {
    state.quest.avatar = { emoji, name };
    document.querySelectorAll('.avatar-card').forEach(c => c.classList.remove('selected'));
    event.target.closest('.avatar-card').classList.add('selected');
    
    addBadge(emoji, name);
    state.currentStep = 1;
    updateProgress();
    
    setTimeout(() => {
        showScreen('interests');
        initInterests();
    }, 500);
}

// Ajouter un badge
function addBadge(emoji, text) {
    const badge = document.createElement('div');
    badge.className = 'badge';
    badge.innerHTML = `${emoji} ${text}`;
    document.getElementById('badges').appendChild(badge);
}

// Étape 2: Initialiser les centres d'intérêt
function initInterests() {
    const container = document.getElementById('domainesContainer');
    container.innerHTML = '';
    
    DATA.domaines.forEach(domaine => {
        const icon = domaineIcons[domaine.nom] || '📖';
        const card = document.createElement('div');
        card.className = 'interest-card';
        card.innerHTML = `
            <div class="interest-icon">${icon}</div>
            <div class="interest-name">${domaine.nom}</div>
            <div class="interest-count">${domaine.count} formations</div>
        `;
        card.onclick = () => toggleInterest(domaine.nom, card);
        container.appendChild(card);
    });
}

function toggleInterest(domaine, element) {
    const index = state.quest.interests.indexOf(domaine);
    
    if (index > -1) {
        state.quest.interests.splice(index, 1);
        element.classList.remove('selected');
    } else {
        if (state.quest.interests.length < 3) {
            state.quest.interests.push(domaine);
            element.classList.add('selected');
        } else {
            alert('Maximum 3 domaines ! Désélectionne-en un d\'abord.');
            return;
        }
    }
    
    document.getElementById('btnNextInterests').disabled = state.quest.interests.length === 0;
}

function nextStep(from) {
    if (from === 'interests') {
        state.currentStep = 2;
        updateProgress();
        showScreen('studyStyle');
    }
}

// Étape 3: Style d'études
function selectStudyStyle(style) {
    state.quest.studyStyle = style;
    document.querySelectorAll('.style-card').forEach(c => c.classList.remove('selected'));
    event.target.closest('.style-card').classList.add('selected');
    
    state.currentStep = 3;
    updateProgress();
    
    setTimeout(() => {
        showScreen('level');
    }, 500);
}

// Étape 4: Niveau
function selectLevel(...levels) {
    state.quest.level = levels;
    document.querySelectorAll('.level-option').forEach(c => c.classList.remove('selected'));
    event.target.closest('.level-option').classList.add('selected');
    
    state.currentStep = 4;
    updateProgress();
    
    setTimeout(() => {
        showScreen('location');
        initLocation();
    }, 500);
}

// Étape 5: Localisation
function initLocation() {
    const container = document.getElementById('etablissementsContainer');
    container.innerHTML = '';
    
    DATA.etablissements.forEach(etab => {
        const card = document.createElement('div');
        card.className = 'etablissement-card';
        card.textContent = etab;
        card.onclick = () => selectLocation(etab);
        container.appendChild(card);
    });
}

function selectLocation(...locations) {
    state.quest.location = locations[0] === 'ALL' ? DATA.etablissements : locations;
    state.currentStep = 5;
    updateProgress();
    
    setTimeout(() => {
        calculateResults();
    }, 300);
}

// Calculer et afficher les résultats
function calculateResults() {
    const results = [];
    
    DATA.formations.forEach(formation => {
        let score = 0;
        let reasons = [];
        
        if (state.quest.interests.includes(formation.domaine)) {
            score += 40;
            reasons.push('Domaine choisi');
        }
        
        if (state.quest.studyStyle === 'MIXTE') {
            score += 20;
        } else if (formation.voie.includes(state.quest.studyStyle)) {
            score += 30;
            reasons.push('Voie compatible');
        }
        
        if (state.quest.level.includes('ALL')) {
            score += 10;
        } else if (state.quest.level.some(l => formation.niveau.includes(l))) {
            score += 30;
            reasons.push('Niveau compatible');
        }
        
        const hasEtab = formation.etablissements.some(e => state.quest.location.includes(e));
        if (hasEtab) {
            score += 20;
            reasons.push('Établissement proche');
        }
        
        if (score >= 30) {
            results.push({ formation, score, reasons });
        }
    });
    
    results.sort((a, b) => b.score - a.score);
    displayResults(results);
}

function displayResults(results) {
    showScreen('results');
    
    const subtitle = document.getElementById('resultsSubtitle');
    subtitle.textContent = `${results.length} formation${results.length > 1 ? 's' : ''} correspondent à ton profil !`;
    
    const container = document.getElementById('resultsContainer');
    container.innerHTML = '';
    
    if (results.length === 0) {
        container.innerHTML = '<div class="empty-state"><div class="empty-emoji">😕</div><p>Aucune formation ne correspond exactement. Essaie d\'explorer toutes les formations !</p></div>';
        return;
    }
    
    results.slice(0, 20).forEach(({ formation, score }) => {
        container.appendChild(createFormationCard(formation, score));
    });
}

// Créer une carte de formation
function createFormationCard(formation, score = null) {
    const card = document.createElement('div');
    card.className = 'formation-card';
    
    const isFavorite = state.favorites.includes(formation.id);
    
    let etablissementsText = '';
    if (formation.etablissements.length > 0) {
        const maxDisplay = 2;
        const etabsToShow = formation.etablissements.slice(0, maxDisplay);
        etablissementsText = etabsToShow.join(', ');
        if (formation.etablissements.length > maxDisplay) {
            etablissementsText += ` et ${formation.etablissements.length - maxDisplay} autre(s)`;
        }
    } else {
        etablissementsText = 'Renseignez-vous';
    }
    
    card.innerHTML = `
        <div class="formation-header">
            ${score ? `<div class="formation-score">${score}% match</div>` : ''}
            <button class="favorite-btn" onclick="toggleFavorite(${formation.id})">
                ${isFavorite ? '⭐' : '☆'}
            </button>
        </div>
        <div class="formation-title">${formation.nom}</div>
        <div class="formation-meta">
            ${formation.bac_plus ? `<span class="meta-badge meta-badge-bac">${formation.bac_plus}</span>` : ''}
            <span class="meta-badge">${formation.niveau}</span>
            <span class="meta-badge">${formation.voie || 'Non précisé'}</span>
        </div>
        <div class="formation-etablissements">
            📍 ${etablissementsText}
        </div>
    `;
    
    return card;
}

// MODE SWIPE
function initSwipeMode() {
    state.swipeFormations = [...DATA.formations].sort(() => Math.random() - 0.5);
    state.swipeIndex = 0;
    state.swipeLikes = [];
}

function resetSwipe() {
    initSwipeMode();
    document.getElementById('swipeEmpty').style.display = 'none';
    document.getElementById('swipeStack').innerHTML = '';
    loadSwipeCards();
}

function loadSwipeCards() {
    const stack = document.getElementById('swipeStack');
    const remaining = state.swipeFormations.length - state.swipeIndex;
    const toLoad = Math.min(3, remaining);
    
    document.getElementById('swipeCounter').textContent = state.swipeIndex;
    document.getElementById('swipeTotal').textContent = state.swipeFormations.length;
    
    if (toLoad === 0) {
        document.getElementById('swipeEmpty').style.display = 'flex';
        return;
    }
    
    for (let i = 0; i < toLoad; i++) {
        const formation = state.swipeFormations[state.swipeIndex + i];
        if (formation) {
            const card = createSwipeCard(formation, i);
            stack.appendChild(card);
        }
    }
}

function createSwipeCard(formation, zIndex) {
    const card = document.createElement('div');
    card.className = 'swipe-card';
    card.style.zIndex = 10 - zIndex;
    card.style.transform = `scale(${1 - zIndex * 0.05}) translateY(${zIndex * 10}px)`;
    
    const icon = domaineIcons[formation.domaine] || '📖';
    
    let etablissementsText = '';
    if (formation.etablissements.length > 0) {
        const maxDisplay = 3;
        const etabsToShow = formation.etablissements.slice(0, maxDisplay);
        etablissementsText = '📍 ' + etabsToShow.join(', ');
        if (formation.etablissements.length > maxDisplay) {
            etablissementsText += ` et ${formation.etablissements.length - maxDisplay} autre(s)`;
        }
    } else {
        etablissementsText = '📍 Renseignez-vous';
    }
    
    card.innerHTML = `
        <div>
            <div class="swipe-card-indicator nope">👎</div>
            <div class="swipe-card-indicator like">💚</div>
            <div class="swipe-card-domaine">${icon}</div>
            <div class="swipe-card-title">${formation.nom}</div>
            <div class="swipe-card-meta">
                ${formation.bac_plus ? `<span class="swipe-meta-badge swipe-badge-bac">${formation.bac_plus}</span>` : ''}
                <span class="swipe-meta-badge">${formation.niveau}</span>
                <span class="swipe-meta-badge">${formation.voie || 'Non précisé'}</span>
            </div>
        </div>
        <div class="swipe-card-etablissements">${etablissementsText}</div>
    `;
    
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    
    const onStart = (e) => {
        isDragging = true;
        startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
        card.classList.add('swiping');
    };
    
    const onMove = (e) => {
        if (!isDragging) return;
        currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
        const diff = currentX - startX;
        const rotation = diff / 20;
        card.style.transform = `translateX(${diff}px) rotate(${rotation}deg)`;
        
        const nopeIndicator = card.querySelector('.swipe-card-indicator.nope');
        const likeIndicator = card.querySelector('.swipe-card-indicator.like');
        
        if (diff < -50) {
            nopeIndicator.style.opacity = Math.min(1, Math.abs(diff) / 100);
            likeIndicator.style.opacity = 0;
        } else if (diff > 50) {
            likeIndicator.style.opacity = Math.min(1, diff / 100);
            nopeIndicator.style.opacity = 0;
        } else {
            nopeIndicator.style.opacity = 0;
            likeIndicator.style.opacity = 0;
        }
    };
    
    const onEnd = () => {
        if (!isDragging) return;
        isDragging = false;
        card.classList.remove('swiping');
        
        const diff = currentX - startX;
        
        if (diff < -100) {
            handleSwipe(formation, false);
            card.classList.add('swipe-out-left');
            setTimeout(() => nextSwipeCard(), 300);
        } else if (diff > 100) {
            handleSwipe(formation, true);
            card.classList.add('swipe-out-right');
            setTimeout(() => nextSwipeCard(), 300);
        } else {
            card.style.transform = `scale(1) translateY(0)`;
            card.querySelectorAll('.swipe-card-indicator').forEach(ind => ind.style.opacity = 0);
        }
    };
    
    card.addEventListener('mousedown', onStart);
    card.addEventListener('touchstart', onStart);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('touchmove', onMove);
    document.addEventListener('mouseup', onEnd);
    document.addEventListener('touchend', onEnd);
    
    return card;
}

function swipeLeft() {
    const stack = document.getElementById('swipeStack');
    const topCard = stack.firstChild;
    if (topCard) {
        const formation = state.swipeFormations[state.swipeIndex];
        handleSwipe(formation, false);
        topCard.classList.add('swipe-out-left');
        setTimeout(() => nextSwipeCard(), 300);
    }
}

function swipeRight() {
    const stack = document.getElementById('swipeStack');
    const topCard = stack.firstChild;
    if (topCard) {
        const formation = state.swipeFormations[state.swipeIndex];
        handleSwipe(formation, true);
        topCard.classList.add('swipe-out-right');
        setTimeout(() => nextSwipeCard(), 300);
    }
}

function handleSwipe(formation, liked) {
    if (liked && !state.swipeLikes.includes(formation.id)) {
        state.swipeLikes.push(formation.id);
        if (!state.favorites.includes(formation.id)) {
            state.favorites.push(formation.id);
            saveFavorites();
            updateFavoriteCount();
        }
    }
}

function nextSwipeCard() {
    const stack = document.getElementById('swipeStack');
    if (stack.firstChild) {
        stack.removeChild(stack.firstChild);
    }
    
    state.swipeIndex++;
    
    if (state.swipeIndex >= state.swipeFormations.length) {
        document.getElementById('swipeEmpty').style.display = 'flex';
    } else {
        const remaining = state.swipeFormations.length - state.swipeIndex;
        if (remaining > 0 && stack.children.length < 3) {
            const formation = state.swipeFormations[state.swipeIndex + stack.children.length];
            if (formation) {
                const card = createSwipeCard(formation, stack.children.length);
                stack.appendChild(card);
            }
        }
        
        document.getElementById('swipeCounter').textContent = state.swipeIndex;
        
        Array.from(stack.children).forEach((card, i) => {
            card.style.zIndex = 10 - i;
            card.style.transform = `scale(${1 - i * 0.05}) translateY(${i * 10}px)`;
        });
    }
}

function showSwipeResults() {
    if (state.swipeLikes.length === 0) {
        alert('Tu n\'as aimé aucune formation ! Réessaie en swipant à droite sur celles qui t\'intéressent.');
        return;
    }
    showFavorites();
}

// Gestion des favoris
function toggleFavorite(formationId) {
    const index = state.favorites.indexOf(formationId);
    
    if (index > -1) {
        state.favorites.splice(index, 1);
    } else {
        state.favorites.push(formationId);
    }
    
    saveFavorites();
    updateFavoriteCount();
    
    if (state.currentScreen === 'results') {
        const btn = event.target.closest('.formation-card').querySelector('.favorite-btn');
        btn.textContent = state.favorites.includes(formationId) ? '⭐' : '☆';
    } else if (state.currentScreen === 'explore') {
        applyFilters();
    } else if (state.currentScreen === 'favorites') {
        showFavorites();
    }
}

function saveFavorites() {
    localStorage.setItem('orientationQuest_favorites', JSON.stringify(state.favorites));
}

function loadFavorites() {
    const saved = localStorage.getItem('orientationQuest_favorites');
    if (saved) {
        state.favorites = JSON.parse(saved);
    }
    updateFavoriteCount();
}

function updateFavoriteCount() {
    const count = document.getElementById('favCount');
    if (count) {
        count.textContent = state.favorites.length;
    }
    const navCount = document.getElementById('navFavCount');
    if (navCount) {
        navCount.textContent = state.favorites.length;
        navCount.style.display = state.favorites.length > 0 ? 'block' : 'none';
    }
}

function showFavorites() {
    showScreen('favorites');
    
    const container = document.getElementById('favoritesContainer');
    container.innerHTML = '';
    
    if (state.favorites.length === 0) {
        container.innerHTML = '<div class="empty-state"><div class="empty-emoji">💫</div><p>Aucun favori pour le moment. Explore les formations et ajoute tes coups de cœur !</p></div>';
        return;
    }
    
    state.favorites.forEach(id => {
        const formation = DATA.formations.find(f => f.id === id);
        if (formation) {
            container.appendChild(createFormationCard(formation));
        }
    });
}

function clearFavorites() {
    if (confirm('Supprimer tous tes favoris ?')) {
        state.favorites = [];
        state.swipeLikes = [];
        saveFavorites();
        updateFavoriteCount();
        showFavorites();
    }
}

// Mode exploration
function initExploreMode() {
    const filterDomaine = document.getElementById('filterDomaine');
    DATA.domaines.forEach(d => {
        const option = document.createElement('option');
        option.value = d.nom;
        option.textContent = d.nom;
        filterDomaine.appendChild(option);
    });
    
    const filterNiveau = document.getElementById('filterNiveau');
    [...new Set(DATA.niveaux)].sort().forEach(n => {
        if (n) {
            const option = document.createElement('option');
            option.value = n;
            option.textContent = n;
            filterNiveau.appendChild(option);
        }
    });
    
    const filterVoie = document.getElementById('filterVoie');
    [...new Set(DATA.voies)].sort().forEach(v => {
        if (v) {
            const option = document.createElement('option');
            option.value = v;
            option.textContent = v;
            filterVoie.appendChild(option);
        }
    });
    
    applyFilters();
}

function applyFilters() {
    const domaine = document.getElementById('filterDomaine').value;
    const niveau = document.getElementById('filterNiveau').value;
    const voie = document.getElementById('filterVoie').value;
    const search = document.getElementById('searchInput').value.toLowerCase();
    
    let filtered = DATA.formations.filter(f => {
        if (domaine && f.domaine !== domaine) return false;
        if (niveau && !f.niveau.includes(niveau)) return false;
        if (voie && !f.voie.includes(voie)) return false;
        if (search && !f.nom.toLowerCase().includes(search) && 
            !f.domaine.toLowerCase().includes(search)) return false;
        return true;
    });
    
    const container = document.getElementById('exploreContainer');
    container.innerHTML = '';
    
    if (filtered.length === 0) {
        container.innerHTML = '<div class="empty-state"><div class="empty-emoji">🔍</div><p>Aucune formation trouvée. Essaie d\'autres filtres !</p></div>';
        return;
    }
    
    filtered.forEach(formation => {
        container.appendChild(createFormationCard(formation));
    });
}
