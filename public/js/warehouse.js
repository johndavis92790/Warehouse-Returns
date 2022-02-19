// logic for wartehouse page

// global variables
const $yellowReturnList = document.querySelector("#yellow-return-list");
const $greenReturnList = document.querySelector("#green-return-list");
const $currentReturnInfo = document.querySelector("#current-return-info");
const $conditionInput = document.querySelector("#condition-input");
const $updateForm = document.querySelector("#update-form");
const $yellowDiv = document.querySelector("#yellow-div");
$yellowDiv.style.display = "none";
const $greenDiv = document.querySelector("#green-div");
$greenDiv.style.display = "none";
const $actionName = document.getElementById("action-name");
const $actionBoolean = document.getElementById("action-input");
const $stockQuantity = document.querySelector("#stock-quantity");
const $updateButton = document.querySelector("#submitButton");
var condition_id = 1;
var jsonReturns = {};
var chosenReturn;
var currentId;

// handle submit button
const handleUpdateFormSubmit = (event) => {
  event.preventDefault();

  // pulls data from input on page, adds notes to existing notes text
  const notesAdd = $updateForm.querySelector('[name="notes_add"]').value;
  if (notesAdd) {
    var notes = chosenReturn.notes.concat(" | Warehouse Notes - ", notesAdd);
  } else {
    var notes = chosenReturn.notes;
  }
  // if green part is being updated
  if ($actionBoolean.checked) {
    var current_stock = $stockQuantity.value;
    var status = "red";
    // packages data into object for POST request
    var updateObject = {
      current_stock,
      notes,
      status,
    };
    // if yellow part is being updated
  } else if ($conditionInput) {
    var status = "teal";
    condition_id = parseInt(condition_id);
    // packages data into object for POST request
    var updateObject = {
      condition_id,
      notes,
      status,
    };
  }
  // PUT request by ID#
  fetch("/api/return/" + currentId, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateObject),
  })
    .then((response) => {
      console.log(response);
      if (response.ok) {
        return response.json();
      }
      alert("Error: " + response.statusText);
    })
    .then(() => {
      alert("Thank you for submitting an update!");
      // empties input fields on page
      $currentReturnInfo.innerHTML = "";
      document.getElementById("notes_add").value = "";
      $yellowDiv.style.display = "none";
      $greenDiv.style.display = "none";
      $actionBoolean.checked = false;
      $stockQuantity.value = "";
      getAndRenderReturns();
    });
};

// GET request for returns
const getReturns = () =>
  fetch("/api/return", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      query: "all",
    },
  });

// renders list of returns for both yellow and green parts
const renderReturnList = async (returns) => {
  jsonReturns = await returns.json();
  const yellowReturns = jsonReturns.filter((jsonReturns) => {
    return jsonReturns.status === "yellow";
  });
  yellowHTML = yellowReturns.map((yellowReturns) => {
    return `<option class="has-background-warning" id="${yellowReturns.id}">${yellowReturns.part_number}</option>`;
  });
  $yellowReturnList.innerHTML = yellowHTML.join("");
  $yellowReturnList.addEventListener("click", getAndRenderChosenReturn);

  const greenReturns = jsonReturns.filter((jsonReturns) => {
    return jsonReturns.status === "green";
  });
  greenHTML = greenReturns.map((greenReturns) => {
    return `<option class="has-background-success" id="${greenReturns.id}">${greenReturns.part_number}</option>`;
  });
  $greenReturnList.innerHTML = greenHTML.join("");
  $greenReturnList.addEventListener("click", getAndRenderChosenReturn);
};

// GET request for chosen return to display more information on that specific return
const getChosenReturn = (id) =>
  fetch("/api/return/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

// render chosen return to display all needed information
const renderChosenReturn = async (jsonReturn) => {
  chosenReturn = await jsonReturn.json();
  $yellowDiv.style.display = "none";
  $greenDiv.style.display = "none";
  currentId = chosenReturn.id;
  const returnHTML = `<p>RGA# - <span id="rga-number">${chosenReturn.id}</span></p>
      <p>Quantity - <span id="quantity">${chosenReturn.quantity}</span></p>
      <p>Part# - <span id="part-number">${chosenReturn.part_number}</span></p>
      <p>Customer Name - <span id="customer-name">${chosenReturn.customer_name}</span></p>
      <p>Customer Address - <span id="customer-address">${chosenReturn.customer_address}</span></p>
      <p>Customer Phone - <span id="customer-phone">${chosenReturn.customer_phone}</span></p>
      <p>Customer Email - <span id="customer-email">${chosenReturn.customer_email}</span></p>
      <p>Date of Request - <span id="request-date">${chosenReturn.request_date}</span></p>
      <p>Return Reason - <span id="request-date">${chosenReturn.reason.name}</span></p>
      <p>Notes - <span id="notes">${chosenReturn.notes}</span></p>`;
  $currentReturnInfo.innerHTML = returnHTML;
  if (chosenReturn.status === "yellow") {
    $yellowDiv.style.display = "block";
  } else if (chosenReturn.status === "green") {
    $actionName.innerHTML = chosenReturn.action.name;
    $greenDiv.style.display = "block";
  }
};

// GET request for conditions
const getConditions = () =>
  fetch("/api/condition", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

// render dropdown list of conditions
const renderConditionList = async (conditions) => {
  let jsonConditions = await conditions.json();
  const conditionHTML = jsonConditions.map((jsonConditions) => {
    return `
    <option name="conditon" value="${jsonConditions.id}">${jsonConditions.name}</option>`;
  });
  $conditionInput.innerHTML = conditionHTML.join("");
};

const getAndRenderConditions = () => getConditions().then(renderConditionList);

const getAndRenderReturns = () => getReturns().then(renderReturnList);

const getAndRenderChosenReturn = (event) => {
  getChosenReturn(event.path[0].id).then(renderChosenReturn);
};

$conditionInput.onchange = function () {
  condition_id = document.getElementById("condition-input").value;
};

const init = () => getAndRenderReturns().then(getAndRenderConditions);

// init
init();

$updateButton.addEventListener("click", handleUpdateFormSubmit);
