const uploadForm = document.getElementById('uploadForm');
const gallery = document.getElementById('gallery');
const searchInput = document.getElementById('searchInput');

let photos = [];

uploadForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const fileInput = document.getElementById('fileInput');
  const captionInput = document.getElementById('captionInput');

  if (fileInput.files.length === 0) {
    alert('Please select a file to upload.');
    return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function () {
    const photo = {
      src: reader.result,
      caption: captionInput.value || 'No caption',
    };
    photos.push(photo);
    displayGallery();
  };

  reader.readAsDataURL(file);

  fileInput.value = '';
  captionInput.value = '';
});

searchInput.addEventListener('input', function () {
  displayGallery();
});

function displayGallery() {
  gallery.innerHTML = '';

  const searchQuery = searchInput.value.toLowerCase();

  const filteredPhotos = photos.filter(photo =>
    photo.caption.toLowerCase().includes(searchQuery)
  );

  filteredPhotos.forEach(photo => {
    const photoDiv = document.createElement('div');
    const img = document.createElement('img');
    img.src = photo.src;

    const caption = document.createElement('p');
    caption.textContent = photo.caption;

    photoDiv.appendChild(img);
    photoDiv.appendChild(caption);

    gallery.appendChild(photoDiv);
  });
}
