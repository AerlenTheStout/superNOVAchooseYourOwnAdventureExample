      var cps = parseFloat(localStorage.getItem("cps")) || 0;

function getRandomItem(arr) {
    const index = Math.floor(Math.random() * arr.length);
    return arr[index];
}
var cursors = parseInt(localStorage.getItem("cursors"))||0;
var clicks = 0;
var milk = parseInt(localStorage.getItem("milk"))||0;
var farms = parseInt(localStorage.getItem("farms"))||0;
var grandmas = parseInt(localStorage.getItem("grandmas"))||0;
var mines = parseInt(localStorage.getItem("mines"))||0;
var factories =  parseInt(localStorage.getItem("factories"))||0;
if (grandmas==null){
    grandmas =0;
}

if (cps == null){
    cps=0;
}
const broadcasts = ["New lifeforms primarily made of your cookies are discovered daily.","Scientists say everything is made of cookies.","People are liking your cookies.","You're the talk of the town.", "Your bakery is the popular hangout spot of the locals.","Everyone talks about your cookies.","At least 5 governments have adopted your cookies as their official currency.","Candid photos of celebs eating your cookies are going viral.","There was a party of famous people who were eating 1000 of your cookies each in the tropics. They mysteriously fell ill. Experts blame the evil eye.","Your cookies are being worshipped in the new religion, Cookie Love.","It has become a crime to not consume one cookie per day.","Your cookies are reselling for millions of dollars, and thus collapsing the world economy. ","People are getting addicted to your cookies.","You were the named the 2025 Time Person of The Year.","Scientists are noticing a disturbing amount of micro-cookies deposited in nature. The cause is unknown.","hy is y eyboard issig eys?!?!","Does anyone even read these messages?","Your cookies are being sent to astronauts on the ISS.","5% of organic matter is now cookies!!!"]

function setup_fetch(){
    if (localStorage.getItem("GS")){
        const parent = document.getElementById('mission_list');
        const child = document.createElement('li');
        child.textContent = 'Getting Started';
        parent.appendChild(child);
    }  if (localStorage.getItem("Bakery")){
        const parent = document.getElementById('mission_list');
        const child = document.createElement('li');
        child.textContent = 'Bakery';
        parent.appendChild(child);
    } 
    if (localStorage.getItem("Cookie Machine")){
        const parent = document.getElementById('mission_list');
        const child = document.createElement('li');
        child.textContent = 'Cookie Machine/1 Billion Cookies';
        parent.appendChild(child);
    }if (localStorage.getItem("Talk")){
        const parent = document.getElementById('mission_list');
        const child = document.createElement('li');
        child.textContent = 'Talk of The Apartment Building';
        parent.appendChild(child);
    } if (localStorage.getItem("too")){
        const parent = document.getElementById('mission_list');
        const child = document.createElement('li');
        child.textContent = 'Too Much COOOOOOOKIES!!!';
        parent.appendChild(child);
    } if (localStorage.getItem("Diabetes")){
       const parent = document.getElementById('mission_list');
        const child = document.createElement('li');
        child.textContent = 'Diabetes';
        parent.appendChild(child); 
    
    } } if (localStorage.getItem("Rich and Powerful")){
       const parent = document.getElementById('mission_list');
        const child = document.createElement('li');
        child.textContent = 'Rich and Powerful';
        parent.appendChild(child); 
    
    } 
    if (localStorage.getItem("Millionaire")){
       const parent = document.getElementById('mission_list');
        const child = document.createElement('li');
        child.textContent = 'Millionaire';
        parent.appendChild(child); 
    
    }
    if (localStorage.getItem("Public Health Epidemic")){
       const parent = document.getElementById('mission_list');
        const child = document.createElement('li');
        child.textContent = 'Public Health Epidemic';
        parent.appendChild(child); 

    } 
    if (localStorage.getItem("Cookie Cultivator")){
       const parent = document.getElementById('mission_list');
        const child = document.createElement('li');
        child.textContent = 'Cookie Cultivator';
        parent.appendChild(child); 

    } 

