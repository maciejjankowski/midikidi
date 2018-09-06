import time
import rtmidi
from itertools import chain
# [i for i, s in enumerate(("cc", "aa")) if 'aa' in s][0]

main_display = [
    [11, 12, 13, 14, 15, 16, 17, 18],
]


def open_port():
    midi = rtmidi.MidiOut()
    midi_port = None
    for port_no in range(midi.get_port_count()):
        port_name = midi.get_port_name(port_no)
        # print("port name", port_name)
        # 'Launchpad Mini'
        if port_name.find('Launchpad Pro Standalone Port') > -1:
            midi_port = rtmidi.MidiOut().open_port(port_no)

    return midi_port

# while False:
#     for color in range(1, 64):
#         for i in chain(range(11, 18), range(18, 11, -1)):
#             for j in range (0,90, 10):
#                 midi_port.send_message([240, 0, 32, 41, 2, 16, 10, i, color+5, 247])
#                 print(i, color)
#                 time.sleep(0.002)
#                 midi_port.send_message([240, 0, 32, 41, 2, 16, 10, i, 0, 247])
#                 time.sleep(0.001)


def light_up(position, color):
    try:
        position = int(position)
        color = int(color)
    except TypeError:
        position = 0
        color = 0

    midi_port.send_message([240, 0, 32, 41, 2, 16, 10, position, color, 247])
    # time.sleep(0.002)
    # midi_port.send_message([240, 0, 32, 41, 2, 16, 10, position, 0, 247])
    pass


def xy_to_pos(x, y):
    if x < 0 or x > 9 or y < 0 or y > 9:
        return 99
    return y * 10 + x


def light_r(ring, color):
    if ring > 4 or ring < 0:
        return

    rings = [
            [44, 45,
             54, 55],
            [33, 34, 35, 36,
             43,         46,
             53,         56,
             63, 64, 65, 66],
            [22, 23, 24, 25, 26, 27,
             32,                 37,
             42,                 47,
             52,                 57,
             62,                 67,
             72, 73, 74, 75, 76, 77],
            [11, 12, 13, 14, 15, 16, 17, 18,
             21,                         28,
             31,                         38,
             41,                         48,
             51,                         58,
             61,                         68,
             71,                         78,
             81, 82, 83, 84, 85, 86, 87, 88],
            [1,  2,   3,  4,  5,  6,  7,  8,  9,
             10,                                  19,
             20,                                  29,
             30,                                  39,
             40,                                  49,
             50,                                  59,
             60,                                  69,
             70,                                  79,
             80,                                  89,
             91, 92, 93, 94, 95, 96, 97, 98]
    ]
    [light_up(i, color) for i in rings[ring]]


def light_spiral(value=0, color=1):
    spiral = [44, 45, 55, 54,
              53, 43, 33, 34, 35, 36, 46, 56, 66, 65, 64, 63,
              62, 52, 42, 32, 22, 23, 24, 25, 26, 27,
              37, 47, 57, 67, 77, 76, 75, 74, 73, 72, 71, 61, 51, 41, 31, 21, 11, 12, 13, 14, 15,
              16, 17, 18, 28, 38, 48, 58, 68, 78, 88, 87, 86, 85, 84, 83, 82, 81, 80, 70, 60, 50, 40, 30, 20, 10,
              1,   2,  3,  4,  5,  6,  7,  8, 19, 29, 39, 49, 59, 69, 79, 89, 98, 97, 96, 95, 94, 93, 92, 91]
    [light_up(i, color) for i in spiral[0:value]]

# def


def light_row(row, color):
    pass


def draw_bar(row, height, color):
    if row < 0 or row > 9:
        return

    pass


def main():
    clear = [240, 0, 32, 41, 2, 16, 14, 0, 247]

    midi_port.send_message(clear)
    light_up(13, 20)
    light_up(1, 20)
    light_up(99, 21)
    # for color in range(89):
    # light_up(color+10, color)


midi_port = open_port()

if __name__ == '__main__':
    main()
