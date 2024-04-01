import utime
from hadware.ultrasonic import ultrasonic
from hadware.rfid import rfid
from mynetwork.networkManager import myNetwork
import uasyncio

uidsScaned = []
timers = []

global farMeasure
global distError

#--------main flow----------#
def main():
    net = myNetwork()
    ult = ultrasonic()
    rf = rfid()
    print('phase 0 , wifi sacaned')
    net.connectOrReconect()
    print('phase 1 , wifi conected')
    try:   
        # net.sendMessage("test socket form esp32")
        # print("enviado",b'test socket form esp32')
        # data = net.reciveMessage()
        # print("recibido",data)
        print('wait to start 1000 ms')
        utime.sleep_ms(1000)
        print('ultrasonic claibration')
        mx = ult.getMeasureUltrasonic()
        print(mx,"cm")
        utime.sleep_ms(1000)
        print('phase 2 , ifinite loop ultrasonic and rfid')
        try:
            utime.sleep_ms(1000)
            net.connectOrReconect()
            # run coroutines concurrently
            loop = uasyncio.get_event_loop()
            loop.create_task(ult.measureForever(uidsScaned))
            loop.create_task(rf.do_read(uidsScaned))
            loop.run_forever()
            
        except:
            # net.closeSocket()
            print('reconection')
            pass        
    except:
        # net.closeSocket()
        print('end')
        pass   

if __name__ == '__main__':
    main()