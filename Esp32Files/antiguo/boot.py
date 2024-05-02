from machine import Pin
import time
import network
import socket

import uasyncio

led=Pin(2,Pin.OUT) # onboard led
led.value(0)

trigPin1=Pin(4,Pin.OUT,0)
echoPin1=Pin(14,Pin.IN,0)

trigPin2=Pin(5,Pin.OUT,0)
echoPin2=Pin(25,Pin.IN,0)

# velocidad del sonido en atmosfera terrestre 343.2 m/s
# /10k convertir cm/microsegundo 
# /2 ida y vuelta del pulso 
VelocidadSonido = 0.01716
distance=0

SSID1 = 'HUAWEI P30 lite' #Enter the router name
PSWD1 = 'xcom1234' #Enter the router password

SSID2 = 'MIWIFI_ccHC' #Enter the router name
PSWD2 = 'thEchPhf' #Enter the router password


global sta_if
sta_if = network.WLAN(network.STA_IF)
global s
s = socket.socket()
global sconected
sconected = False
global addr
addr = socket.getaddrinfo('192.168.1.137', 65432)[0][-1]

#------------aux functions--------------#
def mode(dataset):
    frequency = {}
    for value in dataset:
        frequency[value] = frequency.get(value, 0) + 1
    most_frequent = max(frequency.values())
    modes = [key for key, value in frequency.items()
                      if value == most_frequent]
    return modes

def mean(dataset):
    return sum(dataset) / len(dataset)

def median(dataset):
    data = sorted(dataset)
    index = len(data) // 2
    # If the dataset is odd  
    if len(dataset) % 2 != 0:
        return data[index]
    # If the dataset is even
    return (data[index - 1] + data[index]) / 2

def connectOrReconect():
    global sta_if
    global sconected
    global addr
    led.value(1)
    while not sta_if.isconnected() or not sconected:
        try:
            sta_if.active(True)
            sta_if.connect(SSID1,PSWD1)
            addr = socket.getaddrinfo('192.168.40.140', 65432)[0][-1]
        except:
            try:
                sta_if.active(True)
                sta_if.connect(SSID2,PSWD2)
                addr = socket.getaddrinfo('192.168.1.137', 65432)[0][-1]
            except:
                pass
            pass
        pass
        try:
            s.connect(addr)
            sconected = True
        except Exception as e:
            #print(e)
            sconected = False
            s.close()
            sta_if.active(False)
            pass
    led.value(0)
        
async def getMeasureUltrasonic(trigPin,echoPin):
    trigPin.value(1)
    time.sleep_us(10)
    trigPin.value(0)
    # esparar hasta recibir una lectura del pin echo
    while not echoPin.value():
        pass
    pingStart=time.ticks_us()
    while echoPin.value():
        pass
    pingStop=time.ticks_us()
    pingTime=time.ticks_diff(pingStop,pingStart)

    # d=v*t 
    distance=VelocidadSonido*pingTime
    return int(distance)

async def calibrate():
    measure11 = uasyncio.run(getMeasureUltrasonic(trigPin1,echoPin1))
    time.sleep_ms(50)
    measure21 = uasyncio.run(getMeasureUltrasonic(trigPin1,echoPin1))
    time.sleep_ms(50)
    measure31 = uasyncio.run(getMeasureUltrasonic(trigPin1,echoPin1))
    time.sleep_ms(50)
    measure41 = uasyncio.run(getMeasureUltrasonic(trigPin1,echoPin1))
    time.sleep_ms(50)
    measure51 = uasyncio.run(getMeasureUltrasonic(trigPin1,echoPin1))
    time.sleep_ms(50)

    measure12 = uasyncio.run(getMeasureUltrasonic(trigPin2,echoPin2))
    time.sleep_ms(50)
    measure22 = uasyncio.run(getMeasureUltrasonic(trigPin2,echoPin2))
    time.sleep_ms(50)
    measure32 = uasyncio.run(getMeasureUltrasonic(trigPin2,echoPin2))
    time.sleep_ms(50)
    measure42 = uasyncio.run(getMeasureUltrasonic(trigPin2,echoPin2))
    time.sleep_ms(50)
    measure52 = uasyncio.run(getMeasureUltrasonic(trigPin2,echoPin2))
    time.sleep_ms(50)

    dataset = [measure11,measure21,measure31,measure41,measure51,measure12,measure22,measure32,measure42,measure52]

    maxd = max(dataset)
    modes = mode(dataset)
    meand = mean(dataset)
    meadiand = median(dataset)
    return maxd,modes,meand,meadiand

#--------main flow----------#
def main():
    
    print('phase zero , wifi sacaned')
    connectOrReconect()
    print('phase one , wifi conected')
    try:   
        s.send(b'test socket form esp32')
        print("enviado",b'test socket form esp32')
        data = s.recv(1000)
        print("recibido",data)
        print('wait to star 1000 ms')
        time.sleep_ms(1000)
        print('claibration')
        mx = calibrate()
        print(mx,"cm , margin 10cm")
        while True:
            try:
                time.sleep_ms(1000)
                connectOrReconect()
                print('phase two , measuring')
                measure = getMeasureUltrasonic()
                if measure < mx + 10 :
                    print('send flag')
                    s.send('car pass')
            except:
                s.close()
                print('reconection')
                pass        
    except:
        s.close()
        print('end')
        pass   

def main2():
    while True:
        #print("calibrando...")
        maxd,modes,mean,meadian = uasyncio.run(calibrate())
        #print ("|maximo ",maxd,"|modas ",modes,"|media",mean,"|mediana",meadian,"|")
        for i in range(100):
            measure1 = uasyncio.run(getMeasureUltrasonic(trigPin1,echoPin1))
            measure2 = uasyncio.run(getMeasureUltrasonic(trigPin2,echoPin2))
            #print("|medicion1 = ",measure1,"|medicion2 = ",measure2)    
            time.sleep_ms(10)
        pass     
    
   
if __name__ == '__main__':
    main()
    
    
    
    
    
    
    
    
    
    
    
    
    
