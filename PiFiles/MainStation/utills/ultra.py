import sys
import RPi.GPIO as GPIO
import time

class UltrasonicSensor:
    def __init__(self):
        self.PIN_TRIGGER = 40  
        self.PIN_ECHO = 38
        self.treshold = None
        self.dist = None

        GPIO.setmode(GPIO.BOARD)

        GPIO.setup(self.PIN_TRIGGER, GPIO.OUT)
        GPIO.setup(self.PIN_ECHO, GPIO.IN)

        GPIO.output(self.PIN_TRIGGER, GPIO.LOW)

        print("some init")
        farMeasure = 0
        distError = 20
        for i in range(0,4):
            m = self.measure()
            print("claibration " + str(m))
            if(m > farMeasure):
                farMeasure = m
       
            self.treshold = (farMeasure - distError)

            self.dist = (farMeasure + distError)

            print("treshold " + str(self.treshold))

    def measure(self):
        try:
            distance = 0
        
            GPIO.output(self.PIN_TRIGGER, GPIO.LOW)

            time.sleep(0.1)

            GPIO.output(self.PIN_TRIGGER, GPIO.HIGH)

            time.sleep(0.00001)

            GPIO.output(self.PIN_TRIGGER, GPIO.LOW)

            while GPIO.input(self.PIN_ECHO)==0:
                    pulse_start_time = time.time()
            while GPIO.input(self.PIN_ECHO)==1:
                    pulse_end_time = time.time()

            pulse_duration = pulse_end_time - pulse_start_time
            distance = round(pulse_duration * 17150, 2)

        except Exception as e:
            print("exception : ", e)
            distance = sys.maxsize

        return distance

    def measureForever(self,uidsScaned:list,timers: dict):
        try:
            while True:
                if len(uidsScaned) > 0:
                    dist = self.measure()
                    if dist < self.treshold :
                        currentuuid = uidsScaned.pop()
                        timers[currentuuid] = time.time()
                        print("first timestamp: " + str(timers[currentuuid]) + " assigned to user: " + str(currentuuid))
                        print("RFID tags detected: " + str(currentuuid))        
                        time.sleep(1)                       
                time.sleep(0.5)                              
        except Exception as e:
            print("Measurement stopped due to exception: ", e)
            GPIO.cleanup()



 