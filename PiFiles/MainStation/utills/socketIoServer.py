import eventlet
import socketio

class IoServer:
    def __init__(self):
        # standard Python
        self.sio = socketio.Server(cors_allowed_origins="*") #,logger=True, engineio_logger=True)
        self.sio.transport = 'websocket'
        self.sio.always_connect = True
        self.app = socketio.WSGIApp(self.sio)

        @self.sio.event
        def connect(sid, environ):
            print('connect ', sid)

        @self.sio.event
        def my_message(sid, data):
            print('message recived by ',sid,' with data ->', data)
            self.sio.emit('my_response', {'data': data}, room=sid)

        @self.sio.event
        def disconnect(sid):
            print('disconnect ', sid)

    def start(self):
        eventlet.wsgi.server(eventlet.listen(('', 3000)), self.app)