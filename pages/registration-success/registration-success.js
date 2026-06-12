const params =
  new URLSearchParams(
    window.location.search
  );

const tournament =
  params.get(
    "tournament"
  );

const id =
  params.get(
    "id"
  );

document
  .getElementById(
    "tournamentName"
  )
  .textContent =
  tournament || "-";

document
  .getElementById(
    "matchId"
  )
  .textContent =
  id || "-";
