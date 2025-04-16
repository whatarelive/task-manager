import Image from "next/image";

export const DashBoardPreview = () => (
    <div className="mt-16 flex justify-center">
        <div className="relative w-fit md:w-full max-w-4xl overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-1 shadow-2xl backdrop-blur-md">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20 opacity-30" />
            
            <div className="relative rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
                    
                {/* Imagen del Dashboard para PCs */}
                <Image
                    width={600}
                    height={600}
                    quality={100}
                    unoptimized
                    src="/aplication.png"
                    alt="TaskMaster Dashboard Preview"
                    className="hidden md:block w-full object-cover h-full"
                />

                {/* Imagen del Dashboard para móviles */}
                <Image
                    width={300}
                    height={300}
                    quality={100}
                    unoptimized
                    src="/aplication_mobile.png"
                    alt="TaskMaster Dashboard Preview"
                    className="md:hidden block object-cover h-full"
                />

                {/* Elementos flotantes */}
                <div className="absolute left-[50%] md:left-[30%] top-[8%] md:top-[28%] w-32 animate-float 
                    rounded-lg border border-white/10 bg-white/5 p-3 shadow-xl backdrop-blur-md"
                >
                    <div className="h-2 w-20 rounded-full bg-white/60" />
                    <div className="mt-2 h-2 w-16 rounded-full bg-white/60" />
                </div>

                <div className=" absolute right-[5%] top-[55%] md:top-[45%] w-40 animate-float rounded-lg 
                    border border-white/20 bg-white/10 p-3 shadow-xl backdrop-blur-md [animation-delay:2s]"
                >
                    <div className="flex items-center gap-2">
                        <span className="h-4 w-4 rounded-full bg-green-400" />
                        <span className="h-2 w-24 rounded-full bg-white/50" />
                    </div>
                    <div className="mt-2 h-2 w-32 rounded-full bg-white/30" />
                </div>

                <div className="absolute bottom-[20%] left-[10%] md:left-[45%] w-36 animate-float rounded-lg border 
                    border-white/20 bg-white/10 p-3 shadow-xl backdrop-blur-md [animation-delay:4s]"
                >
                    <div className="flex items-center gap-2">
                        <span className="h-4 w-4 rounded-full bg-amber-400" />
                        <span className="h-2 w-20 rounded-full bg-white/50" />
                    </div>
                    <div className="mt-2 min-h-2 w-28 rounded-full bg-white/30" />
                </div>
            </div>
        </div>
    </div>
)