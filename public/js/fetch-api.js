// Get current window URL and split protocol, domain/port and page into an array
const currentURL = window.location.href;
const urlArray = currentURL.split('/');

// Find which team page is currently being viewed and store in an object.
const team = urlArray[urlArray.length - 1];
const data = {team: team};

async function getCurrentLocations() {
    
    // Set the URL for the fetch api.
    const apiURL = urlArray.splice(0, urlArray.length - 1).join('/') + '/GetLocations';
        
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
    console.log(currentLocations);
    // Update each staff member in the table
    currentLocations.teamData.forEach((staffMember) => {
      const locationElement = document.querySelector(`#${staffMember.locationId}`);
      const commentElement = document.querySelector(`#${staffMember.commentId}`);
      locationElement.textContent = staffMember.currentLocation;
      commentElement.textContent = staffMember.comments;
    });

    // Update svg's with current data
    currentLocations.allData.forEach((staffMember) => {
      const location = staffMember.currentLocation.replace(/\s/g, '_');
      const svgElement = document.querySelector(`#${location}`);
      if (svgElement != null) {
        if (!svgElement.classList.contains('animate')) {
          svgElement.classList.add('animate');
        }
        svgElement.style.opacity = '1';
      };
    });
};

window.addEventListener('DOMContentLoaded', getCurrentLocations);

// Define the sse end point 
sseURL = urlArray.splice(0, urlArray.length - 1).join('/') + '/LatestUpdate';

// Create the sse event source object
const sseSource = new EventSource(sseURL);

// Define the callback to execute when message is received from sse
sseSource.onmessage = function (event) {
    
    // Destructure the update object into variables. 
    const { name, locationId, commentId, workshop, currentLocation, comments } = JSON.parse(event.data);
    
    // Check if the workshop of the updated entry corresponds to the current page
    if (workshop == team) {
      
      // Get the previous location and comments
      const previousLocation = document.querySelector(`#${locationId}`).textContent;
      const previousComments = document.querySelector(`#${commentId}`).textContent;

      // Check if previous and current data is the same or different
      if (previousLocation != currentLocation || previousComments != comments) {
        
        // Update location and comments if data is different   
        document.querySelector(`#${locationId}`).textContent = currentLocation;
        document.querySelector(`#${commentId}`).textContent = comments;
      }
    }

    // Determine if previous location is in unit array. Update count in local storage and set svg element opacity.
    if (unit.includes(previousLocation)) {
      const count = localStorage.getItem(previousLocation);
      const newCount = Number(count) - 1 < 0 ? 0 : Number(count) - 1;
      localStorage.setItem(previousLocation, newCount);
      if (newCount > 0) {
          document.querySelector(`#${previousLocation}`).classList.add('animate');
          document.querySelector(`#${previousLocation}`).style.opacity = '1';
      }
      else {
          document.querySelector(`#${previousLocation}`).classList.remove('animate')
          document.querySelector(`#${previousLocation}`).style.opacity = '0';
      }
    }

    // Determine if new location is in unit array. Update count in local storage and set svg element opacity.
    if (unit.includes(newLocation)) { 
        
        // Update location count in local storage
        const count = localStorage.getItem(newLocation);
        const newCount = Number(count) + 1;
        localStorage.setItem(newLocation, `${newCount}`);
        
        // Animate and make visible the svg
        document.querySelector(`#${newLocation}`).classList.add('animate');
        document.querySelector(`#${newLocation}`).style.opacity = '1';
    }
};
 
const closeStream = () => sseSource.close();

