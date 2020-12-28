const express = require('express')
const puppeteer = require('puppeteer')
// api开头的
const axios = require('axios')
const app = express()

// async function test() {
//   console.log('截图')
//   const brower = await puppeteer.launch()
//   const page = await brower.newPage()
//   await page.goto('https://www.baidu.com/')
//   await page.screenshot({path: 'baidu.png'})
//   await brower.close()
// }
// test()

const urlCache = {}
app.get('*', async (req, res) => {
  // 遍历所有的路由，都写出html文件，或者都缓存上
  // 1.加缓存
  // 2.lru缓存算法
  if(urlCache[req.url]) {
    return res.send(urlCache[req.url])
  }
  if(req.url === '/favicon.ico') {
    // 对seo无影响
    return res.send({code: 0})
  }
  
  const url = 'http://localhost:9010' + req.url
  const brower = await puppeteer.launch()
  const page = await brower.newPage()
  await page.goto(url, {
    waitUntil: ['networkidle0']
  })
  const html = await page.content()
  urlCache[req.url] = html
  res.send(html)
})

app.listen(9013, () => {
  console.log('ssr server start')
})