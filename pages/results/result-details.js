const RESULTS_API =
  "https://script.google.com/macros/s/AKfycby8ovlH4QFpLP0zP7OTXXC2pptt0DNC7kDj6Xq7KgYZ9uGANYN2fcE4iy-Heo3FymQt/exec";

const TOURNAMENT_API =
  "https://script.google.com/macros/s/AKfycbzpHgmuGwRnr6ewMtHtyVY6Hq0dYMzRLF6ei_ACZ6MIiWcxxzYio15Ru7rzSYKHe5vSng/exec";

const params =
  new URLSearchParams(
    window.location.search
  );

const id =
  params.get("id");

const container =
  document.getElementById(
    "resultsContainer"
  );

loadResult();

async function loadResult() {
  
  try {
    
    const [
      resultsResponse,
      tournamentsResponse
    ] = await Promise.all([
      fetch(RESULTS_API),
      fetch(TOURNAMENT_API)
    ]);
    
    const results =
      await resultsResponse.json();
    
    const tournaments =
      await tournamentsResponse.json();
    
    const result =
      results.find(
        item =>
        String(item.matchId) ===
        String(id)
      );
    
    const tournament =
      tournaments.find(
        item =>
        String(item.id) ===
        String(id)
      );
    
    if (
      !result ||
      !tournament
    ) {
      
      container.innerHTML = `

<div class="empty">

<h2>
Results Not Available
</h2>

</div>

`;
      
      return;
      
    }
    
    renderResult(
      result,
      tournament
    );
    
  }
  catch (error) {
    
    console.error(error);
    
    container.innerHTML = `

<div class="empty">

<h2>
Failed To Load Result
</h2>

</div>

`;
    
  }
  
}

function renderResult(
  result,
  tournament
) {
  
  container.innerHTML = `

<div class="hero">

<img
src="${tournament.modeImage}"
>

<div class="overlay"></div>

<div class="hero-content">

<span class="result-tag">

RESULT DECLARED

</span>

<h1>

${result.tournamentTitle}

</h1>

<p>

🎮 Match ID :
${result.matchId}

</p>

<p>

🎯 Mode :
${result.mode}

</p>

<p>

🏆 Prize Pool :
${result.prizePool}

</p>

</div>

</div>

<div class="winner-section">

<h2>

🏆 Winners

</h2>

<div class="winner-card">

<div class="rank">
🥇 #1
</div>

<div class="player">
${result.rank1Name}
</div>

<div class="kills">
${result.rank1Kills} Kills
</div>

<div class="prize">
${result.rank1Prize}
</div>

</div>

<div class="winner-card">

<div class="rank">
🥈 #2
</div>

<div class="player">
${result.rank2Name}
</div>

<div class="kills">
${result.rank2Kills} Kills
</div>

<div class="prize">
${result.rank2Prize}
</div>

</div>

<div class="winner-card">

<div class="rank">
🥉 #3
</div>

<div class="player">
${result.rank3Name}
</div>

<div class="kills">
${result.rank3Kills} Kills
</div>

<div class="prize">
${result.rank3Prize}
</div>

</div>

</div>

`;
  
}