import time
from pirc522 import RFID
import RPi.GPIO as GPIO

rdr = RFID()
util = rdr.util()
# Set util debug to true - it will print what's going on
#util.debug = True

def rfid_write_str(block,mystring):
        util.do_auth(block)
        b_array=bytearray(mystring,'utf-8')
        b_array += bytearray((0,)) * (16-len(b_array))
        rdr.write(block,b_array)

def rfid_read_str(block):
        error,byte_array = rdr.read(block)
        if not error:
                print(byte_array)
                dec_string = ""
                for character in byte_array:
                        dec_string = dec_string + chr(character)
                return dec_string
        else:
             return "error"

try:
  while True:
    # Wait for tag
    rdr.wait_for_tag()
    # Request tag
    (error, data) = rdr.request()

    if not error:
        print("\nDetected")
        print("tag type = " + str(data))
        (error, uid) = rdr.anticoll()
        if not error:
            
            card_data = str(uid[0])+","+str(uid[1])+","+str(uid[2])+","+str(uid[3])
            # Set tag as used in util. This will call RFID.select_tag(uid)
            util.set_tag(uid)
            # Save authorization info (key B) to util
            util.auth(rdr.auth_b, [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF])

            text='string de muestra'
            print("Witing new value...")
            rfid_write_str(9,text)
                       
        
            try:
                resString = rfid_read_str(9)
                print("leido " + str(resString))
            except:
                pass
            
            # We must stop crypto
            util.deauth()
            time.sleep(1)
            print("Available to start a new reading")

except KeyboardInterrupt:
  print('interrupted!')
  GPIO.cleanup()
