// Define a class for getting server route information and sending requests endpoint routes.
class ServerRoute {
    constructor(endpoint) {
        this.endpoint = endpoint;
        this.urlArray = window.location.href.split('/');
        this.url = `${this.urlArray.splice(0, this.urlArray.length - 1).join('/')}/${endpoint}`;
        this.previousConnectionStatus = undefined;
        this.currentConnectionStatus = undefined;
    }

    get previousStatus() {
        return this.previousConnectionStatus;
    }

    get currentStatus() {
        return this.currentConnectionStatus;
    }
    
    set previousStatus(value) {
        this.previousConnectionStatus = value;
    }

    set currentStatus(value) {
        this.currentConnectionStatus = value;
    }

    // Check if the server has reconnected
    checkReconnection() {
        if (this.previousConnectionStatus == false && this.currentConnectionStatus == true) {
            return true
        }
        else {
            return false
        }
    }

    // Get the url for the endpoint route
    getRoute() {
        return this.url;
    }

    // Get the URL for the current page
    getCurrentURL() {
        return this.urlArray.join('/');
    }

    // Identify what page is being viewed (eg. Management, JHH, Hunter, Tamworth)
    getPageIdentifier() {
        return {teamName: this.urlArray[this.urlArray.length - 1].replace('#', '')};
    }

    // Send a request to the server endpoint
    async sendRequest(data = '') {
        let requestData;
        if (this.endpoint == 'GetLocations') {
            requestData = JSON.stringify(this.getPageIdentifier());
        }
        else if (this.endpoint == 'UpdateLocations') {
            requestData = JSON.stringify(data); 
        }
        else if (this.endpoint == 'MergeLocalStorage') {
            requestData = data;
        }
        else {
            throw new Error('The requested endpoint does not exist');
        }
        
        const endpointURL = this.getRoute().replace('/location',''); 
        
        const response = await fetch(endpointURL, {
                method: 'POST', 
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                'Content-Type': 'application/json'
                },
                body: requestData // body data type must match "Content-Type" header
            });
      
        return response;
        }
}

class MergeData {
    constructor() {
       this.management = true;
       this.jhh = true;
       this.hunter = true;
       this.tamworth = true; 
    }

}

// Create a merge status object to track merge updates for each page
const mergeStatus = new MergeData();

const keys = Object.keys(mergeStatus);
const values = keys.map((key) => {
    return mergeStatus[key];
})

// Create update locations route object
const updateRoute = new ServerRoute('UpdateLocations');

// Create merge local storage route object
const mergeLocationsRoute = new ServerRoute('MergeLocalStorage');

// Define array of objects for staff details. 
const staffArray = [{ name: 'ISHAQUE KHAN', locationId: 'lik', commentId: 'cik', workshop: 'Management' }, { name: 'PAUL COOKSON', locationId: 'lpk', commentId: 'cpk', workshop: 'Management' }, { name: 'MICHELLE ISON', locationId: 'lmi', commentId: 'cmi', workshop: 'Management' },
{ name: 'GLADY GIDEON', locationId: 'lgg', commentId: 'cgg', workshop: 'Management' }, { name: 'DURGA SOMPALLE', locationId: 'lds', commentId: 'cds', workshop: 'JHH' }, { name: 'ATIF SIDDIQUI', locationId: 'las', commentId: 'cas', workshop: 'JHH' },
{ name: 'MICHAEL DATHAN-HORDER', locationId: 'lmdh', commentId: 'cmdh', workshop: 'JHH' }, { name: 'MITCHELL PACEY', locationId: 'lmjp', commentId: 'cmjp', workshop: 'JHH' }, { name: 'STEVEN BRADBURY', locationId: 'lsb', commentId: 'csb', workshop: 'JHH' },
{ name: 'KEITH BALL', locationId: 'lkb', commentId: 'ckb', workshop: 'JHH' }, { name: 'ELLEN HEYDON', locationId: 'leh', commentId: 'ceh', workshop: 'JHH' }, { name: 'RODNEY BIRT', locationId: 'lrb', commentId: 'crb', workshop: 'JHH' },
{ name: 'RAY AUNEI MOSE', locationId: 'lram', commentId: 'cram', workshop: 'JHH' }, { name: 'MITCHELL PYNE', locationId: 'lmp', commentId: 'cmp', workshop: 'JHH' }, { name: 'PEDRAM BIDAR', locationId: 'lpb', commentId: 'cpb', workshop: 'Tamworth' },
{ name: 'JOHN LARKWORTHY', locationId: 'ljl', commentId: 'cjl', workshop: 'Tamworth' }, { name: 'AZMI REFAL', locationId: 'lar', commentId: 'car', workshop: 'Tamworth' }, { name: 'BRET PRYOR', locationId: 'lbp', commentId: 'cbp', workshop: 'Tamworth' },
{ name: 'TROY TRAEGAR', locationId: 'ltt', commentId: 'ctt', workshop: 'Hunter' }, { name: 'PATRICK SMALL', locationId: 'lps', commentId: 'cps', workshop: 'Hunter' }, { name: 'MATTHEW MURRELL', locationId: 'lmm', commentId: 'cmm', workshop: 'Hunter' },
{ name: 'WAYNE FULLER', locationId: 'lwf', commentId: 'cwf', workshop: 'Hunter' }, { name: 'LEIGH RYAN', locationId: 'llr', commentId: 'clr', workshop: 'Hunter' }, { name: 'MATTHEW LAW', locationId: 'lml', commentId: 'cml', workshop: 'Hunter' },
{ name: 'TOME TOMEV', locationId: 'lttv', commentId: 'cttv', workshop: 'Hunter' }, { name: 'KENDO WU', locationId: 'lkw', commentId: 'ckw', workshop: 'JHH' }];

