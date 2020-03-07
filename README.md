# Radio4000

This repository is the main website for Radio4000, web CMS for streamed media libraries &rarr; https://radio4000.com.

Join the discussion about the evolution and the development of Radio4000 on 
[GitHub issues](https://github.com/internet4000/radio4000/issues) and the 
[#radio4000:matrix.org](https://riot.im/app/#/group/+radio4000:matrix.org) chat.

## Presentation

This project aims at development and discussions on building a fair
and open access ecosystem of tools and services; for music and
cultural goods to be globally accessed and explored.

The goals and objectives of Radio4000 are defined in its
[manifest](https://github.com/internet4000/publications/blob/master/radio4000-manifest.md).

The application in this repository is written in JavaScript, using the frontend framework
[Ember.js](https://emberjs.com) for the client part of the
application. Ember Data is used for the local data store, and also to build the API calls.
[Emberfire](https://github.com/firebase/emberfire) is used for its
adapter and serializers to our Firebase database.

The server part is, for now, using Google's Firebase and the code can
be found on
the[radio4000-api](https://github.com/internet4000/radio4000-api)
repository.

The code for the music player used by this project can be found at 
[radio4000-player](https://github.com/internet4000/radio4000-player).

The plan is to move everything to libre software, self-hosted, with
decentralization in mind. It is not there yet and we would love
assistance in architecture and development.

## Using

To use Radio4000, you only have to visit
[radio4000.com](https://radio4000.com), and start discovering new user
selections.

The rest of this document will introduce some of the technical aspects
of:
- setting up and running an instance of Radio4000 (ex: radio3999.com)
- developping features and fixing bugs for the Radio4000 project

## Development

See the file [contributing](./CONTRIBUTING.md), for more information
on how to contribute to the project.

### Pre-requisites

To start developing on this project (namely radio4000, radio4000-cms,
r4-cms), you will have to:

1. have [git setup](https://help.github.com/en/github/getting-started-with-github/set-up-git).
2. have [npm setup (recommended install:
   nvm)](https://github.com/nvm-sh/nvm)
3. have the npm package [yarn set up](https://yarnpkg.com); it is then used as an alternative
   to npm in this project

Then, clone this repository, install dependencies and start a development server:

```
git clone git@github.com:internet4000/radio4000.git
cd radio4000
yarn
yarn start
```

The start command will launch the application locally, find it in your
browser at http://localhost:4000.

By default this repository uses the `radio4000-staging` database. It
can also work with any other instance of Firebase Realtime database.

### Testing

Run `yarn test` for a single test or `yarn ember test --server` to start a test server.

Lint scripts with:

* `yarn lint:js`
* `yarn lint:js -- --fix`


## Deployment of the production version (radio4000.com)

The site is hosted on netlify.com. Netlify deploys each branch and pull request automatically. 

[![Netlify Status](https://api.netlify.com/api/v1/badges/a3870014-9717-4014-8cb2-ae448ffa1d76/deploy-status)](https://app.netlify.com/sites/radio4000/deploys)

- The `production` branch to https://radio4000.com ([request new deployment](https://github.com/internet4000/radio4000/compare/production...master?expand=1))
- The `master` branch to https://master--radio4000.netlify.com

> Branch deploys are lowercased and hyphenated. That is, a branch named `feat/my-feature` would result in the URL `feat-my-feature--radio4000.netlify.com`. It usually takes ~2 minutes from git push to deployment is live.

See [contributing.md](https://github.com/internet4000/radio4000/blob/master/CONTRIBUTING.md) for more.

## Backend (api.radio4000.com)

We use Google's Firebase as our backend (database and API, on Google
Cloud Engine), as well as for authentication.

> Firestore is not supported. Plans are more leaning toward moving off
> Google's infrastructures.

### Security Rules

The security rules defining what can be read, updated, written,
deleted, on each API endpoints are in the
[radio4000-api](https://github.com/internet4000/radio4000-api)repository,
in the `./database.rules.json` file.

> You will need to use this file to setup you database instance if you are
> running your instance of radio4000. In the Firebase Console of your
> project, under Datatbase > Rules.

### Running your own instance

To run your own firebase instance:

1. on the [Firebase Console](https://console.firebase.google.com),
   create new project, to get an instance of Firebase Realtime database.

2. update the security rules of your project's database, as described
   in the section above, [**Security**](./#Security Rules)
	 
3. If there you don't have an app already, create one of type `Web
App`. You can fin the values for your application, in your firebase
project's console, at `Settings > Project Settings > General > Your
Apps`. This will provide us the Firebase API keys.

### API Keys

Add your API keys to the CMS, in the file `./config/environment.js`

#### Firebase keys

- `apiKey` : `'your-api-key'`
- `authDomain` : `'your-project.firebaseapp.com'`
- `databaseURL` : `'your-project.firebaseio.com'`
```

> You will have to update the following keys, for the default
> environment, as well as `production` depending on your objectives.

## Authentication

We're using a combination of [Firebase
Authentication](https://firebase.google.com/products/auth/),
[Torii](https://github.com/vestorly/torii) and
[EmberFire](https://github.com/firebase/emberfire/blob/master/docs/guide/authentication.md)
to handle authentication.

To access authentication in the Ember application, all routes and
controllers come with the `session` service already injected.

To get the current user (model), do `this.get('session.currentUser')`. 

For more on auth, check the folders `app/auth` and `app/torii-adapters` as well as the above links.

## Firebase configuration

Links:
- firebase project console: https://console.firebase.google.com
- google cloud console (GCC) (> credentials): https://console.cloud.google.com/apis/credentials

> At the moment, authentication can be enabled with `Email and
> Password`, `Google`, `Facebook`. Note that social providers
> authentication with Google and Facebook will be shutdown in future versions.

For authentication to work, you need to already have setup the
Firebase keys in the file `radio4000/config/environment.js`

### Email/password

1. In your project's console, `Authentication > Sign-in methods`, activate **Email/Password** (no
need of activating email-link).

2. In the Google Cloud Console, create a new api key (name: `auth`)

- Application restrictions: HTTP referrers
- Website restriction: `https://your-domain.com/*` +
  `https://your-project.firebaseapp.com/*`
- API restriction (1): Identity Toolkit API

You should be done!

### oAuth2 social login

#### Google

1. In the Google cloud Console, create a new `OAuth 2.0 Client IDs`

Set the settings to:
- Authorized JavaScript origins: `https://your-domain.com`
- Authorized redirect URIs: `https://your-domain.com` +
  `https://your-project.firebaseapp.com/__/auth/handler`
	
Copy, for the next step, the `Client ID` and `Client secret` values.

2. In your project's console, `Authentication > Sign-in methods`,
activate **Google**.

Under `Sign-in methods > Google > Web SDK configuration`, paste the
**Client ID** and **Secret** you copied before; save.

3. Check the oAuth Consent Screen section,
   https://console.cloud.google.com/apis/credentials/consent
	 
- Scopes for Google APIs: only the default (and minimum...), don't
  require anything else, it is already too much (email, profile, openID).
- Authorized domains: `your-domain.com` +
  `your-project.firebaseapp.com`
	
	
#### Facebook

1. On the Facebook for Developers site
   (https://developers.facebook.com), get the **App ID** and an **App Secret**
   for your app.
	 
2. On your Firebase project console, at `Authentication > Sign-in
   methodes > Facebook`, **activate** Facebook, then paste in **App ID**
   and **Secret**

