let data;

fetch("http://localhost:3000/api/v1/perso")
  
  .then((response) => response.json())
  .then((personnage) => {
    data = personnage
    for (perso of personnage) {
      console.log(perso);
      bsd(
        ".perso",
        perso.id,
        perso.data.nom,
        perso.data.fonction,
        perso.data.image
      );
    }
  });
 
function bsd(selector, id, nom, fonction, image) {
  document.querySelector(selector).innerHTML += `<li id="${id}" class="${fonction}">
<div class="haut">
    <h3>${nom}</h3>
    <img  ${loadFav(id)} alt="coeur" >                
</div>
<div>

</div>
<div class="bas">
    <div class="dif">
    ${displayDif()}
    </div>
</div>
</li>`;

  function displayDif() {
    if (fonction == "pirate") {
      // document.querySelector(".bas").innerHTML +=
      return `<div class="pirate circle"></div>`;
    } else if (fonction == "marine") {
      // document.querySelector(".bas").innerHTML +=
      return `<div class="marine circle"></div>`;
    }
  }

  function loadFav (id){
      if(localStorage.getItem("fav")){
        
        const favoris = JSON.parse(localStorage.getItem("fav"));
        if(favoris.hasOwnProperty(id)){
        
        return `class="addFav love" src="./images/coeur_fav.png"`
        }else{ return `class="addFav" src="./images/coeur.png"`}
      }else {return `class="addFav" src="./images/coeur.png"`}
  }

}

document.querySelector("body").addEventListener("click", (e) => {
  if (e.target.textContent == "Pirates") {
  
    document.querySelectorAll(".pirate").forEach((Element) => {
      if (Element.closest("li")) {
        Element.closest("li").style.display = "flex";
      }
    });

    document.querySelectorAll(".marine").forEach((Element) => {
      if (Element.closest("li")) {
        Element.closest("li").style.display = "none";
      }
    });

  } else if (e.target.textContent == "Marines") {
    document.querySelectorAll(".marine").forEach((Element) => {
      if (Element.closest("li")) {
        Element.closest("li").style.display = "flex";
      }
    });

    document.querySelectorAll(".pirate").forEach((Element) => {
      if (Element.closest("li")) {
        Element.closest("li").style.display = "none";
      }
    });
  } else if (e.target.textContent == "Mes favoris") {
    
    document.querySelectorAll(".marine").forEach((Element) => {
      if (Element.closest("li")) {
        Element.closest("li").style.display = "none";
      }
    });

    document.querySelectorAll(".pirate").forEach((Element) => {
      if (Element.closest("li")) {
        Element.closest("li").style.display = "none";
      }
    });

    document.querySelectorAll(".love").forEach((Element) => {
      if (Element.closest("li")) {
        Element.closest("li").style.display = "flex";
      }
    });
  }
});

document.querySelector("#searchBar").addEventListener("input", (e) => {
  console.log(data,"?");
  const element = e.target.value.toLowerCase();
  const filtreTuto = data.filter(
    (perso) =>{
    console.log(perso.data.nom)
      return perso.data.nom.toLowerCase().includes(element)}
  );
console.log("filtreTuto: " + filtreTuto);
  document.querySelector(".perso").innerHTML = "";
  for (perso of filtreTuto) {
    bsd(
      ".perso",
      perso.id,
      perso.data.nom,
      perso.data.fonction,
      perso.data.image
    );
  }
});

const coeur = document.querySelector(".addFav");
let favoris = {};
document.querySelector("body").addEventListener("click", function (e) {
  console.log(e.target.classList);
  if (e.target.classList.contains("addFav")) {
    
    if (e.target.src.includes("coeur.png")) {

      e.target.src = `./images/coeur_fav.png`
      e.target.classList.add("love");
      favoris[e.target.closest("li").id] = true;
      localStorage.setItem("fav", JSON.stringify(favoris));
    } else {

      e.target.src = `./images/coeur.png`;
      e.target.classList.remove("love");
      delete favoris[e.target.closest("li").id];
      localStorage.setItem("fav", JSON.stringify(favoris));
    }}})
