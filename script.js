let toggleButton = document.querySelector(".toggle");
let container = document.querySelector("main");
let aside = document.querySelector("#aside");
let newchats = document.querySelectorAll(".chats");
let chatEdit = document.querySelectorAll(".edit");
let colorMode = document.querySelector(".color-mode");
let chats = document.querySelector(".main-container-1");
let createChat = document.querySelector("#add-chat");
let chatLists = document.querySelector(".chat-list");
let input = document.querySelector(".questionValue");
let qna = document.querySelectorAll(".qna");
let button = document.querySelector(".submitButton");
let element = document.body;
let apiKey = "AIzaSyBDqt1fkobPK0f6Pnv3mdCj7C3TAzrNeSI";
let url =
  "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=AIzaSyBDqt1fkobPK0f6Pnv3mdCj7C3TAzrNeSI";


function applyChanges() {
  let mode = localStorage.getItem("mode");
  let sideNav = localStorage.getItem("active");
  if (mode === "dark") {
    element.classList.add("dark");
    changeColor(mode);
  } else {
    element.classList.remove("dark");
    changeColor(mode);
  }
  if (sideNav === "true") {
    aside.classList.add("active");
    container.classList.add("active");
  }
}
applyChanges();

toggleButton.addEventListener("click", function () {
  if (aside.classList == "active") {
    localStorage.setItem("active", false);
  } else {
    localStorage.setItem("active", true);
  }
  aside.classList.toggle("active");
  container.classList.toggle("active");
});

container.addEventListener("click", function () {
  if (window.innerWidth <= 700) {
    aside.classList.remove("active");
    container.classList.remove("active");
    localStorage.setItem("active", false);
  }
});

function attachListeners() {
  chatEdit = document.querySelectorAll(".edit");
  let liElements = document.querySelectorAll("#chat-title");
  editText = document.querySelectorAll(".pen");
  trash = document.querySelectorAll(".trash");
  newchats.forEach(function (chat, index) {
    chat.addEventListener("mouseover", function () {
      chatEdit[index].style.display = "flex";
    });
    chat.addEventListener("mouseout", function () {
      chatEdit[index].style.display = "none";
    });
  });

  trash.forEach(function (chat, index) {
    chat.addEventListener("click", function () {
      newchats[index].remove()
    });
  });

  editText.forEach(function (chat, index) {
    chat.addEventListener("click", function () {
      let li = liElements[index];
      if (!li) {
        console.error("li element not found for index", index);
        return;
      }
      
      let isEnterPressed = false;
  
      let currentText = li.textContent.trim();
  
      let input = document.createElement("input");
      input.type = "text";
      input.value = currentText;
      li.innerHTML = "";
      li.appendChild(input);
      input.focus();
  
      input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          isEnterPressed = true;
          saveText(li, input);
        }
      });
      input.addEventListener("blur", function () {
        if (isEnterPressed === false) {
          saveText(li, input);
        }
      });
    });
  });
}

attachListeners();

colorMode.addEventListener("click", function () {
  if (element.classList.contains("dark")) {
    element.classList.remove("dark");
    localStorage.setItem("mode", "light");
    changeColor(element);
  } else {
    element.classList.add("dark");
    localStorage.setItem("mode", "dark");
    changeColor(element.classList);
  }
});

function changeColor(mode) {
  if (mode == "dark") {
    colorMode.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" d="M8 11a3 3 0 1 1 0-6a3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8a4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/></svg> light mode`;
  } else {
    colorMode.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" d="M6 .278a.77.77 0 0 1 .08.858a7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316a.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71C0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"/></svg> dark mode`;
  }
}



function saveText(li, input) {
  let value = input.value.trim();
  if (value == "") {
    li.innerHTML = "New Chat";
  } else {
    li.innerHTML = input.value;
  }
}

createChat.addEventListener("click", function () {
  let chatList = document.createElement("ul");
  chatList.className = "chats";
  chatList.innerHTML = `<li>
                <div>
                  <span class="chat-title" id="chat-title">New chat</span>
                </div>
                <div class="edit">
                  <svg class="trash" xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 16 16"><path fill="currentColor" d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1l-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/></svg>
                  <svg class="pen" xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 16 16"><path fill="currentColor" d="m13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057l3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/></svg>
                </div>
              </li>`;
  chatLists.append(chatList);
  newchats = document.querySelectorAll(".chats");
  attachListeners();
});


async function getAnswer(event) {
  let istyping = false;
  event.preventDefault();
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: input.value }] }],
    }),
  };
  try {
    if (istyping == true) {
      istyping = false;
      clearInterval(typingInterval);
    } else {
      if (input.value.trim().length > 0) {
        const id = generateId();
        let question = input.value.trim();
        input.value = "";
        istyping = true;
        input.setAttribute('readonly',true)
          chats.innerHTML += createChats(question, id);
          chats.scrollTop = chats.scrollHeight;
        const p = document.getElementById(id);
        const res = await fetch(url, options);
        if (res.ok) {
          p.innerHTML = "";
          const data = await res.json();
          let text = data.candidates[0].content.parts[0].text;
          text = text.replaceAll(/Gemini/g, "ChatBOT");
          text = text.replaceAll(/Google/g, "rubin");
          text = text.replaceAll(/\`\`\`([\s\S]*?)\`\`\`/g, "<pre class='code-container'><code class='language-javascript'>$1</code></pre>");
          text = marked.parse(text, {highlight: true})
          typeWriter(p, text);
        } else {
          istyping = false
          p.innerHTML = "";
          if (res.status == 429) {
            typeWriter(p, "request limit reached for this website");
          }
        }
      } else {
        input.value = "";
      }
    }
  } catch (err) {
    istyping = false
    console.log(err);
  }
}

function createChats(question, id) {
  return ` 
      <div class="question">
            <div>
              ${question}
            </div>
          </div>

          <div class="answer">
            <div class="answer-container">
            <img src="images/gpt.png" alt="">
              <div id="${id}"><img class="loading" style="height:40px; " src="images/loading.gif" alt=""></div>
            </div>
          </div>
    `;
}

function generateId() {
  const id = Math.random.toString(16) + Date.now();
  return id.substring(2, id.length - 2);
}

function typeWriter(el, ans) {
  istyping = true
  chats.scrollTop = chats.scrollHeight;
  new Typed(el, {
    strings: [ans],
    typeSpeed: 5,
    contentType:"html",
    showCursor: false,
    onComplete:(self)=>{
      istyping = false
      input.removeAttribute('readonly')
    }
  });
  chats.scrollTop = chats.scrollHeight;
}
