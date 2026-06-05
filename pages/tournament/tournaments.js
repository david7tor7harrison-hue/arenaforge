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
    
    const response =
      await fetch(API_URL);
    
    tournaments =
      await response.json();
    
    render();
    
  } catch (error) {
    
    wrapper.innerHTML =
      "<h2>Failed to load tournaments</h2>";
    
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

<img
src="${tournament.image}"
>

<div class="content">

<span
class="badge ${tournament.status}"
>

${tournament.status}

</span>

<h2>

<div class="stats-grid">

<div>
<span>Prize Pool</span>
<strong>${tournament.prize}</strong>
</div>

<div>
<span>Entry Fee</span>
<strong>${tournament.entryFee}</strong>
</div>

<div>
<span>Map</span>
<strong>${tournament.map}</strong>
</div>

<div>
<span>Mode</span>
<strong>${tournament.mode}</strong>
</div>

</div>

${tournament.title}

</h2>

<p>
Prize:
${tournament.prize}
</p>

<p>
Entry:
${tournament.entryFee}
</p>

<p>
Map:
${tournament.map}
</p>

<div class="progress">

<div
class="progress-fill"
style="width:${progress}%"
>

</div>

</div>

<p>
${tournament.joined}
/
${tournament.slots}
Joined
</p>

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