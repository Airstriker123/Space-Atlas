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

    elif choice == "2":
        print('Building and Previewing (production mode)...')
        os.system("npm run build && npm run preview")

    elif choice == "3":
        def spinner(text):
             for frame in itertools.cycle(["/", "-", "\\", "|"]):
                if done:
                 break
                print(f"\r{text} {frame}", end="", flush=True)
                time.sleep(0.1)

        print('--- DEPLOYING TO GITHUB PAGES ---')
        os.system("npm run build")


        with open("build/.nojekyll", "w") as f:
            f.write("")


        done = False
        t = threading.Thread(target=spinner, args=("Pushing changes",))
        t.start()
        os.system("npx gh-pages -d build")

        done = True
        t.join()
        print("\rPushing changes ✔")
        input("Deployment complete.")

if __name__ == "__main__":
    try:
        os.system("color 6")
        print("SPACE ATLAS DEPLOYMENT TOOL")
        print("---------------------------")
        print("[1] Run Development (Real-time editing)")
        print("[2] Run Production (Build and test locally)")
        print("[3] Run Deploy  (ghp)")

        user_choice = input("\nEnter option: ")
        client_setup(user_choice)
    except Exception as e:
        os.system("color c")
        print(f'Failed to setup: {e}')