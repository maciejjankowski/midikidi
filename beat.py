import time
import rtmidi
import random

N_BD = 35
N_SD = 36
N_SW = 43

BD = 0
SD = 0
HH = 2

BPM = 120
TAKT = 60 / BPM / 4

def note(note_number, velocity=127):
  midi_port.send_message([0x91, note_number, velocity])
  time.sleep(0.0005)

while True:
    BD = BD + 1
    SD = SD + 1
    HH = HH + 1

    if BD % 4 == 0:
        note(N_BD)

    if SD % 8 == 0:
        note(N_SD)

    if HH % 16 == 0:
        note(N_SW, random.randint(63,127))

    time.sleep(TAKT)
