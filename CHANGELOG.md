📔 MYNOTE Changelog
All changes to the MYNOTE project are documented here.

[1.3.0] - 2026-02-23

🚀 Added

    Custom Background: Users can now upload their own images 
    to set as the application background.

    Reset Feature: Added a button to remove custom backgrounds 
    and restore (/rɪˈstɔːr/ - khôi phục) default settings.

    Social Branding: Integrated an Instagram link and project tags 
    to personalize the app.

🔄 Changed

    Glassmorphism UI: Updated the Sidebar and Note cards with 
    a "blur" (/blɜːr/ - làm mờ) effect for a modern look.

    Refactored Update Logic: Simplified the update process by 
    using a Popup (/ˈpɑːp ʌp/ - cửa sổ bật lên) instead of a separate page.

    Mobile Optimization: Improved Responsive Design for mobile devices

🛠️ Fixed

    Dark Mode Sync: Ensured all colors and borders synchronize
    correctly when switching themes.

    Line Break Bug: Fixed an issue where notes were "squashed" 
    into one line by using white-space: pre-wrap.

[1.2.0] - 2026-02-21

🚀 Added

    Dark Mode: Implemented a dark theme for eye comfort during night use.

    Theme Persistence: Used localStorage to remember the user's theme choice 
    after closing the browser.

🔄 Changed

    External CSS: Moved all styles to static/style.css 
    to keep the code organized 

[1.1.0] - 2026-02-20

🚀 Added

    Welcome Page: Added a screen to collect the user's name.

    Session Management: Used sessions to greet the user by name (e.g., "Hi Jos,").

🛠️ Fixed

    Routing Errors: Fixed internal server errors related to Python indentation 

[1.0.0] - 2026-02-19

🚀 Added

    Core Features: Initial release with full CRUD (Create, Read, Update, Delete) functionality.

    Database: Integrated SQLite to store notes permanently.

    Basic UI: Created a simple layout using CSS Flexbox.