let docUrl = "http://localhost:9595/doctor/all";
let postUrl = "http://localhost:9595/patient";
let putUrl = "http://localhost:9595/patient";
let patUrl = "http://localhost:9595/patient/all";
let deleteUrl = "http://localhost:9595/patient";


document.getElementById("showForm").addEventListener("click", showTheForm);
document.getElementById("showEdit").addEventListener("click", editTheForm);
document.getElementById("savePatient").addEventListener("click", editPatient);
document.getElementById("showDelete").addEventListener("click", showDelete);
document.getElementById("deletePatient").addEventListener("click", deleteThePatient);


window.onload = function() {
    showTheDocsOnce();
    ajaxRequest("GET", patUrl, displayPatients);
    ajaxRequest("GET", patUrl, displayAllInfo);
}

function showTheDocsOnce(){
    var boo = true;
    if (boo){
        boo = false;
        ajaxRequest("GET", docUrl, displayDoctors);
    }
}

function showDelete(){
	let delNode = document.getElementsByTagName("div")[9];
	let formNode = document.getElementsByTagName("div")[5];
	let editFormNode = document.getElementsByTagName("div")[7];

	    if(delNode.hasAttribute("hidden")) {
	        delNode.removeAttribute("hidden");
	    }

	     editFormNode.setAttribute("hidden", true);
	     formNode.setAttribute("hidden", true);
}

function showTheForm(){
    let formNode = document.getElementsByTagName("div")[5];
    let editFormNode = document.getElementsByTagName("div")[7];
    let delNode = document.getElementsByTagName("div")[9];

    if(formNode.hasAttribute("hidden")) {
        formNode.removeAttribute("hidden");
    }

    editFormNode.setAttribute("hidden", true);
    delNode.setAttribute("hidden", true);
    
}

function editTheForm(){
    let editFormNode = document.getElementsByTagName("div")[7];
    let formNode = document.getElementsByTagName("div")[5];
    let delNode = document.getElementsByTagName("div")[9];

    if(editFormNode.hasAttribute("hidden")) {
        editFormNode.removeAttribute("hidden");
    }
    formNode.setAttribute("hidden", true);
    delNode.setAttribute("hidden", true);
}


function displayDoctors(xhr){
    let doctors = JSON.parse(xhr.response);
    console.log(doctors);
        for (i = 0; i < 25; i++){
         addDocSelect(doctors[i].id, doctors[i].firstName, doctors[i].lastName);
     }
}

function displayPatients(xhr){
    let patientIds = JSON.parse(xhr.response);
    for (pats of patientIds){
        editPatients(pats.id, pats.firstName, pats.lastName, pats.doctor.id, pats.doctor.firstName, pats.doctor.lastName);
    }
}

function editPatients(patId, patFirst, patLast){
    let selectPat = document.getElementById("patSelect");
    let optionPat = document.createElement("option");

    selectPat.appendChild(optionPat);
    optionPat.innerHTML =+patId+" -- "+patFirst+" "+patLast;

}

