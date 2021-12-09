# Memory_Mug

Author: AdamWHY2K

# Description
This script can be used to dump lsass.exe, and SAM to the P4wnP1.

The .dmp file, and .hiv files created can then later be analysed for plaintext passwords and hashes.

[Procdump.exe available for download from Microsoft](https://docs.microsoft.com/en-us/sysinternals/downloads/procdump)

https://user-images.githubusercontent.com/68286215/145433913-82a213a2-f195-4ec7-8cc5-f404fc636d8d.mp4

## Config

* Enable HID Keyboard and USB Mass Storage under USB SETTINGS.
* Create loot folder on drive if it doesn't exist.
* Create tools folder on drive if it doesn't exist, and copy **procdump.exe** into it.
* Copy **Memory_Mug.js** to ```/usr/local/P4wnP1/HIDScripts/```.
* Create a trigger than executes "Memory_Mug.js" when USB gadget connected to host.

### Remember to change your layout, if it's not gb-2
