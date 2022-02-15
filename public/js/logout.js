async function logout() {
  const response = await fetch("/api/users/logout", {
    method: "post",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {

    // this is where we need to tell handlebars which html to display after logout!!!!!!!!!!!!!!!!!!!!!!!!
    document.location.replace("/login");

  } else {
    alert(response.statusText);
  }
}

document.querySelector("#logout").addEventListener("click", logout);
