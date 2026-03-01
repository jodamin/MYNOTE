/* Check and apply theme immediately to prevent white flash */
(function () {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
})();

window.addEventListener('DOMContentLoaded', () => {
    /* 1. Load custom background from localStorage if exists */
    const savedBg = localStorage.getItem('custom-bg');
    if (savedBg) {
        document.body.style.backgroundImage = `url(${savedBg})`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundAttachment = "fixed";
    }

    /* 2. Toggle Light/Dark Mode */
    const themeToggle = document.getElementById('theme-toggle');
    const themeText = themeToggle.querySelector('.btn-text');
    const themeIcon = themeToggle.querySelector('i');

    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.hasAttribute('data-theme');
        sidebar.classList.remove('mobile-open')

        if (isDark) {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            // Cập nhật giao diện
            themeText.textContent = 'Dark Mode';
            themeIcon.className = 'fas fa-moon';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            // Cập nhật giao diện
            themeText.textContent = 'Light Mode';
            themeIcon.className = 'fas fa-sun';
        }
    });

    /* 3. Handle Custom Background Upload */
    const bgToggleBtn = document.getElementById('bg-toggle');
    const bgInput = document.getElementById('bg-input');
    if (bgToggleBtn && bgInput) {
        bgToggleBtn.addEventListener('click', () => {
            bgInput.click();
        });
        bgInput.addEventListener('change', function () {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const imageUrl = e.target.result;
                    document.body.style.backgroundImage = `url(${imageUrl})`;
                    document.body.style.backgroundSize = "cover";
                    document.body.style.backgroundPosition = "center";
                    document.body.style.backgroundAttachment = "fixed";
                    localStorage.setItem('custom-bg', imageUrl);
                }
                reader.readAsDataURL(file);
            }
        });
    }

    /* 4. Reset Background to Default */
    const bgResetBtn = document.getElementById('bg-reset');
    if (bgResetBtn) {
        bgResetBtn.addEventListener('click', () => {
            document.body.style.backgroundImage = 'none';
            localStorage.removeItem('custom-bg');
            alert("Background has been reset to default!");
        });
    }
});

/* ------------------- Logic for Note Modal (index.html) ------------------- */
const modal = document.getElementById('note-modal');
const modalTitle = document.getElementById('modal-title');
const modalForm = document.getElementById('note-form');
const modalTextarea = document.getElementById('modal-textarea');
const modalNoteId = document.getElementById('modal-note-id');
const deleteBtn = document.getElementById('modal-delete-btn');

/* Function to open modal for adding new note */
function openModalForAdd() {
    const sidebar = document.querySelector('.sidebar');
    if (window.innerWidth <= 768) {
        sidebar.classList.remove('mobile-open');
    }

    document.getElementById('note-modal').style.display = "block";
    document.getElementById('modal-textarea').value = "";
    document.getElementById('modal-textarea').focus();

    if (!modal) return;
    modalTitle.innerText = "ADD NEW NOTE";
    modalForm.action = "/add";
    modalTextarea.value = "";
    modalNoteId.value = "";
    deleteBtn.style.display = "none";
    modal.style.display = "block";
}

/* Function to open existing note for editing */
function openNote(id) {
    if (!modal) return;
    const noteCard = event.currentTarget;
    const content = noteCard.querySelector('.note-preview').innerText;
    modalTitle.innerText = "EDIT NOTE";
    modalForm.action = "/update/" + id;
    modalTextarea.value = content;
    modalNoteId.value = id;
    deleteBtn.style.display = "block";
    deleteBtn.onclick = function () {
        if (confirm("Are you sure you want to delete this note?")) {
            window.location.href = "/delete/" + id;
        }
    };
    modal.style.display = "block";
}

/* Function to close modal */
function closeModal() {
    if (modal) modal.style.display = "none";
}

/* Close modal when clicking outside of it */
window.onclick = function (event) {
    if (event.target == modal) {
        closeModal();
    }
}

// change name function
function changeName() {
    const newName = prompt("Enter your new name:");
    // make sure user type letters
    if (newName && newName.trim() !== "") {

        const form = document.getElementById('change-name-form');
        const input = document.getElementById('new-name-input');

        if (form && input) {
            input.value = newName.trim(); // assign new name to input
            form.submit(); // send from by POST method
        }
    }
}

// auto hind notification after 3s
window.addEventListener('DOMContentLoaded', () => {
    const flashMessages = document.querySelectorAll('.flash-message');
    flashMessages.forEach(msg => {
        setTimeout(() => {
            msg.style.opacity = '0';
            msg.style.transform = 'translateX(100%)';
            msg.style.transition = 'all 0.5s ease';
            setTimeout(() => msg.remove(), 500);
        }, 3000); // 3000ms
    });
});

// 3. To collapse sidebar
// window.addEventListener('DOMContentLoaded', () => {
//     const sidebar = document.querySelector('.sidebar');
//     const toggleBtn = document.getElementById('toggle-sidebar');

//     // Check and save to localstorage
//     const isCollapsed = localStorage.getItem('sidebar-collapsed') === 'true';
//     if (isCollapsed) {
//         sidebar.classList.add('collapsed');
//     }

//     if (toggleBtn) {
//         toggleBtn.addEventListener('click', () => {
//             // Toggle class collapsed
//             sidebar.classList.toggle('collapsed');

//             // Save to localStorage
//             const nowCollapsed = sidebar.classList.contains('collapsed');
//             localStorage.setItem('sidebar-collapsed', nowCollapsed);
//         });
//     }
// });

// 3. To collapse sidebar (Desktop) and Expand (Mobile)
window.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('.toggle-btn');

    if (window.innerWidth > 768) {
        const isCollapsed = localStorage.getItem('sidebar-collapsed') === 'true';
        if (isCollapsed) {
            sidebar.classList.add('collapsed');
        }
    }

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                // For mobile
                sidebar.classList.toggle('mobile-open');
                sidebar.classList.remove('collapsed');
            } else {
                // vertical sidebar collapsed
                sidebar.classList.toggle('collapsed');

                // Save to localstorage
                const nowCollapsed = sidebar.classList.contains('collapsed');
                localStorage.setItem('sidebar-collapsed', nowCollapsed);
            }
        });
    }
});