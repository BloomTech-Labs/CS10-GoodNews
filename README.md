# Good News
[Good News](https://labs7goodnews.herokuapp.com/): A clickbait-free news aggregator

## Motivation
This project exists to bring news from a variety of sources to readers, while filtering out clickbait articles. Users can browse through a list of article titles (with a brief description) that link to the original source.

## Code style
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
 
## Screenshots
### Soft Landing Page
![LandingPage](ScreenShots/LandingPage.png)

### Sign In and Register
![SignIn](ScreenShots/SignIn.png)
![Register](ScreenShots/Register.png)

### All Articles
![AllArticles](ScreenShots/AllArticles.png)

### Reading List
![ReadingListView](ScreenShots/ReadingListView.png)

### News Sorted by Trending Topic
![TrendingTopicView](ScreenShots/TrendingTopicView.png)

### Evaluate Clickbait View
![EvaluateView](ScreenShots/EvaluateView.png)

### Modals for Reporting
![ReportClickbait](ScreenShots/ReportClickbait.png)
![ReportNonClickbait](ScreenShots/ReportNonClickbait.png)

### Other devices
![TabletView](ScreenShots/TabletView.png)
![MobileView](ScreenShots/MobileView.png)

## Tech Used
<b>Built with</b>
- [React](https://reactjs.org/)
- [Node](https://nodejs.org/en/)
- [Express](http://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)

Here is an [explanation](https://github.com/Lambda-School-Labs/CS10-GoodNews/blob/master/explanation.md) of why whe chose this stack.

## Features
- Browse news articles, without the distraction of clickbait
- Add articles to your reading list for later reading
- See a list of trending topics from the last 24 hours
- Filter articles by topic
- Report clickbait when you see it
- Help us improve our model by evaluating articles that have been labeled as clickbait

## API Endpoints
### User
1. `/api/user/` \
GET to get all users - protected route
2. `/api/user/register/`\
POST to register a new user. Returns userObj={token, user}
3. `/api/user/login/` \
POST to login existing user
4. `/api/user/login/logged` \
GET to get an existing user - protected route. \
PUT to update an existing user - protected route. Returns the updated user. \
DELETE to delete an existing user - protected route. Returns the deleted user.

### Article
1. `/api/article/` \
GET to get all articles. \
POST to load an article into DB - protected route. Returns the saved article.
2. `/api/article/:articleid/` \
GET to get an existing article by MongoDB-generated _id
3. `/api/article/:articleid/:type/` \
where type = 'add' || 'del' \
PUT to add || del an existing article _id to an existing user. Returns the user.

## Installation
`git clone git@github.com:Lambda-School-Labs/CS10-GoodNews.git`

## Data Science
This project was built in collaboration with Data Scientists. The repo for that side of this project is located [here](https://github.com/Lambda-School-Labs/DS-GoodNews)

## Tests
```
npm test
``` 

## Usage
First, visit [Good News](https://labs7goodnews.herokuapp.com/). Here you can browse the news. You can filter by topic, or search by keyword. 

If you'd like, you can create an account by clicking "Sign in" on the top right corner. With an account, you can save articles by adding them to your reading list and report clickbait if you encounter it. 

You can also help us improve our model by reviewing clickbait in the "Evaluate clickbait" view. All articles in the Evaluate section have been labeled as clickbait by our classifier. If you come across an article that has been wrongly labeled, you can send a report. We will use this data to retrain our model.

## Contribute
See our [Contribution Guideline](https://github.com/Lambda-School-Labs/CS10-GoodNews/blob/master/contributing.md) and [Code of Conduct](https://github.com/Lambda-School-Labs/CS10-GoodNews/blob/master/codeOfConduct.md)

## Credits
<b>Web Contributors</b>
[Cassandra Lamendola](https://github.com/CassLamendola)
[Sergey Nam](https://github.com/sharp0111)

<b>Data Science Contributors</b>
[Jason Fleischer](https://github.com/JasonRJFleischer)
[Leo Lam](https://github.com/leocpp)
[Maryna Longnickel](https://github.com/MarynaLongnickel)