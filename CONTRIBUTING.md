# The development workflow of Radio4000

Repository: https://github.com/internet4000/radio4000/

We follow a basic Git Flow with two long-lived branches: `master` and `production`. Let’s walk through it…

## 1. Start work, create branch

Start your work by creating a branch from an up to date `master` branch. It makes sense to name your branch like “feature/track-search” or “fix/wrong-sidebar-width” but anything goes.

```
git checkout master
git pull
git checkout -b feature/track-search
```

## 2. Push branch, open PR, get feedback

As soon you’d like feedback, push the branch and open a pull request on GitHub.

```
git checkout feature/track-search
git push origin HEAD
open https://github.com/internet4000/radio4000/pulls
```

Netlify will build and deploy every pushed branch and pull request with a unique URL at the bottom of every GitHub PR. Use this to play around and see if everything is great. It usually takes 1-2 minutes from the time you push till it is online. We will help review the PR and merge it back into master once done. Travis also runs automatic tests that can help find typos or other mistakes. Once merged, the branch can be deleted.

## 3. Deploy to radio4000.com

To deploy to production, you should do two things:  1) tag a new release on `master` 2) merge `master` into `production`. Push both branches to GitHub. Let Netlify deploy it.

```
git checkout master; git pull --rebase
release-it
# if you know git tags, you can manually update version in package.json and use `git tag` 
git push --tags
git checkout production; git pull --rebase
git push
```

For more information on why we’re doing this, see

http://doc.gitlab.com/ee/workflow/gitlab_flow.html
https://guides.github.com/introduction/flow/
