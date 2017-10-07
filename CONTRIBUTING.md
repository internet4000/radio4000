# The development workflow of Radio4000

https://github.com/internet4000/radio4000/

This document explains the workflow we normally take when developing on Radio4000. We follow a basic Git Flow with two long-lived branches: `master` and `production`. Let’s walk through it…

## 1. Start work, create branch

Start your work by creating a branch from an up to date `master` branch. It makes sense to name your branch like “feature/track-search” or “fix/wrong-sidebar-width” but anything goes.

```
git checkout master
git pull
git checkout -b feature/track-search
```

Now you do, what you'd like to do, as you do.

## 2. Push branch, open PR, get feedback

As soon you’d like feedback, push the branch and open a pull request on GitHub.

```
git checkout feature/track-search
git push origin HEAD
open https://github.com/internet4000/radio4000/pulls
```

Netlify will deploy every branch and pull request. You can find the URLs at the bottom of the PRs. Use this to play around and see if everything is great. It takes 1-2 minutes from the time you push till it's online.  
We will help review the PR and merge it back into master once done. Travis also runs automatic tests that can help find typos or other mistakes. Once merged, the branch can be deleted.

## 3. Deploy to radio4000.com

To deploy to production, you should do two things:  tag a new release on master and merge master into production. Push both branches to GitHub. Let Netlify deploy it.

```
git checkout master; git pull --rebase
git tag 5.3.2
release-it
git push --tags
git checkout production; git pull --rebase
git push
```

The `release-it` command increments the version in package.json and pushes a new, tagged release commit. If you know git tags, feel free to do this yourself. We follow semver, mostly or less, since this is a website after all - and not a library.

For more information on why we’re doing this, see:

- http://doc.gitlab.com/ee/workflow/gitlab_flow.html
- https://guides.github.com/introduction/flow/
