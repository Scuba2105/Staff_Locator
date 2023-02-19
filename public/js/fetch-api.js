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
      
    // Get the array containing the staff members for current page and current locations. 
    const currentLocations = await response.json();
    
    // Update each staff member in the table
    currentLocations.forEach((staffMember) => {
        const locationElement = document.querySelector(`#${staffMember.locationId}`);
        const commentElement = document.querySelector(`#${staffMember.commentId}`);
        locationElement.textContent = staffMember.currentLocation;
        commentElement.textContent = staffMember.comments;
    })
}

window.addEventListener('DOMContentLoaded', getCurrentLocations);