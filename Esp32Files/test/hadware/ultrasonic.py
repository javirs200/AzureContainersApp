from machine import Pin
import time
import uasyncio
from mymath.utils import mean,median,mode

class ultrasonic:
    def __init__(self):
        self.trigPin1=Pin(4,Pin.OUT,0)
        self.echoPin1=Pin(14,Pin.IN,0)

        self.trigPin2=Pin(5,Pin.OUT,0)
        self.echoPin2=Pin(25,Pin.IN,0)

        # velocidad del sonido en atmosfera terrestre 343.2 m/s
        # /10k convertir cm/microsegundo 
        # /2 ida y vuelta del pulso 
        self.VelocidadSonido = 0.01716

    def getMeasureUltrasonic(self):
        distance=0
        self.trigPin.value(1)
        time.sleep_us(10)
        self.trigPin.value(0)
        # esparar hasta recibir una lectura del pin echo
        while not self.echoPin.value():
            pass
        pingStart=time.ticks_us()
        while self.echoPin.value():
            pass
        pingStop=time.ticks_us()
        pingTime=time.ticks_diff(pingStop,pingStart)

        # d=v*t 
        distance=self.VelocidadSonido*pingTime
        return int(distance)

    async def calibrate(self):
        measures1 = []
        measures2 = []

        for i in range(1,5):
            measures1.append(uasyncio.run(self.getMeasureUltrasonic()))
            time.sleep_ms(50)

        for i in range(1,5):
            measures2.append(uasyncio.run(self.getMeasureUltrasonic()))
            time.sleep_ms(50)

        dataset = measures1 + measures2

        maxd = max(dataset)
        modes = mode(dataset)
        meand = mean(dataset)
        meadiand = median(dataset)
        return maxd,modes,meand,meadiand