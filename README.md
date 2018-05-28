# Radio4000

This project is the main front-end web application for Radio4000, CMS for music
libraries &rarr; https://radio4000.com.

Join the discussion about the evolution and the development of this
project on the Github issues, and on the matrix chat
[radio4000:matrix.org](https://riot.im/app/#/group/+radio4000:matrix.org).

## Presentation

This project aims at development and discussions on building a fair
and open access ecosystem of tools and services; for music and
cultural goods to be globaly accessed and explored.

Radio4000 goals and objectives are defined in its
[manifest](https://github.com/internet4000/publications/blob/master/radio4000-manifest.md).

The application in this repository is written in Javascript, using the frontend framework
[Ember.js](https://emberjs.com) for the client part of the
application.

The server part, is for now using Google's
Firebase, and the code can
be found on the [radio4000-api](https://github.com/internet4000/radio4000-api)
repository. The plan is to move everything to libre software,
self-hosted, with decentralization in mind. It is not there yet and
would love some assistance in architecture and development.

The music player used by this project,
[radio4000-player](https://github.com/internet4000/radio4000-player),
is written using the framework vue.js.

## Development

Clone repository, install dependencies and start a development server:

```
git clone git@gitlab.com:internet4000/radio4000.git
cd radio4000
yarn
yarn start
```

Note: We recommend `yarn` to ensure you get exact dependencies. But
you can also use `npm` this way:

```
git clone git@gitlab.com:internet4000/radio4000.git
cd radio4000
npm install
npm start
```

By default the project will use radio4000 development database, but it will work
Firebase instance can be used.

To run your own firebase instance, in the file
`radio4000/config/environment.js` you will have to update the the key
`ENV.firebase.databaseURL` to the URL of your instance as provided by
Firebase. 

For authentication to work, also update the `authDomain` to the URL
provided by Firebase after having activated it your Firebase's project
authentication settings panel.

At the moment, authentication can be enable with `Email and Password`,
`Google`, `Facebook`. Note that social providers authentication with
Google and Facebook will be shutdown in future versions.

## Testing

Run `yarn test` for a single test or `yarn ember test --server` to start a test server.

## Deployment

The site is hosted on netlify.com. Netlify will automatically deploy each branch and pull request.

- The `production` branch is mirrored to https://radio4000.com
- The `master` branch to https://master--radio4000.netlify.com

See [contributing.md](https://github.com/internet4000/radio4000/blob/master/CONTRIBUTING.md) for more.

## Backend

We use Firebase as our database and API. It's connected through Ember Data and [Emberfire](https://github.com/firebase/emberfire). The security rules are in the [radio4000-api](https://github.com/internet4000/radio4000-api) repository.

We use the YouTube API to fetch video titles when you paste in a URL. The API key comes from https://console.developers.google.com/apis/credentials?project=firebase-radio4000.

## Authentication

We're using a combination of [Firebase Authentication](https://firebase.google.com/products/auth/), [Torii](https://github.com/vestorly/torii) and [EmberFire](https://github.com/firebase/emberfire/blob/master/docs/guide/authentication.md) to handle authentication.

All routes and controllers come with the `session` service already injected. To get the current user (model), do `this.get('session.currentUser')`. 

For more on auth, check the folders `app/auth` and `app/torii-adapters` as well as the above links.
