

const batchContainer = document.getElementById("batch-container");
const allTabBtn = document.getElementById("all-tab-btn");
const openTabBtn = document.getElementById("open-tab-btn");
const closedTabBtn = document.getElementById("closed-tab-btn");
const  dynamicallyIssuesCount =document.getElementById("dynamically-issues-count");
const cardOneModal = document.getElementById("card-one-modal");
const titleDetails = document.getElementById("tittle-details");
const statusDetails = document.getElementById("status-details");
const assigneeDetails = document.getElementById("assignee-details");
const createdAtDetails = document.getElementById("createdAt-details");
const updatedAtDetails = document.getElementById("updatedAt-details");
const priorityDetails = document.getElementById("Priority-details");
const labelsDetailsFirst = document.getElementById("labels-details-first");
const labelsDetailsSecond = document.getElementById("labels-details-second");
const issuesCardsContainer = document.getElementById("issues-cards-container");
issuesCardsContainer.innerHTML = "";
const authorDetails = document.getElementById("author-name");
const secondTimeName = document.getElementById("second-time-name");
function issuesCount (){
  dynamicallyIssuesCount.textContent= issuesCardsContainer.children.length ;
}


const descriptionDetails = document.getElementById("description-details");
function allCardLoad() {
  btnHandleAll ()
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues `;
  fetch(url)
    .then((res) => res.json())
    .then((json) => displayCard(json.data));
}
async function displayModal(id) {
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`,
  );
  const data = await res.json();
  const cardDetails = data.data;

  titleDetails.textContent = cardDetails.title;
  statusDetails.textContent = cardDetails.status;
  authorDetails.textContent = cardDetails.author;
  descriptionDetails.textContent = cardDetails.description;
  secondTimeName.textContent = cardDetails.author;
  priorityDetails.textContent = cardDetails.priority;
  

  batchContainer.innerHTML = "";
  for (const label of cardDetails.labels) {
    const batch = document.createElement("p");
    batch.className =
      "text-[#D97706] bg-[#D9770620] px-7 py-1 rounded-2xl border border-[#D97706]";
    batch.textContent = label;

    batchContainer.append(batch);
  }

  cardOneModal.showModal();
}

function displayCard(cards) {
  btnHandleAll ()
  
  cards.forEach((word) => {
    const createDiv = document.createElement("div");
    createDiv.className = "bg-white p-4 rounded issue-card";
    createDiv.innerHTML = `
        <div  onclick="displayModal(${word.id})" class="space-y-4 mb-5 cursor-pointer">
              <div class="flex justify-between">
                <img src="./assets/Open-Status.png" alt="" class="w-7 h-7" />
                <p class="text-[#EF4444] bg-[#EF444420] px-6 py-1 rounded-xl cursor-pointer">
                  ${word.priority}
                </p>
              </div>
              <h3 class="text-[18px] font-semibold ">
                ${word.title}
              </h3>
              <p class="line-clamp-2 text-[16px] text-[#64748B]">
                ${word.description}
              </p>
              <div class="flex gap-3">
                <p
                  class="text-[#EF4444] bg-[#EF444420] px-4 py-1 rounded-2xl border border-[#EF4444]"
                >
                  ${word.labels[0]}
                </p>
                <p
                  class="text-[#D97706] bg-[#D9770620] px-7 py-1 rounded-2xl border border-[#D97706]"
                >
                  ${word.labels[1]}
                </p>
              </div>
            </div>
            <hr class="text-gray-300" />
            <div class="p-3">
              <p class="text-[16px] text-[#64748B]">#1 ${word.createdAt}</p>
              <p class="text-[16px] text-[#64748B]">${word.updatedAt}</p>
            </div>
        </div>
        `;
    issuesCardsContainer.append(createDiv);
  });
  issuesCount()
}
allCardLoad();
function btnHandleAll (){
  allTabBtn.classList.add("btn-primary")
  allTabBtn.classList.remove("btn-outline")
  openTabBtn.classList.remove("btn-primary")
  openTabBtn.classList.add("btn-outline")
  closedTabBtn.classList.remove("btn-primary")
  closedTabBtn.classList.add("btn-outline")
}
function btnHandleOpen (){
  openTabBtn.classList.add("btn-primary")
  openTabBtn.classList.remove("btn-outline")
  allTabBtn.classList.remove("btn-primary")
  allTabBtn.classList.add("btn-outline")
  closedTabBtn.classList.remove("btn-primary")
  closedTabBtn.classList.add("btn-outline")
}
function btnHandleClosed (){
  closedTabBtn.classList.add("btn-primary")
  closedTabBtn.classList.remove("btn-outline")
  allTabBtn.classList.remove("btn-primary")
  allTabBtn.classList.add("btn-outline")
  openTabBtn.classList.remove("btn-primary")
  openTabBtn.classList.add("btn-outline")
}

