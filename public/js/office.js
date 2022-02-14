const $tealReturnList = document.querySelector("#teal-return-list");
const $redReturnList = document.querySelector("#red-return-list");
const $currentReturnInfo = document.querySelector("#current-return-info");
const $actionInput = document.querySelector("#action-input");
const $updateForm = document.querySelector("#update-form");
const $tealDiv = document.querySelector("#teal-div");
$tealDiv.style.display = "none";
const $redDiv = document.querySelector("#red-div");
$redDiv.style.display = "none";
const $creditBoolean = document.getElementById("credit-input");
const $updateButton = document.querySelector("#submitButton");
var action_id;

var jsonReturns = {};
var chosenReturn;
var currentId;

const handleUpdateFormSubmit = (event) => {
  event.preventDefault();

  const notesAdd = $updateForm.querySelector('[name="notes_add"]').value;
  let notes = chosenReturn.notes.concat("\n", notesAdd);
  if ($creditBoolean.checked) {
    var credit = true;
  } else {
    var credit = null;
  }
  if (credit) {
    var status = "blue";
    var updateObject = {
      notes,
      status,
    };
  } else {
    var status = "green";
    action_id = parseInt(action_id);
    var updateObject = {
      action_id,
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
      $currentReturnInfo.innerHTML = "";
      document.getElementById("notes_add").value = "";
      getAndRenderReturns();
    });
};

const getReturns = () =>
  fetch("/api/return", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      query: "all",
    },
  });

const renderReturnList = async (returns) => {
  jsonReturns = await returns.json();
  const tealReturns = jsonReturns.filter((jsonReturns) => {
    return jsonReturns.status === "teal";
  });
  tealHTML = tealReturns.map((tealReturns) => {
    return `<option class="has-background-primary" id="${tealReturns.id}">${tealReturns.part_number}</option>`;
  });
  $tealReturnList.innerHTML = tealHTML.join("");
  $tealReturnList.addEventListener("click", getAndRenderChosenReturn);

  const redReturns = jsonReturns.filter((jsonReturns) => {
    return jsonReturns.status === "red";
  });
  redHTML = redReturns.map((redReturns) => {
    return `<option class="has-background-danger" id="${redReturns.id}">${redReturns.part_number}</option>`;
  });
  $redReturnList.innerHTML = redHTML.join("");
  $redReturnList.addEventListener("click", getAndRenderChosenReturn);
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
  $tealDiv.style.display = "none";
  $redDiv.style.display = "none";
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
      <p>Condition - <span id="request-date">${chosenReturn.condition.name}</span></p>
      <p>Notes - <span id="notes">${chosenReturn.notes}</span></p>`;
  $currentReturnInfo.innerHTML = returnHTML;
  if (chosenReturn.status === "teal") {
    $tealDiv.style.display = "block";
  } else if (chosenReturn.status === "red") {
    $redDiv.style.display = "block";
  }
};

const getActions = () =>
  fetch("/api/action", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

const renderActionList = async (actions) => {
  let jsonActions = await actions.json();
  const actionHTML = jsonActions.map((jsonActions) => {
    return `
    <option name="action" value="${jsonActions.id}">${jsonActions.name}</option>`;
  });
  $actionInput.innerHTML = actionHTML.join("");
};

const getAndRenderActions = () => getActions().then(renderActionList);

const getAndRenderReturns = () => getReturns().then(renderReturnList);

const getAndRenderChosenReturn = (event) => {
  getChosenReturn(event.path[0].id).then(renderChosenReturn);
};

$actionInput.onchange = function () {
  action_id = document.getElementById("action-input").value;
};

const init = () => getAndRenderReturns().then(getAndRenderActions);

init();

$updateButton.addEventListener("click", handleUpdateFormSubmit);
