from hadware import ultrasonic as ultra
from hadware import rfid
import uasyncio

async def readRfid(uidsScaned):
    rfid.rfidInit()
    await rfid.rfidCall(uidsScaned)

async def ultrasonicMeasure(uidsScaned):
    ultra.ultrasonic.calibrate()
    await ultra.ultrasonic.getMeasureUltrasonic()

if __name__ == "__main__":
    uidsScaned = []  

    print("Starting main station" + "\n uuids: " + str(uidsScaned))

    # Create two tasks, each running a CPU-bound task
    task1 = uasyncio.create_task(readRfid(uidsScaned))
    task2 = uasyncio.create_task(ultrasonicMeasure(uidsScaned))

    # Start both tasks
    uasyncio.run(task1)
    uasyncio.run(task2)