document.addEventListener('DOMContentLoaded', () => {
  // Your JavaScript code here will execute once the DOM is ready.
  // For example, you can safely access and manipulate DOM elements here.
  setup_fetch();
  buildings =["cursors","grandmas","farms","mines","factories"];
  buildings.forEach(element => {
    if(localStorage.getItem(element)>0){
        if(element=="cursors"){
            document.getElementById("sell-cursor").style="";

        }
        if(element=="grandmas"){
            document.getElementById("sell-grandma").style="";
        }
        if(element=="farms"){
            document.getElementById("sell-farm").style="";
        }
        if(element=="mines"){
            document.getElementById("sell-mine").style="";
        }
        if(element=="factories"){
            document.getElementById("sell-factory").style="";
        }
    }
  });
  document.getElementById("autoclicker").innerHTML="CPS: "+ cps;
  document.getElementById("grandmaBuy").innerHTML = "<img src='grandma.webp' height='50px' width='50px' alt='Cursor Icon'>Buy Grandma (100 Cookies-+1 CPS). " + grandmas + " grandmas.";
   document.getElementById("farmBuy").innerHTML = "<img src='farm.webp' height='50px' width='50px' alt='Farm Icon'>Buy Farm (1000 Cookies-+8 CPS). " + farms + " farms."; 
document.getElementById("cursorBuy").innerHTML = "<img src='cursor.png' height='50px' width='50px' alt='Cursor Icon'>Buy Cursor (10 Cookies-+0.1 CPS). " + cursors + " cursors.";
document.getElementById("mineBuy").innerHTML = "<img src='mine.webp' height='50px' width='50px' alt='Mine Icon'>Buy Mine (12000 Cookies-+47 CPS). " + mines + " mines."; 
document.getElementById("factoryBuy").innerHTML = "<img src='factory.webp' height='50px' width='50px' alt='Factory Icon'>Buy Factory (100000 Cookies-+260 CPS). " + factories + " factories."; 
    


});

if (cursors == null){
    cursors = 0;
}
function broadcast(){
    document.getElementById("broadcast").innerHTML = getRandomItem(broadcasts);
}
setInterval(broadcast,8000);
window.onload = function () {
    setInterval(() => {
        try {
            console.log("autoclick running—cursors:", cursors);
            autoclick();
        } catch (e) {
            console.error("Error in autoclick interval (autoclick):", e);
        }
    }, 1000);

    // setInterval(() => {
    //     try {
    //         console.log("autoclick running—grandmas:", grandmas);
    //         // grandmaClick();
    //     } catch (e) {
    //         console.error("Error in autoclick interval (grandmaClick):", e);
    //     }
    // }, 1000);

    // setInterval(() => {
    //     try {
    //         console.log("autoclick running—farms:", farms);
    //         farmClick();
    //     } catch (e) {
    //         console.error("Error in autoclick interval (farmClick):", e);
    //     }
    // }, 1000);

    cursors = parseInt(localStorage.getItem("cursors")) || 0;
    clicks = parseInt(localStorage.getItem("cookies")) || 0;
    
    if (clicks === 0) {
        document.getElementById("status").innerHTML = "Press the big cookie to start the game.";
    } else {
        document.getElementById("status").innerHTML = "Press to resume. You have " + clicks + " cookies!";
    }
};


function autoclick() {
    
    if (cursors == 0) {
        console.log("nada");
    } else {
    document.getElementById("autoclicker").style="";
    document.getElementById("autoclicker").innerText="Your CPS: "+cps;
    clicks += cps;
    localStorage.setItem("cookies", clicks);
    document.getElementById("status").innerHTML = "Good job! You have " + clicks + " cookies!"
    ach_logic();
    document.title=clicks+" cookies | Cookie Clicker";
    }}
    // function grandmaClick() {
    
    // if (grandmas>0){
    // document.getElementById("autoclicker").style="";
    // document.getElementById("autoclicker").innerText="Your CPS: "+cps;
    // clicks += grandmas;
    // localStorage.setItem("cookies", clicks);
    // document.getElementById("status").innerHTML = "Good job! You have " + clicks + " cookies!"
    // ach_logic();
    // }}
    // function farmClick() {
    
    // if (farms>0){
    // document.getElementById("autoclicker").style="";
    // document.getElementById("autoclicker").innerText="Your CPS: "+cps;
    // clicks += farms*8;
    // localStorage.setItem("cookies", clicks);
    // document.title=clicks+" cookies | Cookie Clicker";
    // document.getElementById("status").innerHTML = "Good job! You have " + clicks + " cookies!"
    // ach_logic();
    // }}
    // function mineClick() {
    
    // if (mines>0){
    // document.getElementById("autoclicker").style="";
    // document.getElementById("autoclicker").innerText="Your CPS: "+cps;
    // clicks += mines*47;
    // localStorage.setItem("cookies", clicks);
    // document.title=clicks+" cookies | Cookie Clicker";
    // document.getElementById("status").innerHTML = "Good job! You have " + clicks + " cookies!"
    // ach_logic();
    // }}
    // function factoryClick() {
    
    // if (factories>0){
    // document.getElementById("autoclicker").style="";
    // document.getElementById("autoclicker").innerText="Your CPS: "+cps;
    // clicks += factories*260;
    // localStorage.setItem("cookies", clicks);
    // document.title=clicks+" cookies | Cookie Clicker";
    // document.getElementById("status").innerHTML = "Good job! You have " + clicks + " cookies!"
    // ach_logic();
    // }}