// Define the clinical units and departments within the health service.
const unit = ["CATHLAB", "ALLIED_HEALTH", "BME", "DELIVERY_SUITE", "AUDIOLOGY", "PHYSIOTHERAPY", "ENDOSCOPY", "DIAGNOSTIC_CENTRE",
"WARD_F1", "HAPS_LVL_3", "EMERGENCY", "WARD_H1", "GASTROENTEROLOGY", "WARD_J1", "ICU", "GP_ACCESS", "WARD_K1", "ICU_BME", "HAPS_LVL_2A",
"WARD_G1", "JHH_OPERATING_THEATRE", "HAPS_LVL_2B", "JHH_RECOVERY", "IMAGING", "LAB_5", "INNOVATIONS_LAB", "NICU", "RNC_BME", 
"KALIEDOSCOPE_A", "RNC_OPERATING_THEATRE", "KALIEDOSCOPE_B", "RNC_RECOVERY", "KALIEDOSCOPE_C", "WARD_E3", "NEUROLOGY", "WARD_F3", "NEXUS",
"WARD_G3", "NORTH_BLOCK", "WARD_H3", "NUCLEAR_MEDICINE", "WARD_J3", "OUTPATIENTS", "WARD_K3", "PATHOLOGY", "PHARMARCY", "SLEEP_LAB", 
"SOUTH_BLOCK", "WARD_E2", "WARD_F2", "WARD_G2", "WARD_H2", "WARD_J2", "WARD_K2", "WARD_E1", "CCU", "NEW_MAITLAND", "BELMONT", 
"NEWCASTLE", "BULAHDELAH", "KURRI_KURRI", "CESSNOCK", "TAREE", "DUNGOG", "SINGLETON", "DENMAN", "GLOUCESTOR", "SCONE", "MUSWELBROOK", 
"MURRURUNDI", "MERRIWA", "TAMWORTH", "WALCHA", "QUIRINDI", "GUNNEDAH", "MANILLA", "ARMIDALE", "BOGGABRI", "BARRABA", "GUYRA", "NARRABRI", 
"WEEWAA", "BINGARA", "BUNDARRA", "GLEN_INNES", "EMMAVILLE", "MOREE", "WARIALDA", "INVERELL", "TENTERFIELD"];

