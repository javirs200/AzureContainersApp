from time import sleep_ms
from machine import Pin, SoftSPI
from lib.mfrc522 import MFRC522
from uasyncio import sleep_ms as sleep_ms_async

class rfid:
    def __init__(self):
        self.sck = Pin(18, Pin.OUT)
        self.mosi = Pin(23, Pin.OUT)
        self.miso = Pin(19, Pin.OUT)
        self.sda = Pin(5, Pin.OUT)

        self.spi = SoftSPI(baudrate=100000, polarity=0, phase=0, sck=self.sck, mosi=self.mosi, miso=self.miso)
        
        self.rdr = MFRC522(self.spi, self.sda)
        

    def read(self):
        try:
            while True:
                (stat, tag_type) = self.rdr.request(self.rdr.REQIDL)
                if stat == self.rdr.OK:
                    (stat, raw_uid) = self.rdr.anticoll()
                    if stat == self.rdr.OK:
                        uid = ("0x%02x%02x%02x%02x" % (raw_uid[0], raw_uid[1], raw_uid[2], raw_uid[3]))
                        return uid
                sleep_ms(100)
        except:
            print("ops somehing goes wrong")

    async def do_read(self,uidsScaned):
        try:
            while True:
                (stat, tag_type) = self.rdr.request(self.rdr.REQIDL)
                if stat == self.rdr.OK:
                    (stat, raw_uid) = self.rdr.anticoll()
                    if stat == self.rdr.OK:
                        self.uid = ("0x%02x%02x%02x%02x" % (raw_uid[0], raw_uid[1], raw_uid[2], raw_uid[3]))
                        print(self.uid)
                        uidsScaned.append(self.uid)
                await sleep_ms_async(100)
        except KeyboardInterrupt:
            print("Bye")