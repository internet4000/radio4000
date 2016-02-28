# Radio4000

This is an Ember.js application scaffolded with ember-cli.

## How to develop

Please follow this guide step-by-step to make sure everything works. It assumes you're on OS X with node installed.

### Install Radio4000 dependencies

Make sure Ember CLI is installed globally, then clone this project and install it's dependencies:

```
npm install -g ember-cli
git clone git@bitbucket.org:radio4000/radio4000.git
cd radio4000
npm install; bower install
ember serve
```

Also see http://www.ember-cli.com/

## Deploy to development

1. `ember build`
2. `gulp deploy:dev`

## Deploy to live

Then deploy to either live or dev:

1. `git checkout master; git pull --rebase; git merge dev`
2. `release-it`
3. `ember build --environment=production`
4. `gulp deploy`

## Testing

```
xo app/**/*.js
```

## Icons

Add .svg icons to `public/assets/images/icons` and run `gulp icons`.

## Building native apps

`npm run build-app`

## Important if you use Sublime Text

Sublime automatically watches all files in a folder. Because ember-cli is so huge your PC will slow down. To solve this, tell Sublime to ignore the `tmp` and `node_modules` folder: http://www.ember-cli.com/#sublime-text

## Emberfire

We use Firebase as our backend through Ember Data and [Emberfire](https://github.com/firebase/emberfire).

## Google API

We're using the YouTube API so you might run into trouble with permissions, domains etc. If so, check here https://console.developers.google.com/project/much-play/

## Firebase security rules

Firebase rules are a bitch but see the `rules` folder.
