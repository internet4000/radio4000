{
  "rules": {
    // disallow both read and write by default
    // nested rules can not change rules above
    ".read": false,
    ".write": false,

    "users": {
      // no one can read or write the global user list
      ".read": false,
      ".write": "(auth != null) && (newData.val() != null)",

      // Make sure the the authenticated user id exists after a write
      ".validate": "newData.hasChild(auth.uid)",

      "$userID": {
        // read: only auth user can read themselves
        // write: only authed user can write a single new user, his uid, that's all
        // write: only user-owner can edit himself
        // write: can not delete (newData value can't be null)
        // note: first the "user" is authenticated against Firebase,
        // then we independently create a user model in our Firebase DB
        // the authentication and our USER concept are two different things
        ".read": "$userID === auth.uid",

          // You can write yourself only. But not delete.
        ".write": "($userID === auth.uid) && (newData.val() != null)",
        ".validate": "newData.hasChildren(['created'])",

        "created": {
          // Ensure type::number and that you can not update it
          ".validate": "newData.isNumber() && !data.exists() || newData.isNumber() && data.val() === newData.val()"
        },
        "settings": {
          ".validate": "newData.isString() && (root.child('userSettings').child(newData.val()).child('user').val() === $userID)"
        },
        "channels": {
          // trick to limit to one radio
          ".validate": "!data.exists()",
          "$channelID": {
            // we would like to prevent a user to had a channel he does no own
            // but we don't store on the channel@model the user who owns it
            // (because, historically, firebase stores the userId as provider:provider-id,
            // so it is extremely easy to find the user on social networks)
            // so instead we just prevent a user to add to himself a radio that already
            // has tracks in -> so no radio hijack
            ".validate": "root.child('channels').child($channelID).exists() && !root.child('users').child(auth.uid).child('channels').child($channelID).exists() && !root.child('channels').child($channelID).child('tracks').exists()"
          }
      },
     "$other": {
          ".validate": false
        }
      }
    },

    "userSettings": {
      // no one can read or write the global userSettings list

      "$userSettingsID": {
        // read: only auth user can read its settings
        // write: only user-owner can edit his settings
        // write: only logged-in-user without a user settings can create a new one to himself
        ".read": "auth != null && (data.child('user').val() === auth.uid)",
        ".write": "auth != null && (data.child('user').val() === auth.uid) || auth != null && (root.child('users').child(auth.uid).hasChild('settings') === false)"
      }
    },

    "channels": {
      ".read": true,
      // no one can write

      // allow more queries as it is normally only by id
      ".indexOn": ["slug", "isFeatured"],

      "$channelID": {
        ".read": true,

        // write: only the user owner can write a channel
        // write: only a user with no channel can write a new one to himself
        ".write": "auth != null && (root.child('users').child(auth.uid).child('channels').child($channelID).val() === true) || auth != null && (!data.exists() && !root.child('users').child(auth.uid).child('channels').exists())",

          // validation for each key
        "body": {
          ".validate": "newData.isString() && newData.val().length < 300"
        },
        "channelPublic": {
          // todo
          ".validate": true
        },
        "created": {
          ".validate": "newData.isNumber()"
        },
        "favoriteChannels": {
          // todo
          ".validate": true
        },
        "images": {
          // todo
          ".validate": true
        },
        "isFeatured": {
          ".validate": "newData.isBoolean()"
        },
        /*"link": {
          ".validate": "newData.isString() && newData.val().length > 7 && newData.val().length < 100"
        },*/
        "slug": {
          ".validate": "newData.isString() && newData.val().length > 2 && newData.val().length < 100"
        },
        "title": {
          ".validate": "newData.isString() && newData.val().length > 2 && newData.val().length < 32"
        },
        "tracks": {
          // todo
          ".validate": true
        }/*,
        // a channel cannot have other child paths than the one allowed above
        "$other": {
          ".validate": false
        }*/
      }
    },

    "channelPublics": {
      // read: no one can read the full list of the channelPublics
      // write: no one can write the list
      ".read": false,
      ".write": false,
      ".indexOn": ["followers"],

      "$channelPublic": {
        ".read": true,
//         ".write": true,
        ".write": "(auth != null && data.hasChild('channel') && newData.hasChild('followers')) || (root.child('users').child(auth.uid).child('channels').hasChild(newData.child('channel').val()) || (!newData.exists() && root.child('users').child(auth.uid).child('channels').hasChild(data.child('channel').val())))",
        ".validate": "(data.val() === null && newData.hasChild('channel')) || (data.val() != null && newData.hasChild('followers'))",

        "followers": {
          // validate: user can only add a radio he owns
          // validate: owner can't add himself
          "$follower": {
            ".validate": "root.child('users').child(auth.uid).child('channels').hasChild($follower) && $follower != data.parent().parent().child('channel').val()"
          }
        },
        "channel": {
          // validate: user can only add his radio if there are no data already
          // and if that radio exists && has no publicChannel
          ".write": "root.child('users').child(auth.uid).child('channels').hasChild(newData.val())",
          ".validate": "newData.isString() && (data.val() === newData.val())"
        },
        "$other": { ".validate": false }
      }
    },

    "tracks": {
      ".read": true,
      // no can can write
      ".indexOn": ["channel", "title"],

      "$trackID": {
        ".write": "(auth != null && newData.hasChild('channel')) && (!data.exists() || (root.child('users').child(auth.uid).child('channels').child(newData.child('channel').val()).exists() && root.child('channels').child(newData.child('channel').val()).child('tracks').child($trackID).exists()))",
        ".validate": "root.child('users').child(auth.uid).child('channels').child(newData.child('channel').val()).exists()",

        "created": {
          ".validate": "newData.isNumber()"
        },
        "url": {
          ".validate": "newData.isString()"
        },
        "title": {
          ".validate": "newData.isString()"
        },
        "body": {
          ".validate": "newData.isString()"
        },
        "ytid": {
          ".validate": "newData.isString()"
        },
        "channel": {
          // can only be updated if the value matches the authenticated users channel id
          ".validate": "newData.isString() && (!data.exists() || root.child('users').child(auth.uid).child('channels').child(newData.val()).exists())"
        },
        "$other": {
          ".validate": false
        }
      }
    },

    "images": {
      ".read": true,
      // no write
      "$imageID": {
        // 1. allow a delete if the (already exisiting) data.channel property matches the authenticated user's channel.
        // 2. allow a create and update if the newData.channel property matches the authenticated user's channel.
        ".write": "auth != null && !newData.exists() && root.child('users').child(auth.uid).child('channels').child(data.child('channel').val()).exists() || auth != null && root.child('users').child(auth.uid).child('channels').child(newData.child('channel').val()).exists()"
        // "channel": {
        //   ".validate": ""
        // }
      }
    }
  }
}
