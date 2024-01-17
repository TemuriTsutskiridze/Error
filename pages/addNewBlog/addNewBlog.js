const inputFile = document.getElementById("input-file");
const imageView = document.getElementById("image-view");
const uploadedImage = document.getElementById("uploaded-image");

inputFile.addEventListener("change", uploadImage);

function uploadImage() {
  const file = inputFile.files[0];
  if (file) {
    let imgLink = URL.createObjectURL(file);
    uploadedImage.src = imgLink;
    imageView.style.display = "flex"; // Show the image view
  }
}

function deleteImage() {
  imageView.style.display = "none"; // Hide the image view
  inputFile.value = ""; // Clear the file input
}

const dropArea = document.getElementById("drop-area");

dropArea.addEventListener("dragover", function (e) {
  e.preventDefault();
});

dropArea.addEventListener("drop", function (e) {
  e.preventDefault();
  inputFile.files = e.dataTransfer.files;
  uploadImage();
});
