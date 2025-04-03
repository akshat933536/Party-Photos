// Function to filter gallery items based on category
function filterCategory(category) {
  // Get all the gallery items
  const items = document.querySelectorAll('.gallery-item');
  
  // Show all items if "All" is selected
  if (category === 'all') {
    items.forEach(item => {
      item.style.display = 'block';
    });
  } else {
    // Hide items that don't match the selected category
    items.forEach(item => {
      if (item.classList.contains(category)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }
  
  // Highlight active category button
  const buttons = document.querySelectorAll('.category-btn');
  buttons.forEach(button => {
    button.classList.remove('active');
  });
  
  const activeButton = document.querySelector(`.category-btn[onclick="filterCategory('${category}')"]`);
  activeButton.classList.add('active');
}

// Modal functionality
const images = document.querySelectorAll('.gallery-img');
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const captionText = document.getElementById('caption');
const shareButton = document.getElementById('shareButton');

// Open modal when an image is clicked
images.forEach(image => {
  image.addEventListener('click', function () {
    modal.style.display = "block";
    modalImage.src = this.src;
    captionText.textContent = this.alt;
    shareButton.setAttribute('data-src', this.src); // Attach image URL to share button
  });
});

// Close the modal
function closeModal() {
  modal.style.display = "none";
}

// Share the image
function shareImage() {
  const imageUrl = shareButton.getAttribute('data-src');

  // Check if Web Share API is supported
  if (navigator.share) {
    navigator.share({
      title: 'Check out this image!',
      text: 'I found this amazing image in the gallery.',
      url: imageUrl,
    }).catch(err => {
      console.error('Sharing failed:', err);
    });
  } else {
    // Fallback: Copy image URL to clipboard
    navigator.clipboard.writeText(imageUrl).then(() => {
      alert('Image URL copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy URL:', err);
    });
  }
}

// Initial load
filterCategory('all');
