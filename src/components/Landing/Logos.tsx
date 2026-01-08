import ReactLogo from "../../assets/tech_used/react.png"
import GSAP from "../../assets/tech_used/gsap.png"
import TailWind from "../../assets/tech_used/tailwind.png"
import Three from "../../assets/tech_used/three.png"
import TypeScript from "../../assets/tech_used/typescript.png"
import WebStorm from "../../assets/tech_used/webstorm.png"

const logos = [
    ReactLogo,
    GSAP,
    TailWind,
    Three,
    TypeScript,
    WebStorm,
]

export default function Logos() {
    return (
        <div className="flex flex-col items-center gap-8 px-16 py-20 w-full">

            <p className="bg-[linear-gradient(90deg,rgba(60,0,255,1)_0%,rgba(197,0,255,1)_71%,rgba(208,0,255,1)_100%)]
        bg-clip-text text-transparent text-[32px] text-center font-medium">
                Project Galactic was made possible through the tools listed below
            </p>

            {/* Marquee container WITH YOUR GRADIENT */}
            <div className="relative self-stretch overflow-hidden
        bg-gradient-to-r from-violet-700/80 to-fuchsia-600/80">

                {/* Moving track */}
                <div
                    className="flex w-max items-center gap-6
          [animation:marqueeRight_20s_linear_infinite]"
                >
                    {[...logos, ...logos].map((logo, index) => (
                        <div
                            key={index}
                            className="h-20 p-4 flex justify-center items-center"
                        >
                            <img
                                src={logo}
                                className="w-48 h-28 object-contain"
                                alt="Tech logo"
                            />
                        </div>
                    ))}
                </div>

                {/* Optional fade edges */}
                <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-black/60 to-transparent" />
                <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-black/60 to-transparent" />

            </div>
        </div>
    )
}
