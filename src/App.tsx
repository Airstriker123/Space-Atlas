import './App.css'
import Hero from "./components/Landing/Hero.tsx"

export default function App()
{
  return (
    <>
      <Hero/>
    </>
  )
}



/*
export default function App()
{
  return (
      <div
          className="flex flex-col w-[1280px] h-[3022px] items-center justify-center relative overflow-hidden bg-[linear-gradient(180deg,rgba(0,0,0,1)_50%,rgba(34,1,50,1)_65%,rgba(0,0,0,1)_83%,rgba(85,0,255,1)_100%)]"
          data-model-id="1:6"
      >
        <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto] mt-[-52.91px]">
          <img
              className="absolute w-[1280px] h-[475px] top-0 left-0"
              alt="Hero"
              src="https://c.animaapp.com/3lbQtmfk/img/hero.png"
          />

          <div className="flex flex-col items-center justify-center px-16 py-0 relative self-stretch w-full flex-[0_0_auto] bg-[url(https://c.animaapp.com/3lbQtmfk/img/visual.png)] bg-cover bg-[50%_50%]">
            <div className="relative self-stretch w-full h-[542px] rounded-2xl" />
          </div>

          <div className="flex flex-col items-center gap-8 px-16 py-20 border-b-[1.5px] [border-bottom-style:solid] border-white shadow-[0px_4px_4px_#ffffff40] relative self-stretch w-full flex-[0_0_auto]">
            <p className="items-center justify-center self-stretch mt-[-1.50px] bg-[linear-gradient(90deg,rgba(60,0,255,1)_0%,rgba(197,0,255,1)_71%,rgba(208,0,255,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Inter',Helvetica] font-medium text-transparent text-[32px] text-center tracking-[-0.16px] leading-[46.4px] relative flex">
              Project Galactic was made possible through the tools listed below
            </p>

            <img
                className="relative self-stretch w-full flex-[0_0_auto]"
                alt="Logos"
                src="https://c.animaapp.com/3lbQtmfk/img/logos.svg"
            />
          </div>

          <div className="flex flex-col items-center justify-center relative self-stretch w-full flex-[0_0_auto]">
            <div className="pt-20 pb-10 px-16 flex items-center justify-center gap-16 relative self-stretch w-full flex-[0_0_auto]">
              <div className="self-stretch flex flex-col items-start justify-center gap-12 relative flex-1 grow">
                <div className="flex-col items-start gap-6 self-stretch w-full flex-[0_0_auto] relative flex">
                  <div className="relative flex items-center justify-center self-stretch mt-[-1.00px] bg-[linear-gradient(90deg,rgba(94,0,255,1)_0%,rgba(255,0,221,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Inter',Helvetica] font-bold text-transparent text-4xl tracking-[-0.72px] leading-[43.2px]">
                    About project galactic
                  </div>

                  <p className="relative flex items-center justify-center self-stretch [font-family:'Inter',Helvetica] font-medium text-white text-lg tracking-[-0.09px] leading-[26.1px]">
                    Project Galactic is an interactive 3D web experience that
                    simulates an immersive journey through space. You can explore
                    different celestial environments, interact with 3D objects
                    such as planets, satellites, and asteroids. The project
                    combines 3D modelling, animation, sound design, and
                    interactive coding to create an engaging multimedia
                    experience.
                  </p>
                </div>

                <button className="all-[unset] box-border bg-[linear-gradient(90deg,rgba(83,38,229,1)_0%,rgba(150,15,162,1)_100%)] inline-flex items-center justify-center gap-2 px-4 py-3 relative flex-[0_0_auto] rounded-xl">
                  <div className="relative flex items-center justify-center w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-medium text-white text-lg text-center tracking-[-0.09px] leading-[26.1px] whitespace-nowrap">
                    go to experience
                  </div>
                </button>
              </div>

              <div className="flex flex-col h-[432px] items-start gap-2 relative flex-1 grow bg-[url(https://c.animaapp.com/3lbQtmfk/img/image-1.png)] bg-cover bg-[50%_50%]">
                <div className="relative flex-1 self-stretch w-full grow rounded-2xl border-[none] opacity-80 before:content-[''] before:absolute before:inset-0 before:p-0.5 before:rounded-2xl before:[background:linear-gradient(180deg,rgba(232,142,255,1)_0%,rgba(195,0,255,1)_100%)] before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[-webkit-mask-composite:xor] before:[mask-composite:exclude] before:z-[1] before:pointer-events-none" />
              </div>
            </div>

            <div className="pt-10 pb-20 px-16 flex items-center justify-center gap-16 relative self-stretch w-full flex-[0_0_auto]">
              <div className="flex flex-col h-[432px] items-start gap-2 relative flex-1 grow border-[3px] border-solid border-transparent [border-image:linear-gradient(180deg,rgba(119,0,255,1)_0%,rgba(197,6,255,1)_100%)_1] bg-[url(https://c.animaapp.com/3lbQtmfk/img/image-1.png)] bg-cover bg-[50%_50%]">
                <div className="relative self-stretch w-full h-[432px] rounded-2xl" />

                <div className="relative flex-1 self-stretch w-full grow mb-[-9.00px] rounded-2xl" />
              </div>

              <div className="flex flex-col items-start justify-center gap-12 relative flex-1 grow">
                <div className="flex-col items-start gap-6 self-stretch w-full flex-[0_0_auto] relative flex">
                  <div className="relative flex items-center justify-center self-stretch mt-[-1.00px] bg-[linear-gradient(90deg,rgba(113,46,248,1)_0%,rgba(217,0,255,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Inter',Helvetica] font-bold text-transparent text-4xl tracking-[-0.72px] leading-[43.2px]">
                    Project key features
                  </div>

                  <p className="relative flex items-center justify-center self-stretch [font-family:'Inter',Helvetica] font-normal text-white text-lg tracking-[-0.09px] leading-[26.1px]">
                  <span className="font-bold tracking-[-0.02px]">
                    3D Interactivity:{" "}
                  </span>

                    <span className="font-medium tracking-[-0.02px]">
                    Users can navigate and interact with 3D space objects using
                    mouse and touch input. 
                    <br />
                  </span>

                    <span className="font-bold tracking-[-0.02px]">
                    Dynamic Animations:
                  </span>

                    <span className="font-medium tracking-[-0.02px]">
                    {" "}
                      GSAP will be used to animate elements such as transitions,
                    text, and movement between sections. 
                    <br />
                  </span>

                    <span className="font-bold tracking-[-0.02px]">
                    Immersive Sound Design:{" "}
                  </span>

                    <span className="font-medium tracking-[-0.02px]">
                    Ambient space-themed background audio will enhance user
                    immersion. 
                    <br />
                  </span>

                    <span className="font-bold tracking-[-0.02px]">
                    Responsive Interface:{" "}
                  </span>

                    <span className="font-medium tracking-[-0.02px]">
                    Styled using TailwindCSS for a futuristic, game-like
                    aesthetic that adapts across devices. 
                    <br />
                    Modular Sections: Multiple space environments (e.g. planets,
                    galaxy, asteroid field) each with unique interactive
                    features. 
                    <br />
                    Educational Overlays: Optional text or voice-over
                    information about space objects for an educational layer.
                  </span>
                  </p>
                </div>

                <button className="all-[unset] box-border bg-[linear-gradient(90deg,rgba(144,0,255,1)_0%,rgba(81,0,255,1)_100%)] inline-flex items-center justify-center gap-2 px-4 py-3 relative flex-[0_0_auto] rounded-xl">
                  <div className="relative flex items-center justify-center w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-medium text-white text-lg text-center tracking-[-0.09px] leading-[26.1px] whitespace-nowrap">
                    go to experience
                  </div>
                </button>
              </div>
            </div>
          </div>

          <footer className="flex flex-col h-[364px] items-start gap-12 px-16 py-[120px] relative self-stretch w-full bg-transparent">
            <div className="flex items-start gap-12 relative self-stretch w-full flex-[0_0_auto] mb-[-55.00px]">
              <div className="flex-col min-w-[324px] items-start gap-4 pt-6 pb-0 px-0 flex-1 grow border-t [border-top-style:solid] border-white relative flex">
                <div className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-bold text-white text-2xl tracking-[-0.48px] leading-6 whitespace-nowrap">
                  inspiration
                </div>

                <p className="relative flex items-center justify-center self-stretch [font-family:'Inter',Helvetica] font-medium text-white text-base tracking-[-0.08px] leading-[23.2px]">
                  I was inspired by space, futuristic design, and sci‑fi games. My
                  project lets people feel like they’re exploring space.
                </p>
              </div>

              <div className="flex-col min-w-[324px] items-start gap-4 pt-6 pb-0 px-0 flex-1 grow border-t [border-top-style:solid] border-white relative flex">
                <div className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-bold text-white text-2xl tracking-[-0.48px] leading-6 whitespace-nowrap">
                  Learning experience
                </div>

                <p className="relative flex items-center justify-center self-stretch [font-family:'Inter',Helvetica] font-medium text-white text-base tracking-[-0.08px] leading-[23.2px]">
                  This project allowed me to further improve my web development
                  skills. By learning to use multimedia JavaScript libraries such
                  as threeJS, GSAP I was able to improve my knowledge of we
                  development.
                </p>
              </div>

              <div className="flex-col min-w-[324px] items-start gap-4 pt-6 pb-0 px-0 flex-1 grow border-t [border-top-style:solid] border-white relative flex">
                <div className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-bold text-white text-2xl tracking-[-0.48px] leading-6 whitespace-nowrap">
                  Time Usage
                </div>

                <p className="relative flex items-center justify-center self-stretch [font-family:'Inter',Helvetica] font-medium text-white text-base tracking-[-0.08px] leading-[23.2px]">
                  This project took me about 1 month to create. I spend most of my
                  school holidays working on it.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
  );
};

*/