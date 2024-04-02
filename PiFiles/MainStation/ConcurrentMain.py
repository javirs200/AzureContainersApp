from multiprocessing import Process,Manager

from utills import ultra
from utills import rfid


def readRfid(uidsScaned):
    rfid.rfidInit()
    rfid.rfidCall(uidsScaned)

def ultrasonicMeasure(uidsScaned):
    ultra.ultraInit()
    ultra.measureForever(uidsScaned)


if __name__ == "__main__":

    uidsScaned = Manager().list()	

    print("Starting main station" + "\n uuids: " + str(uidsScaned))

    # Create two threads, each running a CPU-bound task
    process1 = Process(target=readRfid,args=(uidsScaned,))
    process2 = Process(target=ultrasonicMeasure,args=(uidsScaned,))

    # Start both threads
    process1.start()
    process2.start()

    # Wait for both threads to finish
    process1.join()
    process2.join()


    