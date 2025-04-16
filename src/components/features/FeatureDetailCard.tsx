import { CheckCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

import type { FC } from "react";
import type { FeatureDetail } from "@/interfaces/data.interfaces";

export const FeatureDetailCard: FC<{ feature: FeatureDetail }> = ({ feature }) => {
    return (
        <Card className="group overflow-hidden border-0 bg-white/5 shadow-lg backdrop-blur-md transition-all 
            duration-300 hover:-translate-y-1 hover:bg-white/10 hover:shadow-xl dark:bg-black/5"
        >
            <CardHeader className="pb-2">
                <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br 
                    from-${feature.color}/20 to-${feature.color}/5 text-${feature.color} shadow-lg shadow-${feature.color}/5`}
                >
                    <feature.icon className="h-7 w-7" />
                </div>
                <CardTitle className="text-2xl">
                    { feature.title }
                </CardTitle>
                <CardDescription className="text-base">
                    { feature.description }
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-3 text-sm">
                    {feature.details.map((detail, index) => (
                        <li key={index} className="flex items-center">
                            <div className={`mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-${feature.color}/50 text-${feature.color}`}>
                                <CheckCircle className="h-4 w-4" />
                            </div>
                            <span>{ detail }</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}
