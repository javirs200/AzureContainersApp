import  time
import uasyncio
from hadware.ultrasonic import getMeasureUltrasonic,calibrate

def main2():
    while True:
        #print("calibrando...")
        maxd,modes,mean,meadian = uasyncio.run(calibrate())
        #print ("|maximo ",maxd,"|modas ",modes,"|media",mean,"|mediana",meadian,"|")
        for i in range(100):
            measure1 = uasyncio.run(getMeasureUltrasonic())
            measure2 = uasyncio.run(getMeasureUltrasonic())
            #print("|medicion1 = ",measure1,"|medicion2 = ",measure2)    
            time.sleep_ms(10)
        pass   

if __name__ == '__main__':
    main2()