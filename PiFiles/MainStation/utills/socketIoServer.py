import eventlet
import socketio

class IoServer:
    def __init__(self,socketInternalMessages):
        # standard Python
        self.sio = socketio.Server(cors_allowed_origins="*") #,logger=True, engineio_logger=True)
        self.sio.transport = 'websocket'
        self.sio.always_connect = True
        self.app = socketio.WSGIApp(self.sio)

        @self.sio.event
        def connect(sid, environ):
            print('connect ', sid)
            while True:
                if len(socketInternalMessages) > 0:
                    message = socketInternalMessages.pop(0)
                    print('sending message to ',sid,' ->', message)
                    self.sio.emit('my_response', {'data': message}, room=sid)
                self.sio.sleep(1)
                

        @self.sio.event
        def my_message(sid, data):
            print('message recived by ',sid,' with data ->', data)
            self.sio.emit('my_response', {'data': data}, room=sid)

        @self.sio.event
        def disconnect(sid):
            print('disconnect ', sid)

    def start(self,times: dict):
        self.times = times
        eventlet.wsgi.server(eventlet.listen(('', 3000)), self.app)