from multiprocessing import Process,Manager

from utills import ultra
from utills import rfid
from utills import socketServer
from utills import socketIoServer


def readRfid(uidsScaned,times):
    RFIDReader = rfid.RFIDReader()
    RFIDReader.rfidCall(uidsScaned)

def ultrasonicMeasure(uidsScaned,timers):
    UltrasonicSensor = ultra.UltrasonicSensor()
    UltrasonicSensor.measureForever(uidsScaned,timers)

def socketServerProcess(timers,times):
    server = socketServer.Server()
    server.start(timers,times)

def socketIoServerProcess(times):
    IoServer =  socketIoServer.IoServer()
    IoServer.start(times)

if __name__ == "__main__":

    uidsScaned = Manager().list()	
    timers = Manager().dict()
    times = Manager().dict()

    print("Starting main station" + "\n uuids: " + str(uidsScaned))

    # Create four processes, each running a CPU-bound task
    # process1 = Process(target=readRfid,args=(uidsScaned,times))
    # process2 = Process(target=ultrasonicMeasure,args=(uidsScaned,timers))
    process3 = Process(target=socketServerProcess, args=(timers,times)) # server for the esp32
    # process4 = Process(target=socketIoServerProcess, args=(times)) # server for the web

    # Start all processes
    # process1.start()
    # process2.start()
    process3.start()
    # process4.start()

    # Wait for all processes to finish
    # process1.join()
    # process2.join()
    process3.join()
    # process4.join()