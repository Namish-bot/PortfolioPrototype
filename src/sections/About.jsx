import { useRef } from "react";
import Card from "../components/Card";
import { Globe } from "../components/globe";
import CopyEmailButton from "../components/CopyEmailButton";
import { Frameworks } from "../components/FrameWorks";
import SnakeGame from "../components/SnakeGame";

const About = () => {
  const grid2Container = useRef();
  return (
    <section className="c-space section-spacing" id="about">
      <h2 className="text-heading">About Me</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 items-stretch">
        {/* Left: Bio */}
        <div className="flex flex-col justify-end min-w-[420px] max-w-[600px] w-full">
          {/* Grid 1 */}
          <div className="flex items-end grid-default-color grid-1">
            <img
              src="assets/coding-pov.png"
              className="absolute scale-[1.75] -right-[5rem] -top-[1rem] md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.5]"
            />
            <div className="z-10">
              <p className="headtext">Hi, I'm Rohit K.</p>
              <p className="subtext">
                Enthusiastic and creative B.Tech AIML student with a strong foundation in artificial intelligence, machine learning, and software development. Adept at problem-solving, collaborating in teams, and eager to contribute to impactful tech projects.
              </p>
              <p className="subtext">
                A quick learner with a knack for multitasking, showcasing my ability to blend ML skills with creativity effectively.
              </p>
            </div>
            <div className="absolute inset-x-0 pointer-evets-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-indigo" />
          </div>
          {/* Grid 5 */}
          <div className="grid-default-color grid-5 mt-8">
            <div className="z-10 w-[50%]">
              <p className="headText">
                <a href="#skills" className="hover:underline focus:underline transition-colors text-royal">
                  Tech Stack
                </a>
              </p>
              <p className="subtext">
                I specialize in a variety of languages, frameworks, and tools taht
                allow me to build robust and scalable applications
              </p>
            </div>
            <div className="absolute inset-y-0 md:inset-y-9 w-full h-full start-[50%] md:scale-125">
              <Frameworks />
            </div>
          </div>
        </div>
        {/* Right: Snake Game */}
        <div className="flex items-center justify-center min-h-[500px] min-w-[420px] max-w-[600px] w-full">
          <SnakeGame />
        </div>
      </div>
    </section>
  );
};

export default About;
