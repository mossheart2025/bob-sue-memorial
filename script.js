// Interactive photo - click to see message
document.addEventListener('DOMContentLoaded', function() {
    const photo = document.querySelector('.photo-container img');
    
    if (photo) {
        photo.addEventListener('click', function() {
            alert('In loving memory of Bob and Sue Bomyea - A life dedicated to love and service to others');
        });
        
        // Make it look clickable
        photo.style.cursor = 'pointer';
    }
    
    // Guestbook functionality
    const guestbookForm = document.getElementById('guestbook-form');
    if (guestbookForm) {
        loadEntries();
        
        guestbookForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const message = document.getElementById('message').value;
            
            fetch('https://rowanm.pythonanywhere.com/api/entries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, message })
            })
            .then(response => response.json())
            .then(data => {
                document.getElementById('name').value = '';
                document.getElementById('message').value = '';
                document.getElementById('submission-message').innerHTML = '<div class="alert alert-success">Thank you for sharing your memories!</div>';
                loadEntries();
            });
        });
    }
});

function loadEntries() {
    fetch('https://rowanm.pythonanywhere.com/api/entries')
        .then(response => response.json())
        .then(entries => {
            const container = document.getElementById('submission-message');
            let html = '<h3 class="mt-5">Guestbook Entries</h3>';
            
            entries.forEach(entry => {
                if (!entry.parent_id) {
                    html += `
                        <div class="card mb-3">
                            <div class="card-body">
                                <h5 class="card-title">${entry.name}</h5>
                                <p class="card-text">${entry.message}</p>
                                <small class="text-muted">${new Date(entry.timestamp).toLocaleString()}</small>
                            </div>
                        </div>
                    `;
                }
            });
            
            container.innerHTML = html;
        });
}