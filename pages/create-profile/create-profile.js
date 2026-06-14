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


async function createProfile(e) {
  
  e.preventDefault();
  
  const email =
    document
    .getElementById("email")
    .value
    .trim();
  
  const upi =
    document
    .getElementById("upi")
    .value
    .trim();
  
  const password =
    document
    .getElementById("password")
    .value
    .trim();
  
  const confirmPassword =
    document
    .getElementById("confirmPassword")
    .value
    .trim();
  
  const soloUid =
    document
    .getElementById("soloUid")
    .value
    .trim();
  
  const duoP1Uid =
    document
    .getElementById("duoP1Uid")
    .value
    .trim();
  
  const duoP2Uid =
    document
    .getElementById("duoP2Uid")
    .value
    .trim();
  
  const squadP1Uid =
    document
    .getElementById("squadP1Uid")
    .value
    .trim();
  
  const squadP2Uid =
    document
    .getElementById("squadP2Uid")
    .value
    .trim();
  
  const squadP3Uid =
    document
    .getElementById("squadP3Uid")
    .value
    .trim();
  
  const squadP4Uid =
    document
    .getElementById("squadP4Uid")
    .value
    .trim();
  
  if (!email) {
    
    showPopup(
      "Missing Email",
      "Please enter your email address."
    );
    
    return;
    
  }
  
  if (!upi) {
    
    showPopup(
      "Missing UPI",
      "Please enter your UPI ID."
    );
    
    return;
    
  }
  
  if (!soloUid) {
    
    showPopup(
      "Missing UID",
      "Please enter your Solo UID."
    );
    
    return;
    
  }
  
  if (password.length < 6) {
    
    showPopup(
      "Weak Password",
      "Password must contain at least 6 characters."
    );
    
    return;
    
  }
  
  if (password !== confirmPassword) {
    
    showPopup(
      "Password Error",
      "Passwords do not match."
    );
    
    return;
    
  }
  
  if (
    (duoP1Uid && !duoP2Uid) ||
    (!duoP1Uid && duoP2Uid)
  ) {
    
    showPopup(
      "Duo Team Error",
      "Complete both Duo UIDs or leave both empty."
    );
    
    return;
    
  }
  
  const squadCount = [
      squadP1Uid,
      squadP2Uid,
      squadP3Uid,
      squadP4Uid
    ]
    .filter(Boolean)
    .length;
  
  if (
    squadCount > 0 &&
    squadCount < 4
  ) {
    
    showPopup(
      "Squad Team Error",
      "Complete all Squad UIDs or leave them empty."
    );
    
    return;
    
  }
  
  const submitBtn =
    document.getElementById(
      "submitBtn"
    );
  
  submitBtn.disabled = true;
  
  submitBtn.innerHTML = `
<i class="fa-solid fa-spinner fa-spin"></i>
Creating Profile...
`;
  
  const payload = {
    
    email,
    upi,
    password,
    soloUid,
    
    duoP1Uid,
    duoP2Uid,
    
    squadP1Uid,
    squadP2Uid,
    squadP3Uid,
    squadP4Uid
    
  };
  
  try {
    
    await fetch(
      PLAYER_API,
      {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(payload)
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
    
    document
      .getElementById(
        "successBox"
      )
      .scrollIntoView({
        behavior: "smooth"
      });
    
  }
  
  catch (error) {
    
    console.error(error);
    
    showPopup(
      "Connection Error",
      "Unable to connect with ArenaForge servers. Please try again."
    );
    
    submitBtn.disabled = false;
    
    submitBtn.innerHTML =
      "Create Profile";
    
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
    .innerText = title;
  
  document
    .getElementById(
      "popupMessage"
    )
    .innerText = message;
  
  document
    .getElementById(
      "popupOverlay"
    )
    .style.display = "flex";
  
}

function closePopup() {
  
  document
    .getElementById(
      "popupOverlay"
    )
    .style.display = "none";
  
}
