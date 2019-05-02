import time
import rtmidi
import random


def open_midi_port():
    mo = rtmidi.MidiOut()
    for port_no in range(mo.get_port_count()):
        port_name = mo.get_port_name(port_no)
        print("MIDI out:", port_name)
        if port_name.find('Digi') > -1:
            midi_port = mo.open_port(port_no)
    return midi_port


MIDI_CHANNEL = 0x91
midi_port = None

def note(note_number, velocity=127, channel=MIDI_CHANNEL):
    midi_port.send_message([channel, note_number, velocity])
    time.sleep(0.0005)  # musi być, bo inaczej nie gra


def main():
    global midi_port 
    midi_port = open_midi_port()

    N_BD = 35
    N_SD = 36
    N_SW = 43

    BD = 0
    SD = 0
    HH = 2

    BPM = 120
    TAKT = 60 / BPM / 4
    
    while True:
        BD = BD + 1
        SD = SD + 1
        HH = HH + 1

        if BD % 4 == 0:
            note(N_BD)

        if SD % 8 == 0:
            note(N_SD)

        if HH % 16 == 0:
            note(N_SW, random.randint(63, 127))

        time.sleep(TAKT)

main()