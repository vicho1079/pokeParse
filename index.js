const colecction = 'LOR';
const rotation = '2022';
const url = 'https://play.limitlesstcg.com/decks?rotation=2022&set=LOR';
const puppeteer = require('puppeteer');
const jsdom = require('jsdom');


(async () =>{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const response = await page.goto(url , {
        waitUntil:["load", "domcontentloaded", 'networkidle0', "networkidle2"]
    });
    const body = await response.text();

    const decks = parseDecks(body);
    console.log(body);
    console.log(decks.slice(0, 10));
    
    await browser.close();
})();

function parseDecks(body){
    const {window: { document } } = new jsdom.JSDOM(body);
    
    const anchors = document.querySelector('table.meta tbody')
                .querySelectorAll('tr[data-share] td:nth-child(3) a');
    const decks = Array.apply(null, anchors);
    return decks.map(elements =>{ 
        return {
        deck_name: elements.textContent,
        deck_url: `https://play.limitlesstcg.com${elements.href}`
        }
    });
}

