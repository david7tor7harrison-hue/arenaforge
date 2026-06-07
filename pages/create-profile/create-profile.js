const PLAYER_API =
"https://script.google.com/macros/s/AKfycbx-pLKKyY8tBSQa9gX0Vq6S-sVtvFzUbw92xrSfG51YMZ5dmO1gTxP-oBoSgHWma-SO/exec";

document
.getElementById(
"profileForm"
)
.addEventListener(
"submit",
createProfile
);

async function createProfile(
e
) {

e.preventDefault();

const password =
document
.getElementById(
"password"
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
password !==
confirmPassword
) {

alert(
  "Passwords do not match"
);

return;

}

const submitBtn =
document
.getElementById(
"submitBtn"
);

submitBtn.disabled =
true;

submitBtn.innerText =
"Creating Profile...";

const payload = {

email:
  document
    .getElementById(
      "email"
    )
    .value
    .trim(),

upi:
  document
    .getElementById(
      "upi"
    )
    .value
    .trim(),

password:
  password,

soloUid:
  document
    .getElementById(
      "soloUid"
    )
    .value
    .trim(),

duoP1Uid:
  document
    .getElementById(
      "duoP1Uid"
    )
    .value
    .trim(),

duoP2Uid:
  document
    .getElementById(
      "duoP2Uid"
    )
    .value
    .trim(),

squadP1Uid:
  document
    .getElementById(
      "squadP1Uid"
    )
    .value
    .trim(),

squadP2Uid:
  document
    .getElementById(
      "squadP2Uid"
    )
    .value
    .trim(),

squadP3Uid:
  document
    .getElementById(
      "squadP3Uid"
    )
    .value
    .trim(),

squadP4Uid:
  document
    .getElementById(
      "squadP4Uid"
    )
    .value
    .trim()

};

try {

await fetch(
  PLAYER_API,
  {
    method: "POST",

    mode: "no-cors",

    body:
      JSON.stringify(
        payload
      )
  }
);

document
  .getElementById(
    "profileForm"
  )
  .style.display =
  "none";

document
  .getElementById(
    "successBox"
  )
  .style.display =
  "block";

document
  .getElementById(
    "playerKeyText"
  )
  .innerText =
  "Check Email";

}

catch(error){

console.error(
  error
);

alert(
  "Connection Error"
);

submitBtn.disabled =
  false;

submitBtn.innerText =
  "Create Profile";

}

}
