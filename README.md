# 🚀 Orientation Quest v2.0 - PWA d'orientation supérieure

Application web progressive ultra-moderne avec **bottom navigation**, **dark mode** et **mode swipe** ! 💕

## ✨ Fonctionnalités principales

### 🎮 Mode Quête (Parcours guidé)
- **5 étapes gamifiées** avec progression visuelle
- Sélection d'avatar, domaines d'intérêt, style, niveau, zone
- **Algorithme de matching intelligent** (score 0-120%)
- Résultats personnalisés avec formations compatibles

### 💕 Mode Swipe (NOUVEAU !)
- **Découverte ludique type Tinder**
- Swipe droite → J'aime 💚 | Swipe gauche → Pas pour moi 👎
- **Animations fluides** (glisser, rotation, fade out)
- Support tactile + boutons (mobile & desktop)
- Les "likes" sont automatiquement ajoutés aux favoris
- Compteur de progression
- Écran de fin avec résumé

### 🗺️ Mode Exploration
- Navigation libre avec **filtres avancés**
- Recherche textuelle
- Affichage en grille responsive

### ⭐ Gestion des favoris
- **Carnet de rêves** persistant (localStorage)
- Badge de compteur sur la navbar
- Accessible depuis tous les modes

### 🌙 Dark Mode (NOUVEAU !)
- **Toggle dans le header** (🌙/☀️)
- Thème sombre complet
- Préférence sauvegardée
- Transition fluide

### 📱 Bottom Navigation (NOUVEAU !)
- **Navbar fixe en bas** (style mobile moderne)
- 4 onglets : Accueil, Swipe, Explorer, Favoris
- Badge de notification sur les favoris
- Indicateur d'onglet actif

## 📊 Données

- **79 formations** supérieures
- **9 domaines** d'études avec icônes
- **15 établissements** en Côtes d'Armor
- **Niveaux** : BTS/BTSA, Licence, Bachelor, Master, etc.
- **Voies** : Scolaire, Alternance, Mixte

## 🎨 Design

- **Interface moderne** : Gradients, animations, micro-interactions
- **Dark mode** : Thème sombre élégant
- **Responsive** : Mobile-first avec bottom nav
- **Gamification** : Badges, progression, scores, swipe
- **Accessibility** : Contraste, tailles tactiles (44px min)

## 🔧 Technologies

- **HTML5** : Sémantique, accessible
- **CSS3** : Variables CSS, Grid/Flexbox, animations, dark mode
- **JavaScript Vanilla** : Aucune dépendance
- **PWA** : Installable, offline-ready, manifest
- **LocalStorage** : Favoris, dark mode, préférences

## 📦 Structure

```
orientation-quest/
├── index.html          # Structure avec bottom nav
├── styles.css          # Styles + dark mode + swipe
├── app.js              # Logique complète + swipe + dark mode
├── data.js             # 79 formations
├── manifest.json       # Configuration PWA
├── service-worker.js   # Cache offline
└── README.md           # Documentation
```

## 🚀 Installation

### Serveur local :
```bash
python -m http.server 8000
```
Ouvrir : http://localhost:8000

### Déploiement :
Netlify, Vercel, GitHub Pages, Firebase Hosting

## 💡 Utilisation

### Mode Swipe :
1. Cliquer sur "Swipe ton avenir 💕" ou l'icône dans la navbar
2. Swiper droite (💚) pour aimer, gauche (👎) pour passer
3. Les formations aimées vont automatiquement dans les favoris
4. À la fin : voir tous les coups de cœur ou recommencer

### Dark Mode :
- Cliquer sur l'icône 🌙/☀️ dans le header
- Le mode est sauvegardé automatiquement

### Bottom Navigation :
- **🏠 Accueil** : Retour à l'écran d'accueil
- **💕 Swipe** : Mode découverte ludique
- **🗺️ Explorer** : Navigation libre avec filtres
- **⭐ Favoris** : Toutes les formations sauvegardées (avec badge compteur)

## 🎯 Algorithme de matching

**Score sur 120 points** :
- **40 pts** : Domaine d'intérêt sélectionné
- **30 pts** : Voie d'études compatible
- **30 pts** : Niveau d'études compatible
- **20 pts** : Établissement dans la zone choisie

Seuil d'affichage : **30 points minimum**

## 📱 Compatibilité

✅ Chrome, Safari, Firefox, Edge (Desktop & Mobile)
✅ Support tactile complet
✅ PWA installable sur iOS et Android

## 🔐 Confidentialité

- ✅ 100% local (aucune donnée envoyée)
- ✅ Pas de cookies, pas de tracking
- ✅ Fonctionne offline après installation

## 🆕 Nouveautés v2.0

1. **Mode Swipe** : Découverte ludique type Tinder avec animations
2. **Dark Mode** : Thème sombre complet avec toggle
3. **Bottom Nav** : Navigation mobile moderne et intuitive
4. **Améliorations UX** : Transitions plus fluides, meilleur responsive
5. **Badge favoris** : Compteur visible sur la navbar
6. **Noms complets** : Affichage correct des établissements

## 📝 À venir

- Export PDF du parcours personnalisé
- Partage sur réseaux sociaux
- Mode comparaison côte à côte
- Notifications PWA pour journées portes ouvertes
- Statistiques d'utilisation

---

**Développé avec ❤️ pour les futurs étudiants des Côtes d'Armor**
