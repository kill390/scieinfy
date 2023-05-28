const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

// Configuration object for Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDAFkCcqmYBeFtDIZx7c8Jb9NaUaKJpBLQ",
    authDomain: "scieinfy.firebaseapp.com",
    projectId: "scieinfy",
    storageBucket: "scieinfy.appspot.com",
    messagingSenderId: "921340608972",
    appId: "1:921340608972:web:084109f401e27d0bf99d69"
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


// Check if the app is running on iOS, and if not, enable offline persistence
// if (!ios()) {
//     offline = true;
//     offlineMode();
// }

// async function offlineMode(){
//     try{
//         await firebase.firestore().enablePersistence();
//         enablePersistence()
//     }catch(err){
//         options = {};
//         offline = false;
//         console.log(err);
//         enablePersistence()
//     }

// }

// function enablePersistence() {
//     let fitched = (getCookie("fitched")==="true") ? true : false;

//     if(fitched && limit <= lastLimit && offline){
//         options = { source: 'cache' };
//         console.log("Fitched");
//     }else{
//         console.log('failed to fitch cache');
//     }
//     getDate();
// }

// Function to get the data from Firestore
function getData(){
    console.log("Getting data");
    query.get().then((querySnapshot) => {
        console.log("Succesfully get data");

        if (querySnapshot.size < limit && typeof moreLink !== 'undefined' ) {
            moreLink.style.display = "none";
        }

        //from 0 to 1;
        progress.value = 1;

        setTimeout(() => {
            progress.style.display = "none";
        }, 1500)

        querySnapshot.forEach((doc) => {
            queryThings(doc);
            console.log(doc);
        });
    }).catch((err) => {
        progress.value = 1;
        progress.style.setProperty('--_progress', 'var(--bs-danger)');

        console.log("Error getting documents: ", err);
    });

}

function queryThings(doc){
    let data = doc.data();

    let dateFormat = new Date(data.date.toDate());
    let dateString = dateFormat.getDate() + " " + monthNames[dateFormat.getMonth()] + " " + dateFormat.getFullYear();

    if(data.title && data.summary && data.imgLink && data.url){
        createArticaleCard(data.title, data.summary, data.imgLink, data.url, dateString);
    }
    // let date = new Date();
    // date.setTime(date.getTime() + 1 * 3600 * 1000);
    document.cookie = `fitched=true; max-age=3600`;
    document.cookie = `lastLimit=${(lastLimit >= limit)? lastLimit:limit}; max-age=3600`;
}

// Function to create an article card with the given data
function createArticaleCard(title, summmary, imgLink, url, date) {
    if(title === "" || summmary === "" || imgLink === "" || url === ""){
        return;
    }

    const gruopList = document.getElementById('newest-list-group');

    let itemList = document.createElement('li');
    itemList.classList.add('list-group-item');

    let itemImg = document.createElement('img');
    itemImg.classList.add('item-img');
    itemImg.setAttribute('src',imgLink);
    itemList.appendChild(itemImg);

    let itemContent = document.createElement('div');
    itemContent.classList.add('item-content');

    let dateSpan = document.createElement('span');
    dateSpan.classList.add('date');
    dateSpan.innerHTML = date;
    itemContent.appendChild(dateSpan);
    
    let heading = document.createElement('h2');
    heading.innerHTML = title;
    itemContent.appendChild(heading);
    
    let summaryP = document.createElement('p');
    summaryP.innerHTML = summmary;
    itemContent.appendChild(summaryP);

    itemList.appendChild(itemContent);

    gruopList.appendChild(itemList);
    itemList.addEventListener('click',()=>{
        window.location.href = url;
    });
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function ios() {
    return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
    ].includes(navigator.platform)
        // iPad on iOS 13 detection
        || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}


