export default function(context, obj, condition) {
	if (condition) {
		context.removeObject(obj);
	} else {
		context.addObject(obj);
	}
}
