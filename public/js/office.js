const $returnList = document.querySelector("#return-list");
const $currentReturnInfo = document.querySelector("#current-return-info");
const $creditInput = document.querySelector("#credit-input");
const $updateForm = document.querySelector("#update-form");
var jsonReturns = {};
var currentId;

const handleUpdateFormSubmit = (event) => {
  event.preventDefault();

  if ($creditInput.checked) {
    var credit = true;
  } else {
    var credit = false;
  }
  const notes = $updateForm.querySelector('#add-notes').value;

  currentId = currentId + 1;
  const updateObject = {
    currentId,
    credit,
    notes,
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
      $currentReturnInfo.innerHTML = "";
      document.getElementById("add-notes").value = "";
      $creditInput.checked = false;
      getAndRenderReturns();
    });
};

const getReturns = () =>
  fetch("/api/return", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      query: "office",
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
    return `
    <div>
      <button id="${i + 1}" class="control btn">Part#- ${returnText}</button>
    </div>`;
  });
  $returnList.innerHTML = returnHTML.join("");
  $returnList.addEventListener("click", renderChosenReturn);
};

const renderChosenReturn = (event) => {
  event.preventDefault();
  console.log(event);
  currentId = event.path[0].id - 1;
  const returnHTML = `<h3>RGA# - </h3><span id="rga-number">${jsonReturns[currentId].id}</span>
                  <h3>Quantity - </h3><span id="quantity">${jsonReturns[currentId].quantity}</span>
                  <h3>Part - </h3><span id="part-number">${jsonReturns[currentId].part_number}</span>
                  <h3>Customer Name - </h3><span id="customer-name">${jsonReturns[currentId].customer_id}</span>
                  <h3>Request Date - </h3><span id="request-date">${jsonReturns[currentId].createdAt}</span>
                  <h3>Customer Notes - </h3><span id="notes">${jsonReturns[currentId].notes}</span>
                  <h3>Condition of Part - </h3><span id="notes">${jsonReturns[currentId].condition_id}</span>
                  <h3>Timedate of Warehouse Check - </h3><span id="notes">${jsonReturns[currentId].updatedAt}</span>`;

  $currentReturnInfo.innerHTML = returnHTML;
};

const getAndRenderReturns = () => getReturns().then(renderReturnList);

getAndRenderReturns();

$updateForm.addEventListener("submit", handleUpdateFormSubmit);
