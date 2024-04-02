from multiprocessing import Process,Manager

from utills import ultra
from utills import rfid


def readRfid(uidsScaned):
    rfid.rfidInit()
    rfid.rfidCall(uidsScaned)

def ultrasonicMeasure(uidsScaned):
    ultra.ultraInit()
    ultra.measureForever(uidsScaned)

def socketServer(uidsScaned):
        # Code for socket server 1
    pass

def socketIOServer(uidsScaned):
        # Code for socket server 2
    pass

if __name__ == "__main__":

    uidsScaned = Manager().list()	

    print("Starting main station" + "\n uuids: " + str(uidsScaned))

    # Create four threads, each running a CPU-bound task
    process1 = Process(target=readRfid,args=(uidsScaned))
    process2 = Process(target=ultrasonicMeasure,args=(uidsScaned))
    process3 = Process(target=socketServer, args=(uidsScaned)) # server for the esp32
    process4 = Process(target=socketIOServer, args=(uidsScaned)) # server for the web

    # Start both threads
    process1.start()
    process2.start()
    process3.start()
    process4.start()

    # Wait for all processes to finish
    process1.join()
    process2.join()
    process3.join()
    process4.join()