# CS10-GoodNews

# Description: Github Workflow

❗❗❗❗❗❗❗❗❗❗❗❗❗❗

Description
Fixes # (issue)

❗❗❗❗❗❗❗❗❗❗❗❗❗❗

## Type of change

Please delete options that are not relevant.

-   [ ] Bug fix (non-breaking change which fixes an issue)
-   [ ] New feature (non-breaking change which adds functionality)
-   [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
-   [ ] This change requires a documentation update

# How Has This Been Tested?

Please describe the tests that you ran to verify your changes. Provide instructions so we can reproduce. Please also list any relevant details for your test configuration

-   [ ] Automatic tests
-   [ ] Manual tests. Please outline

# Checklist:

-   [ ] My code follows the style guidelines of this project
-   [ ] I have performed a self-review of my own code
-   [ ] My code has been reviewed by at least one peer
-   [ ] I have commented my code, particularly in hard-to-understand areas
-   [ ] I have made corresponding changes to the documentation
-   [ ] My changes generate no new warnings
-   [ ] I have added tests that prove my fix is effective or that my feature works
-   [ ] New and existing unit tests pass locally with my changes

# API Endpoints
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