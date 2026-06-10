const TOURNAMENT_API =
"https://script.google.com/macros/s/AKfycbzpHgmuGwRnr6ewMtHtyVY6Hq0dYMzRLF6ei_ACZ6MIiWcxxzYio15Ru7rzSYKHe5vSng/exec";

const REGISTRATION_API =
"https://script.google.com/macros/s/AKfycbzatK87dqV6dsXDY391abD9URsRcvREAP7TdXvXUIijumsFE1bIXn8EGLP3vhx5tuaCfg/exec";

const PLAYER_API =
"https://script.google.com/macros/s/AKfycbx-pLKKyY8tBSQa9gX0Vq6S-sVtvFzUbw92xrSfG51YMZ5dmO1gTxP-oBoSgHWma-SO/exec";

const params =
new URLSearchParams(
window.location.search
);

const id =
params.get("id");

let tournamentData =
null;

let totalFee = 0;

let teamSize = 1;

loadTournament();

async function loadTournament() {

const response =
await fetch(
TOURNAMENT_API
);

const tournaments =
await response.json();

tournamentData =
tournaments.find(
item =>
String(item.id)
.toLowerCase() ===
String(id)
.toLowerCase()
);

if (!tournamentData) {

document
  .getElementById(
    "tournamentInfo"
  )
  .innerHTML =
  "Invalid Tournament";

return;

}

const entryFee =
Number(
String(
tournamentData.entryFee
).replace(/[^\d]/g, "")
);

const mode =
String(
tournamentData.mode
).toLowerCase();

if (
mode === "duo" ||
mode === "2v2"
) {

totalFee =
  entryFee * 2;

teamSize = 2;

}

else if (
mode === "squad" ||
mode === "4v4"
) {

totalFee =
  entryFee * 4;

teamSize = 4;

}

else {

totalFee =
  entryFee;

teamSize = 1;

}

document
.getElementById(
"tournamentInfo"
)
.innerHTML = `

<div class="tournament-header"><div class="mode-badge">
${tournamentData.mode}
</div><h2>
${tournamentData.title}
</h2></div><div class="tournament-stats"><div class="stat-card"><span>
Entry Fee
</span><strong>
₹${totalFee}
</strong></div><div class="stat-card"><span>
Prize Pool
</span><strong>
${tournamentData.prize}
</strong></div></div>
<div class="tournament-stats"><div class="stat-card"><span>
Map
</span><strong>
${tournamentData.map}
</strong></div><div class="stat-card"><span>
Match Time
</span><strong>
${tournamentData.date}
<br>
${tournamentData.time}
</strong></div></div>`;
}

document
.getElementById(
"registrationForm"
)
.addEventListener(
"submit",
submitForm
);

async function submitForm(
e
) {

e.preventDefault();

const submitBtn =
document.querySelector(
".submit-btn"
);

submitBtn.disabled =
true;

submitBtn.innerText =
"Processing...";

try {
if (
!tournamentData
) {

submitBtn.disabled =
false;

submitBtn.innerText =
"Submit Registration";

showPopup(
"Error",
"Tournament Data Not Loaded"
);

return;

}
const data = {

  playerKey:
    document
      .getElementById(
        "playerKey"
      )
      .value
      .trim(),

  utr:
    document
      .getElementById(
        "utr"
      )
      .value
      .trim(),

  tournamentId:
    tournamentData.id,

  tournamentTitle:
    tournamentData.title,

  category:
    tournamentData.category,

  type:
    tournamentData.type,

  mode:
    tournamentData.mode,

  amount:
    totalFee,

  teamSize:
    teamSize

};

const validationUrl =
  `${PLAYER_API}?action=validate&playerKey=${encodeURIComponent(
    data.playerKey
  )}&mode=${encodeURIComponent(
data.mode
)}
&tournamentId=${encodeURIComponent(
data.tournamentId
)}
&utr=${encodeURIComponent(
data.utr
)}`;

const validationResponse =
  await fetch(
    validationUrl
  );

const validationResult =
  await validationResponse.json();

if (
!validationResult.success
) {

submitBtn.disabled =
false;

submitBtn.innerText =
"Submit Registration";

showPopup(
"Registration Error",
validationResult.error
);

return;

}
await fetch(
  REGISTRATION_API,
  {
    method:
      "POST",

    mode:
      "no-cors",

    headers: {
      "Content-Type":
        "application/json"
    },

    body:
      JSON.stringify(
        data
      )
  }
);

submitBtn.innerText =
"Success ✓";

setTimeout(() => {

window.location.href =
"../registration-success/registration-success.html?tournament=${encodeURIComponent( tournamentData.title )}&id=${encodeURIComponent( tournamentData.id )}";

}, 500);
}

catch (
error
) {

submitBtn.disabled =
false;

submitBtn.innerText =
"Submit Registration";

console.error(
error
);

showPopup(
"Error",
"Registration Failed"
);

}
}

function showPopup(
title,
message
) {

document
.getElementById(
"popupTitle"
)
.innerText =
title;

document
.getElementById(
"popupMessage"
)
.innerText =
message;

document
.getElementById(
"popupOverlay"
)
.style.display =
"flex";

}

function closePopup() {

document
.getElementById(
"popupOverlay"
)
.style.display =
"none";

   }


function copyUpi() {

navigator.clipboard.writeText(
"arenaforge@upi"
);

showPopup(
"Success",
"UPI ID Copied"
);

}
