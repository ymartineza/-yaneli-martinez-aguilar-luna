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
