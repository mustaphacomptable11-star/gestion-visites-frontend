// Remplace cette URL par celle de ton Apps Script déployé
const BASE_URL = "https://script.google.com/macros/s/https://script.google.com/macros/s/AKfycbyk9IHpY_dY3HNoSvIw8ZQAdLGCMmGHskhTo9zTtIA1hAMFS8H4b3aGC14j2UB9dBef/exec/exec";

// --- VISITES

function loadVisites() {
  fetch(BASE_URL + "?action=getVisites")
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector("#visitesTable tbody");
      tbody.innerHTML = "";
      data.forEach(v => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${v.id}</td>
          <td>${v.nomClient}</td>
          <td>${v.date}</td>
          <td>${v.heure}</td>
          <td>${v.lieu}</td>
          <td>${v.statut}</td>
          <td>
            <button onclick="editVisite('${v.id}')">Modifier</button>
            <button onclick="deleteVisite('${v.id}')">Supprimer</button>
          </td>`;
        tbody.appendChild(tr);
      });
      cancelVisite();
    });
}

function editVisite(id) {
  fetch(BASE_URL + `?action=getVisiteById&id=${id}`)
    .then(res => res.json())
    .then(v => {
      document.getElementById("visiteId").value = v.id;
      document.getElementById("visiteNom").value = v.nomClient;
      document.getElementById("visiteDate").value = v.date;
      document.getElementById("visiteHeure").value = v.heure;
      document.getElementById("visiteLieu").value = v.lieu;
      document.getElementById("visiteStatut").value = v.statut;
      document.getElementById("formVisiteTitle").innerText = "Modifier visite";
    });
}

function submitVisite() {
  const id = document.getElementById("visiteId").value;
  const body = {
    nomClient: document.getElementById("visiteNom").value,
    date: document.getElementById("visiteDate").value,
    heure: document.getElementById("visiteHeure").value,
    lieu: document.getElementById("visiteLieu").value,
    statut: document.getElementById("visiteStatut").value
  };
  let action;
  if (id) {
    body.id = id;
    action = "updateVisite";
  } else {
    action = "createVisite";
  }
  fetch(BASE_URL + `?action=${action}`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(body)
  })
  .then(res => res.json())
  .then(resp => {
    if (resp.success) {
      loadVisites();
    } else {
      alert("Erreur : " + (resp.error || "inconnue"));
    }
  });
}

function deleteVisite(id) {
  if (!confirm("Supprimer cette visite ?")) return;
  fetch(BASE_URL + "?action=deleteVisite", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({id: id})
  })
  .then(res => res.json())
  .then(resp => {
    if (resp.success) {
      loadVisites();
    } else {
      alert("Erreur suppression : " + (resp.error || "inconnue"));
    }
  });
}

function cancelVisite() {
  document.getElementById("visiteId").value = "";
  document.getElementById("formVisiteTitle").innerText = "Nouvelle visite";
  document.getElementById("visiteNom").value = "";
  document.getElementById("visiteDate").value = "";
  document.getElementById("visiteHeure").value = "";
  document.getElementById("visiteLieu").value = "";
  document.getElementById("visiteStatut").value = "Planifiée";
}

// --- RENDEZ‑VOUS

function loadRendezVous() {
  fetch(BASE_URL + "?action=getRendezVous")
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector("#rvTable tbody");
      tbody.innerHTML = "";
      data.forEach(v => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${v.id}</td>
          <td>${v.client}</td>
          <td>${v.date}</td>
          <td>${v.heure}</td>
          <td>${v.objet}</td>
          <td>${v.confirme}</td>
          <td>
            <button onclick="editRV('${v.id}')">Modifier</button>
            <button onclick="deleteRV('${v.id}')">Supprimer</button>
          </td>`;
        tbody.appendChild(tr);
      });
      cancelRV();
    });
}

function editRV(id) {
  fetch(BASE_URL + `?action=getRVById&id=${id}`)
    .then(res => res.json())
    .then(v => {
      document.getElementById("rvId").value = v.id;
      document.getElementById("rvClient").value = v.client;
      document.getElementById("rvDate").value = v.date;
      document.getElementById("rvHeure").value = v.heure;
      document.getElementById("rvObjet").value = v.objet;
      document.getElementById("rvConfirme").value = v.confirme;
      document.getElementById("formRVTitle").innerText = "Modifier rendez-vous";
    });
}

function submitRV() {
  const id = document.getElementById("rvId").value;
  const body = {
    client: document.getElementById("rvClient").value,
    date: document.getElementById("rvDate").value,
    heure: document.getElementById("rvHeure").value,
    objet: document.getElementById("rvObjet").value,
    confirme: document.getElementById("rvConfirme").value
  };
  let action;
  if (id) {
    body.id = id;
    action = "updateRV";
  } else {
    action = "createRV";
  }
  fetch(BASE_URL + `?action=${action}`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(body)
  })
  .then(res => res.json())
  .then(resp => {
    if (resp.success) {
      loadRendezVous();
    } else {
      alert("Erreur : " + (resp.error || "inconnue"));
    }
  });
}

function deleteRV(id) {
  if (!confirm("Supprimer ce rendez-vous ?")) return;
  fetch(BASE_URL + "?action=deleteRV", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({id: id})
  })
  .then(res => res.json())
  .then(resp => {
    if (resp.success) {
      loadRendezVous();
    } else {
      alert("Erreur suppression : " + (resp.error || "inconnue"));
    }
  });
}

function cancelRV() {
  document.getElementById("rvId").value = "";
  document.getElementById("formRVTitle").innerText = "Nouveau rendez-vous";
  document.getElementById("rvClient").value = "";
  document.getElementById("rvDate").value = "";
  document.getElementById("rvHeure").value = "";
  document.getElementById("rvObjet").value = "";
  document.getElementById("rvConfirme").value = "Non";
}
