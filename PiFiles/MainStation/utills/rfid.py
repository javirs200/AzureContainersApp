from pirc522 import RFID
import RPi.GPIO as GPIO
import time

class RFIDReader:
    def __init__(self):
        self.rdr = RFID()
        self.util = self.rdr.util()
        # Set util debug to true - it will print what's going on
        self.util.debug = True
        self.uidsScanned = []

    @staticmethod
    def decodeList(byte_array:list):
        dec_string = ""
        for b in byte_array:
            dec_string = dec_string + str(b)
        return dec_string

    def rfidCall(self):
        try:
            print("ready for read",self.uidsScanned)
            while(True):
                self.rdr.wait_for_tag()
                (error, data) = self.rdr.request()
                if not error:
                    (error, uid) = self.rdr.anticoll()
                    if not error:
                        print("Detected tag")
                        UUID = self.decodeList(uid)
                        if UUID not in self.uidsScaned:
                            self.uidsScaned.append(UUID)
                            print("new tag UID: " + UUID)
                        print("Scaned tags: " + str(self.uidsScaned))
                        time.sleep(1)
        except Exception as e:
                print("ops somehing goes wrong")
                print(str(e))
                GPIO.cleanup()