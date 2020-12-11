// https://simple.wikipedia.org/wiki/List_of_countries_by_continents#Africa

const puppeteer = require('puppeteer');

(async ()=>{
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://simple.wikipedia.org/wiki/List_of_countries_by_continents')

    const scrappedData = await page.evaluate(()=>{
        const continents = []
        const countries = []
        document.querySelectorAll('.mw-headline').forEach((country,i)=>{
            if( i > 6 ) return
            i !== 6 
            ? (
                continents.push(country.parentElement.firstChild.innerHTML),
                continents[continents.length-1] !== "Antarctica" 
                ? countries.push(country.parentElement.nextElementSibling.nextElementSibling.textContent)
                : countries.push(null)
                )
                : (
                    continents.push(country.parentElement.childNodes[1].innerHTML),
                    countries.push(null)
                )
        })
        return {continents, countries};
    })

    console.log(scrappedData)
    await page.close()
})();