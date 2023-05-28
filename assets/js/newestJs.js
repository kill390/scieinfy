// Select the progress bar element and the "more" link element
const progress = document.querySelector('progress');
const moreLink = document.getElementById('more');

// Initialize an options object and a limit for the number of documents to retrieve
let options = {};
const limit = 10;

// Get the value of the "lastLimit" cookie and parse it as an integer
let lastLimit = parseInt(getCookie("lastLimit"));

// Define the query to retrieve documents from the "recents" collection in Firestore
// Sort the documents in descending order by the "date" field and limit the number to the value of the "limit" variable
let lastDoc;
const query = db.collection("recents").orderBy("date", "desc").limit(limit);
// if(ios()){
//     enablePersistence();
// }

getData();


// Add a click event listener to the "more" link element
moreLink.addEventListener('click', async() => {
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
