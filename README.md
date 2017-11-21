# Radio4000

The main front-end web application for Radio4000, CMS for music libraries &rarr; https://radio4000.com

## How to develop

Make sure Ember CLI is installed globally, then clone this project and install it's dependencies:

```
npm install --global ember-cli 
git clone git@gitlab.com:internet4000/radio4000.git
cd radio4000
npm install
npm start
```

## Testing

Run `npm test` for a single test or `ember test --server` to start a test server.

## Deployment

The site is hosted on netlify.com. Netlify will automatically deploy each branch and PR. The `production` branch is mirrored to https://radio4000.com and `master` to https://master--radio4000.netlify.com (live db and no authentication). See [contributing.md](https://github.com/internet4000/radio4000/blob/master/CONTRIBUTING.md) for more.

## Backend

We use Firebase as our database and API. It's connected through Ember Data and [Emberfire](https://github.com/firebase/emberfire). The security rules are in the [radio4000-api](https://github.com/internet4000/radio4000-api) repository.

For Firebase security rules, see the https://github.com/internet4000/radio4000-api repository.

## Google API

We use the YouTube API to detect video titles etc. If you run into trouble with permissions or domains, check here https://console.developers.google.com/project/much-play/.
