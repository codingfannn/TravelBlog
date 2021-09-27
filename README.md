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
