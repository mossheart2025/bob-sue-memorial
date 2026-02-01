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
});
