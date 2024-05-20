// STUDENT'S NAME: SOE ZAW AUNG
// CLASS: DIT/FT/1B/08
// ADMIN NO: 2340474
const userOptions = document.getElementById("userOptions");

userOptions.addEventListener("change", function() {
  const selectedOption = userOptions.value;
  // Redirect to the selected option
  if (selectedOption === "1") {
    window.location.href = "singleUserDetails.html"; 
  } else if(selectedOption === "2") {
    window.location.href = "allUsers.html"; 
  }
});

