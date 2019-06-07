// Selecting the edit form
const editForm = document.getElementById('edit-form');

// Add a submit listener

editForm.addEventListener('submit', function(event) {
    // Getting number of images to upload
    const imagesToUpload = document.getElementById('image-upload').files.length;
    // Getting number of images already uploaded
    const existingImages = document.querySelectorAll('.image-delete-checkbox').length;
    // Getting number of images to delete
    const imagesToDelete = document.querySelectorAll('.image-delete-checkbox:checked').length;
    // Figure out if the form can be submitted or not
    const newTotal = existingImages - imagesToDelete + imagesToUpload;
    if (newTotal > 4) {
        event.preventDefault();
        const removalAmount = newTotal - 4;
        alert(`You need to remove at least ${removalAmount} (more) image${removalAmount === 1 ? '' : 's'}!`);
    }
});

const postTitle = '<%= post.title %>';
