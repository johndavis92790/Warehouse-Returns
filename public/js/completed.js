// logic for completed page

// global variables
const $blueReturnList = document.querySelector("#blue-return-list");
const $currentReturnInfo = document.querySelector("#current-return-info");
var jsonReturns = {};
var chosenReturn;
var currentId;

// GET request for returns
const getReturns = () =>
  fetch("/api/return", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      query: "all",
    },
  });

// renders list of returns for blue parts
const renderReturnList = async (returns) => {
  jsonReturns = await returns.json();
  const blueReturns = jsonReturns.filter((jsonReturns) => {
    return jsonReturns.status === "blue";
  });
  blueHTML = blueReturns.map((blueReturns) => {
    return `<option class="has-background-light" id="${blueReturns.id}">${blueReturns.part_number}</option>`;
  });
  $blueReturnList.innerHTML = blueHTML.join("");
  $blueReturnList.addEventListener("click", getAndRenderChosenReturn);
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
  currentId = chosenReturn.id;
  const returnHTML = `<p>RGA# - <span id="rga-number">${chosenReturn.id}</span></p>
      <p>Quantity - <span id="quantity">${chosenReturn.quantity}</span></p>
      <p>Part# - <span id="part-number">${chosenReturn.part_number}</span></p>
      <p>Customer Name - <span id="customer-name">${chosenReturn.customer_name}</span></p>
      <p>Customer Address - <span id="customer-address">${chosenReturn.customer_address}</span></p>
      <p>Customer Phone - <span id="customer-phone">${chosenReturn.customer_phone}</span></p>
      <p>Customer Email - <span id="customer-email">${chosenReturn.customer_email}</span></p>
      <p>Date of Request - <span id="request-date">${chosenReturn.request_date}</span></p>
      <p>Return Reason - <span id="return-reason">${chosenReturn.reason.name}</span></p>
      <p>Condition Reason - <span id="condition">${chosenReturn.condition.name}</span></p>
      <p>Action - <span id="action">${chosenReturn.action.name}</span></p>
      <p>Notes - <span id="notes">${chosenReturn.notes}</span></p>`;
  $currentReturnInfo.innerHTML = returnHTML;
};

const getAndRenderReturns = () => getReturns().then(renderReturnList);

const getAndRenderChosenReturn = (event) => {
  getChosenReturn(event.path[0].id).then(renderChosenReturn);
};

// init
getAndRenderReturns();
