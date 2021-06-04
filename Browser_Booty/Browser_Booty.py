from sqlite3 import connect

"""
Copy History file and Bookmarks file from:
"$env:SystemDrive\\Users\\$env:UserName\\AppData\\Local\\Google\\Chrome\\User Data\\Default"
"$env:SystemDrive\\Users\\$env:UserName\\AppData\\Local\\BraveSoftware\\Brave-Browser\\User Data\\Default"
"$env:SystemDrive\\Users\\$env:UserName\\AppData\\Local\\Microsoft\Edge\\User Data\\Default"
"$env:SystemDrive\\Users\\$env:UserName\\AppData\\Roaming\\Opera Software\\Opera Stable"
to one folder back from this file, if this is stored in "A:\\p4wnp1\\tools" both files should be in "A:\\p4wnp1"
Both files must be renamed with first letter of browser prepended and underscored, I.E C_History for Chrome's history file and E_Bookmarks for Edge's Bookmark file

Copy places.sqlite file from:
"$env:SystemDrive\\Users\\$env:UserName\\AppData\\Roaming\\Mozilla\\Firefox\\Profiles\\???default???"
places.sqlite must also follow the rules above
"""


def BasicHistory(bh_Browser):
    bh_conn = connect('..\\' + bh_Browser[:1] + '_History')
    print("----------------------------", bh_Browser,  "History Start----------------------------\n")
    bh_cursor = bh_conn.execute("SELECT url, title, visit_count from urls")
    for bh_row in bh_cursor:
        try:
            print("Browser = " + bh_Browser + "\n" + "Title = " + str(bh_row[1]) + "\n" + "URL = " + str(bh_row[0]) + "\n" + "Visit count = " + str(bh_row[2])+ "\n")
        except UnicodeEncodeError:
            print("Unsupported unicode entry in " + bh_Browser + " history" + "\n")
            #Some titles in the browser history throw a unicode error, I don't know enough to fix it so just gonna catch and pass.
            #Shouldn't be too big a problem, I have over 23,000 history entries with 130 unicode errors I.E a little over 0.5% loss.
            
    
    print("----------------------------", bh_Browser,  "History End------------------------------\n")
    bh_conn.close()

def FirefoxHistory():
    fh_conn = connect('..\\F_History')
    print("----------------------------Firefox History Start----------------------------\n")
    fh_cursor = fh_conn.execute("SELECT url, title, visit_count from moz_places")
    for fh_row in fh_cursor:
        try:
            print("Title = " + str(fh_row[1]) + "\n" + "URL = " + str(fh_row[0]) + "\n" + "Visit count = " + str(fh_row[2])+ "\n")
        except UnicodeEncodeError:
            print("Unsupported unicode entry in Firefox history" + "\n")
    print("----------------------------Firefox History End-------------------------------\n")
    fh_conn.close()

def BasicDownloads(bd_Browser):
    bd_conn = connect('..\\' + bd_Browser[:1] + '_History')
    print("----------------------------", bd_Browser,  "Downloads Start----------------------------\n")
    bd_cursor = bd_conn.execute("SELECT url from downloads_url_chains")
    for bd_row in bd_cursor:
        try:
            print("Browser = " + bd_Browser + "\n" + "URL = " + bd_row[0] + "\n")
        except UnicodeEncodeError:
            print("Unsupported unicode entry in " + bd_Browser + " downloads" + "\n")
    
    print("----------------------------", bd_Browser,  "Downloads End------------------------------\n")
    bd_conn.close()

def FirefoxDownloads():
    fd_count = 0
    fd_conn = connect('..\\F_History')
    print("----------------------------Firefox Downloads Start----------------------------\n")
    fd_cursor = fd_conn.execute("SELECT content from moz_annos")
    for fd_row in fd_cursor:
        if (fd_count % 2) == 0:
            #Using modulo to print every other entry because firefox database stores additional useless information in an extra row
            try:
                print("Browser = Firefox" + "\n" + "Path = " + str(fd_row[0]) + "\n")
            except UnicodeEncodeError:
                print("Unsupported unicode entry in Firefox downloads" + "\n")
        fd_count += 1
    print("----------------------------Firefox Downloads End-------------------------------\n")
    fd_conn.close()

def BasicBookmarks(bb_Browser):
    print("----------------------------", bb_Browser,  "Bookmarks Start----------------------------\n")
    with open ('..\\' + bb_Browser[:1] + '_Bookmarks', "r", encoding="utf-8") as bb_marx:
        for bb_i in bb_marx:
            if "name" in bb_i:
                print("Browser = " + bb_Browser)
                try:
                    print(bb_i.strip(" ,\n"))
                except UnicodeEncodeError:
                    print("Unsupported unicode entry in", bb_Browser, " bookmark name" + "\n")
            elif '"url":' in bb_i:
                try:
                    print(bb_i.strip(" ,\n"))
                except UnicodeEncodeError:
                    print("Unsupported unicode entry in", bb_Browser, " bookmark URL" + "\n")
                print("\n")
    print("----------------------------", bb_Browser,  "Bookmarks End------------------------------\n")

def FirefoxBookmarks():
    fb_conn = connect('..\\F_History')
    print("----------------------------Firefox Bookmarks Start----------------------------\n")
    fb_cursor = fb_conn.execute("SELECT title from moz_bookmarks")
    for fb_row in fb_cursor:
        try:
            print("Browser = Firefox" + "\n" + "Title = " + str(fb_row[0]) + "\n")
        except UnicodeEncodeError:
            print("Unsupported unicode entry in Firefox bookmarks" + "\n")
    print("----------------------------Firefox Bookmarks End-------------------------------\n")
    fb_conn.close()


def tryexec(Browser):
    try:
        BasicHistory(Browser)
        BasicDownloads(Browser)
        BasicBookmarks(Browser)
    except:
        print(Browser + " is not installed" + "\n")


tryexec("Chrome")

try:
    FirefoxHistory()
    FirefoxDownloads()
    FirefoxBookmarks()
except:
    print("Firefox is not installed" + "\n")

tryexec("Brave")
tryexec("Edge")
tryexec("Opera")
