const $requestForm = document.querySelector("#requestForm");
const $submitButton = document.querySelector("#submit");
const $reasonInput = document.getElementById("reason-input");
var reason;

const handleRequestFormSubmit = (event) => {
  event.preventDefault();

  const customerName = $requestForm.querySelector('[name="customerName"]').value;
  const customerAddress = $requestForm.querySelector('[name="customerAddress"]').value;
  const customerPhone = $requestForm.querySelector('[name="customerPhone"]').value;
  const customerEmail = $requestForm.querySelector('[name="customerEmail"]').value;
  const partNumber = $requestForm.querySelector('[name="partNumber"]').value;
  const quantity = parseInt($requestForm.querySelector('[name="quantity"]').value);
  const notes = $requestForm.querySelector('[name="notes"]').value;
  var currentDate = dayjs().format("YYYY-MM-DD");
  const requestObject = {
    customerName,
    customerAddress,
    customerPhone,
    customerEmail,
    partNumber,
    quantity,
    reason,
    notes,
    currentDate,
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
      document.getElementById("customerName").value = "";
      document.getElementById("customerAddress").value = "";
      document.getElementById("customerPhone").value = "";
      document.getElementById("customerEmail").value = "";
      document.getElementById("partNumber").value = "";
      document.getElementById("quantity").value = "";
      document.getElementById("notes").value = "";
      document.getElementById("reason-input").value = "";
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
      return `<option value="${i + 1}">${reasonText}</option>`;
    }
  );
  reasonHTML.unshift(`<option>Choose Reason</option>`);
  $reasonInput.innerHTML = reasonHTML.join("");
  console.log(reasonHTML);
};

const getAndRenderReasons = () => getReasons().then(renderReasonList);

getAndRenderReasons();

$reasonInput.onchange = function () {
  reason = document.getElementById("reason-input").value;
};

$requestForm.addEventListener("submit", handleRequestFormSubmit);
