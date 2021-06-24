const WebSocket = require('ws')

var users = [];

const wss = new WebSocket.Server({ port: 8080 },()=>{
    console.log('server started')
})

wss.on('connection', function connection(ws, req) {
   ws.on('message', (data) => { 
        let args = data.split(",");
        switch (args[0]) {
           case "login":
                users.push({
                    GameID: args[1],
                })
                console.log(users[users.length - 1]);
                ws.send("Connect thanh cong");
                break;
            
            case "remote":
                msg = args[1] + "," + args[2] + "," + args[3] + "," + args[4];

                wss.clients.forEach(function each(client) {
                    if (client !== ws && client.readyState === WebSocket.OPEN) {
                        client.send(msg);

                        console.log("send data to " + args[1]);
                    }
                })
                break;
        }
   })
})

wss.on('listening',()=>{
   console.log('listening on 8080')
})