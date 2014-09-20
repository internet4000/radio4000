Ember.Handlebars.registerHelper('reverse', function(context, options) {
	var ret = "";

	for(var i=context.length-1; i>=0; i--) {
		ret = ret + options.fn(context[i]);
	}

	return ret;
});