async function displayAllCard(id) {
  btnHandleAll();
  issuesCardsContainer.innerHTML = ""
  const res = await fetch`https://phi-lab-server.vercel.app/api/v1/lab/issues`;

  const data = await res.json();
  const openedCardDetails = data.data;
  // console.log(openedCardDetails)
  issuesCardsContainer.innerHTML = ""
  openedCardDetails.forEach((card) => {
    if (card.status === "closed" || card.status === "open") {
      
      const createDiv = document.createElement("div");
      createDiv.className = "bg-white p-4 rounded issue-card";
      createDiv.innerHTML = `
        <div  onclick="displayModal(${card.id})" class="space-y-4 mb-5 cursor-pointer">
              <div class="flex justify-between">
                <img src="./assets/Open-Status.png" alt="" class="w-7 h-7" />
                <p class="text-[#EF4444] bg-[#EF444420] px-6 py-1 rounded-xl cursor-pointer">
                  ${card.priority}
                </p>
              </div>
              <h3 class="text-[18px] font-semibold ">
                ${card.title}
              </h3>
              <p class="line-clamp-2 text-[16px] text-[#64748B]">
                ${card.description}
              </p>
              <div class="flex gap-3">
                <p
                  class="text-[#EF4444] bg-[#EF444420] px-4 py-1 rounded-2xl border border-[#EF4444]"
                >
                  ${card.labels[0]}
                </p>
                <p
                  class="text-[#D97706] bg-[#D9770620] px-7 py-1 rounded-2xl border border-[#D97706]"
                >
                  ${card.labels[1]}
                </p>
              </div>
            </div>
            <hr class="text-gray-300" />
            <div class="p-3">
              <p class="text-[16px] text-[#64748B]">#1 ${card.createdAt}</p>
              <p class="text-[16px] text-[#64748B]">${card.updatedAt}</p>
            </div>
        </div>
        `;
      issuesCardsContainer.append(createDiv);
    }
    // console.log(card.title);
  });
  issuesCount()
}

async function displayOpenedCard(id) {
  btnHandleOpen()
  issuesCardsContainer.innerHTML = ""
  const res = await fetch`https://phi-lab-server.vercel.app/api/v1/lab/issues`;

  const data = await res.json();
  const openedCardDetails = data.data;
  // console.log(openedCardDetails)
  issuesCardsContainer.innerHTML = ""
  openedCardDetails.forEach((card) => {
    if (card.status === "open") {
      
      const createDiv = document.createElement("div");
      createDiv.className = "bg-white p-4 rounded issue-card";
      createDiv.innerHTML = `
        <div  onclick="displayModal(${card.id})" class="space-y-4 mb-5 cursor-pointer">
              <div class="flex justify-between">
                <img src="./assets/Open-Status.png" alt="" class="w-7 h-7" />
                <p class="text-[#EF4444] bg-[#EF444420] px-6 py-1 rounded-xl cursor-pointer">
                  ${card.priority}
                </p>
              </div>
              <h3 class="text-[18px] font-semibold ">
                ${card.title}
              </h3>
              <p class="line-clamp-2 text-[16px] text-[#64748B]">
                ${card.description}
              </p>
              <div class="flex gap-3">
                <p
                  class="text-[#EF4444] bg-[#EF444420] px-4 py-1 rounded-2xl border border-[#EF4444]"
                >
                  ${card.labels[0]}
                </p>
                <p
                  class="text-[#D97706] bg-[#D9770620] px-7 py-1 rounded-2xl border border-[#D97706]"
                >
                  ${card.labels[1]}
                </p>
              </div>
            </div>
            <hr class="text-gray-300" />
            <div class="p-3">
              <p class="text-[16px] text-[#64748B]">#1 ${card.createdAt}</p>
              <p class="text-[16px] text-[#64748B]">${card.updatedAt}</p>
            </div>
        </div>
        `;
      issuesCardsContainer.append(createDiv);
    }
    // console.log(card.title);
  });
  issuesCount()
}
async function displayClosedCard(id) {
  btnHandleClosed();
  issuesCardsContainer.innerHTML = ""
  const res = await fetch`https://phi-lab-server.vercel.app/api/v1/lab/issues`;

  const data = await res.json();
  const openedCardDetails = data.data;
  // console.log(openedCardDetails)
  issuesCardsContainer.innerHTML = ""
  openedCardDetails.forEach((card) => {
    if (card.status === "closed") {
      
      const createDiv = document.createElement("div");
      createDiv.className = "bg-white p-4 rounded issue-card";
      createDiv.innerHTML = `
        <div  onclick="displayModal(${card.id})" class="space-y-4 mb-5 cursor-pointer">
              <div class="flex justify-between">
                <img src="./assets/Open-Status.png" alt="" class="w-7 h-7" />
                <p class="text-[#EF4444] bg-[#EF444420] px-6 py-1 rounded-xl cursor-pointer">
                  ${card.priority}
                </p>
              </div>
              <h3 class="text-[18px] font-semibold ">
                ${card.title}
              </h3>
              <p class="line-clamp-2 text-[16px] text-[#64748B]">
                ${card.description}
              </p>
              <div class="flex gap-3">
                <p
                  class="text-[#EF4444] bg-[#EF444420] px-4 py-1 rounded-2xl border border-[#EF4444]"
                >
                  ${card.labels[0]}
                </p>
                <p
                  class="text-[#D97706] bg-[#D9770620] px-7 py-1 rounded-2xl border border-[#D97706]"
                >
                  ${card.labels[1]}
                </p>
              </div>
            </div>
            <hr class="text-gray-300" />
            <div class="p-3">
              <p class="text-[16px] text-[#64748B]">#1 ${card.createdAt}</p>
              <p class="text-[16px] text-[#64748B]">${card.updatedAt}</p>
            </div>
        </div>
        `;
      issuesCardsContainer.append(createDiv);
    }
    // console.log(card.title);
  });
  issuesCount()
}


