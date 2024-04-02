import socket

# Create a socket object
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Define the server address and port
server_address = ('localhost', 12345)

# Bind the socket to the server address and port
server_socket.bind(server_address)

# Listen for incoming connections
server_socket.listen(1)

print('Server is listening on {}:{}'.format(*server_address))

while True:
    # Accept a client connection
    client_socket, client_address = server_socket.accept()
    print('Received connection from {}:{}'.format(*client_address))

    # Receive data from the client
    data = client_socket.recv(1024)
    print('Received data: {}'.format(data.decode()))

    # Send a response back to the client
    response = 'Hello from the server!'
    client_socket.sendall(response.encode())

    # Close the client socket
    client_socket.close()