import time
import random

class RFIDReader:
    def __init__(self):
        print("Initializing fake RFID reader")
        # Here you would normally initialize the RFID reader hardware
        pass
        

    def __del__(self):
        print("Cleaning up RFID reader")
        # Here you would normally clean up the GPIO pins or other resources
        pass

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
                # Simulate waiting for a tag 
                if random.randint(0, 10) > 8:  # Randomly simulate tag detection
                    print("Detected tag")
                    # fake random rfid UID for testing
                    uid = [random.randint(0, 9) for _ in range(10)]  # Simulate a 10-byte UID
                    UUID = self.decodeList(uid)
                    print("UUID: " + UUID)
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

# testing code
# This part is for testing the RFIDReader class independently
if __name__ == "__main__":
    rfid_reader = RFIDReader()
    uidsScaned = []
    times = {}
    rfid_reader.rfidCall(uidsScaned, times)
    print("Final scanned UIDs:", uidsScaned)
    print("Times dictionary:", times)