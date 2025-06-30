import sys
import time

class UltrasonicSensor:
    def __init__(self):
        self.treshold = None
        self.dist = None

        print("some initialization for the ultrasonic module")

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
        ## replace this metod with a random measure for maockup
        import random
        try:
            distance = random.randint(0, 100)  # Simulate a distance measurement in cm
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

#testin code
if __name__ == "__main__":
    ultrasonic_sensor = UltrasonicSensor()
    uidsScaned = []
    timers = {}
    
    # Simulate adding a tag to the list
    uidsScaned.append("1234567890")
    
    # Start measuring
    ultrasonic_sensor.measureForever(uidsScaned, timers)


 