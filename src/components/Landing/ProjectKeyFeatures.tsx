export default function ProjectKeyFeatures()
{
    return (
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
                </div>
                <p className="relative flex items-center justify-center self-stretch [font-family:'Inter-Bold',Helvetica] font-normal text-white text-lg tracking-[-0.09px] leading-[26.1px]">
                    <span className="[font-family:'Inter-Medium',Helvetica] font-medium tracking-[-0.02px]">
                        <li>3D Interactivity: Users can navigate and interact with 3D space objects using mouseand touch input.<br/></li><br/>
                        <li>Dynamic Animations: GSAP will be used to animate elements such as transitions, text, and movement between sections.<br/></li><br/>
                        <li>Immersive Sound Design: Ambient space-themed background audio will enhance user immersion.<br/> </li><br/>
                        <li>Responsive Interface: Styled using TailwindCSS for a futuristic, game-like aesthetic that adapts across devices.<br/></li><br/>
                        <li>Modular Sections: Multiple space environments (e.g. planets, galaxy, asteroid field) each with unique interactive features.<br/></li><br/>
                        <li>Educational Overlays: Optional text or voice-over information about space objects for an educational layer.<br/> </li><br/>
                    </span>
                </p>
                <button className="all-[unset] box-border inline-flex items-center justify-center gap-2 px-4 py-3 relative flex-[0_0_auto] rounded-xl bg-[linear-gradient(90deg,rgba(144,0,255,1)_0%,rgba(81,0,255,1)_100%)]">
                    <div className="relative flex items-center justify-center w-fit mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-white text-lg text-center tracking-[-0.09px] leading-[26.1px] whitespace-nowrap">
                        go to experience
                    </div>
                </button>
            </div>
        </div>
    )
}


