const https = require('https')
const Article = require('./Article')
const urlDs = 'https://lab7goodnews-ds.herokuapp.com/stories'

module.exports = function () {
  return (
    setInterval(() => {
      console.log('fetching articles')
      let newTimestamp = new Date(Date.now() - 1 * 60 * 60 * 1000)
      newTimestamp = newTimestamp.toISOString()
      https.get(`${urlDs}/?timestamp="${newTimestamp}"`, (res) => {
        res.setEncoding('utf8')
        let rawData = ''
        res.on('data', (chunk) => {
          rawData += chunk
        })
        res.on('end', () => {
          try {
            const parsedData = JSON.parse(rawData)
            Article
              .insertMany(parsedData, (err, data) => {
                if (err) console.log('insertMany error: ', err)
              })
          } catch (e) {
            console.error('catch error: ', e.message)
          }
        })
      }).on('error', (e) => {
        console.error(`Got error: ${e.message}`)
      })
    }, 1800000)
  )
}
