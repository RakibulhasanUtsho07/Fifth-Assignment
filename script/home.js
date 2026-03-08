
const cardBatch = document.getElementById("card-batch")
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
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
issuesCardsContainer.innerHTML = "";
const authorDetails = document.getElementById("author-name");
const secondTimeName = document.getElementById("second-time-name");
function issuesCount (){
  dynamicallyIssuesCount.textContent= issuesCardsContainer.children.length ;
}
function cardLoad (card){
  
    const labelsHTML = card.labels.map(label => {
      let classColor = "";
      if(label.toLowerCase() === "bug"){
        classColor = "text-[#EF4444] bg-[#EF444420] border-[#EF4444]"
      }
      else if(label.toLowerCase() ==="help wanted"){
        classColor = "text-[#D97706] bg-[#D9770620] border-[#D97706]"
      }
      else{
        classColor ="text-[#00A96E] bg-[#00A96E20] border-[#00A96E]"
      }
      
     return `
        <p class="${classColor} px-7 py-1 rounded-2xl border whitespace-nowrap">
            ${label.toUpperCase()}
        </p>
    `;
    
    }).join("");
    
    
  
  
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
              <div id="card-batch" class="flex gap-3 flex-wrap">
                ${labelsHTML}
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
    if(label.toLowerCase() === "bug"){
        batch.className = "text-[#EF4444] bg-[#EF444420] border-[#EF4444] px-7 py-1 rounded-2xl border whitespace-nowrap"
      }
      else if(label.toLowerCase() ==="help wanted"){
        batch.className = "text-[#D97706] bg-[#D9770620] border-[#D97706] px-7 py-1 rounded-2xl border whitespace-nowrap"
      }
      else{
        batch.className ="text-[#00A96E] bg-[#00A96E20] border-[#00A96E] px-7 py-1 rounded-2xl border whitespace-nowrap"
      }
    batch.textContent = label;

    batchContainer.append(batch);
  }

  cardOneModal.showModal();
}

function displayCard(cards) {
  btnHandleAll ()
  
  cards.forEach((card) => {
    cardLoad (card)
    
  });
  issuesCount()
}
allCardLoad();
function btnHandleAll (){
  allTabBtn.classList.add("btn-primary","bg-blue")
  allTabBtn.classList.remove("btn-outline")
  openTabBtn.classList.remove("btn-primary")
  openTabBtn.classList.add("btn-outline")
  closedTabBtn.classList.remove("btn-primary")
  closedTabBtn.classList.add("btn-outline")
}
function btnHandleOpen (){
  openTabBtn.classList.add("btn-primary","bg-blue")
  openTabBtn.classList.remove("btn-outline")
  allTabBtn.classList.remove("btn-primary")
  allTabBtn.classList.add("btn-outline")
  closedTabBtn.classList.remove("btn-primary")
  closedTabBtn.classList.add("btn-outline")
}
function btnHandleClosed (){
  closedTabBtn.classList.add("btn-primary","bg-blue")
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
  
  issuesCardsContainer.innerHTML = ""
  openedCardDetails.forEach((card) => {
    if (card.status === "closed" || card.status === "open") {
      cardLoad (card)
      
    }
  });
  issuesCount()
}

async function displayOpenedCard(id) {
  btnHandleOpen()
  issuesCardsContainer.innerHTML = ""
  const res = await fetch`https://phi-lab-server.vercel.app/api/v1/lab/issues`;

  const data = await res.json();
  const openedCardDetails = data.data;
  
  issuesCardsContainer.innerHTML = ""
  openedCardDetails.forEach((card) => {
    if (card.status === "open") {
      cardLoad (card);
      
      
    }
    
  });
  issuesCount()
}
async function displayClosedCard(id) {
  btnHandleClosed();
  issuesCardsContainer.innerHTML = ""
  const res = await fetch`https://phi-lab-server.vercel.app/api/v1/lab/issues`;

  const data = await res.json();
  const openedCardDetails = data.data;
  
  issuesCardsContainer.innerHTML = ""
  openedCardDetails.forEach((card) => {
    if (card.status === "closed") {
      cardLoad (card)
      
    }
  });
  issuesCount()
}

searchBtn.addEventListener("click", function(){
  
  const searchValue =searchInput.value.trim().toLowerCase();
  if(searchValue === ""){
    alert(" Enter something to search")
    return;
  }
  console.log(searchValue);
  searchCard(searchValue)
  
  
  
})
async function searchCard(searchValue) {
  issuesCardsContainer.innerHTML = "";
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`
    const res = await fetch(url)
    const data = await res.json();
    const searchCardsDetails = data.data;
    const filterCards = searchCardsDetails.filter(card => card.title.toLowerCase().includes(searchValue) )
    filterCards.forEach((card)=>{
      cardLoad(card)
    })
    

  }
  