// Define the clinical units within different areas for populating form lists in html.
const locationOptions = {
    level3: ['ICU', 'JHH OPERATING THEATRE', 'JHH RECOVERY', 'DELIVERY SUITE', 'NICU', 'HAPS LVL 3', 'RNC OPERATING THEATRE', 'RNC RECOVERY',
        'CATHLAB', 'ENDOSCOPY', 'LAB 5', 'WARD E3', 'WARD F3', 'WARD G3', 'WARD H3', 'WARD J3', 'WARD K3', 'CCU'],
    level2: ['SOUTH BLOCK', 'NORTH BLOCK', 'DIAGNOSTIC CENTRE', 'IMAGING', 'EMERGENCY', 'PATHOLOGY', 'GP ACCESS', 'SLEEP LAB', 'ALLIED HEALTH',
        'OUTPATIENTS', 'KALIEDOSCOPE A', 'KALIEDOSCOPE B', 'KALIEDOSCOPE C', 'HAPS LVL 2A', 'HAPS LVL 2B', 'WARD E2', 'WARD F2', 'WARD G2', 'WARD H2',
        'WARD J2', 'WARD K2', 'NEXUS', 'NUCLEAR MEDICINE', 'NEUROLOGY', 'GASTROENTEROLOGY', 'AUDIOLOGY', 'INNOVATIONS LAB'],
    level1: ['H.E.L.L', 'DOCK', 'PHYSIOTHERAPY', 'WARD E1', 'SIM CENTRE', 'WARD F1', 'WARD G1', 'WARD H1', 'WARD J1', 'WARD K1'],
    hunter: ['JHH', 'NEW MAITLAND', 'BELMONT', 'NEWCASTLE', 'BULAHDELAH', 'KURRI KURRI', 'CESSNOCK', 'TAREE', 'DUNGOG', 'SINGLETON', 'DENMAN',
        'GLOUCESTOR', 'SCONE', 'MUSWELBROOK', 'MURRURUNDI', 'MERRIWA'],
    "new-england": ['TAMWORTH BME', 'TAMWORTH', 'WALCHA', 'QUIRINDI', 'GUNNEDAH', 'MANILLA', 'ARMIDALE', 'BOGGABRI', 'BARRABA', 'GUYRA', 'NARRABRI',
        'WEEWAA', 'BINGARA', 'BUNDARRA', 'GLEN INNES', 'EMMAVILLE', 'MOREE', 'WARIALDA', 'INVERELL', 'TENTERFIELD']
};

// Sort the location list alphabetically and append to the dom. 
for (const prop in locationOptions) {
    const locationArray = locationOptions[prop];
    const sortedArray = locationArray.sort();
    const listElements = sortedArray.map((location) => {
        return `<li onclick="findvalue(this)"><a href="#">${location}</a></li>`
    }).join('');
    const area = document.querySelector(`.${prop}`);
    area.innerHTML = listElements;
}

// Get the employee location element id's from the staff array for each staff member.
const employee = staffArray.map((staffMember) => {
    return staffMember.locationId
})

// Get all JHH employee names.
const jhhEmp = staffArray.reduce((acc, staffMember) => {
    if (staffMember.workshop == 'JHH' || staffMember.workshop == 'Management') {
        acc.push(staffMember.name);
        return acc;
    }
    else {
        return acc;
    }
}, []);

// Get all Green Team employee names.
const green1 = staffArray.reduce((acc, staffMember) => {
    if (staffMember.workshop == 'Hunter') {
        acc.push(staffMember.name);
        return acc;
    }
    else {
        return acc;
    }
}, []);

// Get all New England employee names.
const tamworth1 = staffArray.reduce((acc, staffMember) => {
    if (staffMember.workshop == 'Tamworth') {
        acc.push(staffMember.name);
        return acc;
    }
    else {
        return acc;
    }
}, []);

// Define all staff names
const allStaffNames = jhhEmp.concat(green1, tamworth1);

// Define elements of the network indicator and message
const networkMessage = document.querySelector('.network-message');
const networkIndicator = document.querySelector('.network-indicator');

