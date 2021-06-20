sleep 15;
#Give P4wnP1 time to execute MAC_Match HID script
P4wnP1_cli usb set --rndis;
#Once MAC_Match is completed eject USB storage
sleep 3;
mount -o loop /usr/local/P4wnP1/ums/flashdrive/2GB_FAT.bin /mnt/;
#Mount USB partition to P4wnP1 filesystem, replace "2GB_FAT.bin" with the name of your partition file
sleep 1;
if [ -e "/mnt/OPFOR" ];
#If file created by MAC_Match exists
then
rm -f /mnt/OPFOR;
#Delete file created by MAC_Match so you can instantly use it again on a different target
umount /mnt;
#Unmount USB partition from P4wnP1 filesystem
P4wnP1_cli template deploy -f default_attack
#Deploy master template "default_attack"
else
#If file created by MAC_Match doesn't exist
umount /mnt;
P4wnP1_cli template deploy -f home
#Deploy master template "home"
fi
