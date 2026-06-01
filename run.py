import os
import sys
import time
import threading
import itertools

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
    os.system(r'cls')
    print("Starting frontend client...")
    os.system('color b')

    # Check for npm dependencies
    if not os.path.exists("node_modules"):
        print("Installing client dependencies (this may take a minute)...")
        os.system("npm i")

    if choice == "1":
        print('Running client (development)...')
        os.system("npm run dev")

    if choice == "2":
        print('Building and Previewing (production mode)...')
        os.system("npm run build && npm run preview")
    else:
        input("invalid input")
        pass

if __name__ == "__main__":
    try:
        os.system("color 6")
        print("SPACE ATLAS DEPLOYMENT TOOL")
        print("---------------------------")
        print("[1] Run Development (Real-time editing)")
        print("[2] Run Production (Build and test locally)")

        user_choice = input("\nEnter option: ")
        client_setup(user_choice)
    except Exception as e:
        os.system("color c")
        print(f'Failed to setup: {e}')
