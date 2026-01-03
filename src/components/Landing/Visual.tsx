export default function Visual()
{
    return (
        <section
            className="
    relative

    before:absolute before:top-0 before:left-0 before:w-full before:h-0.75
    before:bg-linear-to-r before:from-purple-700 before:via-purple-500 before:to-purple-100
    before:blur-sm before:content-['']

    after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.75
    after:bg-linear-to-r after:from-purple-700  after:via-purple-500 after:to-purple-100
    after:blur-sm after:content-['']
  "
        >
            <div className="flex flex-col items-center justify-center px-16 py-0 relative w-full bg-[url('/visual.webp')] bg-cover bg-[50%_50%]">
                <div className="relative w-full h-screen rounded-2xl" />
            </div>
        </section>
    )
}