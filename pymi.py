import time
import rtmidi
from itertools import chain

midiout = rtmidi.MidiOut()
# [i for i, s in enumerate(("cc", "aa")) if 'aa' in s][0]

port_no = 2
midi_port = midiout.open_port(port_no)

clear = [240,0,32,41,2,16,14,0,247]


midi_port.send_message(clear)

while True:
    for color in range(1, 64):
        for i in chain(range(11, 18), range(18, 11, -1)):
            for j in range (0,90, 10):
                midi_port.send_message([240, 0, 32, 41, 2, 16, 10, i, color+5, 247])
                print(i, color)
                time.sleep(0.002)
                midi_port.send_message([240, 0, 32, 41, 2, 16, 10, i, 0, 247])
                # time.sleep(0.001)
