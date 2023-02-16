const unit = ["CATHLAB", "ALLIED_HEALTH", "BME", "DELIVERY_SUITE", "AUDIOLOGY", "PHYSIOTHERAPY", "ENDOSCOPY", "DIAGNOSTIC_CENTRE", "WARD_F1", "HAPS_LVL_3", "EMERGENCY", "WARD_H1", "GASTROENTEROLOGY", "WARD_J1", "ICU", "GP_ACCESS", "WARD_K1", "ICU_BME", "HAPS_LVL_2A", "WARD_G1", "JHH_OPERATING_THEATRE", "HAPS_LVL_2B", "JHH_RECOVERY", "IMAGING", "LAB_5", "INNOVATIONS_LAB", "NICU", "RNC_BME", "KALIEDOSCOPE_A", "RNC_OPERATING_THEATRE", "KALIEDOSCOPE_B", "RNC_RECOVERY", "KALIEDOSCOPE_C", "WARD_E3", "NEUROLOGY", "WARD_F3", "NEXUS", "WARD_G3", "NORTH_BLOCK", "WARD_H3", "NUCLEAR_MEDICINE", "WARD_J3", "OUTPATIENTS", "WARD_K3", "PATHOLOGY", "PHARMARCY", "SLEEP_LAB", "SOUTH_BLOCK", "WARD_E2", "WARD_F2", "WARD_G2", "WARD_H2", "WARD_J2", "WARD_K2", "WARD_E1", "CCU", "NEW_MAITLAND", "BELMONT", "NEWCASTLE", "BULAHDELAH", "KURRI_KURRI", "CESSNOCK", "TAREE", "DUNGOG", "SINGLETON", "DENMAN", "GLOUCESTOR", "SCONE", "MUSWELBROOK", "MURRURUNDI", "MERRIWA", "TAMWORTH", "WALCHA", "QUIRINDI", "GUNNEDAH", "MANILLA", "ARMIDALE", "BOGGABRI", "BARRABA", "GUYRA", "NARRABRI", "WEEWAA", "BINGARA", "BUNDARRA", "GLEN_INNES", "EMMAVILLE", "MOREE", "WARIALDA", "INVERELL", "TENTERFIELD",];
const employee = ["lik", "lpk", "lmi", "lgg", "lds", "las", "lmdh", "lmjp", "lsb", "lkb", "leh", "lrb", "lkw", "lttv", "lram", "lmp", "ltt", "lps", "lwf", "lmm", "llr", "lml", "lpb", "ljl", "lar", "lbp"];
const jhhEmp = ["ISHAQUE KHAN", "PAUL COOKSON", "MICHELLE ISON", "GLADY GIDEON", "DURGA SOMPALLE", "ATIF SIDDIQUI", "MICHAEL DATHAN-HORDER", "MITCHELL PACEY", "STEVEN BRADBURY", "KEITH BALL", "ELLEN HEYDON", "RODNEY BIRT", "KENDO WU", "RAY AUNEI MOSE", "MITCHELL PYNE"];
const green1 = ["TROY TRAEGAR", "PATRICK SMALL", "MATHEW MURRELL", "WAYNE FULLER", "LEIGH RYAN", "MATTHEW LAW", "TOME TOMEV"];
const tamworth1 = ["PEDRAM BIDAR", "JOHN LARKWORTHY", "AZMI REFAL", "BRET PRYOR"]

var pagefrom;


