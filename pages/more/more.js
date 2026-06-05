// pages/public/more/more.js


// EXTERNAL LINKS

const externalButtons =
  document.querySelectorAll(
    ".external-btn"
  );

externalButtons.forEach(button => {
  
  button.addEventListener(
    "click",
    
    (e) => {
      
      e.stopPropagation();
      
      const link =
        button.dataset.link;
      
      window.open(
        link,
        "_blank"
      );
      
    }
    
  );
  
});



// RULES BUTTON

const rulesButton =
  document.querySelector(
    ".rules-btn"
  );

const rulesContainer =
  document.getElementById(
    "rules-container"
  );


rulesButton.addEventListener(
  "click",
  
  async () => {
    
    try {
      
      const response =
        await fetch(
          "pages/public/more/rules/rules.html"
        );
      
      const data =
        await response.text();
      
      rulesContainer.innerHTML =
        data;
      
      rulesContainer.scrollIntoView({
        
        behavior: "smooth"
        
      });
      
    } catch (err) {
      
      rulesContainer.innerHTML = `
      <div style="
      color:white;
      padding:20px;
      ">
      Failed to load rules.
      </div>
      `;
    }
    
  }
  
);