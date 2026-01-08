import React, {useRef, useEffect, useState} from 'react'
import {useGLTF} from "@react-three/drei";
import gsap from 'gsap';

const Target = (props) => {
    const localUrl = '/models/model.glb'
    const remoteUrl = 'https://truldlhqgvekwrouorve.supabase.co/storage/v1/object/sign/model/model.glb?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83NWFmYjk4Ni1jOGNmLTRhYTktYjA5OC03YjhjNDQ0YmQzMTEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtb2RlbC9tb2RlbC5nbGIiLCJpYXQiOjE3NjQ5OTMxNjQsImV4cCI6MTg1OTYwMTE2NH0.h7WH-f-kJmHd4jQ237DO7fZJPiUu347IVbPgRbtHtKQ'

    const [modelUrl, setModelUrl] = useState(null)

    useEffect(() => {
        let canceled = false

        // Prefer a local copy (place model.glb at public/models/model.glb).
        fetch(localUrl, { method: 'HEAD' })
            .then(res => {
                if (canceled) return
                if (res.ok) setModelUrl(localUrl)
                else setModelUrl(remoteUrl)
            })
            .catch(() => {
                if (canceled) return
                setModelUrl(remoteUrl)
            })

        return () => { canceled = true }
    }, [])

    if (!modelUrl) return null // still deciding which URL to use

    return <TargetWithModel modelUrl={modelUrl} {...props} />
}

function TargetWithModel({ modelUrl, ...props }){
    const targetRef = useRef()
    const { scene } = useGLTF(modelUrl)

    useEffect(() => {
       if (!targetRef.current) return;

       const anim = gsap.to(targetRef.current.position, {
           y: targetRef.current.position.y + 0.5,
           duration: 1.5,
           repeat: -1,
           yoyo: true,
       });

       return () => anim.kill();
    }, []);

    return (
        <mesh {...props} ref={targetRef} rotation={[0, Math.PI/5, 0]} scale={1.5}>
            {scene && <primitive object={scene} />}
        </mesh>
    )
}
export default Target
