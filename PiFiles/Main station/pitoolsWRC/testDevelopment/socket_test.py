# echo-server.py

#socket for comunication localy with esp32

import socket

HOST = 'raspberrypi' 
PORT = 65432

with socket.socket() as s:
    print('binding')
    s.bind((HOST, PORT))
    print('bind')
    print(s)
    while True:
        try:
            print('listen')
            s.listen()
            conn, addr = s.accept()
            with conn:
                print(f"Connected by {addr}")
                while True:
                    data = conn.recv(1024)
                    if not data:
                        break
                    print(data)
                    conn.sendall(data)
        except Exception as e:
            print(e)
            pass