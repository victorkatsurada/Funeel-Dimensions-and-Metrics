// abre o detalhamento das rules
document.querySelector("#expand-all").click()
var rulesConditionals = [];
var allElementsArray = Array.from(document.querySelectorAll("div.rule__operator-value-pair > *"));
// dimensionID
var dataSourceId = document.querySelector("div.name-value-list__values.break-all > *").innerText;
// dimensionName
var dataSourceName = document.querySelector("div.name-value-list__values.undefined > *").innerText;
allElementsArray.forEach((element, index) => {
  if (index % 2 === 0) {
    var n = 0;
    var flagElement = element;
    while (n < 5) {
      flagElement = flagElement.parentElement;
      n++;
    };
    if (flagElement.querySelector("div.rules__title") && flagElement.querySelector("div.rules__title").innerText) {
      var mediaName = flagElement.querySelector("div.rules__title").innerText;
    } 
    else {
      // em alguns casos nao tem midia
      var mediaName = ''
    };
    var platformFieldElement = flagElement.querySelector("div.rule > div.rule__then span.metric-lbl__name") || flagElement.querySelector("div.rule > div.rule__then span.dim-lbl__name") || flagElement.querySelector("div.rule > div.rule__then span > span")
    var conditionFieldElement = element.parentElement.parentElement.querySelector("div.rule__field > a > span > span.svg-icon__container") || ''
    var conditional;
    if (!conditionFieldElement) {
      conditionFieldElement = element.parentElement.parentElement.parentElement.querySelector("div.rule__field > a > span > span");
      conditional = element.parentElement.parentElement.parentElement.querySelector("div.rule__field > a > span > i").title;
    }
    else {
      conditional = conditionFieldElement.title;
      conditionFieldElement = conditionFieldElement.parentElement;
    }
    var platformField;
    if (platformFieldElement.parentElement.parentElement.href) {
      platformField = platformFieldElement.innerText;
      // id da plataforma
      platformFieldElement = platformFieldElement.parentElement.parentElement.href.split('/').slice(-1);
    } 
    // quando nao tem link 
    else {
      platformFieldElement = platformFieldElement.innerText;
      platformField = platformFieldElement;
    };
    /*
    1- dimension_index
    2- dimension
    3- dimension_id
    4- condition_index
    5- platform
    6- condition_field
    7- condition
    8- condition_value
    9- platform_field_or_value
    10 - platform_field_id
    */
    rulesConditionals.push(
      `0 , 
      ${dataSourceName} , 
      ${dataSourceId} , 
      0 , 
      ${mediaName.replace(/For |all | data/g, "")} , 
      (${(conditional)}) ${conditionFieldElement.innerText} , 
      ${element.innerText} , 
      ${allElementsArray[index + 1].innerText.replaceAll('\/', '')} , 
      ${platformField} , 
      ${platformFieldElement}`
    );
  }
});

var dataSource = [];
Array.from(document.querySelectorAll("#dimension-overview-page > div.included-rules__container > div.included-rules__inner > div > div > div > span.ml-xs")).forEach(ruleElement => {
  var ruleValue;
  if (ruleElement.parentElement.parentElement.querySelector('div.rules__title-values span.rule-then-description > span') && ruleElement.parentElement.parentElement.querySelector('div.rules__title-values span.rule-then-description > span').innerText) {
    ruleValue = ruleElement.parentElement.parentElement.querySelector('div.rules__title-values span.rule-then-description > span').innerText;
  } else {
    ruleValue = '';
  };
  var ruleId
  if (ruleElement.parentElement.parentElement.querySelector('div.rules__title-values a') && ruleElement.parentElement.parentElement.querySelector('div.rules__title-values a').href) {
    ruleId = ruleElement.parentElement.parentElement.querySelector('div.rules__title-values a').href.split('/').slice(-1);
  } else {
    ruleId = ruleValue
  }
  dataSource.push(
    `0 , 
    ${dataSourceName} , 
    ${dataSourceId} , 0 , 
    ${ruleElement.innerText.replace(/For |all | data/g, "")} , 
    , 
    is , 
    , 
    ${ruleValue} , 
    ${ruleId}`
  );
});

var concatDataSources = rulesConditionals.concat(dataSource);
copy(concatDataSources);