function update(text){
        const parent = document.getElementById('mission_list');
//const parent = document.getElementById('mission_list');const child = document.createElement('li');child.textContent = 'Getting Started';parent.appendChild(child);
// Create a new child element
const child = document.createElement('li');
child.textContent = text;

// Add the child to the parent
parent.appendChild(child);
    }
function upgrade(){
    if (clicks>20000){
        clicks-=20000;
        cps=cps*2;
        document.getElementById("autoclicker").innerHTML="CPS: "+cps;
        document.getElementById("status").innerHTML="Your CPS was doubled. You now have " + clicks + " cookies.";
    } else {
        alert("Insufficent cookies!");
    }
    }
function ach_logic(){
    
    if (clicks == 10 && !localStorage.getItem("GS")) {
        alert('Milestone: Getting Started!');
        const parent = document.getElementById('mission_list');
        const child = document.createElement('li');
        child.textContent = 'Getting Started';
        parent.appendChild(child);
        localStorage.setItem("GS",true);

    } else {
        console.log('boring click')
    }
    if (clicks >= 5000 && !localStorage.getItem("Public Health Epidemic")) {
        alert('New Milestone: Public Health Epidemic');
        const parent = document.getElementById('mission_list');
        const child = document.createElement('li');
        child.textContent = 'Public Health Epidemic';
        parent.appendChild(child);
        localStorage.setItem("Public Health Epidemic",true);
    }
    if (clicks >= 50 && !localStorage.getItem("Bakery")) {
        alert('New Milestone: Bakery');
        const parent = document.getElementById('mission_list');
        const child = document.createElement('li');
        child.textContent = 'Bakery';
        parent.appendChild(child);
        localStorage.setItem("Bakery",true);
    }
     if (clicks >= 100000000 && !localStorage.getItem("Cookie Machine")) {
        alert('New Milestone: Cookie Machine/1 Billion Cookies');
        const parent = document.getElementById('mission_list');
        const child = document.createElement('li');
        child.textContent = 'Cookie Machine/1 Billion Cookies';
        parent.appendChild(child);
        localStorage.setItem("Cookie Machine",true);
    }
    if (clicks >= 100 && !localStorage.getItem("Talk")) {
        alert('New Milestone: Talk of The Apartment Building');
        const parent = document.getElementById('mission_list');
        const child = document.createElement('li');
        child.textContent = 'Talk of The Apartment Building';
        parent.appendChild(child);
        localStorage.setItem("Talk",true);
    }
    if (clicks >= 200 && !localStorage.getItem("too")) {
        alert('New Milestone: Too Much Coooookies!!!!!');
        const parent = document.getElementById('mission_list');
        const child = document.createElement('li');
        child.textContent = 'Too Much COOOOOOOKIES!!!';
        parent.appendChild(child);
        localStorage.setItem("too",true);
    }
    if (clicks >= 1000000 && !localStorage.getItem("Millionaire")) {
        alert('New Milestone: Millionaire');
        const parent = document.getElementById('mission_list');
        const child = document.createElement('li');
        child.textContent = 'Millionaire!';
        parent.appendChild(child);
        localStorage.setItem("Millionaire",true);
    }
    if (clicks >= 1000 && !localStorage.getItem("Diabetes")) {
        alert('New Milestone: Diabetes!!!');
        const parent = document.getElementById('mission_list');
        const child = document.createElement('li');
        child.textContent = 'Diabetes!!!!';
        parent.appendChild(child);
        localStorage.setItem("Diabetes",true);
    }
    if (clicks >= 2000000 && !localStorage.getItem("Rich and Powerful")) {
        alert('New Milestone: Rich and Powerful');
        const parent = document.getElementById('mission_list');
        const child = document.createElement('li');
        child.textContent = 'Rich and Powerful';
        parent.appendChild(child);
        localStorage.setItem("Rich and Powerful",true);
    }
    if (clicks >= 100000 && !localStorage.getItem("Cookie Cultivator")) {
        alert('New Milestone: Cookie Cultivator');
        const parent = document.getElementById('mission_list');
        const child = document.createElement('li');
        child.textContent = 'Cookie Cultivator';
        parent.appendChild(child);
        localStorage.setItem("Cookie Cultivator",true);
    }
}
function buyCursor() {
    if (clicks < 10) {
        alert("Insufficient cookies!");
    } else {
        clicks -= 10;
        cursors++;
        cps+=0.1;
        localStorage.setItem("cps",cps);
        localStorage.setItem("cookies", clicks);
        localStorage.setItem("cursors", cursors)
        document.getElementById("sell-cursor").style="";
        document.getElementById("sell-cursor").innerHTML="Sell Cursor";
    document.getElementById("autoclicker").innerText="Your CPS: "+cps;
        document.getElementById("status").innerHTML = "Purchased! You now have " + clicks + " cookies!";
        document.getElementById("cursorBuy").innerHTML = "<img src='cursor.png' height='50px' width='50px' alt='Cursor Icon'>Buy Cursor (10 Cookies-+0.1 CPS). " + cursors + " cursors.";
    }
}
function sell(what){
    if (what=="grandma"){
        if (grandmas >0){
        grandmas-=1;
        clicks+=100;
        localStorage.setItem("cookies", clicks);
localStorage.setItem("grandmas", grandmas);
        document.getElementById("status").innerHTML="Sold! You now have " + clicks + " cookies!"
        document.getElementById("grandmaBuy").innerHTML = "<img src='grandma.webp' height='50px' width='50px' alt='Cursor Icon'>Buy Grandma (100 Cookies-+1 CPS). " + grandmas + " grandmas.";
        } else{
            alert("Nothing to sell.")
        }
    } else if (what=="cursor"){
        if (cursors >0){
        cursors-=1;
        clicks+=10;
        document.getElementById("status").innerHTML="Sold! You now have " + clicks + " cookies!"
        localStorage.setItem("cookies", clicks);
localStorage.setItem("cursors", cursors); // or grandmas

        document.getElementById("cursorBuy").innerHTML = "<img src='cursor.png' height='50px' width='50px' alt='Cursor Icon'>Buy Cursor (10 Cookies-+0.1 CPS). " + cursors+ " cursors.";
        } else{
            alert("Nothing to sell.")
        }

    } else if (what=="farm"){
        if (farms >0){
        farms-=1;
        clicks+=1000;
        document.getElementById("status").innerHTML="Sold! You now have " + clicks + " cookies!"
        localStorage.setItem("cookies", clicks);
localStorage.setItem("farms", farms); // or grandmas

        document.getElementById("farmBuy").innerHTML = "<img src='farm.webp' height='50px' width='50px' alt='Farm Icon'>Buy Farm (1000 Cookies-+8 CPS). " + farms+ " farms.";
        } else{
            alert("Nothing to sell.")
        }
    } else if (what=="mine"){
        if (mines >0){
        mines-=1;
        clicks+=12000;
        document.getElementById("status").innerHTML="Sold! You now have " + clicks + " cookies!"
        localStorage.setItem("cookies", clicks);
localStorage.setItem("mines", mines); // or grandmas

        document.getElementById("mineBuy").innerHTML = "<img src='mine.webp' height='50px' width='50px' alt='Mine Icon'>Buy Mine (12000 Cookies-+47 CPS). " + mines+ " mines.";
        } else{
            alert("Nothing to sell.")
        }
    }else if (what=="factory"){
        if (factories >0){
        factories-=1;
        clicks+=100000;
        document.getElementById("status").innerHTML="Sold! You now have " + clicks + " cookies!"
        localStorage.setItem("cookies", clicks);
localStorage.setItem("factories", factories); // or grandmas

        document.getElementById("factoryBuy").innerHTML = "<img src='factory.webp' height='50px' width='50px' alt='Factory Icon'>Buy Factory (100000 Cookies-+260 CPS). " + factories+ " factories.";
        } else{
            alert("Nothing to sell.")
        }
    }
}
function buyGrandma() {
    if (clicks < 100) {
        alert("Insufficient cookies!");
    } else {
        clicks -= 100;
        grandmas++;
        document.getElementById("sell-grandma").style="";
        document.getElementById("sell-grandma").innerHTML="Sell Grandma";
        cps++;
        localStorage.setItem("cps",cps);
        localStorage.setItem("cookies", clicks);
        localStorage.setItem("grandmas", grandmas)
        
    document.getElementById("autoclicker").innerText="Your CPS: "+cps;
        document.getElementById("status").innerHTML = "Purchased! You now have " + clicks + " cookies!";
        document.getElementById("grandmaBuy").innerHTML = "<img src='grandma.webp' height='50px' width='50px' alt='Cursor Icon'>Buy Grandma (100 Cookies-+1 CPS). " + grandmas + " grandmas.";
    }
}
if (localStorage.getItem("ethics") === null) {
    localStorage.setItem("ethics", false);
}

