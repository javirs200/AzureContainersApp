import utime
from hadware.ultrasonic import ultrasonic
from hadware.rfid import rfid
from mynetwork.networkManager import myNetwork
import uasyncio

uidsScaned = []
timestamps = []

global farMeasure
global distError

async def do_read(rf,timestamps):
    while True:
        print("read rfid")
        uid = rf.read()
        if len(timestamps) > 0 and uid is not None:
            print("send timestamp ",timestamps.pop(0)," and uid ",uid)
            #send data to server
        await uasyncio.sleep(0.2)

#--------main flow----------#
def main():
    net = myNetwork()
    print('phase 0 , wifi scan')
    net.connectOrReconect()
    print('phase 1 , wifi conected , initialize ultrasonic and rfid')
    ult = ultrasonic()
    rf = rfid()
    try:   
        print('wait to start 1000 ms')
        utime.sleep_ms(1000)
        print('phase 2 , ifinite loop ultrasonic and rfid')
        loop = uasyncio.get_event_loop()
        try:
            utime.sleep_ms(1000)
            net.connectOrReconect()
            # run coroutines concurrently
            loop.create_task(ult.measureForever(timestamps))
            loop.create_task(do_read(rf,timestamps))
            loop.run_forever()
        except Exception as e:
            print('Exception ',e)
            loop.stop()
            loop.close()
            print('reconection')
            pass        
    except:
        print('end')
        pass   

if __name__ == '__main__':
    main()