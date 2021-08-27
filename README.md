# google-vision-React-firebase
This is a photography management site that makes use of machine learning tools to recognize and classify the images taken.
## Modules involved
* Nodejs API
* Heroku - hosting Node.js (I got sick of trying to get the CORS working locally and chose the lazy route to host the API)
* React
* Firebase
* Google Vision

## Node API 
This holds the code that interacts with google Vision
## Heroku
Hosts our API
## Google Vision
This perfoms the bulk of the AI function, all we do is send an image and extract the first label that's been returned then save this response as the "event in the image" (ceremony).
## React
This is our Frontend - made use of material-ui
## Firebase and FireStore.
This holds our image and event.

**PS: your google account needs to be attached to a credit card for you to be able to use google vision.**
# Check out how it runs.
https://youtu.be/nhww7k0ricU
