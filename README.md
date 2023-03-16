# chatapp-web
backend and web client of my realtime chat application

# installation
**note:** before you run this project, nodejs and mysql have to be installed on your computer

clone project: <br/>
`git clone https://github.com/serhat-demir/chatapp-web`

### client
change directory to client: <br/>
`cd chatapp-web/client`

change redirect urls with yours: <br/>
`index.html -> row 52`
`chat.html -> row 52`

### server
change directory to server: <br/>
`cd ../server`

install packages: <br/>
`npm install`

run project: <br/>
`node app.js`

## database schema
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
