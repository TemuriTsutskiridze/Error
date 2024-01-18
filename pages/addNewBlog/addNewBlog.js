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

///////////////validation/////////////////////////

let authorInput = document.querySelector(".author_");

authorInput.addEventListener("input", function () {
  let userInput = authorInput.value.trim();
  validInput(userInput);
});

function validInput(input) {
  let minFourSymbol = document.querySelector(".minFourSymbol");
  let minTwoWord = document.querySelector(".minTwoWord");
  let georgianSymbols = document.querySelector(".georgianSymbols");

  let georgianLetters = [
    " ",
    "ა",
    "ბ",
    "გ",
    "დ",
    "ე",
    "ვ",
    "ზ",
    "თ",
    "ი",
    "კ",
    "ლ",
    "მ",
    "ნ",
    "ო",
    "პ",
    "ჟ",
    "რ",
    "ს",
    "ტ",
    "უ",
    "ფ",
    "ქ",
    "ღ",
    "ყ",
    "შ",
    "ჩ",
    "ც",
    "ძ",
    "წ",
    "ჭ",
    "ხ",
    "ჯ",
    "ჰ",
  ];

  if (input.length < 4) {
    minFourSymbol.style.color = "red";
  } else {
    minFourSymbol.style.color = "green";
  }

  if (input.split(" ").length < 2) {
    minTwoWord.style.color = "red";
  } else {
    minTwoWord.style.color = "green";
  }

  for (letter of input) {
    if (!georgianLetters.includes(letter)) {
      georgianSymbols.style.color = "red";
    } else {
      georgianSymbols.style.color = "green";
    }
  }

  if (input.length === 0) {
    minFourSymbol.style.color = "#85858d";
    minTwoWord.style.color = "#85858d";
    georgianSymbols.style.color = "#85858d";
  }
}

let titleInput = document.querySelector(".title_");
let descriptionInput = document.querySelector(".description_");

titleInput.addEventListener("input", function () {
  let userInput = titleInput.value.trim();
  let minTwoSymbolsTitle = document.getElementsByClassName("minTwoSymbols")[0];
  validInputs(userInput, minTwoSymbolsTitle);
});

descriptionInput.addEventListener("input", function () {
  let userInput = descriptionInput.value.trim();
  let minTwoSymbolsDescription =
    document.getElementsByClassName("minTwoSymbols")[1];
  validInputs(userInput, minTwoSymbolsDescription);
});

function validInputs(input, inputField) {
  if (input.length < 2) {
    inputField.style.color = "red";
  } else {
    inputField.style.color = "green";
  }

  if (input.length === 0) {
    inputField.style.color = "#85858d";
  }
}

let imailInput = document.querySelector(".imail_");

imailInput.addEventListener("input", function () {
  let userInput = imailInput.value.trim();
  validImail(userInput);
});

function validImail(input) {
  let errorText = document.getElementsByClassName("imail-text")[0];
  let last = input.split("@");
  if (last[1] !== "redberry.ge") {
    errorText.style.display = "flex";
  } else {
    errorText.style.display = "none";
  }
}
