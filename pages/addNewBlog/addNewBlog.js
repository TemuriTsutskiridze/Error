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

function hideImage() {
  imageView.style.width = "600px";
  imageView.style.height = "56px";
  imageView.style.background = "#F2F2FA;";
  imageView.textContent = "image";
}

const dropArea = document.getElementById("drop-area");

dropArea.addEventListener("dragover", function (e) {
  e.preventDefault();
  hideImage();
});

dropArea.addEventListener("drop", function (e) {
  e.preventDefault();
  inputFile.files = e.dataTransfer.files;
  uploadImage();
  hideImage();
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

  if (input.length === 0) {
    errorText.style.display = "none";
  }
}

let publishDate = document.querySelector(".publish-date_");

publishDate.addEventListener("input", function () {
  publishDate.style.background = "white";
});

let categoryInput = document.querySelector(".category_");
let div = document.querySelector(".categories");

categoryInput.addEventListener("click", function () {
  categories();
  div.style.display = "flex";
  div.style.flexDirection = `column`;
  div.style.gap = "4px";
  div.style.alignItems = "center";
  div.style.borderRadius = "10px";
});

let response;
let data;

async function categories() {
  response = await fetch("https://george.pythonanywhere.com/api/categories/");
  data = await response.json();

  data.forEach((element) => {
    let newButton = document.createElement("button");
    newButton.textContent = element.title;
    newButton.style.color = element.text_color;
    newButton.style.backgroundColor = element.background_color;
    newButton.style.width = `200px`;
    newButton.style.height = `30px`;
    newButton.style.borderRadius = `30px`;

    newButton.addEventListener("click", function () {
      let xButton = document.createElement("button");
      xButton.textContent = newButton.textContent + " X";
      let buttonStyles = window.getComputedStyle(newButton);

      for (let style in buttonStyles) {
        if (!isNaN(style) || typeof style === "function") {
          continue;
        }
        xButton.style.setProperty(style, buttonStyles.getPropertyValue(style));
      }

      categoryInput.innerHTML += xButton.outerHTML;

      let paragraph = document.querySelector(".category");
      paragraph.style.display = "none";

      // xButton.addEventListener("click", function () {
      //   categoryInput.removeChild(xButton);
      // });
    });

    div.appendChild(newButton);
  });
}
