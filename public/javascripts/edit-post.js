// Selecting the edit form
let editForm = document.getElementById("edit-form");

// Add a submit listener

editForm.addEventListener("submit", function(event) {
  // Getting number of images to upload
  let imagesToUpload = document.getElementById("image-upload").files.length;
  // Getting number of images already uploaded
  let existingImages = document.querySelectorAll(".image-delete-checkbox")
    .length;
  // Getting number of images to delete
  let imagesToDelete = document.querySelectorAll(
    ".image-delete-checkbox:checked"
  ).length;
  // Figure out if the form can be submitted or not
  let newTotal = existingImages - imagesToDelete + imagesToUpload;
  if (newTotal > 4) {
    event.preventDefault();
    let removalAmount = newTotal - 4;
    alert(
      `You need to remove at least ${removalAmount} (more) image${
        removalAmount === 1 ? "" : "s"
      }!`
    );
  }
});

let postTitle = "<%= post.title %>";
