export default function Footer() {
    return (
        <footer className="flex flex-col items-start gap-12 px-6 md:px-16 py-16 w-full">
            <div className="flex flex-col md:flex-row gap-12 w-full">

                <div className="flex flex-col gap-4 pt-6 border-t border-white w-full">
                    <h3 className="font-bold text-white text-2xl">
                        inspiration
                    </h3>
                    <p className="text-white text-base">
                        I was inspired by space, futuristic design, and sci‑fi games. My project lets people feel like they’re exploring space.
                    </p>
                </div>

                <div className="flex flex-col gap-4 pt-6 border-t border-white w-full">
                    <h3 className="font-bold text-white text-2xl">
                        Learning experience
                    </h3>
                    <p className="text-white text-base">
                        This project allowed me to further improve my web development skills. By learning to use multimedia JavaScript libraries such as threeJS, GSAP I was able to improve my knowledge of we development.
                    </p>
                </div>

                <div className="flex flex-col gap-4 pt-6 border-t border-white w-full">
                    <h3 className="font-bold text-white text-2xl">
                        Time Usage
                    </h3>
                    <p className="text-white text-base">
                        This project took me about 1 month to create. I spend most of my school holidays working on it.
                    </p>
                </div>

            </div>
        </footer>
    );
}
