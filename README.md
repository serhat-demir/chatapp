# chatapp-web
Backend and web client of my realtime chat application

# Installation
**Note:** Before you run this project, nodejs and mysql have to be installed on your computer

Clone project: <br/>
`git clone https://github.com/serhat-demir/chatapp-web`

### Client
Change directory to client: <br/>
`cd chatapp-web/client`

Change redirect urls with yours: <br/>
`index.html -> row 37, 52, 62` <br/>
`chat.html -> row 40, 52, 72`

### Server
Change directory to server: <br/>
`cd ../server`

Install packages: <br/>
`npm install`

Change database credentials in: <br/>
`config.js`

Run project: <br/>
`node app.js`

## Database schema
### users table
| column | type | description |
| --- | --- | --- |
| user_id | integer | pk, ai, not null |
| user_name | text | not null |
| user_password | text | not null |

### messages table
| column | type | description |
| --- | --- | --- |
| message_id | integer | pk, ai, not null |
| message_text | text | not null |
| message_sender | integer | fk(users.user_id), not null |

# Demo
### Video
[Chat Application Demo on Youtube](https://www.youtube.com/watch?v=Ny3KEzlY5e4 "Chat Application Demo on Youtube")

### Screenshots
[![login](https://img001.prntscr.com/file/img001/oR-ghWZ3Rdy9C5wfLwePGQ.png "login")](https://img001.prntscr.com/file/img001/oR-ghWZ3Rdy9C5wfLwePGQ.png "login")

[![chat](https://img001.prntscr.com/file/img001/U3s-kteITTGkdDLfD1n_Ng.png "chat")](https://img001.prntscr.com/file/img001/U3s-kteITTGkdDLfD1n_Ng.png "chat")
