// Select elements for the holder, rocket, flames, and rocketDiv
const holder = document.querySelector("#holder");
const rocket = document.querySelector("#rocket");
const flames = document.querySelector("#flames");
const rocketDiv = document.querySelector("#rocketDiv");
const progress = document.querySelector('progress');

// Calculate the height of the holder element minus 155 pixels
let holderHeight = holder.clientHeight - 155;

// Initialize an options object and a limit for the number of documents to retrieve
let options = {};
const limit = 3;

// Get the value of the "lastLimit" cookie and parse it as an integer
const lastLimit = parseInt(getCookie("lastLimit"));

// Define the query to retrieve documents from the "recents" collection in Firestore
// Sort the documents in descending order by the "date" field and limit the number to the value of the "limit" variable
const query = db.collection("recents").orderBy("date", "desc").limit(limit);
getData()

// Define the "fly" function to handle the scroll event
function fly() {
    // Get the scroll position and total scrollable height of the document
    let h = document.documentElement,
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';

    // Calculate the percentage of the page that has been scrolled
    let percent = ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;

    // If the page has not been scrolled at all, disable the flames animation
    if (percent == 0) {
        flames.classList.add("unEnabled");
        flames.style.animation = "none";
    } 
    // Otherwise, enable the flames animation
    else {
        flames.classList.remove("unEnabled");
        flames.style.animation = "exhaust 1s linear infinite";
    }

    // Move the rocketDiv element based on the scroll position of the page
    rocketDiv.style.transform = "translateY" + "(" + (-holderHeight * percent)/100 + "px)";
}

// Add an event listener for the scroll event
window.addEventListener("scroll", fly);

// Call the "fly" function to check the scroll position on page load
fly();

// Reset the scroll position of the page to the top when the page finishes loading
window.onload = function () {
    window.scrollTo(0, 0);
}
