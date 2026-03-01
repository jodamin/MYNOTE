# 📔 MYNOTE Changelog
All changes to the **MYNOTE** project are documented here.

---

## [1.5.0] - 2026-03-01
### 🚀 Added
- **Mobile-First Top Navigation**: Re-engineered the Sidebar into a sticky horizontal Header for mobile devices, optimizing screen real estate.
- **Adaptive Note Grid**: Implemented a responsive `auto-fill` grid system. Notes now automatically arrange into 1, 2, or 3 columns based on screen width.
- **Smooth Slide Animation**: Added a fluid "Slide Down" transition for the mobile menu with hardware acceleration (`will-change: max-height`).

### 🔄 Changed
- **Glassmorphism Consistency**: Unified the blur effect across both Desktop and Mobile interfaces for a premium, seamless look.
- **Enhanced Modal UX**: Redesigned the "Add/Update Note" popup on mobile to be wider and more centered, ensuring buttons are easy to tap.
- **Sidebar Logic Refinement**: The mobile menu now only auto-closes when a note is added, allowing users to toggle themes without losing their place.

### 🛠️ Fixed
- **Z-Index Layering Bug**: Resolved an issue where the Header was overlapping the Note Modal by elevating the modal to `z-index: 9999`.
- **Theme Toggle ReferenceError**: Fixed a JavaScript crash caused by an undefined `sidebar` variable inside the theme switching function.
- **Mobile Scroll Lock**: Fixed a CSS conflict that prevented users from scrolling through their notes on mobile browsers.
- **Button Overflow**: Corrected a layout bug where "Save" and "Delete" buttons were drifting outside the modal boundaries on small screens.

---

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

---

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