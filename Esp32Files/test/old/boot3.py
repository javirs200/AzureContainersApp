from hadware import ultrasonic as u
from hadware import rfid
import uasyncio

async def readRfid(uidsScaned):
    rfid.rfidInit()
    await rfid.rfidCall(uidsScaned)

async def ultrasonicMeasure(uidsScaned):
    ultra = u.ultrasonic()
    ultra.measureForever(uidsScaned)

if __name__ == "__main__":
    uidsScaned = []  

    print("Starting mini station" + "\n uuids: " + str(uidsScaned))

    # Create two tasks, each running a CPU-bound task
    task1 = uasyncio.create_task(readRfid(uidsScaned))
    task2 = uasyncio.create_task(ultrasonicMeasure(uidsScaned))

    # Start both tasks
    uasyncio.run(task1)
    uasyncio.run(task2)