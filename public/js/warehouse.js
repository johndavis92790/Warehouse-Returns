const $returnList = document.querySelector("#return-list");
const $currentReturnInfo = document.querySelector("#current-return-info");
const $conditionInput = document.querySelector("#condition-input");
const $updateForm = document.querySelector("#update-form");
var jsonReturns = {};
var currentId;

const handleUpdateFormSubmit = (event) => {
  event.preventDefault();

  const condition = $updateForm.querySelector('[name="condition"]').value;
  const notes = $updateForm.querySelector('[name="add-notes"]').value;

  currentId = currentId + 1;
  const updateObject = {
    currentId,
    condition,
    notes
  };

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
      if (response.ok) {
        return response.json();
      }
      alert("Error: " + response.statusText);
    })
    .then((postResponse) => {
      console.log(postResponse);
      alert("Thank you for submitting an update!");
      $currentReturnInfo.innerHTML = '';
      document.getElementById("add-notes").value = "";
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
  let returnListParts = [];
  jsonReturns.forEach((partNumber) => {
    const li = partNumber.part_number;
    returnListParts.push(li);
  });
  returnHTML = returnListParts.map((returnText, i) => {
    return `<button id="${i + 1}">Part#- ${returnText}</button></br>`;
  });
  $returnList.innerHTML = returnHTML.join("");
  $returnList.addEventListener("click", renderChosenReturn);
};

const renderChosenReturn = (event) => {
  event.preventDefault();
  console.log(event);
  currentId = event.path[0].id - 1;
  const returnHTML = 
    `<p>RGA# - </p><span id="rga-number">${jsonReturns[currentId].id}</span>
      <p>Quantity - </p><span id="quantity">${jsonReturns[currentId].quantity}</span>
      <p>Part# - </p><span id="part-number">${jsonReturns[currentId].part_number}</span>
      <p>Customer Name - </p><span id="customer-name">${jsonReturns[currentId].customer_id}</span>
      <p>Date of request - </p><span id="request-date">${jsonReturns[currentId].createdAt}</span>
      <p>Notes - </p><span id="notes">${jsonReturns[currentId].notes}</span>`;
  
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
  let conditionListItems = [];
  jsonConditions.forEach((condition) => {
    const li = condition.name;
    conditionListItems.push(li);
  });
  console.log(conditionListItems);
  const conditionHTML = conditionListItems.map((conditionText, i) => {
    return `
    <option id="${i + 1}-condition" value="${i + 1}">${conditionText}</option>
    `;
  });
  $conditionInput.innerHTML = conditionHTML.join("");
};

const getAndRenderConditions = () => getConditions().then(renderConditionList);

getAndRenderConditions();

const getAndRenderReturns = () => getReturns().then(renderReturnList);

getAndRenderReturns();

$updateForm.addEventListener("submit", handleUpdateFormSubmit);

