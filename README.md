# Radio4000

This is an Ember.js application scaffolded with ember-cli.

## How to install

Please follow this guide step-by-step to make sure everything works.

### Install Radio4000 dependencies

`npm install -g ember-cli`

then clone the project repository and install it

```
cd radio4000
npm install && bower install
```

That's it. You're done. If it worked, you should be able to use these commands inside the 'play' folder

## Watching, building and testing

- `ember server` (or just ember s)
- `ember test`
- `ember build` (build will still include logs, warnings etc. for testing)
- `ember build --environment=production` (hard to debug, only use this when it's ready for deploy)

Also see http://www.ember-cli.com/

## Important if you use Sublime Text

Sublime automatically watches all files in a folder. Because ember-cli is so huge your PC will slow down. To solve this, tell Sublime to ignore the `tmp` and `node_modules` folder:

```
{
	"folders":
	[
		{
			"follow_symlinks": true,
			"path": ".",
			 "folder_exclude_patterns": [
             "tmp",
             "node_modules"
         ]
		}
	]
}
```

## Generators

The CLI helps create new files, see http://www.ember-cli.com/#generators-and-blueprints - for instance, you can write `ember generate route helloWorld`

## Updating ember-cli

See https://github.com/stefanpenner/ember-cli/releases

## Emberfire

We use Firebase as our backend through Ember Data and [Emberfire](https://github.com/firebase/emberfire).

## Deploying

You can deploy directly to Firebase like this:

1. `npm install -g firebase-cli`
2.  `firebase deploy`

## Help

Contact oskar@rough.dk or try this

```rm -rf node_modules bower_components tmp
npm cache clear
npm i
bower i```


## Google API

We're using the YouTube API so you might run into trouble with permissions, domains etc. If so, check here https://console.developers.google.com/project/much-play/
