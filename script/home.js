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
const allTabBtn = document.getElementById("all-tab-btn")
function cardLoad(){
    const url =`https://phi-lab-server.vercel.app/api/v1/lab/issues `
    fetch(url)
    .then((res) => res.json())
    .then((json) => displayCard(json.data));
   
}
function displayCard(cards){
    const issuesCardsContainer = document.getElementById("issues-cards-container")
    cards.forEach(word => {
        
        const createDiv = document.createElement("div");
        createDiv.className = "bg-white p-4 rounded";
        createDiv.innerHTML = `
        <div class="space-y-4 mb-5">
              <div class="flex justify-between">
                <img src="./assets/Open-Status.png" alt="" class="w-7 h-7" />
                <p class="text-[#EF4444] bg-[#EF444420] px-6 py-1 rounded-xl">
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
        
        `
        issuesCardsContainer.append(createDiv);
    });
}
cardLoad()
{/* <div class="bg-white p-4 rounded">
            <div class="space-y-4 mb-5">
              <div class="flex justify-between">
                <img src="./assets/Open-Status.png" alt="" class="w-7 h-7" />
                <p class="text-[#EF4444] bg-[#EF444420] px-6 py-1 rounded-xl">
                  High
                </p>
              </div>
              <h3 class="text-[18px] font-semibold ">
                Fix navigation menu on mobile devices
              </h3>
              <p class="line-clamp-2 text-[16px] text-[#64748B]">
                The navigation menu doesn't collapse properly on mobile
                devices...
              </p>
              <div class="flex gap-3">
                <p
                  class="text-[#EF4444] bg-[#EF444420] px-4 py-1 rounded-2xl border border-[#EF4444]"
                >
                  Bug
                </p>
                <p
                  class="text-[#D97706] bg-[#D9770620] px-7 py-1 rounded-2xl border border-[#D97706]"
                >
                  help wanted
                </p>
              </div>
            </div>
            <hr class="text-gray-300" />
            <div class="p-3">
              <p class="text-[16px] text-[#64748B]">#1 by john_doe</p>
              <p class="text-[16px] text-[#64748B]">1/15/2024</p>
            </div>
          </div> */}
