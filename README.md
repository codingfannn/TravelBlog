# travelblog

required - !
unique
default

User
First name: String !
Last name: String !
(User name: String OPTIONAL)
email: String ! UNIQUE
password: String !
(age: Number OPTIONAL)
(bio: String OPTIONAL)
country: String OPTIONAL
(interest: String OPTIONAL)
image: String OPTIONAL with default
(socialMedias:String OPTIONAL)

Blogpost
text: String !
user: User !
title: String !
period: Date !
image: String

(Comments:
text:String !
user: User !
post: Post !
date: Date!)

GET/Home page
GET/Signup
POST/Signup
GET/Login
POST/Login
GET/Logout

GET/Profile page
GET/update profile
POST/update profile
GET/update password
POST/update password
GET/delete account

GET/Blogpost page -when you signed in, can see all your blogposts
GET/Create a post
POST/Create post
GET/Post update
POST/Post update
GET/Delete post
