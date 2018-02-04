MIDI over socket.io
============================

Consists of three component:

1. Control Client: sends control messages over socket.io
2. Control Server: translates control messages received over socket.io to MIDI messages and sends them to LoopBe1 interface
3. Control Relay: Allows Client and Server to exchange messages

https://github.com/ravelox/pimidi
