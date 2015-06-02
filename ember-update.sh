echo 'Updating to ember-cli 0.2.6'

npm install -g ember-cli@0.2.6
trash node_modules bower_components dist tmp
npm install --save-dev ember-cli@0.2.6
