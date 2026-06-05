console.log("ArenaForge Support Loaded");


/* LIVE CHAT BUTTON */

const openChatBtn =
document.getElementById(
  "openChatBtn"
);

openChatBtn.addEventListener(
  "click",
  () => {

    if(window.$chatwoot){

      window.$chatwoot.toggle();

    }

  }
);


/* CHATWOOT */

(function(d,t){

  var BASE_URL =
  "https://app.chatwoot.com";

  var g =
  d.createElement(t),

  s =
  d.getElementsByTagName(t)[0];

  g.src =
  BASE_URL + "/packs/js/sdk.js";

  g.defer = true;
  g.async = true;

  s.parentNode.insertBefore(g,s);

  g.onload = function(){

    window.chatwootSDK.run({

      websiteToken:
      "YOUR_WEBSITE_TOKEN",

      baseUrl: BASE_URL

    });

  };

})(document,"script");