async function getCurrentLocations() {
    const currentURL = window.location.href;
    const urlArray = currentURL.split('/');

    // Find which team page is currently being viewed and store in an object.
    const team = urlArray[urlArray.length - 1];
    const data = {team: team};

    // Set the URL for the fetch api.
    const apiURL = urlArray.splice(0, urlArray.length - 1).join('/') + '/GetLocations';
    console.log(apiURL);    
    const response = await fetch(apiURL, {
        method: 'POST', 
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
      
      const currentLocations = await response.json();
      console.log(currentLocations);
}

window.addEventListener('DOMContentLoaded', getCurrentLocations);