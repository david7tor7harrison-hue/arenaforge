const RESULTS_API =
  "https://script.google.com/macros/s/AKfycby8ovlH4QFpLP0zP7OTXXC2pptt0DNC7kDj6Xq7KgYZ9uGANYN2fcE4iy-Heo3FymQt/exec";

const TOURNAMENT_API =
  "https://script.google.com/macros/s/AKfycbzpHgmuGwRnr6ewMtHtyVY6Hq0dYMzRLF6ei_ACZ6MIiWcxxzYio15Ru7rzSYKHe5vSng/exec";

const container =
  document.getElementById(
    "resultsContainer"
  );

let currentCategory =
  "all";

let results = [];

let tournaments = [];

loadData();

async function loadData() {
  
  try {
    
    container.innerHTML = `
<div class="skeleton-card">

<div class="skeleton-image"></div>

<div class="skeleton-content">

<div class="skeleton-line long"></div>

<div class="skeleton-line"></div>

<div class="skeleton-line short"></div>

</div>

</div>

<div class="skeleton-card">

<div class="skeleton-image"></div>

<div class="skeleton-content">

<div class="skeleton-line long"></div>

<div class="skeleton-line"></div>

<div class="skeleton-line short"></div>

</div>

</div>

<div class="skeleton-card">

<div class="skeleton-image"></div>

<div class="skeleton-content">

<div class="skeleton-line long"></div>

<div class="skeleton-line"></div>

<div class="skeleton-line short"></div>

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
    
    results =
      await resultsResponse.json();
    
    tournaments =
      await tournamentsResponse.json();
    
    renderResults();
    
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
Unable to load results.
Check your internet connection.
</p>

<button
class="view-btn"
onclick="loadData()"
>
Retry
</button>

</div>

`;
    
  }
  
}


document
  .querySelectorAll(".mode-btn")
  .forEach(btn => {
    
    btn.addEventListener(
      "click",
      () => {
        
        document
          .querySelectorAll(".mode-btn")
          .forEach(b =>
            b.classList.remove(
              "active"
            )
          );
        
        btn.classList.add(
          "active"
        );
        
        currentCategory =
          btn.dataset.category;
        
        renderResults();
        
      }
    );
    
  });

function renderResults() {
  
  container.innerHTML = "";
  
  let declaredResults =
    results.filter(result => {
      
      const tournament =
        tournaments.find(
          t =>
          String(t.id) ===
          String(result.matchId)
        );
      
      if (!tournament)
        return false;
      
      if (
        currentCategory ===
        "all"
      ) {
        return true;
      }
      
      return (
        tournament.category ===
        currentCategory
      );
      
    });
  
  declaredResults.sort(
    (a, b) => {
      
      const tournamentA =
        tournaments.find(
          t => String(t.id) === String(a.matchId)
        );
      
      const tournamentB =
        tournaments.find(
          t => String(t.id) === String(b.matchId)
        );
      
      return (
        new Date(tournamentB.date) -
        new Date(tournamentA.date)
      );
      
    }
  );
  
  if (
    declaredResults.length === 0
  ) {
    
    container.innerHTML = `

<div class="empty-state">

<i class="fa-solid fa-trophy"></i>

<h2>
No Results Found
</h2>

<p>
No tournament results are available
for this category right now.
</p>

</div>

`;
    
    return;
    
  }
  
  declaredResults.forEach(
    result => {
      
      const tournament =
        tournaments.find(
          t =>
          String(t.id) ===
          String(result.matchId)
        );
      
      container.innerHTML += `

<div class="result-card">

<div class="result-banner">

<img
src="${tournament.modeImage}"
class="result-image"
onerror="
this.src='../../assets/logo.png'
"
>

<span class="result-ribbon">
RESULT DECLARED
</span>

</div>

<div class="result-content">

<h2 class="result-title">
${result.tournamentTitle}
</h2>

<div class="winner-row">

<span>
🏆 Winner
</span>

<strong>
${result.rank1Name}
</strong>

</div>

<div class="info-row">

<div class="info-box">

<span>
Date
</span>

<strong>
${new Date(
tournament.date
).toLocaleDateString(
"en-IN",
{
day:"2-digit",
month:"short",
year:"numeric"
}
)}
</strong>

</div>

<div class="info-box">

<span>
Match ID
</span>

<strong>
${result.matchId}
</strong>

</div>

</div>

<button
class="view-btn"
onclick="
window.location.href=
'result-details.html?id=${result.matchId}'
"
>

View Result →

</button>

</div>

</div>

`;
      
    }
  );
  
}
