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
const $updateButton = document.querySelector("#submitButton");
var condition_id;

var jsonReturns = {};
var chosenReturn;
var currentId;

const handleUpdateFormSubmit = (event) => {
  event.preventDefault();
  
  const notesAdd = $updateForm.querySelector('[name="notes_add"]').value;
  let notes = chosenReturn.notes.concat("\n", notesAdd);
  if ($actionBoolean.checked) {
    var action = true;
  } else {
    var action = null;
  }
  if (action) {
    var status = "red";
    var updateObject = {
      notes,
      status,
    };
  } else {
    var status = "teal";
    condition_id = parseInt(condition_id);
    var updateObject = {
      condition_id,
      notes,
      status,
    };
  }
  fetch("http://localhost:3001/api/return/" + currentId, {
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
      $currentReturnInfo.innerHTML = '';
      document.getElementById("notes_add").value = "";
      getAndRenderReturns();
    });
};

const getReturns = () =>
  fetch("/api/return", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "query": "all",
    },
  });

const renderReturnList = async (returns) => {
  jsonReturns = await returns.json();
  const yellowReturns = jsonReturns.filter((jsonReturns) => {
    return jsonReturns.status === 'yellow';
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

const getChosenReturn = (id) => 
  fetch("http://localhost:3001/api/return/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

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

const getConditions = () =>
  fetch("/api/condition", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

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
  getChosenReturn(event.path[0].id)
    .then(renderChosenReturn);
}

$conditionInput.onchange = function () {
  condition_id = document.getElementById("condition-input").value;
};

const init = () => getAndRenderReturns().then(getAndRenderConditions);

init();

$updateButton.addEventListener("click", handleUpdateFormSubmit);
