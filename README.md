# CS10-GoodNews
A clickbait-free news aggregator

## Motivation
This project exists to bring news from a variety of sources to readers, while filtering out clickbait articles. Users can browse through a list of article titles (with a brief description) that link to the original source.

## Build status
TODO

## Code style
TODO

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
 
## Screenshots


## Tech Used
<b>Built with</b>
- [React](https://reactjs.org/)
- [Node](https://nodejs.org/en/)
- [Express](http://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Semantic-UI](https://semantic-ui.com/)

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
### Back end tests:
in root directory
```
npm test
```

### Front end tests:
in client directory
```
npm test
``` 

## How to use?
TODO
If people like your project they’ll want to learn how they can use it. To do so include step by step guide to use your project.

## Contribute
TODO
Let people know how they can contribute into your project. A [contributing guideline](https://github.com/zulip/zulip-electron/blob/master/CONTRIBUTING.md) will be a big plus.

## Credits
TODO
Give proper credits. This could be a link to any repo which inspired you to build this project, any blogposts or links to people who contrbuted in this project.

## License
TODO
A short snippet describing the license (MIT, Apache etc)
