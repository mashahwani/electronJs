async function fetchDataAndDisplay() {
  try {
    // Access data from the preload script
    const userData = await window.api.fetchDataFromMain();

    const userDataList = document.getElementById("userDataList");

    userData.forEach((user) => {
      const listItem = document.createElement("li");
      const button = document.createElement("button");
      button.textContent = "Delete Item";
      listItem.textContent = `ID: ${user.id}, Name: ${user.name}, Email: ${user.email}`;
      userDataList.appendChild(listItem);
      button.id = user.id;
      button.addEventListener("click", () => {
        window.api.deleteUser(user.id);
        document.getElementById("userDataList").innerHTML = "";
        fetchDataAndDisplay();
      });
      userDataList.appendChild(button);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Call the function to fetch and display data
fetchDataAndDisplay();

// Form submission

async function handleFormSubmit(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  try {
    // Access data from the preload script to add a new user
    await window.api.addUserFromRenderer(name, email);

    // Fetch and display updated user data
    document.getElementById("userDataList").innerHTML = "";
    fetchDataAndDisplay();

    // Clear the form fields
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
  } catch (error) {
    console.error("Error adding user:", error);
  }
}

document
  .getElementById("addUserForm")
  .addEventListener("submit", handleFormSubmit);
