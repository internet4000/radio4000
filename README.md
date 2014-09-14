# Radio4000

This is an Ember.js application scaffolded with ember-cli which is a beautiful beast, meaning it's a bit complicated to get everything running right now so please refer to this guide.

## How to install

Please follow this guide step-by-step to make sure everything works.

1. First we need to install the newest ember-cli from GitHub and use it as a global npm package.

```git clone https://github.com/stefanpenner/ember-cli.git
cd ember-cli
npm link```

The repository you just cloned will now work just as a global npm package would.

2. Install Radio4000 dependencies

```git clone https://github.com/kopfwelt/play.git
cd play
npm install && bower install
npm uninstall ember-cli
npm link ember-cli
```

3. That's it. You're done. If it worked, you should be able to use these commands inside the 'play' folder

## Watching, building and testing

See http://www.ember-cli.com/ - but:

- `ember server` (or just ember s)
- `ember test`
- `ember build`

## Generators

The CLI helps create new files, see http://www.ember-cli.com/#generators-and-blueprints

## Updating ember-cli

If you want to use the latest ember-cli, go to where you cloned the repository and run `git pull` and `npm link ember-cli` again.

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

## Emberfire

We use Firebase as our backend through Ember Data and [Emberfire](https://github.com/firebase/emberfire).

## Deploying

You can deploy directly to Firebase like this:

1. `npm install -g firebase-cli
2.  `firebase deploy`

## Help

Contact oskar@rough.dk