if (grandmas>0){
    document.getElementById("sell-grandma").style="";
    if(!localStorage.getItem("ethics")){
    localStorage.setItem("ethics",true);
    alert("New Milestone: Unethical Behavior");
    const parent = document.getElementById('mission_list');
        const child = document.createElement('li');
        child.textContent = 'Unethical Behavior';
        parent.appendChild(child);
    }
    document.getElementById("sell-grandma").innerHTML="Sell Grandma";
}
if (!cursors==0){
    document.getElementById("sell-cursor").style="";
        document.getElementById("sell-cursor").innerHTML="Sell Cursor";
}
function buyFactory() {
    if (clicks < 100000) {
        alert("Insufficient cookies!");
    } else {
        clicks -= 100000;
        factories++;
        document.getElementById("sell-factory").style="";
        document.getElementById("sell-factory").innerHTML="Sell Factory";
        cps+=260;
        localStorage.setItem("cps",cps);
        localStorage.setItem("cookies", clicks);
        localStorage.setItem("factories", factories)
        
    document.getElementById("autoclicker").innerText="Your CPS: "+cps;
        document.getElementById("status").innerHTML = "Purchased! You now have " + clicks + " cookies!";
        document.getElementById("factoryBuy").innerHTML = "<img src='factory.webp' height='50px' width='50px' alt='Factory Icon'>Buy Factory (100000 Cookies-+260 CPS). " + factories + " factories.";
    }}
