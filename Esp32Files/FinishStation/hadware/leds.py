from machine import Pin
class led:
    def __init__(self):
        self.led=Pin(2,Pin.OUT) # onboard led
        self.led.value(0)

    def turnOn(self):
        self.led.value(1)

    def turnOff(self):
        self.led.value(0)