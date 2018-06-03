var fs = require('fs');
/**
 * Function to write results to file results.json ONLY RECENT 5 RESULTS ARE STORED
*/
function writeResults(results) {
    var jsonObj = {
        timeStamp: new Date().getTime(),
        results: results
    }
    //Write code to store results to a file results.json
    readResults().then(function (data) {
        if (data) {
            //SORT THE RESULTS
            data.sort(function compareResultsByTime(left, right) {
                return left.timeStamp < right.timeStamp;
            });
            // IF ARRAY LENGTH IS GREATER THAN 4 REMOVE EXCESS ELEMENTS
            if (data.length > 4) {
                data.splice(4);
            }
            data.unshift(jsonObj);
        } else {
            // IN CASE NO RESULTS ARE PRESENT CREATE NEW ARRAY
            data = [];
            data.push(jsonObj);
        }
        // WRITE TO FILE SYNCHRONOUSLY
        fs.writeFileSync('dist/results.json', JSON.stringify(data), 'utf-8');
    }).catch(function (err) {
        console.log("ERROR WHILE READING OLD DATA : " + err);
    });
}
/**
 * Function to get all the stored results as JSON
*/
function readResults() {
    if (!fs.existsSync('dist/results.json')) {
        var create = createFile();
        create.then(function () {
            console.log("FILE CREATED SUCCESSFULLY!!");
        });
    }
    return new Promise(function (resolve, reject) {
        fs.open('dist/results.json', 'r', function (err, file) {
            if (err) {
                throw err;
            }
            try {
                var content = fs.readFileSync(file, 'utf-8');
                if (content) {
                    resolve(JSON.parse(content));
                } else {
                    resolve();
                }
            } catch (error) {
                console.log(error);
                reject();
            }
        });
    });
}
/**
 * Function to get latest results as JSON
*/
function getRecentResults() {
    return new Promise(function (resolve, reject) {
        readResults().then(function (data) {
            if (data) {
                //SORT THE RESULTS
                data.sort(function compareResultsByTime(left, right) {
                    return left.timeStamp < right.timeStamp;
                });
                //Compare with previous data
                var progressData;
                if (data.length > 1) {
                    progressData = getProgressData(data[0], data[1]);
                } else {
                    progressData = data[0];
                }
                resolve(progressData);
            } else {
                // IN CASE NO RESULTS ARE PRESENT CREATE NEW ARRAY
                console.log("NO RECENT RECORD PRESENT..");
                resolve(false);
            }
        }).catch(function (err) {
            console.log("ERROR WHILE READING OLD DATA : " + err);
            reject();
        });
    });
}

function createFile() {
    return new Promise(function (resolve, reject) {
        //CREATE NEW FILE 
        try {
            var createStream = fs.createWriteStream("dist/results.json");
            createStream.end();
            resolve();
        } catch (err) {
            console.log("ERROR WHILE CREATING FILE : ", err);
            reject();
        }
    });
}

function getProgressData(current, previous) {
    for (currentResult of current.results) {
        for (previousResult of previous.results) {
            if (currentResult.url === previousResult.url) {
                currentResult.mobileUsabilityProgress = currentResult.mobileUsability - previousResult.mobileUsability;
                currentResult.mobileSpeedProgress = currentResult.mobileSpeed - previousResult.mobileSpeed;
                currentResult.desktopSpeedProgress = currentResult.desktopSpeed - previousResult.desktopSpeed;
                current.previousTimeStamp = previous.timeStamp;
            } 
        }
    }
    return current;
}

module.exports = {
    writeResults: writeResults,
    getRecentResults: getRecentResults
};