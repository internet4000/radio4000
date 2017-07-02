# Radio4000

The main front-end web application for Radio4000.

See the continous integration: https://gitlab.com/internet4000/radio4000/pipelines

## How to develop

Make sure Ember CLI is installed globally, then clone this project and install it's dependencies:

```
npm install --global ember-cli phantomjs-prebuilt
git clone git@gitlab.com:internet4000/radio4000.git
cd radio4000
npm install
bower install
npm start
```

## Testing

Run `npm test` for a single test or `ember test --server` to start a test server.

## Deployment

If this is your first time deploying, install the Firebase CLI: `npm i -g firebase-tools` and run `firebase login` first.

To deploy to staging aka https://radio4000-staging.firebaseapp.com, run:

`npm run build; npm run deploy-firebase-staging`

To deploy to production aka https://radio4000.com:

1. Make sure your master branch is up to date
2. Use `release-it` to tag a new release
3. `git checkout production; git pull; git merge master --no-ff`
4. `npm run build-production; npm run deploy-firebase-production`

For Firebase security rules, see the `private/rules` folder.

## Icons

Make sure gulp is installed globally with `yarn global add gulp-cli`.

1. Place svg icons in `public/assets/images/icons`
2. Run `gulp icons` to update the SVG sprites.

If your icon is called `hello-world.svg` you can add `class="icon-hello-world"` to an element to use it.

## Backend

We use Firebase as our database and API. It's connected through Ember Data and [Emberfire](https://github.com/firebase/emberfire). The security rules are in the [radio4000-api](https://github.com/internet4000.com/radio4000-api) repository.

## Google API

We're using the YouTube API to detect video titles etc. If you run into trouble with permissions or domains, check here https://console.developers.google.com/project/much-play/

