// {
//       "id": 1,
//       "title": "Fix navigation menu on mobile devices",
//       "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
//       "status": "open",
//       "labels": [
//         "bug",
//         "help wanted"
//       ],
//       "priority": "high",
//       "author": "john_doe",
//       "assignee": "jane_smith",
//       "createdAt": "2024-01-15T10:30:00Z",
//       "updatedAt": "2024-01-15T10:30:00Z"
//     },

//   "status": "success",
//   "message": "Issue fetched successfully",
//   "data": {
//     "id": 33,
//     "title": "Add bulk operations support",
//     "description": "Allow users to perform bulk actions like delete, update status on multiple items at once.",
//     "status": "open",
//     "labels": [
//       "enhancement"
//     ],
//     "priority": "low",
//     "author": "bulk_barry",
//     "assignee": "",
//     "createdAt": "2024-02-02T10:00:00Z",
//     "updatedAt": "2024-02-02T10:00:00Z"
//   }
// }

const allTabBtn = document.getElementById("all-tab-btn");
const cardOneModal = document.getElementById("card-one-modal");
const titleDetails = document.getElementById("tittle-details")
const statusDetails = document.getElementById("status-details")
const assigneeDetails = document.getElementById("assignee-details")
const createdAtDetails = document.getElementById("createdAt-details")
const updatedAtDetails = document.getElementById("updatedAt-details")
const priorityDetails = document.getElementById("Priority-details")
const labelsDetailsFirst = document.getElementById("labels-details-first")
const labelsDetailsSecond = document.getElementById("labels-details-second")


const authorDetails = document.getElementById("author-name")
const secondTimeName = document.getElementById("second-time-name")

const descriptionDetails = document.getElementById("description-details")
function cardLoad() {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues `;
  fetch(url)
    .then((res) => res.json())
    .then((json) => displayCard(json.data));
}
async function displayModal(id){
  
   
  const res =await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
  const data = await res.json()
  const cardDetails = data.data;
  console.log(cardDetails);
   titleDetails.textContent = cardDetails.title;
   statusDetails.textContent = cardDetails.status;
   authorDetails.textContent = cardDetails.author;
   descriptionDetails.textContent = cardDetails.description;
   secondTimeName.textContent = cardDetails.author;
   priorityDetails.textContent = cardDetails.priority;
   labelsDetailsFirst.textContent = cardDetails.labels[0];
   labelsDetailsSecond.textContent = `${cardDetails.labels[1] === "undefined" ?  "" : cardDetails.labels[1] }`;
  

  cardOneModal.showModal();
  
  
  

}


function displayCard(cards) {
  const issuesCardsContainer = document.getElementById(
    "issues-cards-container",
  );

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
}
cardLoad();
