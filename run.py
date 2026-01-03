import os
import sys

class ClientBanner(object):
    def __init__(self):
        self.banner_client = \
"""
 ▄▄· ▄▄▌  ▪  ▄▄▄ . ▐ ▄ ▄▄▄▄▄    .▄▄ · ▄▄▄ .▄▄▄   ▌ ▐·▄▄▄ .▄▄▄  
▐█ ▌▪██•  ██ ▀▄.▀·•█▌▐█•██      ▐█ ▀. ▀▄.▀·▀▄ █·▪█·█▌▀▄.▀·▀▄ █·
██ ▄▄██▪  ▐█·▐▀▀▪▄▐█▐▐▌ ▐█.▪    ▄▀▀▀█▄▐▀▀▪▄▐▀▀▄ ▐█▐█•▐▀▀▪▄▐▀▀▄ 
▐███▌▐█▌▐▌▐█▌▐█▄▄▌██▐█▌ ▐█▌·    ▐█▄▪▐█▐█▄▄▌▐█•█▌ ███ ▐█▄▄▌▐█•█▌
·▀▀▀ .▀▀▀ ▀▀▀ ▀▀▀ ▀▀ █▪ ▀▀▀      ▀▀▀▀  ▀▀▀ .▀  ▀. ▀   ▀▀▀ .▀  ▀
note: pwa feature: install only works on local host and not network
"""
        sys.stdout.write(ClientBanner.purplepink(self.banner_client))

    @staticmethod
    def purplepink(text):
        """
        method to print a banner gradient purple gradient in this case
        """
        faded = ""
        red = 40
        for line in text.splitlines():
            faded += (f"\033[38;2;{red};0;220m{line}\033[0m\n")
            if not red == 255:
                red += 15
                if red > 255:
                    red = 255
        return faded

def client_setup(choice):
    """
    handle running client
    - automation
        - installs client dependencies for user
        - runs client for user
        - saves time to users with less experience
    """

    os.system(r'@echo off')
    os.system(r'cls')
    print("Starting frontend client...")
    # logic to setup client
    os.system('color b')
    ClientBanner()
    if not os.path.exists("node_modules"):              # check if user ran npm i
        # handle installing endpoints and running client
        print("installing client dependencies...")
        os.system("npm i")
        if choice == "2":
            print('running client (build)')
            os.system("npm run build")
            os.system("npm run preview")
        else:
            print('running client (development)')
            os.system("npm run dev")

    else:
        #handle running client
        if choice == "2":
            print('running client (network)')
            os.system("npm run build")
            os.system("npm run preview")
        else:
            print("running client (local)")
            os.system("npm run dev")



if __name__ == "__main__":
    try:
        os.system("color 6")
        print("recommend to run option 2 (production) to build into raw html,css,js")
        choice = input("enter run option [1] development [2] production (build): ")
        client_setup(choice)
    except Exception as e:
        os.system("color c")
        print('failed to setup ')
        print(e)
else:
    os.system("color c")
    print("invalid use!")
    print("run this script to setup frontend")