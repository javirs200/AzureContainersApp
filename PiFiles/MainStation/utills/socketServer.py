import socket

class Server:
    def __init__(self, address='', port=12345):
        self.server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.server_address = (address, port)
        self.server_socket.bind(self.server_address)
        self.server_socket.listen(1)
        print('Server is listening on {}:{}'.format(*self.server_address))

    def start(self,timers:dict,times:dict):
        while True:
            client_socket, client_address = self.server_socket.accept()
            print('Received connection from {}:{}'.format(*client_address))

            data = client_socket.recv(1024)
            print('Received data: {}'.format(data.decode()))

                response = 'Hello from the server!'
                client_socket.sendto(response.encode(), client_address)

        except Exception as e:
            print('An error occurred:', str(e))

        finally:
            client_socket.close()