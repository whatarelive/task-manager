export default function LoadingTasksPage() {
    return (
        <section className="w-full rounded-md">
            <div data-slot="skeleton" className="grid grid-cols-3 shadow-sm rounded-md gap-1 p-1 w-full">
                <div data-slot="skeleton" className="skeleton h-9 w-full"/>
                <div data-slot="skeleton" className="skeleton h-9 w-full"/>
                <div data-slot="skeleton" className="skeleton h-9 w-full"/>
            </div>

            <ul className="space-y-4 mt-6">
                {
                    Array.from({ length: 5 }).map((_, index) => (
                        <li key={index} className="flex items-center justify-between w-full h-20 p-4 rounded-md shadow-sm">
                            <div className="flex flex-col justify-center">
                                <div className="inline-flex gap-2">
                                    <span data-slot="skeleton" className="skeleton h-5 w-5"/>
                                    <span data-slot="skeleton" className="skeleton h-5 w-[240px]"/>
                                </div>

                                <div className="inline-flex mt-2 ml-6">
                                    <span data-slot="skeleton" className="skeleton h-6 w-[160px]"/>
                                    
                                    <div className="inline-flex gap-2 ml-6">
                                        <span data-slot="skeleton" className="skeleton h-6 w-[100px]"/>
                                        <span data-slot="skeleton" className="skeleton h-6 w-[100px]"/>
                                    </div>
                                </div>
                            </div>

                            <div data-slot="skeleton" className="skeleton h-9 w-9"/>
                        </li>
                    ))
                }
            </ul>
        </section>
    )
}
