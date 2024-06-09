from pirc522 import RFID
import time

class RFIDReader:
    def __init__(self):
        try: 
            self.rdr = RFID(pin_irq = None)
        except:
            print("ops somehing goes wrong init RFIDReader")
            print(str(e))
            pass
        
    @staticmethod
    def decodeList(byte_array:list):
        dec_string = ""
        print("decode",byte_array)
        for b in byte_array:
            dec_string = dec_string + str(b)
        return dec_string

    def rfidCall(self,uidsScaned:list,times: dict):
        try:
            print("rfidCall started")
            print("ready for read",uidsScaned)
            while(True):
                (error, tag_type) = self.rdr.request()
                if not error:
                    print("Tag detected")
                    (error, uid) = self.rdr.anticoll()
                    if not error:
                        print("Detected tag")
                        UUID = self.decodeList(uid)
                        if UUID not in times:
                            times[UUID] = None
                        if UUID not in uidsScaned:
                            uidsScaned.append(UUID)
                            print("new tag UID: " + str(UUID))
                print("Scaned tags: " + str(uidsScaned))
                time.sleep(1)
        except KeyboardInterrupt:
            # Calls GPIO cleanup
            self.rdr.cleanup()
        except Exception as e:
            print("ops somehing goes wrong")
            print(str(e))

    def readTag(self,tags:dict,flagStart:bool,currenttag:str):
        if not flagStart :
            try:
                print("ready for read tag",tags)
                (error, tag_type) = self.rdr.request()
                print("tag_type",tag_type)
                print("error",error)
                if not error:
                    print("Tag detected")
                    (error, uid) = self.rdr.anticoll()
                    if not error:
                        print("Detected tag")
                        UUID = self.decodeList(uid)
                        print("UUID",UUID)
                        if UUID not in tags.values():
                            for key in tags.keys():
                                if tags[key] is None:
                                    tags[key] = UUID
                                    mtag = str(key) + ":" + str(UUID)
                                    currenttag.value = mtag
                                    print("currenttag  " + currenttag.value)
                                    break
                time.sleep(2)
            except Exception as e:
                    print("ops somehing goes wrong")
                    print(str(e))