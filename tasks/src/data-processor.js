class DataProcessor {
  constructor() {
    //default constructor
  }
  process(url, mData, dData) {
    var jsonObject = {
      url: url,
      mobileSpeed: mData.ruleGroups.SPEED.score,
      mobileUsability: mData.ruleGroups.USABILITY.score,
      desktopSpeed: dData.ruleGroups.SPEED.score

    }
    return jsonObject;
  }
}
module.exports = {
  DataProcessor: DataProcessor
}