function buyMine() {
    if (clicks < 12000) {
        alert("Insufficient cookies!");
    } else {
        clicks -= 12000;
        mines++;
        document.getElementById("sell-mine").style="";
        document.getElementById("sell-mine").innerHTML="Sell Mine";
        cps+=47;
        localStorage.setItem("cps",cps);
        localStorage.setItem("cookies", clicks);
        localStorage.setItem("mines", mines)
        
    document.getElementById("autoclicker").innerText="Your CPS: "+cps;
        document.getElementById("status").innerHTML = "Purchased! You now have " + clicks + " cookies!";
        document.getElementById("mineBuy").innerHTML = "<img src='mine.webp' height='50px' width='50px' alt='Mine Icon'>Buy Mine (12000 Cookies-+47 CPS). " + mines + " mines.";
    }}
function buyFarm() {
    if (clicks < 1000) {
        alert("Insufficient cookies!");
    } else {
        clicks -= 1000;
        farms++;
        document.getElementById("sell-farm").style="";
        document.getElementById("sell-farm").innerHTML="Sell Farm";
        cps+=8;
        localStorage.setItem("cps",cps);
        localStorage.setItem("cookies", clicks);
        localStorage.setItem("farms", farms)
        
    document.getElementById("autoclicker").innerText="Your CPS: "+cps;
        document.getElementById("status").innerHTML = "Purchased! You now have " + clicks + " cookies!";
        document.getElementById("farmBuy").innerHTML = "<img src='farm.webp' height='50px' width='50px' alt='Farm Icon'>Buy Farm (1000 Cookies). " + farms + " farms.";
    }
}
if (localStorage.getItem("ethics") === null) {
    localStorage.setItem("ethics", false);
}

if (grandmas>0){
    document.getElementById("sell-grandma").style="";
    if(!localStorage.getItem("ethics")){
    localStorage.setItem("ethics",true);
    alert("New Milestone: Unethical Behavior");
    const parent = document.getElementById('mission_list');
        const child = document.createElement('li');
        child.textContent = 'Unethical Behavior';
        parent.appendChild(child);
    }
    document.getElementById("sell-grandma").innerHTML="Sell Grandma";
}
if (!cursors==0){
    document.getElementById("sell-cursor").style="";
        document.getElementById("sell-cursor").innerHTML="Sell Cursor";
}