# http://lmgtfy.com/?q=python+send+midi+note



# https://pypi.org/project/python-rtmidi/




# moduł do komunikacji z MIDI
import rtmidi


# Potrzebujemy porty wyjściowe
midiout = rtmidi.MidiOut()


# pobieramy listę portów
midiout.get_ports()


# otwieramy port
port_no = 1
midi_port = midiout.open_port(port_no)

NOTE_ON = 0x90
MIDI_CHANNEL = 1
# test the sound
midi_port.send_message([NOTE_ON | MIDI_CHANNEL, 35, 127])


# https://www.audiothingies.com/dl/micromonsta/docs/old/micromonsta_midi_map_1.0.pdf