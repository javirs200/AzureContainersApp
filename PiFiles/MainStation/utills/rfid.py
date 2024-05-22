from pirc522 import RFID
import RPi.GPIO as GPIO
import time

class RFIDReader:
    def __init__(self):
        try: 
            GPIO.cleanup()
        except:
            pass
        self.rdr = RFID()
        self.util = self.rdr.util()
        # Set util debug to true - it will print what's going on
        self.util.debug = True

    def __del__(self):
        GPIO.cleanup()

    @staticmethod
    def decodeList(byte_array:list):
        dec_string = ""
        for b in byte_array:
            dec_string = dec_string + str(b)
        return dec_string

    def rfidCall(self,uidsScaned:list,times: dict):
        try:
            print("rfidCall started")
            print("ready for read",uidsScaned)
            while(True):
                self.rdr.wait_for_tag()
                (error, data) = self.rdr.request()
                if not error:
                    (error, uid) = self.rdr.anticoll()
                    if not error:
                        print("Detected tag")
                        UUID = self.decodeList(uid)
                        if UUID not in times:
                                times[UUID] = None
                        if UUID not in uidsScaned:
                            uidsScaned.append(UUID)
                            print("new tag UID: " + UUID)
                        print("Scaned tags: " + str(uidsScaned))
                time.sleep(1)
        except Exception as e:
                print("ops somehing goes wrong")
                print(str(e))
                GPIO.cleanup()

    def readTag(self,tags:dict):
        try:
            print("ready for read tag",tags)
            self.rdr.wait_for_tag()
            (error, data) = self.rdr.request()
            if not error:
                (error, uid) = self.rdr.anticoll()
                if not error:
                    print("Detected tag")
                    UUID = self.decodeList(uid)
                    if UUID not in tags.values():
                        for key in tags.keys():
                            if tags[key] is None:
                                tags[key] = UUID
                                break
            time.sleep(1)
        except Exception as e:
                print("ops somehing goes wrong")
                print(str(e))
                GPIO.cleanup()