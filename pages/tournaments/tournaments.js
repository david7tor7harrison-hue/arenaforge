const API_URL =
  "https://script.google.com/macros/s/AKfycbzpHgmuGwRnr6ewMtHtyVY6Hq0dYMzRLF6ei_ACZ6MIiWcxxzYio15Ru7rzSYKHe5vSng/exec";

let tournaments = [];

const wrapper =
  document.getElementById(
    "tournamentWrapper"
  );

const params =
  new URLSearchParams(
    window.location.search
  );

const category =
  params.get("category");

let currentFilter =
  "upcoming";

loadTournaments();

async function loadTournaments() {
  
  try {
    wrapper.innerHTML = `

<div class="skeleton-card"></div>
<div class="skeleton-card"></div>
<div class="skeleton-card"></div>

`;
    const response =
      await fetch(API_URL);
    
    tournaments =
      await response.json();
    
    render();
    
  } catch (error) {
    
    wrapper.innerHTML = `

<div class="empty-state">

<h2>
No Tournaments Available
</h2>

<p>

New tournaments will appear here soon.

</p>

</div>

`;
    console.error(error);
    
  }
  
}

document
  .querySelectorAll(
    ".filter-btn"
  )
  .forEach(btn => {
    
    btn.addEventListener(
      "click",
      () => {
        
        document
          .querySelectorAll(
            ".filter-btn"
          )
          .forEach(
            b => b.classList.remove(
              "active"
            )
          );
        
        btn.classList.add(
          "active"
        );
        
        currentFilter =
          btn.dataset.status;
        
        render();
        
      });
    
  });

function render() {
  
  wrapper.innerHTML = "";
  
  let data =
    tournaments.filter(
      item =>
      item.category === category
    );
  
  if (
    currentFilter !== "all"
  ) {
    
    data =
      data.filter(
        item =>
        item.status ===
        currentFilter
      );
    
  }
  
  data.sort(
    (a, b) =>
    new Date(a.date) -
    new Date(b.date)
  );
  
  data.forEach(
    tournament => {
      
      const progress =
        (
          tournament.joined /
          tournament.slots
        ) * 100;
      let joinButton = "";
      
      if (
        tournament.status === "upcoming" &&
        tournament.joined < tournament.slots
      ) {
        
        joinButton = `
  <button
    class="btn join-btn"
    onclick="
      window.location.href=
      '../register/register.html?id=${tournament.id}'
    "
  >
    Join Now
  </button>
  `;
        
      }
      
      else if (
        tournament.status === "upcoming" &&
        tournament.joined >= tournament.slots
      ) {
        
        joinButton = `
  <button
    class="btn room-full-btn"
    disabled
  >
    Room Full
  </button>
  `;
        
      }
      
      else if (
        tournament.status === "live"
      ) {
        
        joinButton = `
  <button
    class="btn live-btn"
    disabled
  >
    Match Live
  </button>
  `;
        
      }
      
      else {
        
        joinButton = `
  <button
    class="btn completed-btn"
    disabled
  >
    Completed
  </button>
  `;
        
        
      }
      wrapper.innerHTML += `

<div class="tournament-card">

<div class="card-image">
<div class="image-title">

${tournament.title}

</div>
<img
src="${tournament.image}"
alt="${tournament.title}"
>

<span class="status-badge ${tournament.status}">
${tournament.status}
</span>

</div>

<div class="content">

<div class="tournament-meta">

<span>
<i class="fa-regular fa-calendar"></i>
${new Date(
tournament.date
).toLocaleDateString(
"en-IN",
{
day:"2-digit",
month:"short"
}
)}
</span>

<span>
<i class="fa-regular fa-clock"></i>
${new Date(
tournament.time
).toLocaleTimeString(
"en-IN",
{
hour:"numeric",
minute:"2-digit",
hour12:true,
timeZone:"UTC"
}
)}
</span>

</div>

<div class="tournament-tags">

<span>
🗺 ${tournament.map}
</span>

<span>
🎮 ${tournament.mode}
</span>

</div>

<div class="mini-stats">

<div>

<small>
Prize Pool
</small>

<strong>
${tournament.prize}
</strong>

</div>

<div>

<small>
Entry Fee
</small>

<strong>
${tournament.entryFee}
</strong>

</div>

</div>

<div class="progress">

<div
class="progress-fill"
style="width:${progress}%"
>
</div>

</div>

<div class="slot-row">

<span>

${tournament.joined}
/
${tournament.slots}

Slots Filled

</span>

<span>

${Math.max(
0,
tournament.slots -
tournament.joined
)}

Left

</span>

</div>

<div class="actions">

<button
class="btn details-btn"
onclick="openDetails('${tournament.id}')"
>

Details

</button>

${joinButton}

</div>

</div>

</div>

`;
    });
  
}

function openDetails(id) {
  
  window.location.href =
    `../tournament_details/tournament_details.html?id=${id}`;
  
}
