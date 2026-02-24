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
    const html = document.documentElement;
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            toggleBtn.textContent = 'Light Mode';
        }
        toggleBtn.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                html.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                toggleBtn.textContent = 'Dark Mode';
            } else {
                html.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                toggleBtn.textContent = 'Light Mode';
            }
        });
    }

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