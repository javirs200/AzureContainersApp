from uasyncio import sleep_ms
from machine import Pin, SoftSPI
from lib.mfrc522 import MFRC522

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
            (stat, tag_type) = self.rdr.request(self.rdr.REQIDL)
            if stat == self.rdr.OK:
                (stat, raw_uid) = self.rdr.anticoll()
                if stat == self.rdr.OK:
                    uid = ("0x%02x%02x%02x%02x" % (raw_uid[0], raw_uid[1], raw_uid[2], raw_uid[3]))
                    return uid
            return None
        except:
            print("ops somehing goes wrong on rfid")
            return None