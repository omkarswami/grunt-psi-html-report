
const jsonDataManager = require('./json-results-manager');
function generateHTML() {
  var fs = require('fs');
  var htmlString = "";
  var resultPromise = jsonDataManager.getRecentResults();
  var resultArray = [];
  var timeStamp = '';
  resultPromise.then(function (data) {
    console.log(JSON.stringify(data));
    resultArray = data.results;
    timeStamp = data.timeStamp;
    htmlString += '<!DOCTYPE html>';
    htmlString += '<html>';
    htmlString += '<head><title>PageSpeed Results</title></head>';
    htmlString += '<body>';
    htmlString += '<h1>Report Time :' + new Date(timeStamp) + '</h1>';
    htmlString += '<table border="1">';
    //Header row
    htmlString += '<tr>';
    htmlString += '<th>URL</th>';
    htmlString += '<th>Mobile Speed</th>';
    htmlString += '<th>Mobile Usability</th>';
    htmlString += '<th>Desktop Speed</th>';
    htmlString += '</tr>';
    //Header end

    for (var i = 0; i < resultArray.length; i++) {
      htmlString += '<tr>';
      htmlString += '<td>' + resultArray[i].url + '</td>';
      htmlString += '<td>' + resultArray[i].mobileSpeed + ' '+getProgressImageHTML(resultArray[i].mobileSpeedProgress) + '</td>';
      htmlString += '<td>' + resultArray[i].mobileUsability + ' '+getProgressImageHTML(resultArray[i].mobileUsabilityProgress) +'</td>';
      htmlString += '<td>' + resultArray[i].desktopSpeed + ' '+getProgressImageHTML(resultArray[i].desktopSpeedProgress) +'</td>';
      htmlString += '</tr>';

    }

    htmlString += '</table>';
    if (data.previousTimeStamp) {
      htmlString += '<h3>Previous test run at : ' + new Date(data.previousTimeStamp) + '</h3>';
    }
    htmlString += '</body>';
    htmlString += '</html>';
    var out = fs.writeFileSync('dist/result.html', htmlString, 'utf8');
    console.log("HTML Report Genetated Successfully!!!");

  }).catch(function (error) {
    console.log("ERROR WHILE GETTING RECENT RESULTS..", error);
  });

}

function getProgressImageHTML(progress){
  if(progress>0){
    return '<img src="../assets/up.png" title="Up by'+ progress +'points">';
  }else if(progress<0){
    return '<img src="../assets/down.png" title="Down by '+ Math.abs(progress) +' points">';
  }else{
    return '';
  }
}

module.exports.generateHTML = generateHTML;

