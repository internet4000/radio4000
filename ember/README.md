# Muchplay

This is an Ember.js application scaffolded with Ember CLI.
It's a bit complicated to get everything running right now so please refer to ths guide.

## Use Ember CLI directly from GitHub

This ensures we have the latest fixes (and bugs) - as the project matures we should stop doing this and use the version published on NPM. See https://github.com/stefanpenner/ember-cli#working-with-master

1. Clone the Ember CLI repo to your computer
2. Go inside the folder
3. Run `npm uninstall -g ember-cli` (to make sure you don't have a global version)
4. Run `git pull` (makes sure the repo is up to date)
5. `npm link` (symlinks this folder as a "global" ember-cli)

## Install project dependencies

1. Go to the play/ember folder
2. Run `npm install && bower install`

## Watching, building and testing

See http://www.ember-cli.com/ - but:

- `ember server` (or just ember s)
- `ember test`
- `ember build`

## Generators

The CLI helps create new files, see http://www.ember-cli.com/#generators-and-blueprints

## Emberfire

We use Firebase as our backend through Ember Data and [Emberfire](https://github.com/firebase/emberfire).

## Help

Contact oskar@rough.dk
