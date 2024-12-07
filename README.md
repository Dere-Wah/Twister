# Twister - Brackeys Game Jam 2024.2 Submission

Running this game requires me to have a backend up and maintained, and due to the little influx of players, it's not sustainable. Therefore I have decided to shut the backend down. However, now the project is Open Source! If you're interested you can host locally the game and play locally. You can also setup your own backend if you're interested, simply change the backend address at
`src\classes\TweetElement.jsx`

Also, you need to setup your OpenAI key. To do so, edit
`backend\CalmBeforeTheStorm\eval.py`

## BACKEND SETUP
- Clone the repo, navigate into backend/CalmBeforeTheStorm/ 
    `cd /backend/CalmBeforeTheStorm`
- Run the backend with uvicorn. Select your desired port where you'll be running the backend.
    `uvicorn main:app --reload --port <your port>`
- Setup your server to redirect requests to the correct port. This really depends on your current setup, so I can't go into much details about this. What I did is setting up NGINX to accept HTTPS requests, and then forward these requests locally to the port 8001 in the local network, where FastAPI was listening.


## FRONTEND SETUP
- Install ASTRO
- Run the frontend: `npm run dev` or `npm run build` to make a build.


For a more In-Depth blog on the creation of this project, check out my blog:
https://derewah.dev/projects/twister