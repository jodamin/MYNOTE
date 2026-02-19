Changelog

All notable changes to the Notebook App project will be documented in this file.

[1.0.1] - 2026-02-20
🟢 Added

    Dependency Management: Added requirements.txt file to keep track of project libraries.

🟡 Changed

    Home Page Content: Updated and refined content in index.html.

🔴 Fixed

    Terminal Environment: Resolved PowerShell execution policy issues to allow smooth venv activation in VS Code.

[1.0.0] - 2026-02-19
🟢 Added

    Backend Core: Implemented the Flask Framework to manage the application logic.

    Database System: Integrated SQLite and SQLAlchemy for persistent data storage.

    CRUD Operations: Developed full functionality for Create, Read, Update, and Delete actions.

    Interactive UI: Added JavaScript for dynamic textarea auto-resizing and Enter key shortcut for quick saving.

🟡 Changed

    Layout Design: Migrated from a horizontal row to a Flexbox Column layout to improve user experience.

    Button Styling: Upgraded plain text links into professional-looking buttons with hover effects.

    Navigation Consistency: Synchronized the design language between the Home page (index.html) and the Edit page (update.html).

🔴 Fixed

    HTML Structure: Removed redundant closing tags that were causing layout breaks.

    CSS Alignment: Resolved the issue where the [Save] button was stretching vertically by using align-items: flex-start.