// finding location selected
function findvalue(e) {
    document.getElementById("location").value = e.innerText;
    var locValue = document.getElementById("location").value;
    //Checking if location selected is custom
    if (locValue == "CUSTOM") {
        document.getElementById("location2").value = locValue.replace("CUSTOM", "Type Custom Location Here");
    } else {
        document.getElementById("location2").value = locValue.replace(/_/g, " ");
    }
    //checking if location is bme, icu bme or rnc bme
    if (locValue == "BME" || locValue == "ICU BME" || locValue == "RNC BME" || locValue == "BACK IN 5") {
        currentTab = 0;
        nextPrev(1);
        nextPrev(1);
        nextPrev(1);
        nextPrev(1);
    
    /******This was commented out as there was a bug when selected multiple times. Don't know why but it seems to be fixed ******/
    // } else if (locValue == "BACK IN 5") {
    //     document.getElementById("location2").value = "BACK IN 5";
    //     nextPrev(1);
    //     nextPrev(1);
    //     nextPrev(1);
    //     nextPrev(1);
    // 
    }
    else if (locValue == "HOME") {
        let todayIs = new Date();
        let thisDay = todayIs.getDay();
        if (thisDay == 5 || thisDay == 6) {
            document.getElementById("comment").value = "Back on Monday"
        } else {
            document.getElementById("comment").value = "Back Tomorrow"
        }
        currentTab = 0;
        nextPrev(1);
        nextPrev(1);
        nextPrev(1);
        nextPrev(1);
    }
    else if (locationOptions.level1.includes(locValue)) {
        currentTab = 0;
        nextPrev(1);
        nextPrev(1);
    }
    else if (locationOptions.level2.includes(locValue)) {
        currentTab = 0;
        nextPrev(1);
        nextPrev(1);
    }
    else if (locationOptions.level3.includes(locValue)) {
        currentTab = 0;
        nextPrev(1);
        nextPrev(1);
    }

    else {
        currentTab = 0;
        nextPrev(1);
    }
}

function getval(cel) {
    //get the name of the officer being clicked on
    //document.getElementById("myForm").style.display = "block";
    document.getElementById("empId").innerHTML = cel.innerHTML;
    if (jhhEmp.includes(cel.innerHTML)) {
        document.getElementById("myForm").style.display = "block";
    } else if (green1.includes(cel.innerHTML)) {
        document.getElementById("myForm").style.display = "block";
    } else if (tamworth1.includes(cel.innerHTML)) {
        document.getElementById("myForm").style.display = "block";
    }
}
function openForm() {
    const parentElement = this.parentElement;
    const firstCell = parentElement.firstElementChild;
    const employeeName = firstCell.textContent; 
    document.getElementById("empId").innerHTML = employeeName;   
    document.getElementById("myForm").style.display = "block";
    document.getElementById("location").value = "";
}

function clearForm() {

    document.getElementById("location").value = "";
    document.getElementById("comment").value = "";
    document.getElementById("dateSelect").value = "";
    document.getElementById("timeSelect").value = "";
    document.getElementById("cancelBTN").style.visibility = "visible";


}

function closeForm() {


    document.getElementById("myForm").style.display = "none";
    for (let i = 1; i <= 3; i++) {
        document.querySelectorAll(".tab")[i].style.display = "none";
    }

    var currentTab = 0; // Current tab is set to be the first tab (0)
    showTab(currentTab); // Display the current tab

}

function publishToTable() {
    // getting Employer that was clicked on
    const Id = document.getElementById("empId").innerHTML;
    const item = document.getElementById("location").value;

    // Find the staff member who was selected and return their staffArray object.
    const staffMember = staffArray.find((staff) => {
        return staff.name == Id;
    });

    // Get the location and comment element ID's of the staff member.
    const locationElementID = staffMember.locationId;
    const commentElementID = staffMember.commentId;

    // Determine the previous location of the staff member which is the current location element text content.
    const previousLocation = document.getElementById(`${locationElementID}`).innerHTML.replace(/\s/g, '_');

    // Set the new location to that of the location select in the form.
    document.getElementById(`${locationElementID}`).innerHTML = document.getElementById("location2").value;

    // Enter the form time, date and comments into the comment field for the employee.
    document.getElementById(`${commentElementID}`).innerHTML = document.getElementById("comment").value;

    // Create the new location and comments variables to send to server
    const newLocation = document.getElementById(`${locationElementID}`).innerHTML
    const newComments = document.getElementById(`${commentElementID}`).innerHTML

    // Create a timestamp for the update
    const time = Date.now();

    postToServer(Id, newLocation, newComments, time)

}