//local storage setting for units//
localStorage.setItem("team", '0');
localStorage.setItem('CATHLAB', '0');
localStorage.setItem('ALLIED_HEALTH', '0');
localStorage.setItem('BME', '0');
localStorage.setItem('DELIVERY_SUITE', '0');
localStorage.setItem('AUDIOLOGY', '0');
localStorage.setItem('PHYSIOTHERAPY', '0');
localStorage.setItem('ENDOSCOPY', '0');
localStorage.setItem('DIAGNOSTIC_CENTRE', '0');
localStorage.setItem('WARD_F1', '0');
localStorage.setItem('HAPS_LVL_3', '0');
localStorage.setItem('EMERGENCY', '0');
localStorage.setItem('WARD_H1', '0');
localStorage.setItem('GASTROENTEROLOGY', '0');
localStorage.setItem('WARD_J1', '0');
localStorage.setItem('ICU', '0');
localStorage.setItem('GP_ACCESS', '0');
localStorage.setItem('WARD_K1', '0');
localStorage.setItem('ICU_BME', '0');
localStorage.setItem('HAPS_LVL_2A', '0');
localStorage.setItem('WARD_G1', '0');
localStorage.setItem('JHH_OPERATING_THEATRE', '0');
localStorage.setItem('HAPS_LVL_2B', '0');
localStorage.setItem('JHH_RECOVERY', '0');
localStorage.setItem('IMAGING', '0');
localStorage.setItem('LAB_5', '0');
localStorage.setItem('INNOVATIONS_LAB', '0');
localStorage.setItem('NICU', '0');
localStorage.setItem('RNC_BME', '0');
localStorage.setItem('KALIEDOSCOPE_A', '0');
localStorage.setItem('RNC_OPERATING_THEATRE', '0');
localStorage.setItem('KALIEDOSCOPE_B', '0');
localStorage.setItem('RNC_RECOVERY', '0');
localStorage.setItem('KALIEDOSCOPE_C', '0');
localStorage.setItem('WARD_E3', '0');
localStorage.setItem('NEUROLOGY', '0');
localStorage.setItem('WARD_F3', '0');
localStorage.setItem('NEXUS', '0');
localStorage.setItem('WARD_G3', '0');
localStorage.setItem('NORTH_BLOCK', '0');
localStorage.setItem('WARD_H3', '0');
localStorage.setItem('NUCLEAR_MEDICINE', '0');
localStorage.setItem('WARD_J3', '0');
localStorage.setItem('OUTPATIENTS', '0');
localStorage.setItem('WARD_K3', '0');
localStorage.setItem('PATHOLOGY', '0');
localStorage.setItem('PHARMARCY', '0');
localStorage.setItem('SLEEP_LAB', '0');
localStorage.setItem('SOUTH_BLOCK', '0');
localStorage.setItem('WARD_E2', '0');
localStorage.setItem('WARD_F2', '0');
localStorage.setItem('WARD_G2', '0');
localStorage.setItem('WARD_H2', '0');
localStorage.setItem('WARD_J2', '0');
localStorage.setItem('WARD_K2', '0');
localStorage.setItem('WARD_E1', '0');
localStorage.setItem('CCU', '0');

localStorage.setItem('NEW_MAITLAND', '0');
localStorage.setItem('BELMONT', '0');
localStorage.setItem('NEWCASTLE', '0');
localStorage.setItem('BULAHDELAH', '0');
localStorage.setItem('KURRI_KURRI', '0');
localStorage.setItem('CESSNOCK', '0');
localStorage.setItem('TAREE', '0');
localStorage.setItem('DUNGOG', '0');
localStorage.setItem('SINGLETON', '0');
localStorage.setItem('DENMAN', '0');
localStorage.setItem('GLOUCESTOR', '0');
localStorage.setItem('SCONE', '0');
localStorage.setItem('MUSWELBROOK', '0');
localStorage.setItem('MURRURUNDI', '0');
localStorage.setItem('MERRIWA', '0');

localStorage.setItem('TAMWORTH', '0');
localStorage.setItem('WALCHA', '0');
localStorage.setItem('QUIRINDI', '0');
localStorage.setItem('GUNNEDAH', '0');
localStorage.setItem('MANILLA', '0');
localStorage.setItem('ARMIDALE', '0');
localStorage.setItem('BOGGABRI', '0');
localStorage.setItem('BARRABA', '0');
localStorage.setItem('GUYRA', '0');
localStorage.setItem('NARRABRI', '0');
localStorage.setItem('WEEWAA', '0');
localStorage.setItem('BINGARA', '0');
localStorage.setItem('BUNDARRA', '0');
localStorage.setItem('GLEN_INNES', '0');
localStorage.setItem('EMMAVILLE', '0');
localStorage.setItem('MOREE', '0');
localStorage.setItem('WARIALDA', '0');
localStorage.setItem('INVERELL', '0');
localStorage.setItem('TENTERFIELD', '0');

// JHH Team
localStorage.setItem('lik', 'HOME');
localStorage.setItem('lpk', 'HOME');
localStorage.setItem('lmi', 'HOME');
localStorage.setItem('lgg', 'HOME');
localStorage.setItem('lds', 'HOME');
localStorage.setItem('las', 'HOME');
localStorage.setItem('lmdh', 'HOME');
localStorage.setItem('lmjp', 'HOME');
localStorage.setItem('lsb', 'HOME');
localStorage.setItem('lkb', 'HOME');
localStorage.setItem('leh', 'HOME');
localStorage.setItem('lrb', 'HOME');
localStorage.setItem('lkw', 'HOME');
localStorage.setItem('lram', 'HOME');
localStorage.setItem('lmp', 'HOME');

