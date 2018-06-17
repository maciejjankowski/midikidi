import rtmidi

mo = rtmidi.MidiOut()
for port_no in range(mo.get_port_count()):
        port_name = mo.get_port_name(port_no)
        print("MIDI out:", port_name)
        if port_name.find('Launchpad Mini') > -1: 
            # or 'Launchpad Pro Standalone Port'
            midi_port = mo.open_port(port_no)
            
midi_port.send_message([0x90, 8, 16])