All notable changes to the Notebook App project will be documented in this file.

----------------------------[1.0.0] - 2026-02-19----------------------------
🟢 Added
_ Backend Core: Implemented the Flask Framework to manage the application logic.
_ Database System: Integrated SQLite and SQLAlchemy for persistent data storage.
_ CRUD Operations: Developed full functionality for Create, Read, Update, and Delete actions.
_ Interactive UI: Added JavaScript for dynamic textarea auto-resizing and Enter key shortcut for quick saving.

🟡 Changed
_ Layout Design: Migrated from a horizontal row to a Flexbox Column layout to improve user experience.
_ Button Styling: Upgraded plain text links into professional-looking buttons with hover effects.
_ Navigation Consistency: Synchronized the design language between the Home page (index.html) and the Edit page (update.html).

🔴 Fixed
_ HTML Structure: Removed redundant closing tags (</ul>, {% endfor %}) that were causing layout breaks.
_ CSS Alignment: Resolved the issue where the [Save] button was stretching vertically by using align-items: flex-start.
