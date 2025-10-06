import React, {useEffect, useRef, useState} from 'react'
import Globe from "react-globe.gl";
import ButtonResume from "../components/ButtonResume.jsx";
import ButtonScrollContact from "../components/ButtonScrollContact.jsx";

const About = () => {

    const globeRef = useRef();
    const [hasCopied, setHasCopied] = useState(false);

    useEffect(() => {
        const globe = globeRef.current;
        if (!globe) return;

        const rotateGlobe = () => {
            globe.pointOfView(
                { lat: globe.pointOfView().lat, lng: globe.pointOfView().lng + 2.5 },
                50 // Adjust duration for smooth rotation
            );
            requestAnimationFrame(rotateGlobe);
        };

        rotateGlobe();
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText("aryangupta050903@gmail.com");
        setHasCopied(true);
        setTimeout(() => {
            setHasCopied(false);
        }, 2000)
    }

    return (
        <section className="c-space my-20" id="about">
            <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">
                <div className="col-span-1 xl:row-span-3">
                    <div className="grid-container">
                        <img src="/assets/grid1.png" alt="grid-1" className="w-full sm:h-[276px] h-fit object-contain"/>

                        <div>
                            <p className="grid-headtext">
                                Hi, I am Aryan
                            </p>
                            <p className="grid-subtext">
                                • 3rd-year Electronics and Communication student at BIT,Mesra.
                            </p>
                            <p className="grid-subtext">
                                • Proficient in developing end-to-end web applications, combining modern frontend frameworks with robust backend technologies and databases.
                            </p>
                            <p className="grid-subtext">
                                • Consistently achieved a 8.48 CGPA in academics.
                            </p>
                            <p className="grid-subtext">
                                • Dedicated to building impactful projects and contributing as a versatile team player.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-span-1 xl:row-span-3">
                    <div className="grid-container">
                        <img src="/assets/Grid2New.png" alt="grid-2" className="w-full sm:h-[276px] h-fit object-contain"/>
                        <div>
                            <p className="grid-headtext">
                                Achievements
                            </p>
                            <p className="grid-subtext">
                                • Solved 500+ DSA and Competitive Programming questions.
                            </p>
                            <p className="grid-subtext">
                                • <a href="https://leetcode.com/u/aryangupta_/"
                                     target="_blank"
                                     rel="noopener noreferrer"
                                     className="link-style">
                                 Leetcode (1700+ rating)
                            </a>
``
                            </p>
                            <p className="grid-subtext">
                                • <a href="https://codeforces.com/profile/aryangupta_"
                                     target="_blank"
                                     rel="noopener noreferrer"
                                     className="link-style">
                                Rank Pupil in CodeForces (1250+ rating)
                            </a>
                            <p className="grid-subtext">
                                • JEE Mains Rank – Top 3% among 1.2M candidates nationwide.
                                </p>
                        
                            </p>
                              <p className="grid-subtext">
                                • Semi-Finalist of Flipkart Grid 7.0
                            </p>


                        </div>
                    </div>
                </div>

                <div className="col-span-1 xl:row-span-4">
                    <div className="grid-container">
                        <div className="rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center">
                            <Globe
                                ref={globeRef}
                                height={326}
                                width={326}
                                backgroundColor="rgba(0, 0, 0, 0)"
                                backgroundImageOpacity={0.5}
                                showAtmosphere={true}
                                showGraticules
                                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                                labelsData={[{ lat: 12, lng: 77, text: 'Bangalore, India', color: 'white', size: 15 }]}
                            />
                        </div>
                        <div>
                            <p className="grid-headtext">
                                Open to Exciting Tech Opportunities Worldwide!
                            </p>
                            <p className="grid-subtext">
                                • I am actively seeking tech opportunities across any time zone, with a preference for remote work.
                            </p>
                            <p className="grid-subtext">
                                • As a developer with a passion for backend development, frontend expertise, and competitive programming, I’m eager to contribute my skills to impactful projects.
                            </p>
                            <p className="grid-subtext">
                                • If you’re looking for a versatile and driven professional to join your team, let’s connect!
                            </p>
                            <ButtonScrollContact
                                name="Contact Me"
                                isBeam
                                containerClas="w-full mt-10"
                            />
                        </div>
                    </div>
                </div>

                <div className="xl:col-span-2 xl:row-span-3">
                    <div className="grid-container">
                        <img src="/assets/grid3.png" alt="grid-3" className="w-full sm:h-[266px] h-fit object-contain"/>

                        <div>
                            <p className="grid-headtext">
                                My passion for coding
                            </p>
                            <p className="grid-subtext">
                                • Enthusiastic problem-solver with a love for tackling challenging coding problems.
                            </p>
                            <p className="grid-subtext">
                                • Passionate about building impactful projects that address real-world problems.
                            </p>
                             <p>
                                
                            </p>
                           
                            <p className="grid-subtext">
                                • Actively seeking opportunities in Tech Companies, startups, and finance to expand my skill set and grow professionally.
                            </p>
                            <p>

                            </p>
                            <p className="grid-subtext">
                                • Check out my resume and feel free to reach out if you have an opportunity that aligns with my skills and interests!
                            </p>
                            <ButtonResume
                                name="Resume"
                                isBeam
                                containerClas="w-full mt-10"
                                onClick={() =>
                                    window.open(
                                        "https://drive.google.com/file/d/19matgQTyNkNTmk-bfAKtnryGsNob-B18/view",
                                        "_blank"
                                    )
                                }
                            />
                        </div>
                    </div>
                </div>

                <div className="xl:col-span-1 xl:row-span-2">
                    <div className="grid-container">
                        <img src="/assets/grid4.png" alt="grid-4" className="w-full sm:h-[276px] h-fit object-contain"/>

                        <div className="space-y-2">
                            <p className="grid-subtext text-center">
                                Contact Me
                            </p>
                            <div className="copy-container" onClick={handleCopy}>
                                <img src={hasCopied ? '/assets/icons8-checkmark.svg' : '/assets/copy.svg'} alt="copy"/>
                                <p className="xl:text-xl md:text-md font-medium text-gray_gradient text-white">
                                    aryangupta050903@gmail.com
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default About