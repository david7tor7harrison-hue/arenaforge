const PLAYER_API =
"https://script.google.com/macros/s/AKfycbx-pLKKyY8tBSQa9gX0Vq6S-sVtvFzUbw92xrSfG51YMZ5dmO1gTxP-oBoSgHWma-SO/exec";

document
.getElementById(
"loginBtn"
)
.addEventListener(
"click",
loginPlayer
);

document
.getElementById(
"saveBtn"
)
.addEventListener(
"click",
saveProfile
);

async function loginPlayer() {

try {

const playerKey =
document
.getElementById(
"playerKey"
)
.value
.trim();

const password =
document
.getElementById(
"password"
)
.value
.trim();

if (
!playerKey ||
!password
) {

alert(
"Enter Player Key and Password"
);

return;

}



  
const loginUrl =
PLAYER_API +
"?action=login&playerKey=" +
encodeURIComponent(
  playerKey
) +
"&password=" +
encodeURIComponent(
  password
);

console.log(
  loginUrl
);

const response =
await fetch(
  loginUrl
);

  

const result =
await response.json();

if (
!result.success
) {

alert(
result.error
);

return;

}

document
.getElementById(
"loginBox"
)
.style.display =
"none";

document
.getElementById(
"profileBox"
)
.style.display =
"block";

document
.getElementById(
"profilePlayerKey"
)
.value =
result.playerKey;

document
.getElementById(
"profileEmail"
)
.value =
result.email;

document
.getElementById(
"soloUid"
)
.value =
result.soloUid;

document
.getElementById(
"profileStatus"
)
.value =
result.status;

document
.getElementById(
"upi"
)
.value =
result.upi;

document
.getElementById(
"duoP1Uid"
)
.value =
result.duoP1Uid;

document
.getElementById(
"duoP2Uid"
)
.value =
result.duoP2Uid;

document
.getElementById(
"squadP1Uid"
)
.value =
result.squadP1Uid;

document
.getElementById(
"squadP2Uid"
)
.value =
result.squadP2Uid;

document
.getElementById(
"squadP3Uid"
)
.value =
result.squadP3Uid;

document
.getElementById(
"squadP4Uid"
)
.value =
result.squadP4Uid;

}
catch(error){

console.error(
error
);

alert(
"Login Failed"
);

}

}



async function saveProfile() {

try {

const playerKey =
document
.getElementById(
"profilePlayerKey"
)
.value
.trim();

const currentPassword =
document
.getElementById(
"currentPassword"
)
.value
.trim();

const newPassword =
document
.getElementById(
"newPassword"
)
.value
.trim();

const confirmPassword =
document
.getElementById(
"confirmPassword"
)
.value
.trim();

if (
newPassword ||
confirmPassword
) {

if (
newPassword !==
confirmPassword
) {

alert(
"Passwords Do Not Match"
);

return;

}

}

const saveUrl =
PLAYER_API +

"?action=saveprofile" +

"&playerKey=" +
encodeURIComponent(
playerKey
) +

"&currentPassword=" +
encodeURIComponent(
currentPassword
) +

"&newPassword=" +
encodeURIComponent(
newPassword
) +

"&upi=" +
encodeURIComponent(
document
.getElementById(
"upi"
)
.value
.trim()
) +

"&duoP1Uid=" +
encodeURIComponent(
document
.getElementById(
"duoP1Uid"
)
.value
.trim()
) +

"&duoP2Uid=" +
encodeURIComponent(
document
.getElementById(
"duoP2Uid"
)
.value
.trim()
) +

"&squadP1Uid=" +
encodeURIComponent(
document
.getElementById(
"squadP1Uid"
)
.value
.trim()
) +

"&squadP2Uid=" +
encodeURIComponent(
document
.getElementById(
"squadP2Uid"
)
.value
.trim()
) +

"&squadP3Uid=" +
encodeURIComponent(
document
.getElementById(
"squadP3Uid"
)
.value
.trim()
) +

"&squadP4Uid=" +
encodeURIComponent(
document
.getElementById(
"squadP4Uid"
)
.value
.trim()
);

const response =
await fetch(
saveUrl
);

const result =
await response.json();

if (
!result.success
) {

alert(
result.error
);

return;

}

alert(
"Profile Updated Successfully"
);

document
.getElementById(
"currentPassword"
)
.value =
"";

document
.getElementById(
"newPassword"
)
.value =
"";

document
.getElementById(
"confirmPassword"
)
.value =
"";

}
catch(error){

console.error(
error
);

alert(
"Profile Update Failed"
);

}

}
  
