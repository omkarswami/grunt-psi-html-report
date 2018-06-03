const fs = require('fs');
const psi = require('psi');
const dp = require('./data-processor');
const jsonDataManager = require('./json-results-manager');
var promiseArray = [];
var resultArray = [];
function processFile(inputArray) {
    return new Promise(function (resolve, reject) {
        var dataPromise = getJSONData(inputArray);
        dataPromise.then(function () {
            Promise.all(promiseArray).then(function (data) {
                //GENERATE JSON DATA FILE
                jsonDataManager.writeResults(data);
                resolve();
            }).catch(function (error) {
                console.error(error);
                reject();
            })
        });
    });
}

function getJSONData(inputArray) {
    return new Promise(function (resolve, reject) {

        let DataProcessor = dp.DataProcessor;
        var processor = new DataProcessor();
        inputArray.forEach(function (url) {
            promiseArray.push(new Promise(function (resolve, reject) {
                var result = {};
                var mobileData;
                var desktopData;
                psi(url, {
                    nokey: 'true',
                    strategy: 'mobile'
                }).then(data => {
                    mobileData = data;
                    psi(url, {
                        nokey: 'true',
                        strategy: 'desktop'
                    }).then(data => {
                        desktopData = data;
                        result = processor.process(url, mobileData, desktopData);
                        resolve(result);
                    });
                });

            }));

        });
        resolve();
    });


}


module.exports.processFile = processFile;