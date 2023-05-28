// Select the progress bar element, the "c-h" element, and the "more" link element
const progress = document.querySelector('progress');
const c_h = document.getElementById('c-h');
const moreLink = document.getElementById('more');

// Initialize a variable to store the last document retrieved in the query
let lastDoc;

// Define an array of categories
// add all the categories you want and perserve the index of each category 
// this step is important for firestore and datbase
const categories = ["علوم عامة"];

// Get the query string from the URL and create an object to hold the parameters
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// Get the "filter" parameter from the query string
const filter = urlParams.get('filter');

// Initialize an options object and a limit for the number of documents to retrieve
let options = {};
const limit = 10;

// Get the value of the "lastLimit" cookie and parse it as an integer
let lastLimit = parseInt(getCookie("lastLimit"));

// If the "filter" parameter does not match a category in the "categories" array, redirect to the "newest-articles.html" page
if (!categories[filter]) {
    window.location.replace("/newest-articles.html");
}

// Set the inner HTML of the "c-h" element to the selected category
c_h.innerHTML = categories[filter];

// Define the query to retrieve documents from the "recents" collection in Firestore
// Filter the documents to only include those with a "category" field matching the selected category
// Sort the documents in descending order by the "date" field and limit the number to the value of the "limit" variable
const query = db.collection("recents").where("category", "==", parseInt(filter)).orderBy("date", "desc").limit(limit);
getData();

// Add a click event listener to the "more" link element
moreLink.addEventListener('click', async () => {
    // Retrieve additional documents from the database, starting after the last document retrieved
    let querySnapshot = await query.startAfter(lastDoc).get();

    // If the querySnapshot is empty, hide the "more" link element
    if (querySnapshot.empty) {
        moreLink.style.display = 'none';
    }

    // Loop through each document in the querySnapshot and call the "queryThings" function on it
    querySnapshot.forEach((doc) => {
        queryThings(doc);
    });

});