async function postToServer(name, location, comments, timestamp) {
    
    // Put the data into the required object to post to backend
    const updateData = {name: name, currentLocation: location, comments: comments, timestamp: timestamp}; 

    // Send post request on the update locations route
    const response = await updateRoute.sendRequest(updateData).catch(() => {
        
        // Update connection status to offline
        updateRoute.previousStatus = updateRoute.currentStatus;
        updateRoute.currentStatus = false;
        networkIndicator.style.backgroundColor = 'rgb(241, 28, 28)';
        networkMessage.textContent = 'Server Offline - Local Storage Only';

        // If error on connection then store data in local storage
        const id = updateData.name;
        const dataString = JSON.stringify(updateData);
        localStorage.setItem(id, dataString);
    });
    
    if (response != undefined) {
        
        // Resolve the message from the promise
        const updateMessage = await response.json();
        
        // Update connection status
        updateRoute.previousStatus = updateRoute.currentStatus;
        updateRoute.currentStatus = true;
        const reconnected = updateRoute.checkReconnection(); 

        // If server has reconnected since last update merge local storage changes to server
        if (reconnected) {
            
            // Set the network icon back to connected 
            networkIndicator.style.backgroundColor = 'rgb(87, 243, 60)';
            networkMessage.textContent = 'Server Online';

            // Grab all data from internal storage and store in stringified json object
            const storedKeys = Object.keys(localStorage);
            storedDataArray = storedKeys.reduce((acc, key) => {
                const storedData = localStorage.getItem(key);
                if (allStaffNames.includes(key)) {
                    acc.push(storedData);
                    return acc;
                }
                return acc;
            }, []).join(',');
            
            // Stringify local storage array for post to server
            const storedObjectStringified = storedDataArray.length == 0 ? JSON.stringify([{name: 'default'}]) : `[${storedDataArray}]`;
            
            // Send post request on merge route
            const response = await mergeLocationsRoute.sendRequest(storedObjectStringified);

            if (response != undefined) {
                
                // Resolve the response data into an object
                const mergeMessage = await response.json();
                
                // Clear the local storage. 
                localStorage.clear();
            }
            
        }
        //console.log(updateMessage);
    };
        
};

var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
    // This function will display the specified tab of the form ...
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    // ... and fix the Previous/Next buttons:
    if (n == 0) {
        document.getElementById("prevBtn").style.visibility = "hidden";
        document.getElementById("nextBtn").style.visibility = "hidden";
    } else {
        document.getElementById("prevBtn").style.visibility = "visible";
        document.getElementById("nextBtn").style.visibility = "visible";
    }
    if (n == (x.length - 1)) {
        var setComment = document.getElementById("comment").value
        if (setComment == "Back Tomorrow" || setComment == "Back on Monday") {

            document.getElementById("nextBtn").innerHTML = "Submit";
            document.getElementById("nextBtn").style.backgroundColor = "green";
            document.getElementById("prevBtn").style.visibility = "visible";
            // document.getElementById("cancelBTN").style.visibility = "hidden";
        } else {
            var empDate3 = document.getElementById("dateSelect").value;
            var empDate1 = new Date(empDate3);
            var empDate2 = empDate1.getDate() + "-" + (empDate1.getMonth() + 1) + "-" + empDate1.getFullYear();
            var empDay = empDate1.getDay();
            var empDate = empDate2;
            var cDate = new Date();
            var selDate = cDate.getDate() + "-" + (cDate.getMonth() + 1) + "-" + cDate.getFullYear();
            var selDay = cDate.getDay();
            if (empDate == selDate || empDate == "NaN-NaN-NaN") {
                var setDate = "";
            } else if (empDay - selDay == 1) {
                var setDate = "Tomorrow";
            } else {
                setDate = empDate2
            }
            let empTime = document.getElementById("timeSelect").value;
            if (setDate == "") {
                setDate = "Today";
            }

            let empcomment = `${empTime}     ${setDate}`;
            // document.getElementById("location2").value = document.getElementById("location").value;
            document.getElementById("comment").value = empcomment;
            document.getElementById("nextBtn").innerHTML = "Submit";
            document.getElementById("nextBtn").style.backgroundColor = "green";
            document.getElementById("prevBtn").style.visibility = "visible";
        }
        if (document.getElementById("comment").value == "undefined") {
            document.getElementById("comment").value = "";
        }

    } else {
        document.getElementById("nextBtn").innerHTML = "Next";
    }
    // ... and run a function that displays the correct step indicator:
    fixStepIndicator(n)
}

