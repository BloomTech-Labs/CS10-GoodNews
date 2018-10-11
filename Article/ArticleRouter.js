const router = require('express').Router()
const Article = require('./Article')
const User = require('../User/User')
const { isLoggedIn } = require('../controllers/auth')

// POST to /api/article/ endpoint
router.route('/post-article').post(isLoggedIn, post)
// GET Articles with either 1 or 0 flag for clickbait
router.route('/get-articles/:flag/:activePage').get(getArticles)
// GET Article by its _id
router.route('/get/:articleid').get(getArticleId)
// GET User's saved articles.
router.route('/user-saved').get(isLoggedIn, getUserSaved)
// GET top 5 keywords.
router.route('/topfive').get(getTopFive)
// GET Article by keyword.
router.route('/:keyword').get(getKey)
// PUT - add or del into/from User's saved_articles
router.route('/:articleid/:type').put(isLoggedIn, putSavedArticle)

// GET generate top keywords for Trending Topics
function getTopFive (req, res) {
  let now = Date.now()
  const date = new Date(now)
  const offset = date.getTimezoneOffset() * 60 * 1000
  now += offset
  Article
    .aggregate([
      { $match: {
        'clickbait': '0',
        'timestamp': {
          $lte: new Date(now),
          $gte: new Date(now - 24 * 60 * 60 * 1000)
        }
      } },
      { $project: { keywords: 1 } },
      { $unwind: '$keywords' },
      { $group: {
        _id: { keyword: '$keywords' },
        count: { $sum: 1 }
      } },
      { $sort: { count: -1 } }
    ], (err, topKeys) => {
      if (err) res.status(500).json(err)
      const topFive = topKeys.slice(0, 5)
      res.status(200).json(topFive)
    })
}

// GET get articles by keyword Route=/:keyword
function getKey (req, res) {
  const keyword = req.params.keyword

  Article.find({ keywords: keyword, clickbait: '0' })
    .sort({ timestamp: -1 })
    .then(articles => res.status(200).json(articles))
    .catch(err => res.status(500).json(err))
}

// GET request for articles
function getArticles (req, res) {
  let { flag, activePage } = req.params
  const now = Date.now()
  let gte = now - (activePage * 12 * 60 * 60 * 1000)
  let lte = now - ((activePage - 1) * 12 * 60 * 60 * 1000)
  let gteDate = new Date(gte)
  let lteDate = new Date(lte)
  let offsetGte = gteDate.getTimezoneOffset() * 60 * 1000
  let offsetLte = lteDate.getTimezoneOffset() * 60 * 1000
  switch (flag) {
    case '0':
      // fetches articles for the past 7 days
      Article.find({ clickbait: '0',
        timestamp: {
          $gte: new Date(gte + offsetGte),
          $lte: new Date(lte + offsetLte)
        } })
        .sort({ timestamp: -1 })
        .then(foundArticles => res.status(200).json(foundArticles))
        .catch(err => res.status(500).json(err))
      break
    case '1':
      // fetches articles for the past 7 days
      Article.find({ clickbait: '1',
        timestamp: {
          $gte: new Date(gte + offsetGte),
          $lte: new Date(lte + offsetLte)
        } })
        .sort({ timestamp: -1 })
        .then(foundArticles => res.status(200).json(foundArticles))
        .catch(err => res.status(500).json(err))
      break
    default:
      // fetches articles for the past 24 hours
      Article.find({ timestamp: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } })
        .sort({ timestamp: -1 })
        .then(expected => res.status(200).json(expected))
        .catch(err => res.status(500).json(err.message))
      break
  }
}

// GET request for Article ID
function getArticleId (req, res) {
  const articleid = req.params.articleid
  Article.findById(articleid)
    .then(foundArticle => res.status(200).json(foundArticle))
    .catch(err => res.status(404).json(err.message))
}

// POST to create a new Article document
function post (req, res) {
  const article = new Article(req.body)
  article
    .save()
    .then(expected => res.status(201).json(expected))
    .catch(err => res.status(500).json(err.message))
}

// PUT request to User's saved_articles
function putSavedArticle (req, res) {
  const { articleid, type } = req.params
  const { userid } = req.headers
  Article.findById(articleid)
    .then(foundArticle => {
      User.findById({ _id: userid })
        .then(foundUser => {
          switch (type) {
            case 'add':
              foundUser.saved_articles.push(foundArticle)
              User.findByIdAndUpdate(userid, { saved_articles: foundUser.saved_articles })
                .then(() => {
                  User.findById(userid)
                    .then(updatedUser => res.status(200).json(updatedUser))
                    .catch(err => res.status(500).json(err))
                })
                .catch(err => res.status(500).json(err))
              break
            case 'del':
              foundUser.saved_articles.pull(foundArticle)
              User.findByIdAndUpdate(userid, { saved_articles: foundUser.saved_articles })
                .then(() => {
                  User.findById(userid)
                    .populate('saved_articles')
                    .then(updatedUser => res.status(200).json(updatedUser))
                    .catch(err => res.status(500).json(err))
                })
                .catch(err => res.status(500).json(err))
              break
            default:
              res.status(500).json('Error adding/deleting an article!')
              break
          }
        })
    })
    .catch(err => {
      res.status(500).json(err.message)
    })
}

// GET User's saved_articles.
function getUserSaved (req, res) {
  const { userid } = req.headers
  User.findById(userid)
    .populate({ path: 'saved_articles', options: { sort: { timestamp: -1 } } })
    .then(expected => res.status(200).json(expected))
    .catch(err => res.status(500).json(err))
}

module.exports = router
