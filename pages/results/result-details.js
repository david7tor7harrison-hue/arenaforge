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
    container.innerHTML = `

<div class="details-skeleton">

<div class="skeleton-banner"></div>

<div class="skeleton-champion"></div>

<div class="skeleton-podium"></div>

<div class="skeleton-podium"></div>

<div class="skeleton-grid">

<div class="skeleton-info"></div>

<div class="skeleton-info"></div>

<div class="skeleton-info"></div>

<div class="skeleton-info"></div>

</div>

</div>

`;
    
    
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

<div class="empty-state">

<i class="fa-solid fa-trophy"></i>

<h2>
Result Not Found
</h2>

<p>
This tournament result is not available
or may have been removed.
</p>

<a
href="results.html"
class="back-btn"
>
Back To Results
</a>

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

<div class="error-state">

<i class="fa-solid fa-wifi"></i>

<h2>
Connection Error
</h2>

<p>
Unable to load tournament result.
Please check your internet connection.
</p>

<button
class="retry-btn"
onclick="loadResult()"
>
Try Again
</button>

</div>

`;
    
  }
  
}

function renderResult(
  result,
  tournament
) {
  const formattedDate =
    tournament.date ?
    new Date(
      tournament.date
    ).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric"
      }
    ) :
    "TBA";
  
  const runnerUp =
    result.rank2Name ||
    "Not Available";
  
  const thirdPlace =
    result.rank3Name ||
    "Not Available";
  
  const runnerKills =
    result.rank2Kills ||
    "-";
  
  const thirdKills =
    result.rank3Kills ||
    "-";
  
  const runnerPrize =
    result.rank2Prize ||
    "-";
  
  const thirdPrize =
    result.rank3Prize ||
    "-";
  
  container.innerHTML = `

<div class="hero">

<img
src="${tournament.modeImage}"
onerror="
this.src='../../assets/logo.png'
"
>

<div class="overlay"></div>

<div class="hero-content">

<span class="result-tag">

RESULT DECLARED

</span>

<h1>
${result.tournamentTitle}
</h1>

<div class="hero-info">

<span>
🎮 ${result.matchId}
</span>

<span>
📅 ${formattedDate}
</span>

<span>
⚔️ ${tournament.mode}
</span>

</div>

</div>

</div>

<div class="details-wrapper">

<div class="champion-card">

<div class="champion-badge">
👑 CHAMPION
</div>

<h2>
${result.rank1Name}
</h2>

<p>
${result.rank1Kills} Kills
</p>

<div class="champion-prize">
${result.rank1Prize}
</div>

</div>

<div class="podium-grid">

<div class="winner-card">

<div class="rank">
🥈 Runner Up
</div>

<div class="player">
${runnerUp}
</div>

<div class="kills">
${runnerKills} Kills
</div>

<div class="prize">
${runnerPrize}
</div>

</div>

<div class="winner-card">

<div class="rank">
🥉 Third Place
</div>

<div class="player">
${thirdPlace}
</div>

<div class="kills">
${thirdKills} Kills
</div>

<div class="prize">
${thirdPrize}
</div>

</div>

</div>

<div class="match-info">

<div class="info-card">

<span>
Prize Pool
</span>

<strong>
${tournament.prize}
</strong>

</div>

<div class="info-card">

<span>
Match ID
</span>

<strong>
${result.matchId}
</strong>

</div>

<div class="info-card">

<span>
Mode
</span>

<strong>
${tournament.mode}
</strong>

</div>

<div class="info-card">

<span>
Date
</span>

<strong>
${formattedDate}
</strong>

</div>

</div>

</div>

`;
  
}
