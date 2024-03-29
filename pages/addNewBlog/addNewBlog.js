let author = localStorage.getItem("author");
let title = localStorage.getItem("title");
let description = localStorage.getItem("description");
let publishDate = localStorage.getItem("publish-date");
let imail = localStorage.getItem("imail");
let finalCategories = localStorage.getItem("categories");

function restart() {
  let base64String = localStorage.getItem("img");
  if (base64String) {
    let img = new Image();
    img.src = base64String;
    img.onload = function () {
      console.log(img);
    };
  } else {
    imageView.defaultValue = "";
  }

  if (author) {
    authorInput.defaultValue = author;
  } else {
    authorInput.defaultValue = "";
  }

  if (title) {
    titleInput.defaultValue = title;
  } else {
    titleInput.defaultValue = "";
  }

  if (description) {
    descriptionInput.defaultValue = description;
  } else {
    descriptionInput.defaultValue = "";
  }

  if (publishDate) {
    publishDateInput.defaultValue = publishDate;
  } else {
    publishDateInput.defaultValue = "";
  }

  if (imail) {
    imailInput.defaultValue = imail;
  } else {
    imailInput.defaultValue = "";
  }
}

const inputFile = document.getElementById("input-file");
const imageView = document.getElementById("image-view");

inputFile.addEventListener("change", hideImage);

function getImage() {
  const file = inputFile.files[0];
  let reader = new FileReader();

  reader.onload = function () {
    let base64String = reader.result;
    localStorage.setItem("img", base64String);
  };

  reader.readAsDataURL(file);
}

function hideImage() {
  imageView.style.width = "600px";
  imageView.style.height = "56px";
  imageView.style.background = "#F2F2FA;";
  imageView.textContent = inputFile.files[0].name;
}

const dropArea = document.getElementById("drop-area");

["drop", "dragenter", "dragleave", "dragover"].forEach((eventName) => {
  dropArea.addEventListener(eventName, (e) => {
    e.preventDefault();
  });
});

dropArea.addEventListener("drop", function (e) {
  hideImage();
  localStorage.setItem("img", getImage());
});

///////////////validation/////////////////////////

let authorInput = document.querySelector(".author_");

authorInput.addEventListener("input", function () {
  let userInput = authorInput.value.trim();
  validInput(userInput);
  localStorage.setItem("author", userInput);
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
  localStorage.setItem("title", userInput);
});

descriptionInput.addEventListener("input", function () {
  let userInput = descriptionInput.value.trim();
  let minTwoSymbolsDescription =
    document.getElementsByClassName("minTwoSymbols")[1];
  validInputs(userInput, minTwoSymbolsDescription);
  localStorage.setItem("description", userInput);
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
  localStorage.setItem("imail", userInput);
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

let publishDateInput = document.querySelector(".publish-date_");

publishDateInput.addEventListener("input", function () {
  publishDateInput.style.background = "white";
  localStorage.setItem("publish-date", publishDateInput.value);
});

let categoryInput = document.querySelector(".arrow-down");
let div = document.querySelector(".categories");

let dropDown = false;
categories();
categoryInput.addEventListener("click", function () {
  if (!dropDown) {
    div.style.display = "flex";
    div.style.flexDirection = `column`;
    div.style.gap = "4px";
    div.style.alignItems = "center";
    div.style.borderRadius = "10px";

    categoryInput.style.transform = "rotate(180deg)";
    dropDown = true;
  } else {
    div.style.display = "none";
    categoryInput.style.transform = "rotate(0deg)";
    dropDown = false;
  }
});

let response;
let data;
let theInput = document.querySelector(".category_");
let categoryArr = [];

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
      theInput.style.gap = "4px";

      theInput.append(xButton);
      categoryArr.push(element);
      localStorage.setItem("categories", JSON.stringify(categoryArr));
      console.log(categoryArr);

      xButton.addEventListener("click", (e) => {
        e.target.remove();
        let index = categoryArr.findIndex((cat) => cat.title === element.title);
        categoryArr.splice(index, 1);
        localStorage.setItem("categories", JSON.stringify(categoryArr));
        console.log(categoryArr);
      });
    });

    div.appendChild(newButton);
  });
}

restart();

let uploadButton = document.getElementById("upload");
let list = document.getElementsByTagName("li");

uploadButton.addEventListener("click", async () => {
  let isValidationPassed = true;

  for (let i = 0; i < list.length; i++) {
    if (list[i].style.color !== "green") {
      isValidationPassed = false;
      break;
    }
  }

  if (isValidationPassed) {
    const token = "45c70088173aafe84bbf8857f1975ca181bef914";
    const url = "https://george.pythonanywhere.com/api/blogs/create/";

    const data = {
      title: `${title}`,
      author: `${author}`,
      publish_date: `${publishDate}`,
      description: `${description}`,
      imail: `${imail}`,
      image: localStorage.getItem("img"),
      categories: JSON.parse(localStorage.getItem("categories")) || [],
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("An error has occurred:", error);
        return;
      }

      const result = await response.json();
      console.log("Blog created successfully:", result);
    } catch (error) {
      console.error("An error occurred during the request:", error);
    }
  }
});
