const $requestForm = document.querySelector("#request-form");
const $submitButton = document.querySelector("#submit");
const $reasonInput = document.querySelector("#reason-input");

const handleRequestFormSubmit = (event) => {
  event.preventDefault();

  const customerName = $requestForm.querySelector('[name="customer-name"]').value;
  const partNumber = $requestForm.querySelector('[name="part-number"]').value;
  const quantity = parseInt($requestForm.querySelector('[name="quantity"]').value);
  const notes = $requestForm.querySelector('[name="notes"]').value;
  const reason = parseInt($requestForm.querySelector('[name="reason"]').value);
  const requestObject = {
    partNumber,
    quantity,
    reason,
    customerName,
    notes,
  };
  console.log("input", requestObject);
  fetch("http://localhost:3001/api/return", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestObject),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      alert("Error: " + response.statusText);
    })
    .then((postResponse) => {
      console.log(postResponse);
      alert("Thank you for submitting a request!");
    });
};

const getReasons = () =>
  fetch("/api/reason", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

const renderReasonList = async (reasons) => {
  let jsonReasons = await reasons.json();
  let reasonListItems = [];
  jsonReasons.forEach((reason) => {
    const li = reason.name;
    reasonListItems.push(li);
  });
  console.log("list", reasonListItems);
  const reasonHTML = reasonListItems.map((reasonText, i) => {
      return `<option id="${i+1}-reason" value="${i+1}">${reasonText}</option>`;
    }
  );
  $reasonInput.innerHTML = reasonHTML.join("");
  console.log(reasonHTML);
};

const getAndRenderReasons = () => getReasons().then(renderReasonList);

getAndRenderReasons();

$requestForm.addEventListener("submit", handleRequestFormSubmit);

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

var data = ["Test Company", "Fake Company"];

var searchList = document.createElement("div");

function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown");
  a = div.getElementsByTagName("a");
  console.log("a", a.textContent);
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "block";
      console.log("test1", a[i].style.display);
    } else {
      a[i].style.display = "none";
      console.log("test2", a[i].style.display);
    }
  }
}
