from mfrc522 import SimpleMFRC522
import RPi.GPIO as GPIO
import time

class RFIDReader:
    def __init__(self):
        try: 
            GPIO.cleanup()
        except:
            pass
        self.reader = SimpleMFRC522()
        
    def __del__(self):
        GPIO.cleanup()

    def rfidCall(self,uidsScaned:list,times: dict):
        try:
            print("rfidCall started")
            print("ready for read",uidsScaned)
            while(True):
                print("waiting tagg")
                UUID, text = self.reader.read()
                print("Detected tag")
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

    def readTag(self,tags:dict,flagStart:bool,currenttag:str):
        if not flagStart :
            try:
                print("ready for read tag",tags)
                UUID, text = self.reader.read()
                print("Detected tag")
                if UUID not in tags.values():
                    for key in tags.keys():
                        if tags[key] is None:
                            tags[key] = UUID
                            mtag = str(key) + ":" + str(UUID)
                            currenttag.value = mtag
                            print("currenttag  " + currenttag.value)
                            break
                time.sleep(1)
            except Exception as e:
                    print("ops somehing goes wrong")
                    print(str(e))
                    GPIO.cleanup()