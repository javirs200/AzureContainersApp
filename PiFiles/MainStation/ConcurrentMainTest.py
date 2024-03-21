import multiprocessing
import time

from utills import ultra
from utills import rfid


def readRfid():
    rfid.rfidInit()
    rfid.rfidCall()

def ultrasonicMeasure():
    ultra.ultraInit()
    ultra.measureForever()


if __name__ == "__main__":

    # Create two threads, each running a CPU-bound task
    process1 = multiprocessing.Process(target=readRfid)
    process2 = multiprocessing.Process(target=ultrasonicMeasure)

    # Start both threads
    process1.start()
    process2.start()

    # Wait for both threads to finish
    process1.join()
    process2.join()


    