import puppeteer from 'puppeteer'

interface Element {
  getAttribute(name: string): string
  value: string
}

const init = async () => {
  console.log('Starting Puppeteer...')
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 800 })
  await page.goto('https://www.youtube.com/')

  await page.waitForSelector('input[name="search_query"]')
  await page.focus('input[name="search_query"]')
  await page.keyboard.type('simple and clean')
  await page.click('button#search-icon-legacy')

  await page.waitForSelector('ytd-video-renderer,ytd-grid-video-renderer', {
    timeout: 10000
  })
  const firstOccurrence = (await page.evaluate(() =>
    document.querySelector('a#video-title')
  )) as HTMLAnchorElement

  firstOccurrence && (await page.goto(firstOccurrence.href))
  !firstOccurrence && console.log('firstOccurrence is null')
}

init()
