# Radio4000

This is an Ember.js application scaffolded with ember-cli.

## How to develop

Please follow this guide step-by-step to make sure everything works. It assumes you're on OS X with node installed.

### Install Radio4000 dependencies

Make sure Ember CLI is installed globally, then clone this project and install it's dependencies:

```
npm install -g ember-cli
git clone https://github.com/hugovieilledent/radio4000.git
cd radio4000
npm install; bower install
ember serve
```

Also see http://www.ember-cli.com/

## Building and deploying

First build it:

- `$ ember build` (build will still include logs, warnings etc. for testing)
- `$ ember build --environment=production` (hard to debug, only use this when it's ready for deploy)

Then deploy to one of our hosts:

`$ gulp deploy-dev` (dev.radio4000.com)
`$ gulp deploy-live` (radio4000.com)

## Updating icons

@todo: use grunticon ala magnus-winter

- go to public/images/icons
- open sprite.svg in code editor
- look how things are made
- paste in your new svg icon

## Using our CDN

To serve a file from our CDN, prepend the file of the URL (only works for http://radio4000.com) with `http://dyzwdli7efbh5.cloudfront.net` and the CDN will automatically pull and serve the file.

## Building native apps

Make sure the production environment in `config/environment.js` looks like this:

```javascript
if (environment === 'electron') {
  ENV.baseURL = './';
  ENV.locationType = 'hash';
  ENV.firebase = 'https://radio4000.firebaseio.com/';
}
```

… then run:

```
gulp electron
```

Check the dist folder where you'll now have all the apps. Be sure to change environment back afterwards.

## Important if you use Sublime Text

Sublime automatically watches all files in a folder. Because ember-cli is so huge your PC will slow down. To solve this, tell Sublime to ignore the `tmp` and `node_modules` folder: http://www.ember-cli.com/#sublime-text

## Emberfire

We use Firebase as our backend through Ember Data and [Emberfire](https://github.com/firebase/emberfire).

## Google API

We're using the YouTube API so you might run into trouble with permissions, domains etc. If so, check here https://console.developers.google.com/project/much-play/

## Firebase security rules

Firebase rules are a bitch but see the `rules` folder.
