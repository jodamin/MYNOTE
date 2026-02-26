# 📔 MYNOTE Changelog
All changes to the **MYNOTE** project are documented here.

## [1.4.0] - 2026-02-26
### 🚀 Added
- **PostgreSQL Integration**: Migrated the database from local SQLite to a professional PostgreSQL instance on Render for permanent data storage.
- **Dynamic Environment Configuration**: Implemented `DATABASE_URL` environment variables to switch seamlessly between Local and Production environments.
- **Cute Flash Notifications**: Added a candy-styled notification system with bouncy animations and pastel colors.
- **Visual Feedback**: Integrated cloud `☁️` and heart `💙` emojis into system messages for a friendlier user experience.

### 🔄 Changed
- **Flash Message UI**: Redesigned notifications from a rigid box style to a "soft & cute" rounded pill design with `50px` border-radius.
- **Code Refactoring**: Cleaned up Jinja2 templates in `index.html` to prevent HTML nesting errors and improve maintainability.

### 🛠️ Fixed
- **NameError 'flash'**: Resolved the "flash not defined" bug by correctly importing the module in `app.py`.
- **CSS Specificity**: Removed inline styles from the flash container to ensure custom CSS styles apply correctly.

## [1.3.0] - 2026-02-23
### 🚀 Added
- **Custom Background**: Users can now upload personal images to set as the app background.
- **Reset Feature**: Added a button to restore default background settings.
- **Social Branding**: Integrated an Instagram link and custom project badge for personalization.

### 🔄 Changed
- **Glassmorphism UI**: Updated the Sidebar and Note cards with a "blur" effect.
- **Popup Update**: Refactored the editing process to use a Modal instead of a separate page.
- **Mobile Optimization**: Enhanced Responsive Design for a better experience on phones and tablets.

### 🛠️ Fixed
- **Dark Mode Sync**: Ensured all colors and borders synchronize correctly when switching themes.
- **Line Break Bug**: Fixed the issue where notes were "squashed" into one line using `white-space: pre-wrap`.

---

## [1.2.0] - 2026-02-21
### 🚀 Added
- **Dark Mode**: Implemented a dark theme for eye comfort during night use.
- **Theme Persistence**: Used `localStorage` to remember the user's theme choice.

---

## [1.1.0] - 2026-02-20
### 🚀 Added
- **Welcome Page**: Added a screen to collect the user's name.
- **Session Management**: Used Flask sessions to greet the user by name.

---

## [1.0.0] - 2026-02-19
### 🚀 Added
- **Core Features**: Initial release with full CRUD (Create, Read, Update, Delete) functionality.