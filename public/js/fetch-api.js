// Create serverroute object for the get locations route
const getLocationsRoute = new ServerRoute('GetLocations');

// Get team identifier from url
const teamName = getLocationsRoute.getPageIdentifier();

async function getCurrentLocations() {
    
    // Send request to server and resolve response data
    const responseData = await getLocationsRoute.sendRequest(teamName);
    
    // Get the json data from the response object
    const currentLocations = await responseData.json();
    
    // Update each staff member in the table
    currentLocations.teamData.forEach((staffMember) => {
      const locationElement = document.querySelector(`#${staffMember.locationId}`);
      const commentElement = document.querySelector(`#${staffMember.commentId}`);
      locationElement.textContent = staffMember.currentLocation;
      commentElement.textContent = staffMember.comments;
    });

    // Update svg's with current data
    updateSvgOnLoad(currentLocations);
};

// Function for defining the svg manipulation
function updateSvgOnLoad(currentLocations) {
    
  // Update svg's with current data on page load
  currentLocations.activeLocations.forEach((location) => {
      const svgLocation = location.replace(/\s/g,'_');
      const svgElement = document.querySelector(`#${svgLocation}`);
      if (svgElement != null) {
        svgElement.classList.add('animate');
        svgElement.style.opacity = '1';
      };
    });
}

// Add event listener for when DOM content loaded
window.addEventListener('DOMContentLoaded', getCurrentLocations);

// Define the url for the sse route
const sseUrl = new ServerRoute('LatestUpdate').getRoute();

// Create the sse event source object
const sseSource = new EventSource(sseUrl);

// Define the callback to execute when message is received from sse
sseSource.onmessage = function (event) {
    
    // Destructure the update object into variables. 
    const receivedData = JSON.parse(event.data);
    
    const newData = receivedData.newData;
    const svgLocations = receivedData.svgLocationStatus;
    let newStaffData;
    if (newData.length == undefined) {
      newStaffData = [newData];
    }
    else {
      newStaffData = newData;
    }    
    
    // Loop over each staff member in the update data array
    newStaffData.forEach((staffMember) => {
      const {name, currentLocation, comments} = staffMember;

      // Find the entry in the staffArray
      const employeeData = staffArray.find((staff) => {
        return staff.name == name;
      });

      // Use destructuring to assign the locationId, commentId and workshop to variables 
      const {locationId, commentId, workshop} = employeeData;
      
      // Check if the workshop of the updated entry corresponds to the current page
      if (workshop == teamName) {
        
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
    })
    

    // Define ID's within svg
    if (svgLocations != '') {
      
      const activeLocations = svgLocations.activeLocations.map((location) => {
        return location.replace(/\s/g, '_');
      });
      const inactiveLocations = svgLocations.inactiveLocations.map((location) => {
        return location.replace(/\s/g, '_');
      });
      updateSVG(activeLocations, inactiveLocations);
    }
};

function updateSVG(activeLocations, inactiveLocations) {
  
  // Set the animation inactive for all inactive locations on current page
  inactiveLocations.forEach((location) => {
    const svgElement = document.querySelector(`#${location}`);
    if (svgElement != null) {
      if (svgElement.classList.contains('animate')) {  
        svgElement.classList.remove('animate');
      };
      
      svgElement.style.opacity = '0';
    }
  });

  // Set the animation active for all active location on current page
  activeLocations.forEach((location) => {
    const svgElement = document.querySelector(`#${location}`);
    if (svgElement != null) {  
      if (!svgElement.classList.contains('animate')) {
          svgElement.classList.add('animate');
      }
        
      svgElement.style.opacity = '1';
    }
  });  
};

// If a close event is required
const closeStream = () => sseSource.close();

