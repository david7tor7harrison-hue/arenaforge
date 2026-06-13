function formatDate(dateString) {
  
  const date =
    new Date(dateString);
  
  return date.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }
  );
  
}

function formatTime(timeString) {
  
  const date =
    new Date(timeString);
  
  return date.toLocaleTimeString(
    "en-IN",
    {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    }
  );
  
}

const API_URL =
  "https://script.google.com/macros/s/AKfycbzpHgmuGwRnr6ewMtHtyVY6Hq0dYMzRLF6ei_ACZ6MIiWcxxzYio15Ru7rzSYKHe5vSng/exec";

const params =
  new URLSearchParams(
    window.location.search
  );

const id =
  params.get("id");

const container =
  document.getElementById(
    "detailsContainer"
  );

loadTournament();

async function loadTournament() {
  
  try {
    
    container.innerHTML = `

<div class="details-skeleton">

<div class="skeleton-banner"></div>

<div class="skeleton-grid">

<div class="skeleton-card"></div>
<div class="skeleton-card"></div>
<div class="skeleton-card"></div>
<div class="skeleton-card"></div>

</div>

<div class="skeleton-rules"></div>

</div>

`;
    
    const response =
      await fetch(API_URL);
    
    const tournaments =
      await response.json();
    
    const tournament =
      tournaments.find(
        item =>
        String(item.id).trim().toLowerCase() ===
        String(id).trim().toLowerCase()
      );
    
    if (!tournament) {
      
      container.innerHTML = `

<div class="empty-state">

<i class="fa-solid fa-calendar-xmark"></i>

<h2>
Tournament Not Found
</h2>

<p>
This tournament may have been removed
or is no longer available.
</p>

<a
href="../tournaments/tournaments.html"
class="retry-btn"
>
Back
</a>

</div>

`;
      
      return;
    }
    
    renderTournament(
      tournament
    )
    
  }
  
  catch (error) {
    
    console.error(error);
    
    container.innerHTML = `

<div class="error-state">

<i class="fa-solid fa-wifi"></i>

<h2>
Connection Error
</h2>

<p>
Unable to load tournament details.
Please check your internet connection.
</p>

<button
class="retry-btn"
onclick="loadTournament()"
>
Try Again
</button>

</div>

`;
    
  }
  
}


