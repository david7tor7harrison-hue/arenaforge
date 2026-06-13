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
  
  const loginBtn =
    document.getElementById(
      "loginBtn"
    );
  
  
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
    
    
    if (!playerKey) {
      
      document
        .getElementById(
          "playerKey"
        )
        .focus();
      
      showPopup(
        "Error",
        "Enter Player Key"
      );
      
      return;
      
    }
    
    if (!password) {
      
      document
        .getElementById(
          "password"
        )
        .focus();
      
      showPopup(
        "Error",
        "Enter Password"
      );
      
      return;
      
    }
    
    loginBtn.disabled = true;
    
    loginBtn.innerText =
      "Logging In...";
    
    
    
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
      
      showPopup(
        "Error",
        result.error
      );
      
      return;
      
    }
    
    loginBtn.disabled = false;
    
    loginBtn.innerText =
      "Login";
    
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
        "createdAt"
      )
      .value =
      new Date(
        result.createdAt
      )
      .toLocaleString(
        "en-IN"
      );
    
    document
      .getElementById(
        "lastUpdated"
      )
      .value =
      new Date(
        result.lastUpdated
      )
      .toLocaleString(
        "en-IN"
      );
    
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
  catch (error) {
    
    loginBtn.disabled = false;
    
    loginBtn.innerText =
      "Login";
    
    console.error(
      error
    );
    
    showPopup(
      "Connection Error",
      "Unable to connect with ArenaForge servers. Please try again."
    );
    
  }
  
}

async function saveProfile() {
  
  const saveBtn =
    document.getElementById(
      "saveBtn"
    );
  
  try {
    
    const playerKey =
      document
      .getElementById(
        "profilePlayerKey"
      )
      .value
      .trim();
    
    const upi =
      document
      .getElementById(
        "upi"
      )
      .value
      .trim();
    
    const duoP1Uid =
      document
      .getElementById(
        "duoP1Uid"
      )
      .value
      .trim();
    
    const duoP2Uid =
      document
      .getElementById(
        "duoP2Uid"
      )
      .value
      .trim();
    
    const squadP1Uid =
      document
      .getElementById(
        "squadP1Uid"
      )
      .value
      .trim();
    
    const squadP2Uid =
      document
      .getElementById(
        "squadP2Uid"
      )
      .value
      .trim();
    
    const squadP3Uid =
      document
      .getElementById(
        "squadP3Uid"
      )
      .value
      .trim();
    
    const squadP4Uid =
      document
      .getElementById(
        "squadP4Uid"
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
    
    /* Duo Validation */
    
    if (
      
      (duoP1Uid && !duoP2Uid) ||
      
      (!duoP1Uid && duoP2Uid)
      
    ) {
      
      showPopup(
        "Validation Error",
        "Complete Duo Team Or Leave It Empty"
      );
      
      return;
      
    }
    
    /* Squad Validation */
    
    const squadFilled =
      
      [
        squadP1Uid,
        squadP2Uid,
        squadP3Uid,
        squadP4Uid
      ]
      
      .filter(
        x => x
      )
      
      .length;
    
    if (
      
      squadFilled > 0 &&
      
      squadFilled < 4
      
    ) {
      
      showPopup(
        "Validation Error",
        "Complete Squad Team Or Leave It Empty"
      );
      
      return;
      
    }
    
    /* Password Validation */
    
    const hasPasswordData =
      
      currentPassword ||
      
      newPassword ||
      
      confirmPassword;
    
    if (
      
      hasPasswordData &&
      
      (
        
        !currentPassword ||
        
        !newPassword ||
        
        !confirmPassword
        
      )
      
    ) {
      
      showPopup(
        "Validation Error",
        "Fill All Password Fields"
      );
      
      return;
      
    }
    
    if (
      
      newPassword &&
      
      newPassword !== confirmPassword
      
    ) {
      
      showPopup(
        "Validation Error",
        "Passwords Do Not Match"
      );
      
      return;
      
    }
    
    saveBtn.disabled = true;
    
    saveBtn.innerText =
      "Saving...";
    
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
        upi
      ) +
      
      "&duoP1Uid=" +
      
      encodeURIComponent(
        duoP1Uid
      ) +
      
      "&duoP2Uid=" +
      
      encodeURIComponent(
        duoP2Uid
      ) +
      
      "&squadP1Uid=" +
      
      encodeURIComponent(
        squadP1Uid
      ) +
      
      "&squadP2Uid=" +
      
      encodeURIComponent(
        squadP2Uid
      ) +
      
      "&squadP3Uid=" +
      
      encodeURIComponent(
        squadP3Uid
      ) +
      
      "&squadP4Uid=" +
      
      encodeURIComponent(
        squadP4Uid
      );
    
    console.log(
      saveUrl
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
      
      saveBtn.disabled = false;
      
      saveBtn.innerText =
        "Save Changes";
      
      showPopup(
        "Update Failed",
        result.error
      );
      
      return;
      
    }
    
    showPopup(
      "Profile Updated",
      "Your ArenaForge profile has been updated successfully."
    );
    
    saveBtn.disabled = false;
    
    saveBtn.innerText =
      "Save Changes";
    
    document
      .getElementById(
        "lastUpdated"
      )
      .value =
      new Date()
      .toLocaleString(
        "en-IN"
      );
    
    document
      .getElementById(
        "currentPassword"
      )
      .value = "";
    
    document
      .getElementById(
        "newPassword"
      )
      .value = "";
    
    document
      .getElementById(
        "confirmPassword"
      )
      .value = "";
    
  }
  
  catch (error) {
    
    saveBtn.disabled = false;
    
    saveBtn.innerText =
      "Save Changes";
    
    console.error(
      error
    );
    
    showPopup(
      "Update Failed",
      "Your profile could not be updated right now. Please try again."
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
