# Realtime Web Project

The intention of this project was to create a video player that uses Google's Youtube API to populate the web application. Users are able to create and save a playlist, and are quickly able to add and remove their chosen videos. There is also a collaborative aspect to this, as the videos that other users are adding to their playlist will also reflect in your own playlist. You can then watch the videos that other users are adding. Their videos won't be saved to your own playlist so you are only able to see these videos in your current session

![image](https://lh3.googleusercontent.com/Nlqs0dDmONoTkexNJyykS3YuUP8ry99thcR9EX_kRtM-gXnSZkIvvR7lHNlXUeCMYP8Rvk8jKPMoiOtihbFB20byiekPHjUFKRPtuy_Nywoe6DiVtqd9bh67S78yqsRt8hEHi23fTdcP8GVL0UVMP9x_udtrU5pKzymtENtnCofy5E3VLBnSzOe3cPR_Lpa1XSkoGunBcyPC08VOW1ZlTE6GfA4bhN18Om-MYccyMiakyTu22blAV2mbkgc_obTTlbL773JynkV4C5jywOrVWbjK3MeMJD7UrtvjDmnZQW5vZsVp7MIvemiq8u0aBSjNHZzlZlvyHCU-xUmq1MPtKJoKhSzYjS_VqSJE3N8Iam2kv8Mh3WP-Xlkan8IlkKmCm2US6rie-ybvFQbiehW9JomCxmA6kr2exhgBUigv2uo0o6lJLVtXUgl7gUhw8A9-2KSBvQSzqqxyPYXYTe6KrAa4v5uydNjg4dqSghU9725ojaUQlDgpQOra5C6ORZmqa_acHwN1PzP2eeFqnsYyGF7BUpSlIPvu_t7-p7dW-4RUVA2TOSuHRLiY79eDVdA7qaW3wBf12VAiqScgO7bhc-YZD-9xzaJsQ0aAvfA=w426-h270-no)
<!-- Add a nice image here at the end of the week, showing off your shiny frontend 📸 -->

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
<!-- Where do the 0️⃣s and 1️⃣s live in your project? What db system are you using?-->
## Database system
- MongoDB

## Data lifecycle

## Authorization

## Handling downtime

## Deployment
<!-- Maybe a checklist of done stuff and stuff still on your wishlist? ✅ -->
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
