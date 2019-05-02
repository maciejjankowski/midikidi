from DmxPy import DmxPy
CHAN = 2

value = 10
PORT_NAME = "/dev/ttyUSB1"
PORT_NAME="/dev/serial/by-id/usb-KWMATIK_KW-D02_USB_dmx512_RTS1910-if00-port0"
PORT_NAME = "/dev/tty.usbserial-RTS1910"

dmx = DmxPy(PORT_NAME)
dmx.setChannel(CHAN, value)
dmx.render()
