#!/usr/bin/python
import RPi.GPIO as GPIO
import time

distance = 0
        
PIN_TRIGGER = 40  
PIN_ECHO = 38

GPIO.setmode(GPIO.BOARD)

GPIO.setup(PIN_TRIGGER, GPIO.OUT)
GPIO.setup(PIN_ECHO, GPIO.IN)

GPIO.output(PIN_TRIGGER, GPIO.LOW)

def measure():
    global distance
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

 