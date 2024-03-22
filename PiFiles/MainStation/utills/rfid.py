from pirc522 import RFID
import RPi.GPIO as GPIO
import time

global rdr
global util

def rfidInit():
    global rdr
    global util
    rdr = RFID()
    util = rdr.util()
    # Set util debug to true - it will print what's going on
    util.debug = True

def decodeList(byte_array:list):
        dec_string = ""
        for b in byte_array:
                dec_string = dec_string + str(b)
        return dec_string

def rfidCall(uidsScaned):
    global rdr

    print(str(uidsScaned))

    try:
        print("ready for read")
        while(True):
            rdr.wait_for_tag()
            (error, data) = rdr.request()
            if not error:
                (error, uid) = rdr.anticoll()
                if not error:
                    print("Detected tag")
                    UUID = decodeList(uid)
                    if UUID not in uidsScaned:
                        uidsScaned.append(UUID)
                        print("new tag UID: " + UUID)
                    print("Scaned tags: " + str(uidsScaned))
                    time.sleep(1)
    except Exception as e:
            print("ops somehing goes wrong")
            print(str(e))
            GPIO.cleanup()
    except KeyboardInterrupt:
        print("\rend execution")
        GPIO.cleanup()
    pass