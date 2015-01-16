# Tests


## if Unauthenticated

### to /users/hugo (non existing user)

+ can create a new user { uid: "hugo" }

````
Attempt to write {"name":"hugo"} to /users/hugo with auth=null
    /
    /users
    /users/hugo:.write: "!data.exists() || !newData.exists() || $userID === auth.uid"
      => true

Write was allowed.
````

### to /users/facebook:10152294072936642 (existing user)

with data { uid: "hugo" }

+ Write was denied.

````
Attempt to write {"uid":"hugo"} to /users/facebook:10152294072936642 with auth=null
    /
    /users
    /users/facebook:10152294072936642:.write: "!data.exists() || !newData.exists() || $userID === auth.uid"
      => false

No .write rule allowed the operation.
Write was denied.
```


## when logged in with { uid: "facebook:10152294072936642" }

### to /users/facebook:10152294072936642
   
+ can write { uid: "hugo" }

````
Attempt to write {"uid":"hugo"} to /users/facebook:10152294072936642 with auth={"uid":"facebook:10152294072936642"}
    /
    /users
    /users/facebook:10152294072936642:.write: "!data.exists() || !newData.exists() || $userID === auth.uid"
      => true

Write was allowed.
````

## when logged in  with { uid: "facebook:10152294072936642" }
   
### to /users/facebook:10152422494934521
   
+ cannot write { uid: "hugo" }

````
Attempt to write {"uid":"hugo"} to /users/facebook:10152422494934521 with auth={"uid":"facebook:10152294072936642"}
    /
    /users
    /users/facebook:10152422494934521:.write: "!data.exists() || !newData.exists() || $userID === auth.uid"
      => false

No .write rule allowed the operation.
Write was denied.
````

### to /users/hello
   + can write { uid: "hugo" }

   // we do not want this, a user logged in should not be allowed to create a new user
