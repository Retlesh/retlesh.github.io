import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";
import * as calc from "./IndexCalculations.js"


/* The `firebaseConfig` object contains the configuration settings required to initialize the Firebase
app. It includes properties such as the API key, authentication domain, project ID, storage bucket,
messaging sender ID, app ID, and the URL of the Firebase Realtime Database. These settings are used
by the Firebase SDK to connect to the Firebase services and access the database. */
const firebaseConfig = {
  apiKey: "AIzaSyDsKCO9Xn0n61mAeQcMpjmCrE2M0cRW1MY",
  authDomain: "weather-app-d10c0.firebaseapp.com",
  projectId: "weather-app-d10c0",
  storageBucket: "weather-app-d10c0.appspot.com",
  messagingSenderId: "883222677667",
  appId: "1:883222677667:web:434e7b644748a6fd0c1716",
  databaseURL: 'https://weather-app-d10c0-default-rtdb.europe-west1.firebasedatabase.app'
};


/* `const app = initializeApp(firebaseConfig);` is initializing the Firebase app with the provided
configuration. The `initializeApp` function is a part of the Firebase SDK and it takes the
`firebaseConfig` object as a parameter. This function sets up the necessary configuration for the
Firebase app to connect to the Firebase services, such as the Realtime Database. The returned `app`
object represents the initialized Firebase app and is used to interact with the Firebase services. */
const app = initializeApp(firebaseConfig);


/* The `columnsDictionary` is a JavaScript object that maps specific paths in the Firebase Realtime
Database to corresponding keys in the `ALL_DATA` object. */
const columnsDictionary =
{
  '/daily/apparent_temperature_max/': 'APPARENT_TEMP_MAX_DATA',
  '/daily/apparent_temperature_mean/': 'APPARENT_TEMP_MEAN_DATA',
  '/daily/apparent_temperature_min/': 'APPARENT_TEMP_MIN_DATA',
  '/daily/temperature_2m_max/': 'TEMP_MAX_DATA',
  '/daily/temperature_2m_mean/': 'TEMP_MEAN_DATA',
  '/daily/temperature_2m_min/': 'TEMP_MIN_DATA',
  '/daily/time/': 'TIME_DATA'
}

/* `const database = getDatabase(app);` is creating a reference to the Realtime Database service using
the `getDatabase` function from the Firebase SDK. It takes the `app` instance as a parameter, which
represents the Firebase app that was initialized with the provided configuration. This reference to
the database service is then used to interact with the database, such as reading or writing data. */
const database = getDatabase(app);



/**
 * The function fetchData retrieves data from a database based on specified start and end IDs, and
 * stores the data in an object.
 * @param startId - The startId parameter is the starting point or the minimum value of the key for the
 * data you want to fetch. It is used to filter the data and only retrieve the data with keys greater
 * than or equal to the startId.
 * @param endId - The `endId` parameter is the last ID value that you want to fetch data for. It
 * represents the end point of the range of IDs you want to retrieve data for.
 * @param columns - The `columns` parameter is an array that contains the names of the columns in the
 * database that you want to fetch data from.
 * @returns an object called `ALL_DATA` which contains arrays of data for each column specified in the
 * `columns` parameter.
 */
function fetchData(startId, endId, columns) {

    const ALL_DATA = {
      APPARENT_TEMP_MAX_DATA: [],
      APPARENT_TEMP_MEAN_DATA: [],
      APPARENT_TEMP_MIN_DATA: [],
      TEMP_MAX_DATA: [],
      TEMP_MEAN_DATA: [],
      TEMP_MIN_DATA: [],
      TIME_DATA: []
    }

    columns.forEach(column => {
      let dbRef = ref(database, column);
      onValue(dbRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          if (childSnapshot.key >= startId && childSnapshot.key <= endId) {
            ALL_DATA[columnsDictionary[column]].push(childSnapshot.val());
          }
        });
      });
    });
    return ALL_DATA;

}


/**
 * The function `getDataInRange` fetches data within a specified range of IDs and assigns it for a
 * chart.
 * @param startId - The startId parameter is the ID of the first data point you want to fetch. It
 * represents the starting point of the range of data you want to retrieve.
 * @param endId - The `endId` parameter is the last ID of the data range that you want to fetch.
 * @param columns - The "columns" parameter is an array that specifies the columns of data that you
 * want to fetch. Each element in the array represents a column name or index.
 */
export function getDataInRange(startId, endId, columns) {
  calc.assignDataForChart(fetchData(startId, endId, columns));
}
