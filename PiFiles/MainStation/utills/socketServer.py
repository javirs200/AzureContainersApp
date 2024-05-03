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
                        timestamp = int(timestamp.split(':')[-1])
                        uid = int(uid.split(':')[-1])
                        times[uid] = timestamp  # store the timestamp
                        print('Stored timestamp:', timestamp)
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