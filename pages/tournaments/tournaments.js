const MODE_SETTINGS = {
  
  battle_royal: {
    map: "Bermuda",
    rounds: "1",
    ammo: "Default",
    throwable: "Allowed",
    character: "Allowed"
  },
  
  ff_survival: {
    map: "Bermuda",
    rounds: "1",
    ammo: "Default",
    throwable: "Allowed",
    character: "Allowed"
  },
  
  head_1v1: {
    map: "Iron Cage",
    rounds: "Best Of 7",
    ammo: "Unlimited",
    throwable: "Disabled",
    character: "Disabled"
  },
  
  head_2v2: {
    map: "Iron Cage",
    rounds: "Best Of 7",
    ammo: "Unlimited",
    throwable: "Disabled",
    character: "Disabled"
  },
  
  cs_lw_1v1: {
    map: "Iron Cage",
    rounds: "Best Of 7",
    ammo: "Unlimited",
    throwable: "Allowed",
    character: "Allowed"
  },
  
  cs_lw_2v2: {
    map: "Iron Cage",
    rounds: "Best Of 7",
    ammo: "Unlimited",
    throwable: "Allowed",
    character: "Allowed"
  },
  
  cs_4v4: {
    map: "Random",
    rounds: "13",
    ammo: "Unlimited",
    throwable: "Allowed",
    character: "Allowed"
  }
  
};


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

<div class="skeleton-card">

<div class="skeleton-image"></div>

<div class="skeleton-content">

<div class="skeleton-line long"></div>

<div class="skeleton-line"></div>

<div class="skeleton-line short"></div>

</div>

</div>

<div class="skeleton-card">

<div class="skeleton-image"></div>

<div class="skeleton-content">

<div class="skeleton-line long"></div>

<div class="skeleton-line"></div>

<div class="skeleton-line short"></div>

</div>

</div>
`;
    const response =
      await fetch(API_URL);
    
    tournaments =
      await response.json();
    
    render();
    
  }
  catch (error) {
    
    console.error(error);
    
    wrapper.innerHTML = `

<div class="error-state">

<i class="fa-solid fa-wifi"></i>

<h2>
Connection Error
</h2>

<p>
Unable to load tournaments.
Please check your internet connection.
</p>

<button
class="btn join-btn"
onclick="loadTournaments()"
>
Retry
</button>

</div>

`;
    
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
  
  if (data.length === 0) {
    
    wrapper.innerHTML = `

<div class="empty-state">

<i class="fa-solid fa-calendar-xmark"></i>

<h2>
No Tournaments Found
</h2>

<p>
There are currently no tournaments in this category.
Please check again later.
</p>

</div>

`;
    
    return;
    
  }
  
  data.forEach(
    tournament => {
      
      const progress =
        Math.min(
          100,
          (
            tournament.joined /
            tournament.slots
          ) * 100
        );
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
onerror="
this.src='../../assets/logo.png'
"
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

<button
class="btn settings-btn"
onclick="
openSettings(
'${tournament.category}'
)
"
>
⚙ Settings
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

function openSettings(mode) {
  
  const settings =
    MODE_SETTINGS[
      mode.toLowerCase()
    ];
  
  if (!settings) {
    
    document
      .getElementById(
        "settingsContent"
      ).innerHTML =
      "<p>No settings available.</p>";
    
  }
  
  else {
    
    document
      .getElementById(
        "settingsContent"
      ).innerHTML = `

<div class="setting-row">
<span>Map</span>
<strong>${settings.map}</strong>
</div>

<div class="setting-row">
<span>Rounds</span>
<strong>${settings.rounds}</strong>
</div>

<div class="setting-row">
<span>Ammo</span>
<strong>${settings.ammo}</strong>
</div>

<div class="setting-row">
<span>Throwables</span>
<strong>${settings.throwable}</strong>
</div>

<div class="setting-row">
<span>Character</span>
<strong>${settings.character}</strong>
</div>

<div class="settings-tip">

💡 Invite your friends or
opponents for faster matchmaking.

</div>

`;
    
  }
  
  document
    .getElementById(
      "settingsPopup"
    )
    .style.display =
    "flex";
  
}

function closeSettings() {
  
  document
    .getElementById(
      "settingsPopup"
    )
    .style.display =
    "none";
  
}
