#!/usr/bin/env node
import * as net from "net"

if (process.argv.length < 5) {
    console.log("usage: server-tcp-proxy LOCAL_LISTEN_PORT HTTP_PROXY_HOST:PORT REMOTE_HOST:PORT ")
    process.exit(1)
}

const LISTEN_PORT = process.argv[2]
const HTTP_PROXY = process.argv[3].split(":")
const REMOTE_HOST = process.argv[4]

const server = net.createServer(function(con) {
    const client = net.createConnection({
        host: HTTP_PROXY[0],
        port: parseInt(HTTP_PROXY[1])
    }, () => {
        client.write("CONNECT "+REMOTE_HOST+" HTTP/1.1\n\n")
        var connected = false
        client.on("data", data => {
            if (!connected) {
                console.log(data.toString("utf-8"))
                con.pipe(client)
                client.pipe(con)
                connected = true
            }
        })
        client.on("close", () => {
            con.end()
        })
        con.on("close", () => {
            con.end()
        })
        client.on("error", (err) => {
            con.destroy(err)
        })
        con.on("error", (err) => {
            client.destroy(err)
        })
    })
})

server.listen(LISTEN_PORT)