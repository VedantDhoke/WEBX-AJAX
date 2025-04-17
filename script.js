document.getElementById("registerForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const college = document.getElementById("college").value.trim();
  const username = document.getElementById("username").value.trim().toLowerCase();
  const password = document.getElementById("password").value;
  const repassword = document.getElementById("repassword").value;
  const messageDiv = document.getElementById("message");

  messageDiv.textContent = "";

  if (password !== repassword) {
    messageDiv.style.color = "red";
    messageDiv.textContent = "Passwords do not match!";
    return;
  }

  // Check username availability via XMLHttpRequest
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/check-username", true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      const response = JSON.parse(xhr.responseText);
      if (response.available) {
        messageDiv.style.color = "green";
        messageDiv.textContent = "Successfully Registered";
      } else {
        messageDiv.style.color = "red";
        messageDiv.textContent = "Username already exists!";
      }
    }
  };

  xhr.send(JSON.stringify({ username }));
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