function addDocSelect(docId, docFirst, docLast){
    let select = document.getElementById("docSelect");
    let option = document.createElement("option");

    select.appendChild(option);
    option.innerHTML =+docId+" -- Dr. "+docFirst+" "+docLast;

    let selectDoc = document.getElementById("editDocSelect");
    let optionDoc = document.createElement("option");

    selectDoc.appendChild(optionDoc);
    optionDoc.innerHTML =+docId+" -- Dr. "+docFirst+" "+docLast;

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

function ajaxPost(url, callback, newPatientObj){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.onreadystatechange = function(){
        if(xhr.readyState===4 && xhr.status===200){
            return callback(this);
        } if(xhr.status === 201){
            document.getElementById("submitParagraph").innerHTML = "Successul patient created. To add another patient, please refresh the page.";
        } if(xhr.status === 500){
            document.getElementById("submitParagraph").innerHTML = "Patient cannot be added. Please input a different Id number.";
        } if (xhr.status === 400){
            document.getElementById("submitParagraph").innerHTML = "No fields may be left blank. Please enter a value for each field.";
        }
    }
    xhr.setRequestHeader("Content-Type", "application/json");
    let jsonPatient = JSON.stringify(newPatientObj);
    xhr.send(jsonPatient);
}

function ajaxPut(url, callback, editPatientObj){
    let xhr = new XMLHttpRequest();
    xhr.open("PUT", url);
    xhr.onreadystatechange = function(){
        if(xhr.readyState===4 && xhr.status===200){
            return callback(this);
        } if(xhr.status === 200 || xhr.status === 204 || xhr.status === 202){
            document.getElementById("saveThisPatient").innerHTML = "Patient successfully updated. To edit another patient, please refresh the page.";
            document.getElementById("submitParagraph").innerHTML = "";
        }
        
    }
    xhr.setRequestHeader("Content-Type", "application/json");
    let jsonEditPatient = JSON.stringify(editPatientObj);
    xhr.send(jsonEditPatient);
}

document.getElementById("submitPatient").addEventListener("click", addPatient);

function addPatient(){
let selectedDoc = document.getElementById("docSelect").value;
let splitDoc = selectedDoc.split(" ");
let doctorId = splitDoc[0];
let docFirstName = splitDoc[3];
let docLastName = splitDoc[4];
let addPatId = parseInt(document.getElementById("id").value);
let addPatFirstName = document.getElementById("firstName").value;
let addPatLastName = document.getElementById("lastName").value;
let addPatHR =  parseInt(document.getElementById("heartRate").value);

if (addPatId > 200){
     let removeID = document.getElementsByTagName("p")[1];
     removeID.removeAttribute("hidden");
     removeID.innerHTML = "You cannot enter an Id above 200.";
     document.getElementById("saveThisPatient").innerHTML = "";
     return;
 } else {
     let removeID = document.getElementsByTagName("p")[1];
             removeID.setAttribute("hidden", true);
 }

if(addPatFirstName.match(/\d/)){
    let removeFN = document.getElementsByTagName("p")[2];
    removeFN.removeAttribute("hidden");
    removeFN.innerHTML = "You cannot enter any numerical values in the First Name.";
    document.getElementById("saveThisPatient").innerHTML = "";
    return;
} else {
    let removeThis = document.getElementsByTagName("p")[2];
    	removeThis.setAttribute("hidden", true);
}

if(addPatLastName.match(/\d/)){
    let removeFN = document.getElementsByTagName("p")[3];
    removeFN.removeAttribute("hidden");
    removeFN.innerHTML = "You cannot enter any numerical values in the Last Name.";
    document.getElementById("saveThisPatient").innerHTML = "";
    return;
} else {
    let removeThis = document.getElementsByTagName("p")[3];
    	removeThis.setAttribute("hidden", true);
}

if (addPatHR >= 480){
    let removeID = document.getElementsByTagName("p")[4];
    removeID.removeAttribute("hidden");
    removeID.innerHTML = "The highest recorded HR to date is less than 480. Try lower.";
    document.getElementById("saveThisPatient").innerHTML = "";
    return;
} else {
    let removeID = document.getElementsByTagName("p")[4];
            removeID.setAttribute("hidden", true);
}

    let newPatient = {
        "doctor": {
            "id": doctorId,
            "firstName": docFirstName,
            "lastName": docLastName
        },
             "id": addPatId,
              "firstName": addPatFirstName,
              "lastName": addPatLastName,
             "heartRate": addPatHR
     }
     
    ajaxPost(postUrl, printResponse, newPatient);
}

//The PUT REQUEST
function editPatient(){
    let selectedEditPat = document.getElementById("patSelect").value;
    let selectedEditDoc = document.getElementById("editDocSelect").value;
    let splitEditPat = selectedEditPat.split(" ");
    let splitEditDoc = selectedEditDoc.split(" ");
    let editDoctorId = splitEditDoc[0];
    let editDoctorFirstName = splitEditDoc[3];
    let editDoctorLastName = splitEditDoc[4];
    let editPatientId = splitEditPat[0];
    let editedPatientFN = document.getElementById("editFirstName").value;
    let editedPatientLN = document.getElementById("editLastName").value;
    let editedPatientHR = parseInt(document.getElementById("editHeartRate").value);

    if(editedPatientFN === ""){
        let splitTempFN = document.getElementById("patSelect").value;
         splitNameArray = splitTempFN.split(" ");
         editedPatientFN = splitNameArray[2];
     }

     if(editedPatientLN === ""){
        let splitTempLN = document.getElementById("patSelect").value;
        splitNameArray = splitTempLN.split(" ");
        editedPatientLN = splitNameArray[3];
     }
    
    if(editedPatientFN.match(/\d/)){
      let removeFN = document.getElementsByTagName("p")[5];
        removeFN.removeAttribute("hidden");
        removeFN.innerHTML = "You cannot enter any numerical values in the First Name.";
        document.getElementById("saveThisPatient").innerHTML = "";
        return;
}   else {
            let removeThis = document.getElementsByTagName("p")[5];
    	removeThis.setAttribute("hidden", true);
}

    if(editedPatientLN.match(/\d/)){
        let removeFN = document.getElementsByTagName("p")[6];
        removeFN.removeAttribute("hidden");
        removeFN.innerHTML = "You cannot enter any numerical values in the Last Name.";
        document.getElementById("saveThisPatient").innerHTML = "";
        return;
}   else {
        let removeThis = document.getElementsByTagName("p")[6];
    	    removeThis.setAttribute("hidden", true);
}

    if (editedPatientHR >= 480){
        let removeID = document.getElementsByTagName("p")[7];
        removeID.removeAttribute("hidden");
        removeID.innerHTML = "The highest recorded HR to date is less than 480. Try lower.";
        document.getElementById("saveThisPatient").innerHTML = "";
        return;
}   else {
        let removeID = document.getElementsByTagName("p")[7];
            removeID.setAttribute("hidden", true);
}
        let editedPatient = {
            "doctor": {
                "id": editDoctorId,
                "firstName": editDoctorFirstName,
                "lastName": editDoctorLastName
            },
                    "id": editPatientId,
                    "firstName": editedPatientFN,
                    "lastName": editedPatientLN,
                    "heartRate": editedPatientHR
        }

    ajaxPut(putUrl, printResponse, editedPatient);

}

//the DELETE REQUEST
function ajaxDelete(url, callback, deletePatientObj){
    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", url);
    xhr.onreadystatechange = function(){
        if(xhr.readyState===4 && xhr.status===200){
            return callback(this);
        } if (xhr.status === 204){
            document.getElementById("deleteSuccess").innerHTML = "The selected patient was deleted. Please refresh the page below to view the updated patients table.";
        }
    }
    xhr.setRequestHeader("Content-Type", "application/json");
    let jsonDelete = JSON.stringify(deletePatientObj);
    xhr.send(jsonDelete);
}

function deleteDisplay(patId, patFirst, patLast){
        let deletePatSelect = document.getElementById("delPatSelect");
        let delOptionPat = document.createElement("option");
    
        deletePatSelect.appendChild(delOptionPat);
        delOptionPat.innerHTML =+patId+" -- "+patFirst+" "+patLast;  
    }

function displayAllInfo(xhr){
    let patientDeletion = JSON.parse(xhr.response);
    for (patientcall of patientDeletion){
        deleteDisplay(patientcall.id, patientcall.firstName, patientcall.lastName);
    }
}

function deleteThePatient(){
    let deletePatString = document.getElementById("delPatSelect").value;
    let splitDelete = deletePatString.split(" ");
    let ourDeletedId = splitDelete[0];

    let deleteThisPatient = {
         "doctor": {
            "id": 1,
            "firstName": "string",
            "lastName": "string"
        },
        "id": ourDeletedId,
        "firstName": "string",
        "lastName": "string",
        "heartRate": 0
    }

  ajaxDelete(deleteUrl, printResponse, deleteThisPatient);
}

function printResponse(){
    console.log(xhr.response);
}


