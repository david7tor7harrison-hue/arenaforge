const API_URL =
  "https://script.google.com/macros/s/AKfycbzatK87dqV6dsXDY391abD9URsRcvREAP7TdXvXUIijumsFE1bIXn8EGLP3vhx5tuaCfg/exec";

document
  .getElementById(
    "getRoomBtn"
  )
  .addEventListener(
    "click",
    getRoomDetails
  );

async function getRoomDetails() {
  
  const button =
    document.getElementById(
      "getRoomBtn"
    );
  
  const registrationId =
    document
    .getElementById(
      "registrationId"
    )
    .value
    .trim();
  
  const gameUid =
    document
    .getElementById(
      "gameUid"
    )
    .value
    .trim();
  
  const resultBox =
    document
    .getElementById(
      "result"
    );
  
  if (!registrationId) {
    
    resultBox.innerHTML =
      `
      <div class="status-card">
        <p class="error">
          Enter Registration ID
        </p>
      </div>
      `;
    
    return;
    
  }
  
  if (!gameUid) {
    
    resultBox.innerHTML =
      `
    <div class="status-card">
      <p class="error">
        Enter Game UID
      </p>
    </div>
    `;
    
    return;
    
  }
  
  button.disabled = true;
  
  button.innerText =
    "Loading...";
  
  try {
    
    const response =
      await fetch(
        `${API_URL}?action=room&registrationId=${registrationId}&uid=${gameUid}`
      );
    
    const data =
      await response.json();
    console.log(data);
    button.disabled = false;
    
    button.innerText =
      "Get Room Details";
    
    if (
      data.status ===
      "pending"
    ) {
      
      resultBox.innerHTML =
        `
        <div class="status-card">
          <h3 class="error">
            Pending Verification
          </h3>
          <p>
            Your payment has not been approved yet.
          </p>
        </div>
        `;
      
      return;
      
    }
    
    if (
      data.status ===
      "waitlist"
    ) {
      
      resultBox.innerHTML =
        `
        <div class="status-card">
          <h3 class="error">
            Waitlist
          </h3>
          <p>
            You are currently on waitlist.
          </p>
        </div>
        `;
      
      return;
      
    }
    
    if (
      data.status ===
      "notfound"
    ) {
      
      resultBox.innerHTML =
        `
        <div class="status-card">
          <h3 class="error">
            Invalid Registration ID
          </h3>
        </div>
        `;
      
      return;
      
    }
    
    if (
      data.status ===
      "countdown"
    ) {
      
      showCountdown(
        data.roomOpenTime
      );
      
      return;
      
    }
    
    if (
      data.status ===
      "room"
    ) {
      
      resultBox.innerHTML = `

<div class="status-card success-card">

<div class="success-header">

<div class="success-icon">
<i class="fa-solid fa-gamepad"></i>
</div>

<h3>
Room Available
</h3>

<p>
${data.title || ""}
</p>

</div>

<div class="room-grid">

<div class="room-detail-card">

<span>
Room ID
</span>

<h2>
${data.roomId}
</h2>

<button
class="copy-btn"
onclick="
navigator.clipboard.writeText(
'${data.roomId}'
)
"
>

Copy Room ID

</button>

</div>

<div class="room-detail-card">

<span>
Password
</span>

<h2>
${data.roomPassword}
</h2>

<button
class="copy-btn"
onclick="
navigator.clipboard.writeText(
'${data.roomPassword}'
)
"
>

Copy Password

</button>

</div>

</div>

</div>

`;
      
    }
    
  }
  
  catch (error) {
    
    button.disabled = false;
    
    button.innerText =
      "Get Room Details";
    
    resultBox.innerHTML =
      `
      <div class="status-card">
        <p class="error">
          Failed To Load Data
        </p>
      </div>
      `;
    
  }
  
}

function showCountdown(
  roomOpenTime
) {
  
  const resultBox =
    document
    .getElementById(
      "result"
    );
  
  const timer =
    setInterval(
      () => {
        
        const now =
          new Date();
        
        const target =
          new Date(
            roomOpenTime
          );
        
        const diff =
          target - now;
        
        if (
          diff <= 0
        ) {
          
          clearInterval(
            timer
          );
          
          resultBox.innerHTML =
            `
    <div class="status-card">
      Opening Room Details...
    </div>
    `;
          
          setTimeout(
            () => {
              getRoomDetails();
            },
            1500
          );
          
          return;
          
        }
        
        const hours =
          Math.floor(
            diff /
            3600000
          );
        
        const minutes =
          Math.floor(
            (
              diff %
              3600000
            ) / 60000
          );
        
        const seconds =
          Math.floor(
            (
              diff %
              60000
            ) / 1000
          );
        
        resultBox.innerHTML =
          `
          <div class="status-card">
           <div class="locked-badge">
            🔒 Room Locked
            </div>
            <h3>
              Room Opens In
            </h3>

            <div class="premium-countdown">
              ${hours}h
              ${minutes}m
              ${seconds}s
            </div>

          </div>
          `;
        
      },
      
      1000
    );
  
}
