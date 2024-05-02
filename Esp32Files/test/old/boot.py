import time
from hadware.ultrasonic import ultrasonic
from mynetwork.networkManager import myNetwork

#--------main flow----------#
def main():
    net = myNetwork()
    ult = ultrasonic()
    print('phase zero , wifi sacaned')
    net.connectOrReconect()
    print('phase one , wifi conected')
    try:   
        net.sendMessage("test socket form esp32")
        print("enviado",b'test socket form esp32')
        data = net.reciveMessage()
        print("recibido",data)
        print('wait to star 1000 ms')
        time.sleep_ms(1000)
        print('claibration')
        mx = ult.calibrate()
        print(mx,"cm , margin 10cm")
        while True:
            try:
                time.sleep_ms(1000)
                net.connectOrReconect()
                print('phase two , measuring')
                measure = ult.getMeasureUltrasonic()
                if measure < mx + 10 :
                    print('send flag')
                    net.sendMessage('car pass')
            except:
                net.closeSocket()
                print('reconection')
                pass        
    except:
        net.closeSocket()
        print('end')
        pass   

if __name__ == '__main__':
    main()