# Radio4000

This repository is the main website for Radio4000, CMS for music libraries &rarr; https://radio4000.com.

Join the discussion about the evolution and the development of Radio4000 on 
[GitHub issues](https://github.com/internet4000/radio4000/issues) and the 
[radio4000:matrix.org](https://riot.im/app/#/group/+radio4000:matrix.org) chat.

## Presentation

This project aims at development and discussions on building a fair
and open access ecosystem of tools and services; for music and
cultural goods to be globally accessed and explored.

The goals and objectives of Radio4000 are defined in its
[manifest](https://github.com/internet4000/publications/blob/master/radio4000-manifest.md).

The application in this repository is written in JavaScript, using the frontend framework
[Ember.js](https://emberjs.com) for the client part of the application. The server part is, 
for now, using Google's Firebase and the code can be found on the 
[radio4000-api](https://github.com/internet4000/radio4000-api) repository.

The code for the music player used by this project can be found at 
[radio4000-player](https://github.com/internet4000/radio4000-player).

The plan is to move everything to libre software, self-hosted, with decentralization in mind. It is not there yet and we would love assistance in architecture and development.

## Development

Clone this repository, install dependencies and start a development server:

```
git clone git@github.com:internet4000/radio4000.git
cd radio4000
yarn
yarn start
```

Note: we recommend `yarn` to ensure you get exact dependencies, but you can also use `npm` and `npm install`.

The start command will launch the application locally, find it in your browser at http://localhost:4000.

## Testing

Run `yarn test` for a single test or `yarn ember test --server` to start a test server.

Lint scripts with:

* `yarn lint:js`
* `yarn lint:js -- --fix`

## Deployment

The site is hosted on netlify.com. Netlify deploys each branch and pull request automatically. 

[![Netlify Status](https://api.netlify.com/api/v1/badges/a3870014-9717-4014-8cb2-ae448ffa1d76/deploy-status)](https://app.netlify.com/sites/radio4000/deploys)

- The `production` branch to https://radio4000.com ([request new deployment](https://github.com/internet4000/radio4000/compare/production...master?expand=1))
- The `master` branch to https://master--radio4000.netlify.com

> Branch deploys are lowercased and hyphenated. That is, a branch named `feat/my-feature` would result in the URL `feat-my-feature--radio4000.netlify.com`. It usually takes ~2 minutes from git push to deployment is live.

See [contributing.md](https://github.com/internet4000/radio4000/blob/master/CONTRIBUTING.md) for more.

## Backend

We use Google's Firebase as our database and API, as well as for authentication (see next section).

By default this repository will use the Radio4000 staging database, but it will work
with any Firebase database instance.

The security rules, deciding what can be done on each endpoint are in the [radio4000-api](https://github.com/internet4000/radio4000-api) repository.

To run your own firebase instance, in the file
`radio4000/config/environment.js` you will have to update the key
`ENV.firebase.databaseURL` to the URL of your instance as provided by
Firebase. 

Ember Data is used for the local data store, and also to build the API calls.
[Emberfire](https://github.com/firebase/emberfire) is used for its
adapter and serializers to our Firebase database.

The YouTube API can be used to fetch video titles when you paste in a
URL. The API key comes from
https://console.developers.google.com/apis/credentials?project=firebase-radio4000.

You will need a Google Cloud Console API key, restricted to `Youtube
Data API v3`, and put it into the `radio4000/config/environment.js`
file, under the key `youtubeApiKey` (you should have two, one for
production, and one for development environment).

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

For authentication to work, in the file
`radio4000/config/environment.js` you will have to update the
following keys, for the default environment, as well as `production`
depending on your objectives.

```
apiKey: ''
authDomain: ''
databaseURL: ''
```

You can fin the values for your application, in your firebase project's
console, at `Settings > Project
Settings > General > Your Apps`.

If you don't have an app already, create one of type `Web App`.

You can find the values you're looking for under `Firebase SDK snippet
> Config`.

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

