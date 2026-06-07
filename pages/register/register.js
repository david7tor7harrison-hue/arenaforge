const TOURNAMENT_API =
  "https://script.google.com/macros/s/AKfycbzpHgmuGwRnr6ewMtHtyVY6Hq0dYMzRLF6ei_ACZ6MIiWcxxzYio15Ru7rzSYKHe5vSng/exec";

const REGISTRATION_API =
  "https://script.google.com/macros/s/AKfycbzatK87dqV6dsXDY391abD9URsRcvREAP7TdXvXUIijumsFE1bIXn8EGLP3vhx5tuaCfg/exec";

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

<h2>
${tournamentData.title}
</h2>

<p>
Mode:
${tournamentData.mode}
</p>

<p>
Entry Fee:
₹${totalFee}
</p>

<p>
Prize:
${tournamentData.prize}
</p>

<p>
Map:
${tournamentData.map}
</p>

`;
  
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
  
  try {
    
    if (
      !tournamentData
    ) {
      
      alert(
        "Tournament Data Not Loaded"
      );
      
      return;
      
    }
    
    const data = {
      
      playerKey: document
        .getElementById(
          "playerKey"
        )
        .value
        .trim(),
      
      utr: document
        .getElementById(
          "utr"
        )
        .value
        .trim(),
      
      tournamentId: tournamentData.id,
      
      tournamentTitle: tournamentData.title,
      
      category: tournamentData.category,
      
      type: tournamentData.type,
      
      mode: tournamentData.mode,
      
      amount: totalFee,
      
      teamSize: teamSize
      
    };
    
    const response =
      await fetch(
  REGISTRATION_API,
  {
    method:"POST",
    mode:"no-cors",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  }
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
    
    window.location.href =
      `../registration-success/registration-success.html?tournament=${encodeURIComponent(
    tournamentData.title
  )}&id=${encodeURIComponent(
    tournamentData.id
  )}`;
    
  }
  
  catch (
    error
  ) {
    
    console.error(
      error
    );
    
    alert(
      "Registration Failed"
    );
    
  }
  
}
