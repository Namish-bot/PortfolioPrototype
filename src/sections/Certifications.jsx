import { motion } from "framer-motion";

const certifications = [
  {
    id: 1,
    image: "/assets/certificates/CERTIFICATE_LANDING_PAGE~JUH2N0KPFV5W.jpeg",
    title: "Coursera : Deep Learning.ai Convolutional Neural Networks",
    issuer: "Coursera",
    link: "https://www.coursera.org/account/accomplishments/verify/JUH2N0KPFV5W",
  },
  {
    id: 2,
    image: "/assets/certificates/google.png",
    title: "Google Cloud : Hack2skill- Gen AI Academy",
    issuer: "Google Cloud / Hack2skill",
    link: "https://certificate.hack2skill.com/user/GenAI5-28M/2025H2S04GENAI-A01040",
  },
  {
    id: 3,
    image: "", // to be provided
    title: "Infosys : Springboard - Introduction to Data Science",
    issuer: "Infosys",
    link: "https://verify.onwingspan.com/",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function Certifications() {
  return (
    <section id="certifications" className="mt-32 c-space">
      <h2 className="text-heading mb-12 text-center">Certifications & Achievements</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
        {certifications.map((cert, idx) => (
          <motion.div
            key={cert.id}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(92,51,204,0.25)" }}
            className="relative bg-gradient-to-br from-midnight to-navy/80 border border-white/10 rounded-2xl shadow-xl overflow-hidden flex flex-col w-full max-w-xs min-h-[420px] transition-transform duration-300 hover:shadow-2xl"
          >
            <div className="w-full h-48 bg-storm flex items-center justify-center overflow-hidden">
              <img
                src={cert.image}
                alt={cert.title}
                className="object-cover w-full h-full"
                style={{ filter: "brightness(0.95)" }}
              />
            </div>
            <div className="flex flex-col flex-1 p-6">
              <h3 className="text-xl font-bold text-white mb-2">{cert.title}</h3>
              <p className="text-neutral-400 mb-4">{cert.issuer}</p>
              <div className="mt-auto">
                {cert.link && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-royal text-white font-semibold hover:bg-indigo transition-colors duration-200 shadow"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75V3.375A1.125 1.125 0 0 0 16.125 2.25h-9A1.125 1.125 0 0 0 6 3.375v17.25c0 .621.504 1.125 1.125 1.125h9c.621 0 1.125-.504 1.125-1.125V17.25M15.75 8.25l-7.5 7.5m0 0h6.75m-6.75 0v-6.75" />
                    </svg>
                    View Certificate
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 