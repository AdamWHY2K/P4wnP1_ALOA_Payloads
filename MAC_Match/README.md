# MAC_Match

Author: AdamWHY2K

# Description
This script is intended to whitelist certain computers, allowing automatic attacks to be launched against non-whitelisted MAC addresses.

Please note I've only tested this on a couple different devices, the delay(#)s may need some configuring.

## Config

* Enable HID Keyboard and USB Mass Storage under USB SETTINGS.
* Copy **MAC_Match.js** to ```/usr/local/P4wnP1/HIDScripts/```.
* Copy **MAC_Mobilise.sh** to ```/usr/local/P4wnP1/scripts/```.
* Create a trigger that executes **MAC_Match.js** on host connection.
* Create a trigger that executes **MAC_Mobilise.sh** once on host connection.
* Ensure these triggers are in your startup master template.
* Create a master template that includes triggers for the attacks you want to launch, default name: **default_attack**
* Create a master template that doesn't include triggers for attacks and has mass storage enabled, default name: **home**

### Remember to change your layout, if it's not gb-2
