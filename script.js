sessionStorage.setItem("superNOVA", "true");
sessionStorage.setItem("superNOVA_version", "1.0.0");
sessionStorage.setItem("superNOVA_lastUpdate", new Date().toISOString());
sessionStorage.setItem("superNOVA_author", "Jaxson Yorke");
sessionStorage.setItem("ID", count());




function count() {
    let elements = document.getElementsByTagName("div");
    let counter = 0;
    for (let i = 0; i < elements.length; i++) {
        counter += elements[i].childElementCount;
    }
    return counter;
}



let profileImg = document.getElementById("profileImg");
profileImg.addEventListener("click", function() {
    //This is the spot in the code!
    console.log("ID: " + sessionStorage.getItem("ID"));

    let x = Math.floor(Math.random() * 100) + 1;
    let y = Math.floor(Math.random() * 100) + 1;
    let z = x + y;

    console.log("Math Equation: " + x + " + " + y + " = ?");

    let answer;
    while (parseInt(answer) !== z) {
        answer = prompt("What is the answer to the Math Equation");
        if (parseInt(answer) === z) {
            console.log("Correct!");
            alert("Correct!");
            // Here you can add code to enable SuperNOVA features
            break;
        } else {
            console.log("Incorrect! Try again.");
            alert("Incorrect! Please try again.");
        }
        // console.log(x + " + " + y + " = " + z);
    }
});