export const Background = () => (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
        <span className="absolute -left-[10%] top-[5%] h-[600px] w-[600px] animate-pulse rounded-full bg-purple-500/10 blur-[120px]" />
        <span className="absolute -right-[15%] top-[15%] h-[500px] w-[500px] animate-pulse rounded-full bg-cyan-500/10 blur-[120px] [animation-delay:2s]" />
        <span className="absolute bottom-[5%] left-[20%] h-[700px] w-[700px] animate-pulse rounded-full bg-pink-500/10 blur-[120px] [animation-delay:4s]" />
        <span className="absolute bottom-[20%] right-[10%] h-[600px] w-[600px] animate-pulse rounded-full bg-amber-500/10 blur-[120px] [animation-delay:6s]" />
    </div>
)

