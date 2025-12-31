# WeatherWorker for sthivaios.dev

This repository is the code for a Cloudflare Worker that exposes an API for reading and writing to the Cloudflare KV.

It's intended to be used to the weather station widget on my personal website (sthivaios.dev).

TL;DR: It basically gets the latest data from the sensor, and pushes it to the Cloudflare KV, while also exposing
an API for the website to grab that data and display it.

This is my first ever Workers project and I lowkey have absolutely no idea what I'm doing lol, so hopefully I don't do too dumb stuff.

If you do think part of this code is stupid, feel free to open an issue I guess...

## Other projects that this depends on
- The EDLAVP firmware for ESP32 boards: weather station ESP-IDF firmware I've developed for ESP32 boards [https://github.com/sthivaios/EDLAVP-ESP-FW](https://github.com/sthivaios/EDLAVP-ESP-FW)