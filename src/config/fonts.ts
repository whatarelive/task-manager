import { Roboto, Lato } from "next/font/google";

export const titleFont = Roboto({
    variable: "--roboto",
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], 
}) 

export const textFont = Lato({
    variable: "--lato",
    subsets: ["latin"],
    weight: ["100", "300", "400", "700", "900"], 
}) 

