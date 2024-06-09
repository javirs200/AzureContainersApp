import eventlet
import socketio
from time import sleep

from multiprocessing import Process

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
            # self.sio.emit('my_response', {'data': 'Connected', 'count': 0}, room=sid) 
           
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
            if data['selectedId']:
                print('recived selectedId: ', data['selectedId'])
                print('tags: ', self.tags)
                if data['selectedId'] not in self.tags:
                    self.tags[data['selectedId']] = None
                    print('new tag added: ', data['selectedId'])
                    print('tags: ', self.tags)
        
    def background_loop(self):
        print('background_loop started')
        while True:
                # print('currenttag ', self.currenttag.value)
                # print('times:', self.times)
                if self.currenttag.value != "":
                    print('sending tag ->', self.currenttag.value)
                    self.sio.emit('tagScanned', {'tag': self.currenttag.value})
                    self.currenttag.value = ""
                for t in self.times.items():
                    #blocking loop ?
                    # print('t:', t)
                        message = self.times.popitem() # pop element of a dict
                        print('sending message ->',str(message))
                        # res = self.sio.emit('my_response', {'time': message})
                        # print('res:', res)
                self.sio.sleep(1)   

    def start(self,times: dict,flagStart:bool,tags: dict,currenttag):
        print('IoServer start')
    
        self.times = times
        self.flagStart = flagStart
        self.tags = tags
        self.currenttag = currenttag
        print('IoServer manager objects set' , self.times, self.flagStart, self.tags, self.currenttag)
        
        self.sio.start_background_task(self.background_loop)
        print('IoServer background_loop started')

        server = eventlet.wsgi.server(eventlet.listen(('', 3000)), self.app)
        server.start()
        print('IoServer started')
        