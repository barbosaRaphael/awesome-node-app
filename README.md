![enter image description here](https://sea-lion-app-32qt6.ondigitalocean.app/media/logo.png)

# Latte Journal Node App

### A simple and versatile blog style app for backend development study and experimentation.

## Demo

[Live demo](https://sea-lion-app-32qt6.ondigitalocean.app/)

## Features

- EJS rendering.
- JWT authentication.
- Fully structured MVC architecture.
- Markdown editor for better formatted articles.
- Fully coded with typescript.
- DigitalOcean App Platform compatible.

## Installation

Clone the repo to a local directory.

    git clone https://github.com/cyanoblu/awesome-node-app.git

Install the dependencies.

    npm install

Setup environment variables, create a **.env** file in the root directory, the same directory where app.ts is located.
You should not, under any circumstances, push any of the info below to a public repository.

    APP_PORT=3000    #Choose the port the app will listen to

    DB_LOGIN=user    #mongodb user login

    DB_PASSWORD=password     #user password

    DB_COLLECTION=db-collection-name

    DB_MAIN=db-name

    SECRET_TOKEN=secret-hash    #required for hashing jwt tokens

    EXPIRATION_TOKEN=86400    #time it takes for jwt token to expire. set to 24 hours

Make sure you have `users` and `articles` as collections on your db, and remember to allow network access to your machine ip on mongodb network panel (Assuming you're using Atlas).

All set, now spin up the server

    npm run start

The typescript compiler will do it's job and you have a new great blog running!

For development, i recomend using nodemon

    npm run dev

Nodemon will detect any changes on the project files and restart the server automatically, saving a lot of time during development.
Remember to change the path serving the public directory for nodemon to be able to detect static files

    app.use(express.static(__dirname  +  '../../src/public'))  >  app.use(express.static(__dirname  +  '/src/public'))

That's it, very simple and easy, feel free to experiment play with it as much as you want. Check out the live demo if you want to see it working live.

## Credits

Big thanks to the developers of the software below that allow this to function

- [Node.js](https://nodejs.org/)
- [ExpressJs](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [Easy Markdown Editor](https://github.com/Ionaru/easy-markdown-editor)
- [Marked - markdown parser](https://github.com/markedjs/marked)

## License

MIT
