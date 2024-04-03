import eventlet
import socketio

class IoServer:
    def __init__(self):
        self.sio = socketio.Server()
        self.app = socketio.WSGIApp(self.sio)

        @self.sio.event
        def connect(sid, environ):
            print('connect ', sid)

        @self.sio.event
        def my_message(sid, data):
            print('message ', data)

        @self.sio.event
        def disconnect(sid):
            print('disconnect ', sid)

    def start(self):
        eventlet.wsgi.server(eventlet.listen(('', 5000)), self.app)