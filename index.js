let rotation = 0;
let mirrored = false;
let selectedImage;

document.getElementById('image-upload').addEventListener('change', function (e) {
  const imageGrid = document.getElementById('image-grid');
  imageGrid.innerHTML = ''; // clear any existing images

  for (const file of this.files) {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.width = 100;
        img.onclick = () => {
          if (selectedImage) {
            selectedImage.classList.remove('selected');
          }
          img.classList.add('selected');
          selectedImage = img;
        };

        const wrapper = document.createElement('div');
        wrapper.className = 'image-wrapper';
        wrapper.appendChild(img);
        imageGrid.appendChild(wrapper);
      };
      reader.readAsDataURL(file);
    } else {
      console.log(file.name + ' is not an image.');
    }
  }
});

function rotateLeft() {
  if (!selectedImage) return;
  rotation -= 90;
  applyTransform(selectedImage);
}

function rotateRight() {
  if (!selectedImage) return;
  rotation += 90;
  applyTransform(selectedImage);
}

function mirrorImage() {
  if (!selectedImage) return;
  mirrored = !mirrored;
  applyTransform(selectedImage);
}

function applyTransform(image) {
  const scaleX = mirrored ? -1 : 1;
  image.style.transform = `scaleX(${scaleX}) rotate(${rotation}deg)`;
}
