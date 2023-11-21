import asyncio
from tornado import websocket,web


connectedClientList = [];

class MainHandler(web.RequestHandler):
    def get(self):
        self.render("index.html", title="Tornado web socket example")


class EchoWebSocket(websocket.WebSocketHandler):
    def open(self):
        print("a user connected")
        connectedClientList.append(self);

    def on_message(self, message):
        for client in connectedClientList:
            if client != self:
                client.write_message(message)

    def on_close(self):
        print("a user disconnected")
        connectedClientList.remove(self);

def make_app():
    handlers = [
        (r"/", MainHandler),
        (r"/chat", EchoWebSocket),
        (r"/static/(.*)",web.StaticFileHandler, {"path": "./static"},),
    ]
    settings = {"template_path": "./static"}
    return web.Application(handlers, **settings ,debug=True, autoreload=True,)

async def main():
    app = make_app()
    app.listen(8888)
    await asyncio.Event().wait()

if __name__ == "__main__":
    asyncio.run(main())
