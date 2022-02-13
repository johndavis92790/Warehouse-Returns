const $returnList = document.querySelector("#return-list");
const $currentReturnInfo = document.querySelector("#current-return-info");
const $conditionInput = document.querySelector("#condition-input");
const $updateForm = document.querySelector("#update-form");
const $updateButton = document.querySelector("#submitButton");
var condition;

var jsonReturns = {};
var chosenReturn;
var currentId;

const handleUpdateFormSubmit = (event) => {
  event.preventDefault();
  
  const notes = $updateForm.querySelector('[name="notes"]').value;
  let notesCombined = chosenReturn.notes.concat("\n", notes);
  console.log(notesCombined);
  condition = parseInt(condition);
  const updateObject = {
    condition,
    notesCombined
  };

  console.log("updateObject", updateObject);
  const updateURL = "http://localhost:3001/api/return/" + currentId;
  console.log("input", updateURL);
  fetch(updateURL, {
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
      document.getElementById("notes").value = "";
      getAndRenderReturns();
    });
};

const getReturns = () =>
  fetch("/api/return", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "query": "warehouse",
    },
  });

const renderReturnList = async (returns) => {
  jsonReturns = await returns.json();
  returnHTML = jsonReturns.map((jsonReturns) => {
    return `<option class="has-background-danger has-text-light" id="${jsonReturns.id}">${jsonReturns.part_number}</option>`;
  });
  $returnList.innerHTML = returnHTML.join("");
  $returnList.addEventListener("click", renderChosenReturn);
};

const renderChosenReturn = (event) => {
  event.preventDefault();
  currentId = parseInt(event.path[0].id);
  var findReturn = 
    jsonReturns.map(function(jsonReturns, i) {
      if (currentId === jsonReturns.id) {
        return i;
      };
    });
  chosenReturn = jsonReturns[findReturn];
  const returnHTML = `<p>RGA# - <span id="rga-number">${chosenReturn.id}</span></p>
      <p>Quantity - <span id="quantity">${chosenReturn.quantity}</span></p>
      <p>Part# - <span id="part-number">${chosenReturn.part_number}</span></p>
      <p>Customer Name - <span id="customer-name">${chosenReturn.customer_name}</span></p>
      <p>Customer Address - <span id="customer-address">${chosenReturn.customer_address}</span></p>
      <p>Customer Phone - <span id="customer-phone">${chosenReturn.customer_phone}</span></p>
      <p>Customer Email - <span id="customer-email">${chosenReturn.customer_email}</span></p>
      <p>Date of Request - <span id="request-date">${chosenReturn.request_date}</span></p>
      <p>Return Reason - <span id="request-date">${chosenReturn.reason.name}</span></p>
      <p>Customer Notes - <span id="notes">${chosenReturn.notes}</span></p>`;
  $currentReturnInfo.innerHTML = returnHTML;
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

getAndRenderConditions();

const getAndRenderReturns = () => getReturns().then(renderReturnList);

getAndRenderReturns();

$conditionInput.onchange = function () {
  condition = document.getElementById("condition-input").value;
};

$updateButton.addEventListener("click", handleUpdateFormSubmit);

