import socket
from multiprocessing import Process

class Server:
    def __init__(self, address='', port=12345):
        self.server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.server_address = (address, port)
        self.server_socket.bind(self.server_address)
        self.server_socket.listen()
        print('Server is listening on {}:{}'.format(*self.server_address))

    def start(self,timers:dict,times:dict):

        def recive(client_socket):
            while True:
                data = client_socket.recv(1024)
                if data : 
                    message = data.decode()
                    print('Received data: {}'.format(message))
                    # demo message: "timestamp:1234567890|uid:1234567890"
                    if message.startswith('timestamp:'):
                        timestamp, uid = message.split('|')
                        timestamp = str(timestamp.split(':')[-1])
                        uid = str(int(uid.split(':')[-1],0))
                        print("card uid " , uid , "is in timers ? ",timers.keys())
                        if uid in timers.keys():
                            print('compare two values {}: {}'.format(timestamp, timers[uid]))
                            time = abs(int(timestamp) - int(timers[uid]))
                            time_in_ns = int(timestamp)
                            time_in_ms = time_in_ns / 1e6
                            minutes = int(time_in_ms / 60000)
                            seconds = int((time_in_ms % 60000) / 1000)
                            milliseconds = int((time_in_ms % 60000) % 1000)
                            formatted_time = '{}:{:02d}.{:03d}'.format(minutes, seconds, milliseconds)
                            print('Time for uid {}: {}'.format(uid, formatted_time))
                            times[uid] = formatted_time
                    else:
                        print('Invalid message:', message)
        try:
            while True:
                client_socket, client_address = self.server_socket.accept()
                print('Received connection from {}:{}'.format(*client_address))
                p = Process(target=recive, args=(client_socket,))
                p.start()
                
        except Exception as e:
            print('An error occurred:', str(e))

        finally:
            client_socket.close()