// Hunter Team
localStorage.setItem('ltt', 'HOME');
localStorage.setItem('lps', 'HOME');
localStorage.setItem('lwf', 'HOME');
localStorage.setItem('lmm', 'HOME');
localStorage.setItem('lml', 'HOME');
localStorage.setItem('llr', 'HOME');
localStorage.setItem('lttv', 'HOME');
// New England Team
localStorage.setItem('lpb', 'HOME');
localStorage.setItem('ljl', 'HOME');
localStorage.setItem('lar', 'HOME');
localStorage.setItem('lbp', 'HOME');



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
    if (locValue == "BME" || locValue == "ICU_BME" || locValue == "RNC_BME") {
        currentTab = 0;
        nextPrev(1);
        nextPrev(1);
        nextPrev(1);
        nextPrev(1);
    } else if (locValue == "BACK IN 5") {
        document.getElementById("location2").value = "BACK IN 5";
        nextPrev(1);
        nextPrev(1);
        nextPrev(1);
        nextPrev(1);
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
    console.log(firstCell);
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
    var Id = document.getElementById("empId").innerHTML;
    var item = document.getElementById("location").value;

    const staffArray = [{name: 'ISHAQUE KHAN', locationId: 'lik', commentId:'cik'}, {name: 'PAUL COOKSON', locationId: 'lpk', commentId:'cpk'}, {name: 'MICHELLE ISON', locationId: 'lmi', commentId:'cmi'},
{name: 'GLADY GIDEON', locationId: 'lgg', commentId:'cgg'}, {name: 'DURGA SOMPALLE', locationId: 'lds', commentId:'cds'}, {name: 'ATIF SIDDIQUI', locationId: 'las', commentId:'cas'},
{name: 'MICHAEL DATHAN-HORDER', locationId: 'lmdh', commentId:'cmdh'}, {name: 'MITCHELL PACEY', locationId: 'lmjp', commentId:'cmjp'}, {name: 'STEVEN BRADBURY', locationId: 'lsb', commentId:'csb'},
{name: 'KEITH BALL', locationId: 'lkb', commentId:'ckb'}, {name: 'ELLEN HEYDON', locationId: 'leh', commentId:'ceh'}, {name: 'RODNEY BIRT', locationId: 'lrb', commentId:'crb'},
{name: 'RAY AUNEI MOSE', locationId: 'lram', commentId:'cram'}, {name: 'MITCHELL PYNE', locationId: 'lmp', commentId:'cmp'}, {name: 'PEDRAM BIDAR', locationId: 'lpb', commentId:'cpb'},
{name: 'JOHN LARKWORTHY', locationId: 'ljl', commentId:'cjl'}, {name: 'AZMI REFAL', locationId: 'lar', commentId:'car'}, {name: 'BRET PRYOR', locationId: 'lbp', commentId:'cbp'},
{name: 'TROY TRAEGAR', locationId: 'ltt', commentId:'ctt'}, {name: 'PATRICK SMALL', locationId: 'lps', commentId:'cps'}, {name: 'MATTHEW MURRELL', locationId: 'lmm', commentId:'cmm'},
{name: 'WAYNE FULLER', locationId: 'lwf', commentId:'cwf'}, {name: 'LEIGH RYAN', locationId: 'llr', commentId:'clr'}, {name: 'MATTHEW LAW', locationId: 'lml', commentId:'cml'},
{name: 'TOME TOMEV', locationId: 'lttv', commentId:'cttv'}, {name: 'KENDO WU', locationId: 'lkw', commentId:'ckw'}];

    const staffMember = staffArray.find((staff) => {
        return staff.name == Id;
    });

    console.log(staffMember);

    const locationElementID = staffMember.locationId;
    const commentElementID = staffMember.commentId;

    document.getElementById(`${locationElementID}`).innerHTML = document.getElementById("location2").value;
    var locationVariable = document.getElementById(`${locationElementID}`).innerHTML;
    localStorage.setItem(`${locationElementID}`, locationVariable);
    document.getElementById(`${commentElementID}`).innerHTML = document.getElementById("comment").value;
    setsvg();
}


function setsvg() {

    var team = location.pathname.split('/').pop();
    switch (team) {
        case 'jhh.html':
            localStorage.setItem('team', '1');
            break;
        case 'jhhteam.html':
            localStorage.setItem('team', '2');
            break;
        case 'greenteam.html':
            localStorage.setItem('team', '3');
            break;
        case 'tamworth.html':
            localStorage.setItem('team', '4');
            break;
    }


    //select LS LOC
    for (let k = 0; k < unit.length; k++) {
        unitsel = unit[k];     //select unit

        if (unit.includes(unitsel)) {
            for (let d = 0; d < employee.length; d++) {
                var empsel = employee[d];   // selecting LS EMP
                var empseloc = localStorage.getItem(empsel)  //get LS EMP LOC

                if (empseloc == unitsel) {
                    localStorage.setItem(unitsel, '1');
                    d = employee.length;
                } else {
                    localStorage.setItem(unitsel, '0');
                }

            }
        }



    }
    setsvg2();


    function setsvg2() {

        // setting svg state depending on local storage state
        for (let p = 0; p < unit.length; p++) {
            var unitsel = unit[p];

            if (localStorage.getItem(unitsel) == '1') {
                document.getElementById(unitsel).setAttribute('opacity', 1);
            } else {
                document.getElementById(unitsel).setAttribute('opacity', 0);
            }

        }





    }

}

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
        if (setComment == "Back Tomorrow" || setComment == "Back on Monday") {  // not working

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








