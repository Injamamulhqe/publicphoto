// Initialize an empty array to store uploaded photos
const gallery = [];
const galleryDiv = document.getElementById('gallery');

/**
 * Function to render the gallery
 * Loops through the `gallery` array and displays all uploaded photos.
 */
function renderGallery() {
  galleryDiv.innerHTML = ''; // Clear the current gallery content
  gallery.forEach((item) => {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.innerHTML = `
      <img src="${item.url}" alt="Uploaded Image">
      <p>${item.caption || 'No caption'}</p>
    `;
    galleryDiv.appendChild(galleryItem);
  });
}

/**
 * Function to handle the photo upload
 * Reads the uploaded image file, saves it to the `gallery` array, and updates the gallery display.
 */
function uploadPhoto() {
  const photoInput = document.getElementById('photoInput');
  const captionInput = document.getElementById('captionInput');
  
  // Check if a file is selected
  if (!photoInput.files[0]) {
    alert('Please select a photo to upload!');
    return;
  }

  const file = photoInput.files[0];
  const reader = new FileReader();

  reader.onload = function(event) {
    const photoData = {
      url: event.target.result, // Convert image file to base64 URL
      caption: captionInput.value.trim(), // Get the caption input
    };

    gallery.push(photoData); // Add the photo data to the gallery array
    renderGallery(); // Update the gallery display

    // Reset the input fields
    photoInput.value = '';
    captionInput.value = '';
  };

  reader.readAsDataURL(file); // Read the uploaded file
}

/**
 * Function to filter the gallery based on search input
 */
function filterGallery() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const filtered = gallery.filter((item) =>
    (item.caption || '').toLowerCase().includes(query)
  );

  galleryDiv.innerHTML = ''; // Clear current gallery display
  filtered.forEach((item) => {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.innerHTML = `
      <img src="${item.url}" alt="Uploaded Image">
      <p>${item.caption || 'No caption'}</p>
    `;
    galleryDiv.appendChild(galleryItem);
  });
}

/**
 * Function to handle the "Home" button
 * Redirects to the home page (or displays an alert for now).
 */
function goHome() {
  alert('Redirecting to the home page!');
  // Replace this with actual redirection logic if needed
  // window.location.href = 'home.html';
}
