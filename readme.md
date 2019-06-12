# Realtime Web Project

![image](https://lh3.googleusercontent.com/Xc7V7wU33-RBXLy5uWL5QyUYjSWvN4_rRZjJUKDlueUfXY8JGUnQokvqiYmTv0yUKdUFxhYLittalbkZAmlVwxjRI71hb_J2pg_BYQUkiygQnezJCXsoEfQ0ewj7LZ2wGb2R3bWgJm7xuFMgf887OMF6q-jwj2PCSzf5XzJ__Fc1M0MPc9-ukOFSbg9CdDY8_VVG8eYAsasBctopQ8jURsiZAZ9DFXQElKBy80KBCoym9fKJdZ6TpuX-6bvrlimAUUchHEsR_3X9aesD5V28B0SGx_J5Vg43CkO5TpkYqR2inekhcBj5-gfvp7IW8ouESm8Lvh5rq5CAnKhet_nTUkj9kCp7nIdgKC0NwhFEYuZPTKc63qewFKzRP6OvncPIxKkzrOAFSDuYDsKNJzCGKY2ske9AhQq7dNK1NBsNcjIcc_FRK38rYDEkIh7wzyrdvSo0PyQMonNvSCTf950OPN1AokUi1Hj-EiVRcPsMIAYRHYgB_zegv4VcVfi48Ac2B-WQjv6ONdeSPJl9j5wqUau_l9N1Bz8D97ekDgih8C_YyvijU_Nbd3rh6beGG5wfdDeFxSgxeWCC-HY3bdAx_9i2yn-WpjJDJAKBHwTTiOr41iLrtKf13BUYOgb9DXAQI7fV9d6lGwDS-aaHYGxdfCpau3wg-CI=w2796-h1642-no)
<!-- Add a nice image here at the end of the week, showing off your shiny frontend 📸 -->

The intention of this project was to create a video player that uses Google's Youtube API to populate the web application. Users are able to create and save a playlist, and are quickly able to add and remove their chosen videos. There is also a collaborative aspect to this, as the videos that other users are adding to their playlist will also reflect in your own playlist. You can then watch the videos that other users are adding. Their videos won't be saved to your own playlist so you are only able to see these videos in your current session

[link to project](www.nu.nl)



<!-- How about a section that describes how to install this project? 🤓 -->
## Getting started
Clone the repo `git clone`.
Install dependencies `npm install`.
Run `npm start` to start server on port 8888.
<!-- ...but how does one use this project? What are its features 🤔 -->
## Features
- Authenticate google account with oAuth2
- Create Youtube playlist
- Search and play youtube videos
- Add and remove videos from playlist
- See realtime what videos other users are adding to their playlist

<!-- What external data source is featured in your project and what are its properties 🌠 -->
## External data source(s)
- Youtube database API

I have used Google's Youtube API for several functionalities:

- Searching youtube video's to add to the database playlist
- Intially load in a youtube playlist
- Create a Youtube playlist if the defined playlist is not found
<!-- Where do the 0️⃣s and 1️⃣s live in your project? What db system are you using?-->
## Database system
- MongoDB

I use Mongo DB as the database system. The webapplication writes data to it through the Mongoose Node module.

The database is used to store and track track user profiles and to store user playlists. The users and playlists are connected to eachother to a unique google ID. When a user first connects data gets loaded in from youtube. The second time a user connects the database instead will fetch their own created playlist. 

## Data lifecycle

When a user visits the website, the application will check if the user is already registered and authenticated. If not, trhe user will be redirected to a login screen. here the user will be authenticated by Google using oAuth2.0. The node module Passport.js is used for the oAuth authentication. If a user is not found, a new database record will be made using Mongoose and Mongo DB. The user will then be served the main website page.

The user is now able to interact with the website and the Youtube Api. The accesstoken makes it possible to make requests to youtube to get the needed information. Users are able to search, play and store videos to their playlist. MongoDB will keep tack of the videos that are added and stored to the playlist. 

The Node application Socket.io allows data to be emitted to connected users. Users will see the videos that other users are adding to their playlist. These videos will appear in the playlists of others, but will only stay their during their session. The videdos only get saved to the playlist of the user that added the video.

![](https://lh3.googleusercontent.com/_uBQirytwbA1-ihbBJmw0ItK7CV1tjHhrrj5FVYu6_QynMabLqZuDA4VHQDJx-g0vHU_efd8yuXC9a3ZVdKP0D7EJsOrrxhguotj7GCbWOjBSti-1r6aOfpPXjNgOhuuZuarJjyYAcQ3pIh4K6s3q93u4Q9JiI9jVC4Mww37bU9AZNrqSlxMfjGsg91-jLcddjCpR-8G-syUrZZgUQ6dI5STBIYOjEYkd8djg81QWXYcAEqZfle0T11dPjSYgzSWckdB7w82DHvihvV0KHtP4fI331wLiEfKMZYfo3KYjHTI0T4aLbt4lZ2K0kwgQ3-4M7EbJM8PfGz8yBmzCf0B5LRUZZstY_YyO6i6d9TL4p95Z588pLw5NLmBwQcPNSjclrebAEfj21vWOhqQ9wDqms2J7ATnNOZHh4S0E4MAfF2r0JQtNck-7-P-ckX4akWZCHmep83RpiEhTFl2uuWi0yyLmDTCfNbPOwlymLpQblVzr3WSV9kIGuvdS4hhndmLeRbQf1TY1GjdcLAJ9h_rYbvJ4IYahki0CjNzm5YrUqhxRTShnh3P1dF14fxz0GiGMNkx9GNfdrbzMhZi---wdgEiBvFYKcfOzAS5DjeP8mPAPQTKHvuFZbp0YxLpHHCBUmBdDUGJO9A7HkSspun2ALCPPnmPPhg=w2352-h1642-no)


## Handling downtime

Unfortunately I have not yet been able to work on this aspect of the website

## Deployment
<!-- Maybe a checklist of done stuff and stuff still on your wishlist? ✅ -->

I am using Heroku for the deployment of the webapplication

## Done's
- [x] Set up express app
- [x] Added oAuth2 routes with Passport.js
- [x] Store unique users to MongoDB
- [x] Load in youtube playlist, create new youtube playlist or load in playlist from DB
- [x] Front-end done
- [x] Search and play videos from youtube
- [x] Search and add videos to playlist
- [x] Store / remove videos from database playlist
- [x] Added socket.io to emit added videos to other users
- [X] UI elements to showcase socket events

## To do's / wishlist

- [ ] oAuth refresh (users currently need to login each hour)
- [ ] Create separate rooms for users so they can choose who to connect with
- [ ] Push database playlist to youtube playlist (connect both)
- [ ] Create offline handler
- [ ] let users create and select different playlists

## Built with

- Node.js
- Express
- Handlebars
- Passport.js
- socket.io

## License
MIT © Niels Schopman
<!-- How about a license here? 📜 (or is it a licence?) 🤷 -->
