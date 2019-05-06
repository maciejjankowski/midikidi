import time
import rtmidi

NOTES = [36, 38, 40, 41, 43, 45]


def program_change(program_number):
  pass

def play_sample(sample_number):
  for velocity in [15, 31, 63, 95, 111, 127]:
    play_note(NOTES[sample_number], velocity)
    time.sleep(5)

def main():
  for program in range(0, 800):
    program_change(program)
    for sample in range(6):
      play_sample(sample)

if __name__ == '__main__':
    main()
