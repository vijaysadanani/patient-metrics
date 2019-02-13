let reqUrl = "http://localhost:9595/patient/all";
let hrAvgUrl = "http://localhost:9595/patient/avg";
let hrMaxUrl = "http://localhost:9595/patient/max";
let hrMedUrl = "http://localhost:9595/patient/median";
let hrMinUrl = "http://localhost:9595/patient/min";

window.onload = function() {
    searchPatients();
    getStats();
}

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

function searchPatients(){
    ajaxRequest("GET", reqUrl, displayAllPatients);
}

function displayAllPatients(xhr){
    let patients = JSON.parse(xhr.response);
    for (call of patients){
        addRow(call.id, call.firstName, call.lastName , call.heartRate, call.doctor.lastName);
    }
}
function getStats(){
    ajaxRequest("GET", hrAvgUrl, displayAvg);
    ajaxRequest("GET", hrMaxUrl, displayMax);
    ajaxRequest("GET", hrMedUrl, displayMed);
    ajaxRequest("GET", hrMinUrl, displayMin);
}

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

