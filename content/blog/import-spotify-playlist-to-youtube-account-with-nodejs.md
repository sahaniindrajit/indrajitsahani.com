---
title: "Import Spotify playlist to YouTube account with NodeJS"
slug: "import-spotify-playlist-to-youtube-account-with-nodejs"
date: "2024-08-19"
excerpt: "Learn How to Search & Add video to YouTube with YouTube API"
tags: ["programming-blogs", "nodejs", "spotify", "youtube", "apis", "javascript", "axios"]
cover: "https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/3hq7NmO8hwU/upload/569c97e430a0340b24fd454b1f3bfff3.jpeg"
---

# Introduction

I have always used Spotify(free) for listening song but recently they increased there ad on there platform so I decided to switch to YouTube music since i had YouTube premium. But all of my playlist were on Spotify, manually adding all song to YouTube playlist would have been time consuming and boring so i decided to write a script that take Spotify playlist and make a YouTube playlist on my account.

In this article, I'll show you how to create a Nodejs application that can create YouTube playlist of songs with Spotify playlist links. [Checkout code on GitHub](https://github.com/sahaniindrajit/Spotify-playlist-to-YouTube-Backend)

Let's START!

# Project Setup

### **1\. Create Node.js Project:**

To start our project, we need to set up a Node.js environment. So, let's create a node project. Run the following command in the Terminal.

```powershell
npm init -y
```

This will initialize a new Node.js project.

### **2\. Install Dependencies:**

Now, We'll install the required dependencies of our project.

```powershell
npm install axios cookie-parser dotenv express googleapis
```

This will install the following packages:

*   **Axios**: A promise-based HTTP client for the browser and Node.js, often used to make HTTP requests and handle responses in a simpler way than the built-in `fetch` API.
    
*   **Cookie-Parser**: A middleware for Express.js that parses cookies attached to the client request object, making it easier to handle cookies in your web applications.
    
*   **Express**: a popular web framework for Node.js
    
*   **Dotenv**: loads environment variables from a `.env` file.
    
*   **Googleapis**: Provides access to various Google APIs.**3\. Setup Environment Variables:**
    

### **3\. Setup Environment Variables:**

Next, we'll create a `.env` folder to securely store our sensitive information such as API credentials.

```powershell
//.env
PORT=3000
CLIENTID=YOUR_SPOTIFY_CLIENTID
CLIENTSECRET=YOUR_SPOTIFY_CLIENTSECRET
YOUTUBEKEY=YOUR_YOUTUBE_KEY
YOUTUBECLIENTID=YOUR_YOUTUBE_CLIENTID
YOUTUBECLIENTSECRET=YOUR_YOUTUBE_CLIENTSECRET
```

### **4\. Create Express Server:**

Now, we'll create a `index.js` file in the root directory and set up a basic express server. See the following code:

```javascript
//index.js
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import morgan from 'morgan';
import router from './src/routes/route.js';

dotenv.config()
const port = process.env.PORT || 3000
const app = express()

app.use(express.json());
app.use('/user', router)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
```

Here, We're using the "dotenv" package to access the PORT number from the `.env` file.

At the top of the project, we're loading environment variables using `dotenv.config()` to make it accessible throughout the file.

## **Setting Up Google Console**

At First, We'll go to the [**Google Cloud Console**](https://console.cloud.google.com/).

Then we'll get this Dashboard. (I have previously created one project that's why I'm getting this, you might get something else)

