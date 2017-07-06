# G.O.T. Deathmatch

[gotdeathmatch.com](http://gotdeathmatch.com) is a personal project made before the debut of Season 7 of Game of Thrones where you can vote the characters you think are going to die this season.

The frontend is done entirely with ES6 using:
 - [React](https://github.com/facebook/react) as the view engine using [Preact](https://github.com/developit/preact) on the client.
 - [Styled Components](https://github.com/styled-components/styled-components) to handle styles
 - [React Localization](https://github.com/stefalda/react-localization) to handle i18n
 - [nwb](https://github.com/insin/nwb) for development/building.

The backend is using:
 - [express](https://github.com/expressjs/express) as the framework
 - [passport](https://github.com/drudge/passport-facebook-token) for authentication
 - [helmet](https://github.com/helmetjs/helmet) for security
 - [nedb](https://github.com/louischatriot/nedb) as the database.

The server is using [PM2](https://github.com/Unitech/pm2) as the process manager.

## Running

Local development
`
npm run dev
`

Production build
`
npm run build
`
