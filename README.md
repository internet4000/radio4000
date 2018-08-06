# Radio4000

This project is the main front-end web application for Radio4000, CMS for music
libraries &rarr; https://radio4000.com.

Join the discussion about the evolution and the development of this
project on the Github issues, and on the matrix chat
[radio4000:matrix.org](https://riot.im/app/#/group/+radio4000:matrix.org).

## Presentation

This project aims at development and discussions on building a fair
and open access ecosystem of tools and services; for music and
cultural goods to be globally accessed and explored.

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

Clone this repository, install dependencies and start a development server:

```
git clone git@github.com:internet4000/radio4000.git
cd radio4000
yarn
yarn start
```

Note: We recommend `yarn` to ensure you get exact dependencies. But
you can also use `npm` this way:

```
git clone git@github.com:internet4000/radio4000.git
cd radio4000
npm install
npm start
```

The start command will launch the application locally, so you can find
it in your browser at this URL: `http://localhost:4000`.

## Testing

Run `yarn test` for a single test or `yarn ember test --server` to start a test server.

Lint scripts with:

* `npm run lint:js`
* `npm run lint:js -- --fix`

## Backend

We use Google's Firebase as our database and API, as for
authentication (see next section).

The security rules, deciding what can be done on each endpoint are in the [radio4000-api](https://github.com/internet4000/radio4000-api) repository.

By default this repository will use the radio4000 development database, but it will work
with any Firebase database instance.

To run your own firebase instance, in the file
`radio4000/config/environment.js` you will have to update the the key
`ENV.firebase.databaseURL` to the URL of your instance as provided by
Firebase. 

Ember Data is used for the local data store, and also to build the API calls.
[Emberfire](https://github.com/firebase/emberfire) is used for its
adapter and serializers to our Firebase database.

The YouTube API can be used to fetch video titles when you paste in a
URL. The API key comes from
https://console.developers.google.com/apis/credentials?project=firebase-radio4000.

## Authentication

We're using a combination of [Firebase
Authentication](https://firebase.google.com/products/auth/),
[Torii](https://github.com/vestorly/torii) and
[EmberFire](https://github.com/firebase/emberfire/blob/master/docs/guide/authentication.md)
to handle authentication.

For authentication to work, in the file
`radio4000/config/environment.js` you will have to update the the key
`ENV.firebase.authDomain` to the URL of your instance as provided by
Firebase. For this, first activate authentication in your Firebase's
project authentication settings panel.

At the moment, authentication can be enabled with `Email and Password`,
`Google`, `Facebook`. Note that social providers authentication with
Google and Facebook will be shutdown in future versions.

To access authentication in the Ember application, all routes and
controllers come with the `session` service already injected.

To get the current user (model), do `this.get('session.currentUser')`. 

For more on auth, check the folders `app/auth` and `app/torii-adapters` as well as the above links.

## Deployment

The site is hosted on netlify.com. Netlify will automatically deploy each branch and pull request.

- The `production` branch is mirrored to https://radio4000.com
- The `master` branch to https://master--radio4000.netlify.com

See [contributing.md](https://github.com/internet4000/radio4000/blob/master/CONTRIBUTING.md) for more.
