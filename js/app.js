const modal = document.querySelector(".modal");
const modalMessage = document.querySelector(".modal-msg");
const closeModal = document.querySelector(".close-modal");
const form = document.getElementById("form");
const fileName = document.getElementById("file-name");
const textarea = document.getElementById("textarea");
const upperCaseBtn = document.getElementById("upper-case");
const lowerCaseBtn = document.getElementById("lower-case");
const properCaseBtn = document.getElementById("proper-case");
const sentenceCaseBtn = document.getElementById("sentence-case");
const saveBtn = document.getElementById("save-text");

upperCaseBtn.addEventListener(
  "click",
  () => (textarea.value = textarea.value.trim().toUpperCase())
);

lowerCaseBtn.addEventListener(
  "click",
  () => (textarea.value = textarea.value.trim().toLocaleLowerCase())
);

/**
 * Returns the textarea value with the first constter of every word capitalized
 * From: this is the proper case text
 * To: This Is The Proper Case Text
 */

properCaseBtn.addEventListener("click", () => {
  textarea.value = textarea.value
    .trim()
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase().concat(word.slice(1)))
    .join(" ");
});

/**
 * Returns the textarea value with the first constter of every sentence capitalized
 * From: this is the sentence case. bro
 * To: This is the sentence case. Bro.
 */

sentenceCaseBtn.addEventListener("click", () => {
  textarea.value = textarea.value
    .trim()
    .toLowerCase()
    .split(". ")
    .map(sentence => sentence.charAt(0).toUpperCase().concat(sentence.slice(1)))
    .join(". ");

  if (textarea.value.charAt(textarea.value.length - 1) !== ".") {
    textarea.value += ".";
  }
});

closeModal.addEventListener("click", () => {
  modal.close();
});

saveBtn.addEventListener("click", () => {
  if (fileName.value.length < 1) {
    form.addEventListener("submit", e => e.preventDefault());
    modalMessage.innerText = "Please give your file a name.";
    modal.showModal();
    return;
  }

  if (textarea.value.length < 1) {
    form.addEventListener("submit", e => e.preventDefault());
    modalMessage.innerText = "Please enter the text you want to convert.";
    modal.showModal();
    return;
  }

  download(`${fileName.value.trim()}.txt`, textarea.value);
});

function download(fileName, text) {
  const a = document.createElement("a");

  a.setAttribute(
    "href",
    "data:text/plain; charset=UTF-8," + encodeURIComponent(text)
  );

  a.setAttribute("download", fileName);
  a.style.display = "none";

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
