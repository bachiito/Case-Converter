const textArea = document.querySelector("textarea");
const fileName = document.getElementById("file-name").value;

let upperCaseBtn = document.getElementById("upper-case");
upperCaseBtn.addEventListener("click", function() {
    textArea.value = textArea.value.trim().toUpperCase();
});

let lowerCaseBtn = document.getElementById("lower-case");
lowerCaseBtn.addEventListener("click", function() {
    textArea.value = textArea.value.trim().toLocaleLowerCase();
});


/** 
 * Returns the textArea value with the first letter of every word capitalized
 * From: this is the proper case text
 * To: This Is The Proper Case Text
 */

let properCaseBtn = document.getElementById("proper-case");
properCaseBtn.addEventListener("click", properCase);

function properCase() {
    let finalString = "";
    const array = textArea.value.trim().toLowerCase().split(" ");
    array.forEach(word => finalString += `${word.charAt(0).toUpperCase().concat(word.slice(1))} `);
    textArea.value = finalString.trim();
}


/**
 * Returns the textArea value with the first letter of every sentence capitalized
 * From: this is the sentence case. bro 
 * To: This is the sentence case. Bro.
 */

let sentenceCaseBtn = document.getElementById("sentence-case");
sentenceCaseBtn.addEventListener("click", sentenceCase);

function sentenceCase() {
    let finalString = "";
    const array = textArea.value.toLowerCase().split(".");
    
    for (let i = 0; i < array.length; i++) {
        let sentence = array[i].trim();
        
        if (sentence.length > 0){
            finalString += `${sentence.charAt(0).toUpperCase().concat(sentence.slice(1))}. `;
        }
    }
    
    textArea.value = finalString.trim();
}

/**
 * File saving function
 */

let saveBtn = document.getElementById("save-text-file");
saveBtn.addEventListener("click", function() {
download(`${fileName.trim()}.txt`, textArea.value);
});

function download(fileName, text) {
    let a = document.createElement("a");
    a.setAttribute("href", "data:text/plain; charset=UTF-8," + encodeURIComponent(text));
    a.setAttribute("download", fileName);
    a.style.display = "none";

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}