![Google Cloud Console](https://cdn.hashnode.com/res/hashnode/image/upload/v1709442856354/2e8cad60-1f22-4257-aa49-1d3226bac646.png?auto=compress,format&format=webp align="left")

Now, We'll click on the 'New Project' button to start a new project.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724081519907/c6a6f397-e9a2-4dc8-af3b-dc73ff5ae17a.png align="center")

Next up we'll get something like this. Here we'll add our Project's name and organization.  
For this project, I'm keeping this as "Youtube Playlist". Then we'll Click the Create button to proceed

![New Project Details](https://cdn.hashnode.com/res/hashnode/image/upload/v1709443035240/1464fb60-e84e-4c5b-8c09-2c0b87df3cb6.png?auto=compress,format&format=webp align="left")

Next, In the Side Navigation bar, we'll get "APIs and Services". Within this section, there's a submenu to enable APIs and services. we'll click that to proceed.

![APIs and Services](https://cdn.hashnode.com/res/hashnode/image/upload/v1709443074431/45a3cd82-faa6-4f48-8550-1aa808cd4ec2.png?auto=compress,format&format=webp align="left")

Next, We'll enable the API that we'll be using in this project ie. the Google Calender API.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724081679152/a2d4b6de-90cb-476e-ae08-8ce6d8af05bc.png align="center")

After that, we'll go to the OAuth Consent Screen. Here we'll select the User Type as External. And we'll press Create button to proceed.

![OAuth consent screen](https://cdn.hashnode.com/res/hashnode/image/upload/v1709443233572/6eef25e0-8cfe-4957-a86d-9eebb1ea8afe.png?auto=compress,format&format=webp align="left")

Then we'll go to the app registration page.  
Here we'll be adding more information about our application. We start by adding the name of our app and an email address for user support.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724082246071/0be2e02d-b44a-400d-ae16-85d6c2447677.png align="center")

In the Scopes, We'll add necessary permissions such as [`userinfo.email`](http://userinfo.email) , `userinfo.profile` , `youtube`, `youtube.readonly` and `youtube.force-ssl` for this project.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724082345941/ebd3cbac-f091-4c86-9e22-bb945002bf6d.png align="center")

After that, We will add one test user to our Application.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724082500087/204164b1-5abd-4ee8-a9b9-3356a97dc72a.png align="center")

That's it. Our Application is registered with the platform.

Now, We'll create our OAuth Client ID secret. For that, we'll go over to the Create Credential part.

![Google Console Dashboard](https://cdn.hashnode.com/res/hashnode/image/upload/v1709443465484/ce015786-1e22-47fd-81da-17c88e1f31b1.png?auto=compress,format&format=webp align="left")

Here we'll add the type of our Apllication and It's name. For this project its web application and the name is Web client 1.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724082662507/0692a8a6-7c99-4e85-9517-ab69d6d2e4a0.png align="center")

And then we'll get the OAuth credential.

![OAuth client created](https://cdn.hashnode.com/res/hashnode/image/upload/v1709444437957/4edfbf84-6608-4ec0-85e3-3d271ff24fdc.png?auto=compress,format&format=webp align="left")

Next up we'll create YouTube API Keys.

![API Key Generation Page](https://cdn.hashnode.com/res/hashnode/image/upload/v1709444545223/7449ce26-1e78-4a5c-8fec-c16441192fb6.png?auto=compress,format&format=webp align="left")

After doing all this we'll Update our `.env` file with the API keys and the OAuth Credentials that we have generated earlier.

With this, we have set up our Google Cloud console for this project, now let's move to the next section

# Setting up Spotify

*   Log into the [dashboard](https://developer.spotify.com/) using your Spotify account.
    
*   Create an app and select "Web API" for the question asking which APIs are you planning to use. Once you have created your app, you will have access to the app credentials. These will be required for API authorization to obtain an access token.
    
*   Use the access token in your API requests.
    

**For more information visit** [**Spotify web api docs**](https://developer.spotify.com/documentation/web-api)

After doing all this we'll Update our `.env` file with CLIENTID and CLIENTSECRET that we have generated earlier.

Now let's move to the next section.

## **OAuth 2 Authentication:**

Till now we have done our basic project setup. Now, we'll integrate OAuth2 Authentication into our Project. This enables our application to interact securely with Google services.  
For that, First We'll import the required packages into the `getYoutubeToken.js` file.

```javascript
//route.js
import Router from 'express'
import { google } from 'googleapis'
import cookieParser from 'cookie-parser'
import env from 'dotenv'
env.config()
```

Then we'll define the scope of access required for the Google Calendar API.

```javascript
//route.js
const SCOPES = ['https://www.googleapis.com/auth/youtube',
  'https://www.googleapis.com/auth/youtube.force-ssl'];
```

Next, We'll configure the OAuth 2 client using the credentials that we have stored in the `.env` file.

```javascript
//getYoutubeToken.js
// OAuth 2 configuration
const oauth2Client = new google.auth.OAuth2
(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
);
```

After the OAuth 2 Configuration, We'll create a Route to Authenticate our Users.

```javascript
//getYoutubeToken.js
// Step 1: Redirect to Google's OAuth 2.0 server
route.get('/auth', (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  res.redirect(authUrl);
});
```

When our users go to this route, they'll be redirected to Google's authentication page where it will ask for specific permissions to our application.

After Successful authentication, Google will redirect the user to our Redirect URL (`/user/google/oauth2callback`)

```javascript
//getYoutubeToken.js
// Step 2: Exchange authorization code for access token
route.get('/oauth2callback', async (req, res) => {
  const code = req.query.code;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    res.send('Authentication successful! Please return to the console.');
    // Store the access token in a cookie
    res.cookie('youtube_access_token', tokens.access_token);
  } catch (error) {
    console.error('Error retrieving access token', error);
    res.send('Error retrieving access token');
  }
});
```

Here we are getting the refresh tokens from the Query and storing them as credentials in the `oauth2Client`. These credentials will help us to make request to the Google YouTube API.

# Getting Spotify token

Next well will call Spotify API to get access token so we can call Spotify music API.

For getting access token we will have to send client\_id and client\_secret to `https://accounts.spotify.com/api/token`

```javascript
//getSpotifyToken.js
import axios from "axios";
async function getSpotifyToken() {

    try {
        const client_id = process.env.CLIENTID
        const client_secret = process.env.CLIENTSECRET

        const authHeader = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

        const response = await axios.post("https://accounts.spotify.com/api/token",
            new URLSearchParams({
                grant_type: 'client_credentials'
            }).toString()
            ,
            {
                headers: {
                    'Authorization': `Basic ${authHeader}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        )

        return response.data.access_token;
    }
    catch (error) {
        console.error('Error fetching Spotify token:', error.response ? error.response.data : error.message);
    }
}
```

Now that we have both Spotify and YouTube access token we can go ahead and call YouTube and Spotify API. But before that let understand how are we going to Import Spotify playlist to YouTube account.

# Import Spotify playlist to YouTube

*   Firstly we will call Spotify playlist API to get the song name and Artist name of all song in the playlist and store that in an array.
    
*   Then we will create an empty playlist using YouTube API.
    
*   After that we will search the song on YouTube by giving song name and Artist name stored in an array.
    
*   After finding the song we will add the song to the playlist.
    

# Getting song detail from Spotify playlist

In this function we are calling Spotify API with playlist Id `https://api.spotify.com/v1/playlists/${playlistId}/tracks`

```javascript
//getSongDetail.js
import axios from "axios"
async function getSongDetail(data, response) {
    try {
        const playlistId = data.split('/playlist/')[1];

        const songsData = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            headers: {
                'Authorization': `Bearer ${response}`
            }
        })
        const songDetail = songsData.data.items.map((i) => {
            const songName = i.track.name;
            const songArtist = i.track.artists[0].name;
            return ({ song: songName, artists: songArtist })
        })
        return songDetail
    }
    catch (error) {
        console.error('Error fetching playlist tracks:', error.response ? error.response.data : error.message);
    }
}
export default getSongDetail
```

After calling this function we will get an array with song name and Artist name of all the song in the playlist.

Now that we have songs detail lets how we are going to create a YouTube playlist.

# Creating YouTube Playlist with API

In this function we are calling YouTube API with playlist title and description in request Body.

```javascript
//createPlaylist.js
import { google } from "googleapis";
async function createPlaylist(auth) {
  const youtube = google.youtube({ version: 'v3', auth });
  const response = await youtube.playlists.insert({
    part: 'snippet,status',
    requestBody: {
      snippet: {
        title: "songs",
        description: "spotify playlist songs in one place",
      },
      status: {
        privacyStatus: 'public',
      },
    },
  });
  return response.data.id;
}
export default createPlaylist
```

After calling this function we will get the playlist id of playlist we just created. We are going to use this playlist id to add songs to it after finding the song.

Now that we have playlist id lets how we are going to find the songs.

# Searching song on YouTube with API

we are going to search song through YouTube API by passing part:'snippet', q:query(song and Artist name), type: 'video', maxResults: 1

```javascript
//searchVideo.js
import { google } from "googleapis";
async function searchVideo(auth, query) {
    const youtube = google.youtube({ version: 'v3', auth });

    const response = await youtube.search.list({
        part: 'snippet',
        q: query,
        type: 'video',
        maxResults: 1, // You can adjust this as needed
    });

    if (response.data.items.length > 0) {
        return response.data.items[0].id.videoId; // Returns the video ID
    } else {
        throw new Error('No video found');
    }
}

export default searchVideo
```

After calling this function we will get the video id of song. We are going to use this video id to add songs to YouTube playlist.

Now that we have playlist id lets how we are going to add the song to the playlist.

# Adding songs to the playlist with API

In this function we are going to pass the playlist Id of the playlist we created and the video Id of the song we found.

```javascript
//addVideotoPlaylist.js
import { google } from "googleapis";
async function addVideoToPlaylist(auth, playlistId, videoId) {
    const youtube = google.youtube({ version: 'v3', auth });

    const response = await youtube.playlistItems.insert({
        part: 'snippet',
        requestBody: {
            snippet: {
                playlistId: playlistId,
                resourceId: {
                    kind: 'youtube#video',
                    videoId: videoId,
                },
            },
        },
    });
    return response.data;
}
export default addVideoToPlaylist
```

Now that we have implemented all the function lets see we are going to add all the from Spotify to YouTube.

# Adding all the songs from Spotify to YouTube

*   **We are going to implement a function that Would search and add video simultaneously.**
    

```javascript
//searchVideoAndAddVideo.js
import searchVideo from './searchVideo.js'
import addVideoToPlaylist from './addVideotoPlaylist.js'

async function searchVideoAndAddVideo(auth, searchQuery, playlistId) {
    try {
        const videoId = await searchVideo(auth, searchQuery);
        await addVideoToPlaylist(auth, playlistId, videoId);
    }
    catch (error) {
        console.error('Error:', error.message);
    }
}
export default searchVideoAndAddVideo
```

Now we will implement a function that will iterate over the array of song and Artist name and would call `searchVideoAndAddVideo` function every iteration with song name Artist name and playlist id.

```javascript
//getYoutubePlaylist.js
import createPlaylist from "./createplaylist.js";
import searchVideoAndAddVideo from "./searchVideoandAddVideo.js";

async function getYoutubePlaylist(detail, auth) {
    try {
        if (!detail || detail.length === 0) {
            console.log('No songs to process.');
            return false;
        }
        let playlistId = await createPlaylist(auth);
        for (const i of detail) {
            const query = `${i.song} ${i.artists} song`;
            try {
                await searchVideoAndAddVideo(auth, query, playlistId);
            }
            catch (error) {
                console.error('Error during API call:', error);
            }
        }
        return playlistId;  // Return playlist ID on success
    }
    catch (error) {
        console.error('Error creating playlist:', error.message);
        return false;
    }
}
export default getYoutubePlaylist
```

After all of it we would create a route `/playlist` Where we will pass Spotify playlist URL to get the YouTube playlist with all the song in your YouTube account and the URL of YouTube playlist.

# Setting up `/playlist` route in express

```javascript
route.post('/playlist', async (req, res) => {

    //for generating youtube access token
    const accessToken = req.cookies.youtube_access_token
    if (!accessToken) {
        return res.status(401).send('No access token found.');
    }
    oauth2Client.setCredentials({
        access_token: accessToken,
    });

    //for getting playlist url
    const data = req.body.data
    if (!data || !data.includes('playlist')) {
        return res.json({
            msg: "invalid link!! Please only give the link of a playlist"
        })
    }

    //for generating spotify api token
    const response = await getToken()
    if (!response) {
        return res.json({
            msg: "Failed to obtain spotify token"
        })
    }

    //for getting all the songs from spotify playlist
    const detail = await getDetail(data, response)

    //for creating and adding song to user's youtube playlist
    const success = await getYoutubePlaylist(detail, oauth2Client)

    if (success == false) {
        return res.json({
            msg: "Developer api Queries quota all used. Try again next day"
        })
    }
    return res.json({
        msg: "playlist added",
        link: `https://www.youtube.com/playlist?list=${success}`
    })

})
```

In `/playlist` route we will have to pass Spotify playlist URL in the request body and if the request would be success full we will get the URL of YouTube playlist.

## **Testing the Application:**

The Coding part of our Project is Completed. Now, let's see if it's working or not!

For that, we'll start the project!

```javascript
npm run dev
```

And We have started our Server on port 3000!  
Now, we'll Go to the [**http://localhost:3000/user/google/auth**](http://localhost:8000/auth/) Route to Authenticate the user. It will redirect us to something like this:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724089588095/8439c38f-267b-4ee1-ab63-392a914d7035.png align="center")

It will ask for some permission for the application

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724089630969/37cd05bf-744a-4e10-9963-9f99e05b0407.png align="center")

It will redirect to `/user/google/oauth2callback` route with the `code` query parameter.

After successfully authenticating the user, We'll go to the [**http://localhost:3000/user/playlist**](http://localhost:8000/create-event) route to get the link of YouTube playlist with all the song.

**To get the link of YouTube playlist go to postman:-**

*   Go to postman set the method to post enter the URL `http://localhost:3000/user/playlist`
    
*   Set the headers to Key- cookie, value-Youtube\_access\_token=Your\_access\_token
    
*   You would have your Youtube\_access\_token in the cookie section of `http://localhost:3000/user/google/oauth2callback`
    

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724090308709/e24346f9-edd4-4448-9a69-af6f751f8d6d.png align="center")

*   Add Spotify link in the body section
    
    ![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724090660297/e0dfd0c9-02da-4d22-b736-d58d08c06fb2.png align="center")
    

Then send the request if the request was successfull You would get the YouTube playlist link

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724090800862/ee1318d2-8eff-4131-aaaf-73259a827e6c.png align="center")

**Great! Our Application is working perfectly!**

**With that, We have integrated YouTube and Spotify API into our Node.js app.**

## **Conclusion**

If you found this blog post helpful, please consider sharing it with others who might benefit. You can also follow me for more content on JavaScript, React, and other web Development topics.

Thank you for Reading :)
