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
          <div class="empty-state">

<i class="fa-solid fa-id-card"></i>

<h2>
Registration ID Required
</h2>

<p>
Please enter your Registration ID.
</p>

</div>
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
        <div class="empty-state">

<i class="fa-solid fa-id-card"></i>

<h2>
GAME UID Required
</h2>

<p>
Please enter your Game UID.
</p>

</div>
      </p>
    </div>
    `;
    
    return;
    
  }
  
  button.disabled = true;
  
  button.innerText =
    "Loading...";
  
  try {
    
    resultBox.innerHTML = `

<div class="status-card loading-card">

<div class="loader"></div>

<h3>
Fetching Room Details...
</h3>

<p>
Please wait a moment.
</p>

</div>

`;
    
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
      <div class="empty-state">

<i class="fa-solid fa-clock"></i>

<h2>
Verification Pending
</h2>

<p>
Your payment is under review.
Room details will unlock after approval.
</p>

</div>  `;
      
      return;
      
    }
    
    if (
      data.status ===
      "waitlist"
    ) {
      
      resultBox.innerHTML =
        `
        <div class="empty-state">

<i class="fa-solid fa-hourglass-half"></i>

<h2>
Waitlist
</h2>

<p>
You are currently in the waitlist queue.
A slot may become available soon.
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
        <div class="empty-state">

<i class="fa-solid fa-circle-xmark"></i>

<h2>
Invalid Registration ID
</h2>

<p>
Please check your Registration ID and try again.
</p>

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
    else {
      
      resultBox.innerHTML = `

<div class="error-state">

<i class="fa-solid fa-triangle-exclamation"></i>

<h2>
Unexpected Response
</h2>

<p>
Something went wrong.
Please try again later.
</p>

</div>

`;
      
    }
    
  }
  
  catch (error) {
    
    button.disabled = false;
    
    button.innerText =
      "Get Room Details";
    
    resultBox.innerHTML = `

<div class="error-state">

<i class="fa-solid fa-wifi"></i>

<h2>
Connection Error
</h2>

<p>
Unable to fetch room details.
Please check your internet connection.
</p>

<button
class="retry-btn"
onclick="getRoomDetails()"
>
Try Again
</button>

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
