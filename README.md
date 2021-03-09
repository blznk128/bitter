# Bitter
This is Bitter, a social platform where you can connect and talk with friends and family! A place where your thoughts are your bits!

Demo and github code.

https://github.com/blznk128/bitter Github

https://bitter-15559.herokuapp.com/ Demo

<h1>Demo instructions</h1>

Go ahead and register with a username and password and off you go! As more people register, you'll see more names under the "people to follow" section. "Bits" are your thoughts so go ahead and type what ever is in your head and submit it. Your bits will show up on the bottom. The more people register, the more names you'll see in the "users to follow" section. You can click on a name to see that users bits. To change who to follow, click on another name. You can also edit and delete your own bits!

<h1>Tech used</h1>

Html, Css/materialize, javascript, passport.js , express, express-session, node, sequelize.

<h1>My thoughts</h1>

Twitter is amazing in every aspect, so I thought "What a fun project it would be to replicate their system!". Oh how I LOVED doing this project. It was a toughy to figure out passport and how information gets pulled from session but I enjoyed every second of it. I had a tough time bringing back a "updated" session when new information go inserted into the database. For example, when the logged in user clicked on a new user to follow, the new user got saved into the database but it still showed the old user information for the logged in user. I also had a great lesson when it comes to global scope. It's dangerous in a way to have a lot of global variables because they change a lot when you use them in a lot of functions. One minute, my variable I used for the logged in user displayed all their information, another minute, only displayed their id, so that cause other functions to stop working, lesson learned the hard way.

<h1>Future plans</h1>

In time, I want to make the project look a lot better than it does. I'm also going to make it where the logged in user can have multiple saved users to follow, as well as unfollow users. I want to add a like button as well to the bits. I fortunately got approached by a few to make them websites so I ran out of time with this project.
