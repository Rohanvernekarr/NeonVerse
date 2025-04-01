"use client"

import React, { ReactNode, useEffect,  useRef} from "react"
import Lenis from "@studio-freight/lenis"


interface SmoothScollProps{
    children:ReactNode
}

export default function SmoothScoll({children}:SmoothScollProps){
    const lenisRef = useRef<Lenis | null>(null)

    useEffect(() => {
        lenisRef.current = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2 , -10 *t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
        })

        function raf(time: number){
            lenisRef.current?.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return() =>{
            lenisRef.current?.destroy()
        }
    }, [])

    return <> {children}</>
    }