function nextPrev(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:
    if (n == 1 && !validateForm()) return false;
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form... :
    if (currentTab >= x.length) {
        //...the form gets submitted:
        publishToTable(); clearForm(); closeForm(); Keyboard.close();/*   ###########################set the publishing to table here ##########################   */

        return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
}

function validateForm() {
    // This function deals with validation of the form fields
    var x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");
    // A loop that checks every input field in the current tab:
    for (i = 0; i < y.length; i++) {
        // If a field is empty...
        if (y[i].value == "") {
            // add an "invalid" class to the field:
            y[i].className += " invalid";
            // and set the current valid status to false:
            valid = true;
        }
    }
    // If the valid status is true, mark the step as finished and valid:
    if (valid) {
        document.getElementsByClassName("step")[currentTab].className += " finish";
    }
    return valid; // return the valid status
}

function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    //... and adds the "active" class to the current step:
    x[n].className += " active";
}

// ###############################       keyboard       #####################################
const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: true
    },

    init() {
        // Create main elements
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        // Setup main elements
        this.elements.main.classList.add("keyboard", "keyboard--hidden");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        // Add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        // Automatically use keyboard for elements with .use-keyboard-input
        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
            "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
            "space"
        ];

        // Creates HTML for an icon
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "p", "enter", "?"].indexOf(key) !== -1;

            // Add attributes/classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");

            switch (key) {
                case "backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("backspace");

                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    });

                    break;

                case "caps":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = createIconHTML("caps");

                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                    });

                    break;

                case "enter":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("return");

                    keyElement.addEventListener("click", () => {
                        this.close();
                        this._triggerEvent("onclose");
                    });

                    break;

                case "space":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.innerHTML = createIconHTML("space_bar");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "done":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                    keyElement.innerHTML = createIconHTML("close");

                    keyElement.addEventListener("click", () => {
                        this.close();
                        this._triggerEvent("onclose");
                    });

                    break;

                default:
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvent("oninput");
                    });

                    break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard--hidden");
    },

    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keyboard--hidden");
    }
};

window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});

// Select all table cells
const tableCells = document.querySelectorAll('.display td');

tableCells.forEach((cell) => {
    cell.addEventListener('click', openForm);
});


// Select the header bar and menu options
const navBar = document.querySelector('.nav-bar');
const navBoxes = document.querySelectorAll('.nav-box');
const navLinks = document.querySelectorAll('.nav-link');

// Define the unique colors for the nav bar options
const optionHeadingColours = {Management: '#ff4444', JHH: '#a30afc', Hunter: '#0ab875', Tamworth: '#1d19ff'};

// Declare index variable for storing index based on current page
let index;

// Get the page currently being viewed
const pageNameLower = mergeLocationsRoute.getPageIdentifier().teamName.toLowerCase();

// Get the page currently being viewed
const pageName = mergeLocationsRoute.getPageIdentifier().teamName;

// Get the current nav link
const currentNavLink = document.querySelector(`.${pageNameLower}-box`);

 // Format the navbox for the current page
currentNavLink.style.borderBottom = `10px solid ${optionHeadingColours[pageName]}`;

// Move the font to account for border width change
currentNavLink.firstElementChild.marginTop = '10px';

// Add click event for nav links and direct to new page if not current page
navLinks.forEach((navLink) => {
    navLink.addEventListener('click', async (event) => {
        const optionHeading = navLink.firstElementChild.textContent;
        if (optionHeading == pageName) {
            event.preventDefault();
        };
    });
});

// Add bottom border when mouse hovers over menu option
navBoxes.forEach((navBox) => {
    navBox.addEventListener('mouseover', (event) => {
        const optionHeading = navBox.firstElementChild.firstElementChild.textContent;
        const optionColour = optionHeadingColours[optionHeading]
        navBox.style.backgroundColor = `${optionColour}`;
    });
});

// Remove bottom border when mouse leaves element
navBoxes.forEach((navBox) => {
    navBox.addEventListener('mouseout', (event) => {
        navBox.style.backgroundColor = `#4f4d4d`;
    });
});

// Check if the mouse is at the top of the screen
window.addEventListener('mousemove', (event) => {
    const yCoordinate = event.clientY;
    if (yCoordinate <= 75) {
        navBar.style.transform = 'translateY(0px)';
    }  
    else {
        navBar.style.transform = 'translateY(-75px)';
    };
});









