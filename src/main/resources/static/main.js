let reqUrl = "http://localhost:9595/patient/all";
let hrAvgUrl = "http://localhost:9595/patient/avg";
let hrMaxUrl = "http://localhost:9595/patient/max";
let hrMedUrl = "http://localhost:9595/patient/median";
let hrMinUrl = "http://localhost:9595/patient/min";

//Running an onload function to grab all the table information.
window.onload = function() {
    searchPatients();
    getStats();
}

//The ajaxRequest to populate the tables and get all the patient information.
function ajaxRequest(method, url, callback){
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onreadystatechange = function(){
        if(xhr.readyState===4 && xhr.status===200){
            return callback(this);
        }
    }
    xhr.send();
}

//The addRow function to append rows to the table based on number of entries in the array.
function addRow(id, firstName, lastName, heartRate, docLast){
    let row = document.createElement("tr");
    let cell1 = document.createElement("td");
    let cell2 = document.createElement("td");
    let cell3 = document.createElement("td");
    let cell4 = document.createElement("td");
 
    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    row.appendChild(cell4);
   
    cell1.innerHTML = id;
    cell2.innerHTML = firstName +" "+lastName;
    cell3.innerHTML = +heartRate;
    cell4.innerHTML = "Dr. "+docLast;
    document.getElementById("patients").appendChild(row);
}

//One of the onload functions
function searchPatients(){
    ajaxRequest("GET", reqUrl, displayAllPatients);
}

//The function that is parsing our XHR response and running the dynamic for loop to grab all of the information we wish to have displayed.
function displayAllPatients(xhr){
    let patients = JSON.parse(xhr.response);
    for (call of patients){
        addRow(call.id, call.firstName, call.lastName , call.heartRate, call.doctor.lastName);
    }
}

//Another onload function. Running multiple ajaxRequests to grab the average, maximum, medium, and minimum HR.
function getStats(){
    ajaxRequest("GET", hrAvgUrl, displayAvg);
    ajaxRequest("GET", hrMaxUrl, displayMax);
    ajaxRequest("GET", hrMedUrl, displayMed);
    ajaxRequest("GET", hrMinUrl, displayMin);
}

//The functions that are parsing the responses and setting them to the innerHTML of the td cell.
function displayAvg(xhr){
    let avgJsonResponse = xhr.response;
    let avg = JSON.parse(avgJsonResponse);
    document.getElementById("avg").innerHTML = avg;
}

function displayMax(xhr){
    let max = JSON.parse(xhr.response);
    document.getElementById("max").innerHTML = max;
}

function displayMed(xhr){
    let med = JSON.parse(xhr.response);
    document.getElementById("med").innerHTML = med;
}

function displayMin(xhr){
    let min = JSON.parse(xhr.response);
    document.getElementById("min").innerHTML = min;
}

