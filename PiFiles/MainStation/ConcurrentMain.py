from multiprocessing import Process , Manager

from utills import ultra
from utills import rfid
from utills import socketServer
from utills import socketIoServer


def readRfid(uidsScaned):
    RFIDReader = rfid.RFIDReader()
    RFIDReader.rfidCall(uidsScaned)

def ultrasonicMeasure(uidsScaned):
    UltrasonicSensor = ultra.UltrasonicSensor()
    UltrasonicSensor.measureForever(uidsScaned)

def socketServerProcess():
    server = socketServer.Server()
    server.start()

def socketIoServerProcess():
    IoServer =  socketIoServer.IoServer()
    IoServer.start()

if __name__ == "__main__":

    uidsScaned = Manager().list()	

    print("Starting main station" + "\n uuids: " + str(uidsScaned))

    # Create four processes, each running a CPU-bound task
    process1 = Process(target=readRfid,args=(uidsScaned))
    process2 = Process(target=ultrasonicMeasure,args=(uidsScaned))
    process3 = Process(target=socketServerProcess, args=(uidsScaned)) # server for the esp32
    process4 = Process(target=socketIoServerProcess, args=(uidsScaned)) # server for the web

    # Start all processes
    process1.start()
    process2.start()
    process3.start()
    process4.start()

    # Wait for all processes to finish
    process1.join()
    process2.join()
    process3.join()
    process4.join()