# Muchplay

This is an Ember.js application scaffolded with ember-cli which is a beautiful beast, meaning it's a bit complicated to get everything running right now so please refer to this guide.

## Use ember-cli directly from GitHub

As ember-cli is under heavy development we're not using the version on npm but the master branch on GitHub. This ensures we have the latest fixes. Please see https://github.com/stefanpenner/ember-cli#working-with-master or follow the steps here:

1. Clone the repo somewhere

```
git clone https://github.com/stefanpenner/ember-cli.git
cd ember-cli
npm link
```

2. Go inside the folder and run `npm link` - this symlinks the folder as a "global" ember-cli

## Updating ember-cli

Git pull it where you cloned it and run `npm link ember-cli` again.

## Install project dependencies

1. Go to the `play` folder
2. Run `npm install && bower install`
3.

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

## Watching, building and testing

See http://www.ember-cli.com/ - but:

- `ember server` (or just ember s)
- `ember test`
- `ember build`

## Generators

The CLI helps create new files, see http://www.ember-cli.com/#generators-and-blueprints

## Emberfire

We use Firebase as our backend through Ember Data and [Emberfire](https://github.com/firebase/emberfire).

## Deploying

You can deploy to Firebase by installing the firebase cli and then running

- `firebase deploy`

## Help

Contact oskar@rough.dk
