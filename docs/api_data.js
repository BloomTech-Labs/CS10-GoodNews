define({ "api": [
  {
    "type": "",
    "url": "api/article/post-article",
    "title": "",
    "group": "Api_group:_Articles_Router",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \"id\": \"id\", \"name\": \"Article Name\",\"url\": \"https://www.cnn.com/article.html\",\"timestamp\": \"timestamp\",\"description\": \"description\",\"keywords\": [ \"keyword\"],\"summary\": \"summary\",\"content\": \"content\",\"clickbait\": \"0\",\"imageurl\": \"https://imageurl.com/image\"}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Post a new article</p>",
    "permission": [
      {
        "name": "needs-auth"
      }
    ],
    "version": "0.0.0",
    "filename": "article/ArticleRouter.js",
    "groupTitle": "Api_group:_Articles_Router",
    "name": "ApiArticlePostArticle"
  },
  {
    "type": "get",
    "url": "api/article/get-articles/:flag/:activePage",
    "title": "",
    "group": "Api_group:_Articles_Router",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example",
          "content": "[\n{\n      \"_id\": \"_id\",\n      \"id\": \"id\",\n      \"name\": \"Article Name\",\n      \"url\": \"https://www.cnn.com/article.html\",\n      \"timestamp\": \"timestamp\",\n     \"description\": \"description\",\n      \"keywords\": [ \n         \"keyword\"\n    ],\n      \"summary\": \"summary\",\n      \"content\": \"content\",\n      \"clickbait\": \"0\",\n      \"createdAt\": Date,\n      \"imageurl\": \"https://imageurl.com/image\"\n }\n]",
          "type": "json"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "flag",
            "description": "<p>can be either &quot;0&quot; or &quot;1&quot;</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "activePage",
            "description": "<p>string that represents a number in the 1-30 range</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "article/ArticleRouter.js",
    "groupTitle": "Api_group:_Articles_Router",
    "name": "GetApiArticleGetArticlesFlagActivepage"
  }
] });
