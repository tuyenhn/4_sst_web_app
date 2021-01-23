import subprocess
from json import load


def translate(file_path):
    f = open(file_path, "r", encoding="utf-8")
    raw_json = load(f)
    f.close()

    boilerStart()
    with open("main.cpp", "a") as f:
        for k, v in raw_json.items():
            rgb = hexToRGB(v)
            led_n = int(k.lstrip("led"))
            f.write(f"\tleds[{led_n}] = CRGB{rgb};\n")

    boilerEnd()


def boilerStart():
    with open("main.cpp", "w") as f:
        f.write(
            """#include "patterns.h"

void setup() {
    // Serial.begin(57600);
    // delay(3000);
    FastLED.addLeds<2, WS2812B, 1, GRB>(leds, 1617).setCorrection(TypicalLEDStrip);

    FastLED.clear(true);
    FastLED.show();

    spiral.start();
    mandala.start();
    simplex.start();

    palCtrl.loadPalette(0);
}

int pattern_it = 1;

void loop() {
"""
        )


def boilerEnd():
    with open("main.cpp", "a") as f:
        f.write(
            """\tFastLED.setBrightness(brightness);
    FastLED.show();
    delay(1);
}"""
        )


def hexToRGB(hex_str):
    return tuple(int(hex_str.lstrip("#")[i : i + 2], 16) for i in (0, 2, 4))
