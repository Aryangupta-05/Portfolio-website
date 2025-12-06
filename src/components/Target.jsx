import React, {useRef} from 'react'
import {useGLTF} from "@react-three/drei";
import gsap from 'gsap';
import {useGSAP} from "@gsap/react";

const Target = (props) => {
    const targetRef = useRef()
    const { scene } = useGLTF('https://truldlhqgvekwrouorve.supabase.co/storage/v1/object/sign/model/model.glb?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83NWFmYjk4Ni1jOGNmLTRhYTktYjA5OC03YjhjNDQ0YmQzMTEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtb2RlbC9tb2RlbC5nbGIiLCJpYXQiOjE3NjQ5OTMxNjQsImV4cCI6MTg1OTYwMTE2NH0.h7WH-f-kJmHd4jQ237DO7fZJPiUu347IVbPgRbtHtKQ')

    useGSAP(() => {
       gsap.to(targetRef.current.position, {
           y: targetRef.current.position.y + 0.5,
           duration: 1.5,
           repeat: -1,
           yoyo: true,
       })
    });

    return (
        <mesh {...props} ref={targetRef} rotation={[0, Math.PI/5, 0]} scale={1.5}>
            <primitive object={scene} />
        </mesh>
    )
}
export default Target
