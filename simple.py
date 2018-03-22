import argparse
import random
import time
from itertools import chain

from pythonosc import osc_message_builder
from pythonosc import udp_client


if __name__ == "__main__":
  parser = argparse.ArgumentParser()
  parser.add_argument("--ip", default="127.0.0.1",
      help="The ip of the OSC server")
  parser.add_argument("--port", type=int, default=5005,
      help="The port the OSC server is listening on")
  args = parser.parse_args()

  client = udp_client.SimpleUDPClient(args.ip, args.port)

  while 1:
      for i in chain(range(0, 100, 2),range(100, 0, -2)):
        client.send_message(
            "/fx/m/param/1", 
            # random.random()
            i/100
            )
        time.sleep(0.01)
