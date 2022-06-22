const cURL = "images/checked.png";
const uURL = "images/unchecked.png";

let q1, q2, q3; // "one", "two", "three"
let vq1, vq2, vq3; // "shy", "nerd", etc.

const endResult = document.querySelector("#end"); // Final result
const reset = endResult.querySelector("button"); // Reset button
reset.addEventListener("click", restart);

const total = document.querySelectorAll(".choice-grid div");
listeners();

function listeners() {
    for (const ans of total)
        ans.addEventListener("click", select)
}

function removeLis() {
    for (const ans of total)
        ans.removeEventListener("click", select)
}

function select(event) {
    const current = event.currentTarget;
    current.classList.remove("unsel");
    current.classList.add("sel");
    const checkbox = current.querySelector(".checkbox");
    checkbox.src = cURL;

    // Checks questionId of the current answer
    switch(current.dataset.questionId) { 
        case "one":
            q1 = current.dataset.questionId;
            vq1 = current.dataset.choiceId;
            break;
        case "two":
            q2 = current.dataset.questionId;
            vq2 = current.dataset.choiceId;
            break;
        case "three":
            q3 = current.dataset.questionId;
            vq3 = current.dataset.choiceId;
            break;
    }

    styleAdjust(current.dataset.questionId, current.dataset.choiceId);
}

function styleAdjust(checkId, checkVal) {
    for(const ans of total) {
        if(ans.dataset.questionId == checkId && ans.dataset.choiceId != checkVal) {
            ans.classList.remove("sel");
            ans.classList.add("unsel");
            ans.querySelector(".checkbox").src = uURL;
        }
    }
    completionCheck();
}

function completionCheck() {
    if(q1 && q2 && q3) {
        removeLis();

        if(vq1 === vq2 || vq1 === vq3) results(1);
        else if(vq2 === vq1 || vq2 === vq3) results(2);
        else if(vq1 !== vq2 && vq2 !== vq3) results(3);
    }
}

function results(i) {
    endResult.classList.remove("hidden");
    
    // Defaults to the latter, which applies to both i = 1 and i = 3
    if(i === 2) {
        endResult.querySelector("h1").textContent = RESULTS_MAP[vq2].title;
        endResult.querySelector("p").textContent = RESULTS_MAP[vq2].contents;
    }
    else {
        endResult.querySelector("h1").textContent = RESULTS_MAP[vq1].title;
        endResult.querySelector("p").textContent = RESULTS_MAP[vq1].contents;
    }

    window.scrollTo(0, document.body.scrollHeight);
}

function restart() {
    listeners();

    q1 = undefined; q2 = undefined; q3 = undefined;

    for (const ans of total) {
        ans.classList.remove("unsel");
        ans.classList.remove("sel");
        ans.querySelector(".checkbox").src = uURL;
    }
    endResult.classList.add("hidden");
    window.scrollTo(0,0);
}