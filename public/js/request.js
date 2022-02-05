const $requestForm = document.querySelector("#request-form");
// const $zookeeperForm = document.querySelector("#zookeeper-form");

const handleRequestFormSubmit = (event) => {
  event.preventDefault();

  const customerName = $requestForm.querySelector('[name="customer-name"]').value;
  const partNumber = $requestForm.querySelector('[name="part-number"]').value;
  const quantity = $requestForm.querySelector('[name="quantity"]').value;
  const notes = $requestForm.querySelector('[name="notes"]').value;

  const condition = null;
  const reason = $requestForm.querySelector('[name="reason"]').value;
  const requestObject = {
    partNumber,
    quantity,
    reason,
    condition,
    customerName,
    notes,
  };

  console.log(requestObject);
  fetch("http://localhost:3001/api/return", {
    mode: 'no-cors',
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: requestObject
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

// Render the list of note titles
const renderReasonList = async (reasons) => {
  let jsonReasons = await reasons.json();

  let reasonListItems = [];

  jsonReasons.forEach((reason) => {
    const li = createLi(reason.name);
    li.dataset.reason = JSON.stringify(reason);

    reasonListItems.push(li);
  });

  if (window.location.pathname === '/reasons') {
    reasonListItems.forEach((reason) => reasonList[0].append(reason));
  }
};

const getAndRenderReasons = () => getReasons().then(renderReasonList);


// getAndRenderReasons();

// const handleZookeeperFormSubmit = (event) => {
//   event.preventDefault();

//   // get zookeeper data and organize it
//   const name = $zookeeperForm.querySelector('[name="zookeeper-name"]').value;
//   const age = parseInt($zookeeperForm.querySelector('[name="age"]').value);
//   const favoriteAnimal = $zookeeperForm.querySelector(
//     '[name="favorite-animal"]'
//   ).value;

//   const zookeeperObj = { name, age, favoriteAnimal };
//   console.log(zookeeperObj);
//   fetch("api/zookeepers", {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(zookeeperObj),
//   })
//     .then((response) => {
//       if (response.ok) {
//         return response.json();
//       }
//       alert("Error: " + response.statusText);
//     })
//     .then((postResponse) => {
//       console.log(postResponse);
//       alert("Thank you for adding a zookeeper!");
//     });
// };

$requestForm.addEventListener("submit", handleRequestFormSubmit);
// $zookeeperForm.addEventListener("submit", handleZookeeperFormSubmit);
