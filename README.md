# Radio4000

The main front-end web application for Radio4000.

See the continous integration: https://gitlab.com/internet4000/radio4000/pipelines

## How to develop

Make sure Ember CLI is installed globally, then clone this project and install it's dependencies:

```
npm install -g ember-cli
git clone git@gitlab.com:internet4000/radio4000.git
cd radio4000
npm install; bower install
npm start
```

## Testing

```
npm run lint
npm test
```

## Deployment

To deploy to staging aka https://radio4000-staging.firebaseapp.com, run:

`npm run build; npm run deploy-firebase-staging`

To deploy to production aka https://radio4000.com:

1. Make sure your master branch is up to date 
2. Use `release-it` to tag a new release
3. `git checkout production; git pull; git merge master --no-ff`
4. `npm run build-production; npm run deploy-firebase-production`

## Icons

Put .svg icons in `public/assets/images/icons` and run `gulp icons` to update the SVG sprites.

## Building native apps

Run `npm run build-app`, make some coffee and then check the `dist-electron` folder.

## Emberfire

We use Firebase as our backend through Ember Data and [Emberfire](https://github.com/firebase/emberfire).

## Google API

We're using the YouTube API so you might run into trouble with permissions, domains etc. If so, check here https://console.developers.google.com/project/much-play/

## Firebase security rules

Firebase rules are a bitch but see the `private/rules` folder.

