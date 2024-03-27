import socket
import network
import json
from hadware.leds import led

class myNetwork:
    def __init__(self):
        # Opening JSON file
        f = open('mynetwork/networks.json')

        self.jsondata = json.load(f)

        # Closing file
        f.close()
        
        self.nets = self.jsondata["networks"]

        self.sta_if = network.WLAN(network.STA_IF)
        
        self.s = socket.socket()
    
        self.sconected = False
        
        self.myled = led()


    def connectOrReconect(self):
        
        while not self.sta_if.isconnected() or not self.sconected:
            for n in self.nets:
                self.myled.turnOn()
                try:
                    self.sta_if.active(True)
                    self.sta_if.connect(n["ssid"],n["pass"])
                    addr = socket.getaddrinfo("raspberrypi", 65432)[0][-1]
                    self.s.connect(addr)
                    self.sconected = True 
                except Exception as e:
                    self.myled.turnOff()
                    print(e)
                    self.sconected = False
                    self.s.close()
                    self.sta_if.active(False)
                    pass
        self.myled.turnOff()
            


    def closeSocket(self):
        self.s.close()

    def sendMessage(self,message:str):
        self.s.send(bytes(message))

    def reciveMessage(self):
        return self.s.recv(1000)