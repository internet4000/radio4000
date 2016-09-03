# Simulator

Custom Auth: { uid: "facebook:10152422494934521" }
URL: /channels/-JXHtCxC9Ew-Ilck6iZ8
Data: { title: 'test' }

here it should be allowed, because that url has a .user property equal to that specific uid.


SEE rules.json



## FOR STACKOVERFLOW


How would the Firebase rules look like for the following "user" model?
We'er using Firebase authentication and the model looks like this:

  import DS from 'ember-data';
  export default DS.Model.extend({
    name: DS.attr('string'),
    email: DS.attr('string'),
    provider: DS.attr('string'),
    created: DS.attr('number')
  });


- How do we know that the logged in user ow
- If you're not logged in, you can create a new user
- If you're logged in and it's your own user, you can edit it

Bonus question: Is it possible make a property private? E.g. make sure only you yourself can read the email property.
Another bonus question: Did we miss any rules to make it secure?
