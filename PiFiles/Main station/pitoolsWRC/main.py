from datetime import datetime,timedelta
from pirc522 import RFID
import RPi.GPIO as GPIO
import time

import requests
import json

from testDevelopment import ultra

rdr = RFID()
util = rdr.util()

# apiURL = "http://cronos-timer.westeurope.cloudapp.azure.com:4000/api/"
apiURL = "http://192.168.137.1:4000/api/"


uidsScaned = []
timers = []

global farMeasure
global distError

def init():
    global farMeasure
    global distError 
    print("some init")
    farMeasure = 0
    distError = 20
    for i in range(0,4):
        m = ultra.measure()
        print("claibration " + str(m))
        if(m > farMeasure):
            farMeasure = m
        time.sleep(1)
    pass

def strfdelta(tdel:timedelta):
    tmp = str(tdel.days) + ":" + str(tdel.seconds) + "," + str(tdel.microseconds)
    return tmp
    
def decodeList(byte_array:list):
        dec_string = ""
        for b in byte_array:
                dec_string = dec_string + str(b)
        return dec_string

def timer():
    try:
        while(True):
            print("ready for read")
            print("timers : -> " + str(timers))
            print("uidsScaned : -> " + str(uidsScaned))
            rdr.wait_for_tag()
            (error, data) = rdr.request()
            if not error:
                (error, uid) = rdr.anticoll()
                if not error:

                    print("Detected new tag")
                
                    strUid = decodeList(uid)
                    nowtimer = datetime.utcnow()

                    try:
                        index = uidsScaned.index(strUid)
                        oldtimer = timers[index]
                        calculatedTime = nowtimer - oldtimer
                        dummy = calculatedTime.total_seconds()
                        uidsScaned.remove(strUid)
                        timers.remove(oldtimer)
                        print("tiempo calculado " + str(dummy) + " id " + strUid)
                        time.sleep(2)
                    except ValueError:
                        uidsScaned.append(strUid)
                        timers.append(nowtimer)
                        print("primer escaneo , cooldown 2 sec")
                        time.sleep(2)
                        print("available")
    except Exception as e:
        print("ops somehing goes wrong")
        print(str(e))
        GPIO.cleanup()
    except KeyboardInterrupt:
        print("\rend execution")
        GPIO.cleanup()
    pass

def rfidCall():
    global farMeasure
    global distError
    try:
        while(True):
            print("ready for read")
            rdr.wait_for_tag()
            (error, data) = rdr.request()
            if not error:
                (error, uid) = rdr.anticoll()
                if not error:

                    print("Detected new tag")
                
                    strUid = decodeList(uid)

                    treshold = (farMeasure - distError)

                    dist = (farMeasure + distError)

                    print("treshold " + str(treshold))

                    while dist > treshold :
                        dist = ultra.measure()
                        print("distance measured " + str(dist) + " treshold " + str(treshold) + str( ( dist < treshold ) ))

                    print("launch post call with "+ str(strUid) + " and distance measure " + str(dist))

                    # res = launchPOST(strUid)

                    # print("response -> " + str(res))

                    time.sleep(2)

    except Exception as e:
            print("ops somehing goes wrong")
            print(str(e))
            GPIO.cleanup()
    except KeyboardInterrupt:
        print("\rend execution")
        GPIO.cleanup()
    pass

def launchPOST(rfid:str):
    url = apiURL + ''
    datar = {
        "data": rfid
        }
    datajs = json.dumps(datar)
    x = requests.post(url,headers={"Content-Type": "application/json"},data=datajs)
    return x.text

def main():
    rfidCall()

if __name__ == '__main__':
    init()
    main()