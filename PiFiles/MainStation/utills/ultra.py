#!/usr/bin/python
import RPi.GPIO as GPIO
import time

global farMeasure
global distError
global PIN_TRIGGER
global PIN_ECHO

def ultraInit():
    global farMeasure
    global distError
    global PIN_TRIGGER
    global PIN_ECHO

    PIN_TRIGGER = 40  
    PIN_ECHO = 38

    GPIO.setmode(GPIO.BOARD)

    GPIO.setup(PIN_TRIGGER, GPIO.OUT)
    GPIO.setup(PIN_ECHO, GPIO.IN)

    GPIO.output(PIN_TRIGGER, GPIO.LOW)

    print("some init")
    farMeasure = 0
    distError = 20
    for i in range(0,4):
        m = measure()
        print("claibration " + str(m))
        if(m > farMeasure):
            farMeasure = m
        time.sleep(1)
    pass

def measureForever():
    global farMeasure
    global distError

    try:
        while True:
            treshold = (farMeasure - distError)

            dist = (farMeasure + distError)

            print("treshold " + str(treshold))

            while dist > treshold :
                dist = measure()
                time.sleep(0.5)
            
            print("distance measured " + str(dist) + " treshold " + str(treshold))

            time.sleep(1)
    except KeyboardInterrupt:
        print("Measurement stopped by User")
        GPIO.cleanup()

def measure():
    try:
        distance = 0
        
        GPIO.output(PIN_TRIGGER, GPIO.LOW)

        time.sleep(0.1)

        GPIO.output(PIN_TRIGGER, GPIO.HIGH)

        time.sleep(0.00001)

        GPIO.output(PIN_TRIGGER, GPIO.LOW)

        while GPIO.input(PIN_ECHO)==0:
                pulse_start_time = time.time()
        while GPIO.input(PIN_ECHO)==1:
                pulse_end_time = time.time()

        pulse_duration = pulse_end_time - pulse_start_time
        distance = round(pulse_duration * 17150, 2)

    except Exception as e:
        print("exception : ", e)
        distance = 0

    return distance

 