function renderTournament(
  tournament
) {
  currentTournament =
    tournament;
  
  const progress =
    tournament.slots > 0 ?
    (
      tournament.joined /
      tournament.slots
    ) * 100 :
    0;
  
  let actionButton = "";
  
  if (
    tournament.status === "upcoming" &&
    tournament.joined < tournament.slots
  ) {
    
    actionButton = `
  <button
    class="join-btn"
    onclick="
      window.location.href=
      '../register/register.html?id=${tournament.id}'
    "
  >
    Join Tournament
  </button>
  `;
    
  }
  
  else if (
    tournament.status === "upcoming" &&
    tournament.joined >= tournament.slots
  ) {
    
    actionButton = `
  <button
    class="join-btn room-full-btn"
    disabled
  >
    Room Full
  </button>
  `;
    
  }
  
  else if (
    tournament.status === "live"
  ) {
    
    actionButton = `
  <button
    class="join-btn live-btn"
    disabled
  >
    Match Live
  </button>
  `;
    
  }
  
  else {
    
    actionButton = `
  <button
    class="join-btn completed-btn"
    disabled
  >
    Tournament Completed
  </button>
  `;
    
  }
  const formattedDate =
    tournament.date ?
    new Date(
      tournament.date
    ).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }
    ) :
    "TBA";
  
  const formattedTime =
    tournament.time ?
    new Date(
      tournament.time
    ).toLocaleTimeString(
      "en-IN",
      {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: "UTC"
      }
    ) :
    "TBA";
  
  container.innerHTML = `

<div class="hero-banner">

<img
src="${tournament.modeImage}"
alt="${tournament.title}"
>

<div class="hero-overlay"></div>

<div class="hero-info">

<span class="badge ${tournament.status}">
${tournament.status}
</span>

<h1>
${tournament.title}
</h1>

<p>
${formattedDate}
•
${formattedTime}
</p>

</div>

</div>

<div class="content">

<span class="badge ${tournament.status}">
${tournament.status}
</span>

<h1>
${tournament.title}
</h1>

<div class="info-grid">

<div class="info-card">

<h3>
Prize Pool
</h3>

<p>
${tournament.prize}
</p>

${tournament.prizeBreakup ?
`
<button
class="prize-btn"
onclick="openPrizePopup()"
>
View Rewards
</button>
`
:
""
}
</div>

<div class="info-card">
<h3>Entry Fee</h3>
<p>${tournament.entryFee}</p>
</div>

<div class="info-card">
<h3>Per Kill</h3>
<p>${tournament.perKill}</p>
</div>

<div class="info-card">
<h3>Map</h3>
<p>${tournament.map}</p>
</div>

<div class="info-card">
<h3>Date</h3>
<p>${formattedDate}</p>
</div>

<div class="info-card">
<h3>Time</h3>
<p>${formattedTime}</p>
</div>

</div>

<div class="slots">

<h3>

Slots

${tournament.joined}
/
${tournament.slots}

</h3>

<div class="progress">

<div
class="progress-fill"
style="
width:${progress}%;
"
>

</div>

</div>

</div>
${actionButton}
<section class="rules-section">

<h2>
<i class="fa-solid fa-shield-halved"></i>
Tournament Rules
</h2>

<div class="rule-card">

<h3>
<i class="fa-solid fa-video"></i>
Match Rules & Guidelines
</h3>

<ul>

<li>
Recording is compulsory from room joining until match completion.
</li>

<li>
Read all instructions carefully before participating.
</li>

<li>
Failure to follow rules may lead to disqualification.
</li>

</ul>

</div>



<div class="rule-card">

<h3>
<i class="fa-solid fa-right-to-bracket"></i>
Joining Instructions
</h3>

<ul>

<li>
Recording is compulsory from room joining until room starts.
</li>

<li>
Failure to provide recording proof may result in direct ban.
</li>

<li>
Enter your FF MAX account name correctly during registration.
</li>

<li>
Game name must exactly match the registered account name.
</li>

<li>
Room ID & Password will be shared 5–10 minutes before match start.
</li>

<li>
No refund will be provided for missed matches.
</li>

</ul>

</div>



<div class="rule-card">

<h3>
<i class="fa-solid fa-user-check"></i>
Eligibility Rules
</h3>

<ul>

<li>
Minimum account level requirement: Level 40+
</li>

<li>
BR Career Headshot Rate should not appear suspicious.
</li>

<li>
Only Android, iOS, Mobile Phones and Tablets are allowed.
</li>

<li>
Emulators are strictly prohibited.
</li>

</ul>

</div>



<div class="rule-card danger-card">

<h3>
<i class="fa-solid fa-ban"></i>
Prohibited Activities
</h3>

<ul>

<li>Aimbot</li>

<li>No Recoil</li>

<li>Hacking</li>

<li>Game Modifying Tools</li>

<li>Bug & Glitch Exploitation</li>

<li>Teaming With Opponents</li>

<li>Inviting Unregistered Players</li>

<li>Double Vector Gun</li>

<li>M79 Gun Usage</li>

</ul>

</div>



<div class="rule-card">

<h3>
<i class="fa-solid fa-gamepad"></i>
Gameplay Requirements
</h3>

<ul>

<li>
Proper match recording is mandatory.
</li>

<li>
Prize pools may be adjusted if slots remain unfilled.
</li>

<li>
Report any issues within 1 hour after match completion.
</li>

</ul>

</div>



<div class="rule-card">

<h3>
<i class="fa-solid fa-circle-info"></i>
Important Notes
</h3>

<ul>

<li>
Blacklisted Game IDs must provide recording proof for prize claims.
</li>

<li>
Screen recording while joining custom rooms is recommended.
</li>

<li>
ArenaForge reserves the right to modify rules, prizes and tournament structure at any time.
</li>

</ul>

</div>

</section>


</div>
<div
id="prizePopup"
class="popup"
>

<div class="popup-content">

<button
class="close-btn"
onclick="closePrizePopup()"
>
✕
</button>

<h2>
Prize Distribution
</h2>

<div id="prizeList">
</div>

</div>

</div>
`;
  
}
let currentTournament = null;

function openPrizePopup() {
  
  if (
    !currentTournament ||
    !currentTournament.prizeBreakup
  ) {
    return;
  }
  
  const popup =
    document.getElementById(
      "prizePopup"
    );
  
  const prizeList =
    document.getElementById(
      "prizeList"
    );
  
  const items =
    String(
      currentTournament.prizeBreakup
    )
    .split("|");
  
  prizeList.innerHTML =
    items
    .map(
      item =>
      `<p>${item}</p>`
    )
    .join("");
  
  popup.style.display =
    "flex";
  
}

function closePrizePopup() {
  
  document
    .getElementById(
      "prizePopup"
    )
    .style.display =
    "none";
  
}
