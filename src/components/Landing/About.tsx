export default function About()
{
    return  (
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
    )
}