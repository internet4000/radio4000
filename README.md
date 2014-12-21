# Radio4000

This is an Ember.js application scaffolded with ember-cli.

## How to install

Please follow this guide step-by-step to make sure everything works. It assumes you're on OS X with node installed.

### Install Radio4000 dependencies

First install Ember CLI, which is used as development server and to build the project.

`npm install -g ember-cli`

then clone the project repository and install it

```
git clone https://github.com/hugovieilledent/radio4000.git
cd radio4000
npm install; bower install
```

## Watching, building and testing

- `ember s`  (short for `ember serve`, opens a dev server at 0.0.0.0:4000)
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

## Emberfire

We use Firebase as our backend through Ember Data and [Emberfire](https://github.com/firebase/emberfire).

## Deploying

You can only deploy if your SSH key is set up on the server. If it is, use:

`gulp deploy`
`gulp deploy-live`

## Google API

We're using the YouTube API so you might run into trouble with permissions, domains etc. If so, check here https://console.developers.google.com/project/much-play/

## Firebase security rules

Firebase rules are a bitch. With the [Blaze Compiler](https://github.com/firebase/blaze_compiler) it's supposed to be easier, so.

```
$ npm install -g blaze_compiler
$ blaze rules/rules.yaml
```
