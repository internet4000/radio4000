# The development workflow of Radio4000

Radio4000 is an open source web application. We welcome anyone to contribute.

This document explains the workflow for developing on Radio4000. We use a basic Git Flow with two long-lived branches: `master` and `production`. 

## Workflow TLDR

- Fork the repository
- Create a branch in your fork
- Create commits and push
- Open a pull request (PR) from your fork to this repo via github.com 

## Workflow

Start your work by creating a branch from an up to date `master` branch. It makes sense to name your branch like “feature/track-search” or “fix/wrong-sidebar-width” but anything goes.

```
git branch my-branch # create your branch
git checkout my-branch # switch to your new branch
```

Now is the time to do your work and commit it.

Next, you push your changes:

```
git push origin my-branch
```

And create a pull request: https://github.com/internet4000/radio4000/pulls

## Deployment previews

Netlify will deploy every pull request to the repo. You can find the URLs at the bottom of the PRs. Use this to play around and see if everything is great. It takes 1-2 minutes from the time you push till it's online.

We will help review the PR and merge it back into master once done. Travis also runs automatic tests that can help find typos or other mistakes. Once merged, the branch can be deleted.

## Deploying to production aka radio4000.com

To deploy to production, you you should create a "tagged release commit" and merge `master` into `production`.

```
# bump version in package.json
git add package.json
git commit -m "Release 1.2.3"
git tag 1.2.3
git push
git push --tags
# open PR from `master` to `production` on github.com
```

Note: the `release-it` package can automate this process. We follow semver, mostly or less, since this is a website after all - and not a library.

For more information on why we’re doing this, see:

- http://doc.gitlab.com/ee/workflow/gitlab_flow.html
- https://guides.github.com/introduction/flow/
