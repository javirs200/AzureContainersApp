import eventlet
import socketio

class IoServer:
    def __init__(self):
        # standard Python
        print('IoServer init')
        self.sio = socketio.Server( cors_allowed_origins="*") #,logger=True, engineio_logger=True)
        self.sio.transport = 'websocket'
        self.sio.always_connect = True
        self.app = socketio.WSGIApp(self.sio)

        @self.sio.event
        def connect(sid, environ):
            print('connect ', sid)
           
        @self.sio.event
        def disconnect(sid):
            print('disconnect ', sid)

        @self.sio.event
        def control(sid, data):
            if data['command'] == 'start':
                print('start recieved')
                self.flagStart.value = True
                print("flagStart: ",self.flagStart ," | ",self.flagStart.value) 
            elif data['command'] == 'stop':
                print('stop')
                self.flagStart.value = False
                self.times.clear

        @self.sio.event
        def scan(sid, data):
            if data['selectedParticipant']:
                print('recived selectedParticipant: ', data['selectedParticipant'])
                print('tags: ', self.tags)
                if data['selectedParticipant'] not in self.tags:
                    self.tags[data['selectedParticipant']] = None
                    print('new tag added: ', data['selectedParticipant'])
                    print('tags: ', self.tags)
                    

    def start(self,times: dict,flagStart:bool,tags: dict):
        print('IoServer started')
        self.times = times
        self.flagStart = flagStart
        self.tags = tags
        eventlet.wsgi.server(eventlet.listen(('', 3000)), self.app)
        while True:
            if len(self.times) > 0:
                message = self.times.popitem() # pop element of a dict
                print('sending message ->', message)
                self.sio.emit('new_time', {'time': message})
            self.sio.sleep(1)