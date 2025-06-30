from multiprocessing import Process,Manager

from utills import ultra
from utills import rfid
from utills import socketServer
from utills import socketIoServer


def readRfid(uidsScaned,times,flagStart,tags):
    RFIDReader = rfid.RFIDReader()
    print("RFIDReader created")
    print("flagStart: ",flagStart.value)
    while not flagStart.value:
        print("flagStart: ",flagStart.value)
        RFIDReader.readTag(tags)
    if flagStart.value:
        RFIDReader.rfidCall(uidsScaned,times)

def ultrasonicMeasure(uidsScaned,timers,flagStart):
    UltrasonicSensor = ultra.UltrasonicSensor()
    while not flagStart.value:
        pass
    if flagStart.value:
        UltrasonicSensor.measureForever(uidsScaned,timers)

def socketServerProcess(timers,times,flagStart):
    server = socketServer.Server()
    server.start(timers,times)

def socketIoServerProcess(times,flagStart,tags):
    IoServer =  socketIoServer.IoServer()
    IoServer.start(times,flagStart,tags)

if __name__ == "__main__":

    uidsScaned = Manager().list()	
    timers = Manager().dict()
    times = Manager().dict()
    flagStart = Manager().Value('b', False)
    tags = Manager().dict()


    print("Starting main station" + "\n uuids: " + str(uidsScaned))

    print(str(times) + "\n" + str(timers))

    # Create four processes, each running a CPU-bound task
    process1 = Process(target=readRfid,args=(uidsScaned,times,flagStart,tags))
    process2 = Process(target=ultrasonicMeasure,args=(uidsScaned,timers,flagStart))
    process3 = Process(target=socketServerProcess, args=(timers,times,flagStart)) # server for the esp32
    process4 = Process(target=socketIoServerProcess, args=(times,flagStart,tags)) # server for the web

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