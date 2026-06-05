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
<h2>
Failed To Load Results
</h2>
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
  
  if (
    declaredResults.length === 0
  ) {
    
    container.innerHTML = `

<div class="empty">

<i class="fa-solid fa-trophy"></i>

<h2>
No Results Available
</h2>

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

<img
src="${tournament.modeImage}"
class="result-image"
>

<div class="result-content">

<span class="declared">
RESULT DECLARED
</span>

<h2>
${result.tournamentTitle}
</h2>

<p>
🎮 Match ID:
${result.matchId}
</p>

<p>
🥇 Winner:
${result.rank1Name}
</p>

<button
class="view-btn"
onclick="
window.location.href=
'result-details.html?id=${result.matchId}'
"
>

View Result

</button>

</div>

</div>

`;
      
    }
  );
  
}