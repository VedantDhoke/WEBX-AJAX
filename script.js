const existingUsernames = ["vedantdhoke", "vedant", "vedant@2304"]; // Simulating existing usernames

document.getElementById("registerForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const college = document.getElementById("college").value.trim();
  const username = document.getElementById("username").value.trim().toLowerCase();
  const password = document.getElementById("password").value;
  const repassword = document.getElementById("repassword").value;
  const messageDiv = document.getElementById("message");

  // Clear previous message
  messageDiv.textContent = "";

  // Validate password match
  if (password !== repassword) {
    messageDiv.style.color = "red";
    messageDiv.textContent = "Passwords do not match!";
    return;
  }

  // Validate unique username
  const usernameExists = existingUsernames.some(u => u.toLowerCase() === username);
  if (usernameExists) {
    messageDiv.style.color = "red";
    messageDiv.textContent = "Username already exists!";
    return;
  }

  // Simulate adding new user to database
  existingUsernames.push(username);

  // Show success message
  messageDiv.style.color = "green";
  messageDiv.textContent = "Successfully Registered";

  // ✅ Removed form reset to preserve field values
  // document.getElementById("registerForm").reset();

  document.getElementById("collegeSuggestions").innerHTML = "";
});

// Auto-suggest for college names
const colleges = ["VESIT","VJTI","PICT", "IIT Bombay", "NIT Trichy", "COEP", "VIT Vellore", "IIT Kharagpur", "NIT Surathkal","SPIT"];
const collegeInput = document.getElementById("college");
const suggestionsDiv = document.getElementById("collegeSuggestions");

collegeInput.addEventListener("input", () => {
  const query = collegeInput.value.toLowerCase();
  suggestionsDiv.innerHTML = "";

  if (query.length === 0) return;

  const filtered = colleges.filter(college => college.toLowerCase().includes(query));
  filtered.forEach(college => {
    const div = document.createElement("div");
    div.textContent = college;
    div.classList.add("suggestion");
    div.onclick = () => {
      collegeInput.value = college;
      suggestionsDiv.innerHTML = "";
    };
    suggestionsDiv.appendChild(div);
  });
});