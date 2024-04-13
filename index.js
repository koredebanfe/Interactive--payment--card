const cardNumberDetails = document.getElementById("card--number--details");
const cardNameDetails = document.getElementById("card--name--details");
const cardExpiryDetails = document.getElementById("card--expiry--details");
const cardCvcDetails = document.getElementById("card--cvc--details");

const month = document.getElementById("month");
const year = document.getElementById("year");

const cardName = document.getElementById("card--name");
const invalidCardName = document.getElementById("invalid--card--name");

const cardNumber = document.getElementById("card--number");
const invalidCardNumber = document.getElementById("invalid--card--number");

const monthExpiry = document.getElementById("month--expiry");
const invalidMonth = document.getElementById("invalid--month--expiry");

const yearExpiry = document.getElementById("year--expiry");
const invalidYear = document.getElementById("invalid--year--expiry");

const cardCvc = document.getElementById("card--cvc");
const invalidCvc = document.getElementById("invalid--card--cvc");

const submit = document.getElementById("submit");
const validate = document.getElementsByClassName("validate");
const invalidCard = document.getElementById("invalid--card");

const form = document.getElementById("form");
const numberInput = document.querySelectorAll(
  "#year--month--section [type=number]"
);

// event delegation to remove error message on input
form.addEventListener("click", (e) => {
  if (e.target.tagName === "INPUT") {
    e.target.value = "";
    e.target.style.color = "black";
    e.target.style.borderColor = "black";

    const inputClicked = e.target.id;
    document.getElementById(`invalid--${inputClicked}`).style.display = "none";
    invalidCard.style.display="none";
  }
});

// checking for changes in input to update appropriate dom nodes

cardName.addEventListener("input", (e) => {
  cardNameDetails.innerText = e.target.value;
});

cardNumber.addEventListener("input", (e) => {
  cardNumberDetails.innerText = e.target.value;
});

monthExpiry.addEventListener("input", (e) => {
  month.textContent = e.target.value;
});

yearExpiry.addEventListener("input", (e) => {
  const inputLength = e.target.value.length;
  year.innerText = e.target.value.slice(inputLength - 2);
});

cardCvc.addEventListener("input", (e) => {
  cardCvcDetails.textContent = e.target.value;
});

// remove zero at the begining of number input value
const removeLeadingZeros = () => {
  [...numberInput].forEach((element) => {
    element.value = element.value.replace(/^0+/, "");
  });
};

// function for displaying error message
const invalidInput = (inputNode, validateNode) => {
  inputNode.classList.add("invalid");
  inputNode.value = "";
  validateNode.style.display = "inline-block";
  validateNode.style.color = "red";
  cardNameDetails.innerText = "Jane Appleseed";
  cardNumberDetails.innerText = "9056 6758 5647 107E";
  cardCvcDetails.innerText = "012";
  month.innerText = "00";
  year.innerText = "00";
};


// checking for empty card name

const getCardName = () => {
  const inputCardName = cardName.value;

  if (inputCardName === "") {
    invalidInput(cardName, invalidCardName);
    invalidCardName.innerText = "Cannot be blank";
  }
};

// funtion for getting the card number entered
const getCardNumber = () => {
  const inputCardNumber = cardNumber.value;
  const matches = /^[0-9]+$/.test(inputCardNumber);

  if (inputCardNumber === "") {
    invalidInput(cardNumber, invalidCardNumber);
    invalidCardNumber.innerText = "Cannot be blank";
  } else if (inputCardNumber.length < 16 || inputCardNumber.length > 16) {
    invalidInput(cardNumber, invalidCardNumber);
    invalidCardNumber.innerText = "Enter a valid number";
  } else if (!matches) {
    invalidInput(cardNumber, invalidCardNumber);
    invalidCardNumber.innerText = "Wrong format enter number only";
  }
};

// funtion for validating and getting the month of card expiration
const getMonth = () => {
  const monthInput = monthExpiry.value;
  if (monthInput === "") {
    invalidInput(monthExpiry, invalidMonth);
    invalidMonth.innerText = "cannot be blank";
  } else if (parseInt(monthInput) > 12 || parseInt(monthInput) < 1) {
    invalidInput(monthExpiry, invalidMonth);
    invalidMonth.innerText = "invalid month";
  }
};


// funtion for validating and getting the year of card expiration
const getYear = () => {
  const yearInput = yearExpiry.value;
  const currentYear = new Date().getFullYear();

  if (yearInput === "") {
    invalidInput(yearExpiry, invalidYear);
    invalidYear.innerText = "Cannot be blank";
  } else if (parseInt(yearInput) < currentYear || parseInt(yearInput) < 1) {
    invalidInput(yearExpiry, invalidYear);
    invalidYear.innerText = "Invalid Card";
  }

};

// funtion for validating the card cvc number
const getCVC = () => {
  const inputCVC = cardCvc.value;

  if (inputCVC === "") {
    invalidInput(cardCvc, invalidCvc);
    invalidCvc.innerText = "Cannot be blank";
  } else if (inputCVC.length > 3) {
    invalidInput(cardCvc, invalidCvc);
    invalidCvc.innerText = "Enter a valid number";
  }

  cardCvc.addEventListener("input", function () {
    if (this.value.length > 3) {
      this.value = this.value.slice(0, 3);
    }
  });
};

// funtion for checking expired card
const checkExpiredCard = () => {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const yearInput = parseInt(yearExpiry.value);
  const monthInput = parseInt(monthExpiry.value);

  if (monthInput < currentMonth && yearInput === currentYear) {
    invalidCard.style.color = "red";
    invalidCard.style.display = "inline-block";
    invalidCard.innerText = "Expired Card";
    invalidInput(monthExpiry, invalidCard);
    invalidInput(yearExpiry, invalidCard);
  }
};

const checkForValues = () => {
  getMonth();
  getCardNumber();
  getCardName();
  getYear();
  getCVC();
};

const getCardDetails = () => {
  removeLeadingZeros();
  checkForValues();
  checkExpiredCard();
};

submit.addEventListener("click", (e) => {
  e.preventDefault();
  getCardDetails();

  const inputValue =[];

   [...document.getElementsByTagName("input")].forEach((el) => {
    inputValue.push(el.value);
  });   

  if(inputValue.includes("")) return false
      form.style.display="none";
        document.getElementById("success--section").style.display="block";
        return false;
});


