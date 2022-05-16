var rulesConditionals = []
var allElementsArray = Array.from(document.querySelectorAll("div.rule__operator-value-pair > *"))
var dataSourceId = document.querySelector("div.name-value-list__values.break-all > *").innerText
var dataSourceName = document.querySelector("div.name-value-list__values.undefined > *").innerText
allElementsArray.forEach((element, index) => {
  if (index % 2 === 0) {
    let n = 0
    var flagElement = element
    while (n < 6) {
      flagElement = flagElement.parentElement
      n++
    }
    var mediaName = flagElement.querySelector("div.rules__title").innerText
    var platformFieldElement = flagElement.querySelector("div.rule > div.rule__then span.metric-lbl__name") || flagElement.querySelector("div.rule > div.rule__then span.dim-lbl__name")
    var conditionFieldElement = element.parentElement.parentElement.querySelector("div.rule__field > a > span > span.svg-icon__container") || ''
    if (!conditionFieldElement) {
      conditionFieldElement = element.parentElement.parentElement.querySelector("div.rule__field > a > span > i").title
    }
    else {
      conditionFieldElement = conditionFieldElement.title
    }
    rulesConditionals.push(`0 , ${dataSourceName} , ${dataSourceId} , 0 , ${mediaName.replace(/For |all | data/g, "")} , (${(conditionFieldElement)}) ${element.parentElement.parentElement.querySelector("div.rule__field > a > span > span.dim-lbl__name").innerText} , ${element.innerText} , ${allElementsArray[index + 1].innerText.replaceAll('\/', '')} , ${platformFieldElement.innerText} , ${platformFieldElement.parentElement.parentElement.href.split('/').slice(-1)}`)
  }
})

var dataSource = []
Array.from(document.querySelectorAll("#dimension-overview-page > div.included-rules__container > div.included-rules__inner > div > div > div > span.ml-xs")).forEach(x => {
  dataSource.push(x.innerText.replace(/For |all | data/g, ""))
})

var concatDataSources = rulesConditionals.concat(dataSource)
copy(concatDataSources)