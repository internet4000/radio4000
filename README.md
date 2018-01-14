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

We use the YouTube API to fetch video titles when you paste in a URL. The API key comes from https://console.developers.google.com/apis/credentials?project=firebase-radio4000.

## Authentication

We're using a combination of [Firebase Authentication](https://firebase.google.com/products/auth/), [Torii](https://github.com/vestorly/torii) and [EmberFire](https://github.com/firebase/emberfire/blob/master/docs/guide/authentication.md) to handle authentication.

All routes and controllers come with the `session` service already injected. To get the current user (model), do `this.get('session.currentUser')`. 

For more on auth, check the folders `app/auth` and `app/torii-adapters` as well as the above links.
