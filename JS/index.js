const body = document.body

// ========== FOOTER ==========

let footer = document.createElement("footer")
body.appendChild(footer)
const today = new Date()
const thisYear = today.getFullYear()
footer = document.querySelector("footer")
const copyright = document.createElement("p")
copyright.innerHTML = `\u00A9 Yaneli Martinez Aguilar ${thisYear}`
footer.appendChild(copyright)
footer.style.textAlign = "center"

// ========== SKILLS ==========

const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "GitHub",
  "Git",
  "Digital Marketing",
]
const skillsSection = document.getElementById("skills")
const skillsList = skillsSection.querySelector("ul")
for (let i = 0; i < skills.length; i++) {
  const skill = document.createElement("li")
  skill.innerText = skills[i]
  skillsList.appendChild(skill)
}

// ========== MESSAGE FORM ==========

function toggleMessagesSection() {
  const messageSection = document.getElementById("messages")
  const messageList = messageSection.querySelector("ul")
  if (messageList.children.length === 0) {
    messageSection.style.display = "none"
  } else {
    messageSection.style.display = "block"
  }
}

toggleMessagesSection()

const messageForm = document.querySelector("form[name=leave_messages]")
messageForm.addEventListener("submit", function (event) {
  event.preventDefault()
  const userName = event.target.usersName.value
  const userEmail = event.target.usersEmail.value
  const userMessage = event.target.usersMessage.value

  console.log("Name: ", userName)
  console.log("Email: ", userEmail)
  console.log("Message: ", userMessage)

  const messageSection = document.getElementById("messages")
  const messageList = messageSection.querySelector("ul")

  const newMessage = document.createElement("li")
  newMessage.innerHTML = `<a href="mailto:${userEmail}">${userName}</a>: <span>${userMessage}</span>`

  const editButton = document.createElement("button")
  editButton.innerText = "edit"
  editButton.className = "edit-btn"
  editButton.type = "button"
  editButton.addEventListener("click", function () {
    const messageSpan = newMessage.querySelector("span")
    const newText = prompt("Edit your message: ", messageSpan.innerText)
    if (newText !== null) {
      messageSpan.innerText = newText
    }
  })

  newMessage.appendChild(editButton)

  const removeButton = document.createElement("button")
  removeButton.innerText = "remove"
  removeButton.className = "remove-btn"
  removeButton.type = "button"

  removeButton.addEventListener("click", function () {
    const entry = removeButton.parentNode
    entry.remove()
    toggleMessagesSection()
  })

  newMessage.appendChild(removeButton)
  messageList.appendChild(newMessage)

  toggleMessagesSection()

  messageForm.reset()
})

// ========== PROJECT SECTION ==========

fetch("https://api.github.com/users/ymartineza/repos")
  .then((response) => {
    if (!response.ok) {
      throw new Error(
        "Failed to fetch data from GitHub. Please try again later"
      );
    }

    return response.json();
  })

  .then((repositories) => {
    // repositories = JSON.parse(this.repositories);
    console.log("Repositories: ", repositories); 
    const projectSection = document.getElementById("projects"); 
    const projectList = projectSection.querySelector("ul"); 
    projectList.innerHTML = ""; 

    for (let i = 0; i < repositories.length; i++) {
        const project = document.createElement("li");
        const link = document.createElement("a"); 
        link.href = repositories[i].html_url; 
        link.textContent = repositories[i].name; 
        // if (!repositories[i].fork) {
        project.appendChild(link);
        projectList.appendChild(project);
        // }
    }
})  
  .catch((error) => {
    console.error("Error fetching repositories:", error); 
    const projectSection =document.getElementById("projects"); 
    const errorMessage = document.createElement("p"); 
    errorMessage.innerHTML = "Unable to load projects. Please try again later.";
    projectSection.appendChild(errorMessage); 
  });
