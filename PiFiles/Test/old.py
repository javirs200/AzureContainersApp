# Simple test for NeoPixels on Raspberry Pi
import time
import board
import neopixel
import ultra
 
# Choose an open pin connected to the Data In of the NeoPixel strip, i.e. board.D18
# NeoPixels must be connected to D10, D12, D18 or D21 to work.
pixel_pin = board.D18
 
# The number of NeoPixels
num_pixels = 8
 
# The order of the pixel colors - RGB or GRB. Some NeoPixels have red and green reversed!
# For RGBW NeoPixels, simply change the ORDER to RGBW or GRBW.
ORDER = neopixel.GRB
 
pixels = neopixel.NeoPixel(
    pixel_pin, num_pixels, brightness=0.2, auto_write=False, pixel_order=ORDER
)


pixels.fill((0,0,0))
pixels.show()
time.sleep(0.1)

high_dist = 0

for i in range(5):
    dist = ultra.measure()
    print("distancia : ",dist)
    if dist > high_dist :
        high_dist = dist
    time.sleep(0.5)

print("distancia mayor: ",high_dist)
time.sleep(0.5)

pixels.fill((255,255,255))
pixels.show()
time.sleep(0.5)

pixels.fill((0,0,0))
pixels.show()
time.sleep(0.5)

while True:
    
    for i in range(3):
        for j in range(num_pixels):
            pixels[j] = (0,0,255)
            pixels.show()
            time.sleep(0.1)

        time.sleep(0.1)

        pixels.fill((0,0,0))
        pixels.show()
        time.sleep(0.1)


    pixels.fill((0,255,0))
    pixels.show()
    time.sleep(0.1)

    while True:
        dist = ultra.measure()
        print("distancia : ",dist)