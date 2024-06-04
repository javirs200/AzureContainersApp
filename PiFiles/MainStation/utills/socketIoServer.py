import eventlet
import socketio
from time import sleep

from multiprocessing import Process

class IoServer:
    def __init__(self ,currenttag):
        # standard Python
        print('IoServer init')
        self.sio = socketio.Server( cors_allowed_origins="*") #,logger=True, engineio_logger=True)
        self.sio.transport = 'websocket'
        self.sio.always_connect = True
        self.app = socketio.WSGIApp(self.sio)

        self.currenttag = currenttag

        @self.sio.event
        def connect(sid, environ):
            print('connect ', sid)
            # self.sio.emit('my_response', {'data': 'Connected', 'count': 0}, room=sid)
            # while True:
            #     print('currenttag: ', self.currenttag.value , self.currenttag.value != "")
            #     if self.currenttag.value != "":
            #         print('sending tag ->', self.currenttag.value)
            #         self.sio.emit('tagScanned', {'tag': self.currenttag.value})
            #         self.currenttag.value = ""
            #     if len(self.times) > 0:
            #         message = self.times.popitem() # pop element of a dict
            #         print('sending message ->', message)
            #         res = self.sio.emit('my_response', {'time': message} ,room=sid)
            #         print('res:', res)
            #     self.sio.sleep(1)  
           
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
            res = self.sio.emit('my_response', {'participant': data} ,room=sid)
            print('res:', res)
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
        # eventlet.wsgi.server(eventlet.listen(('', 3000)), self.app)
        print('IoServer started')
        server = Process(target=eventlet.wsgi.server,args=(eventlet.listen(('', 3000)), self.app))
        server.start()
        