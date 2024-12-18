// import Navbar from "../components/Navbar";

import { FaLinkedin, FaInstagram, FaGithub, FaEnvelope } from "react-icons/fa";

const teamMembers = [
  {
    name: "Ariel",
    photo:
      "https://media.licdn.com/dms/image/v2/D4D03AQGo_qTWPav3jw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1727228217541?e=1740009600&v=beta&t=_jn6DcpGjj6767tEVbgppr3bPfhC6zHNbjiq6jg26PU",
    linkedin: "https://www.linkedin.com/in/ariel-bitan-271995278/",
    instagram: "https://www.instagram.com/",
    github: "https://github.com/ArielBitan",
    email:
      "https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&emr=1&followup=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&ifkv=AcMMx-fur11SmcHffOEjaBF9pkEMlG3p639180pmylz21toNyxG0NJH5tjnCrYKsJawro6LS4r87Fg&osid=1&passive=1209600&service=mail&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S-1825368990%3A1733391002986747&ddm=1",
  },
  {
    name: "Nimrod",
    photo:
      "https://media.licdn.com/dms/image/v2/D5603AQF5nrXeEk3LIQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1727718821623?e=1738800000&v=beta&t=9IIbAtS-Tb9m1zgYGdwthm0ZQTlys265YUy4VEqOspk",
    linkedin: "https://www.linkedin.com/in/nimrod-amos-a27a4b320/",
    instagram: "https://www.instagram.com/",
    github: "https://github.com/nimrodamos",
    email:
      "https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&emr=1&followup=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&ifkv=AcMMx-fur11SmcHffOEjaBF9pkEMlG3p639180pmylz21toNyxG0NJH5tjnCrYKsJawro6LS4r87Fg&osid=1&passive=1209600&service=mail&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S-1825368990%3A1733391002986747&ddm=1",
  },
  {
    name: "Ofer",
    photo:
      "https://media.licdn.com/dms/image/v2/D5603AQEJsoE4tUQczg/profile-displayphoto-shrink_800_800/B56ZO0eaxeHoAc-/0/1733899693766?e=1740009600&v=beta&t=RhmQ_pbPNwe_Yvwt4s9ZU_AgRW7GnpoixtA6PaAHugc",
    linkedin: "www.linkedin.com/in/ofer-sela-024a941a2",
    instagram: "https://www.instagram.com/",
    github: "https://github.com/OferS94",
    email:
      "https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&emr=1&followup=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&ifkv=AcMMx-fur11SmcHffOEjaBF9pkEMlG3p639180pmylz21toNyxG0NJH5tjnCrYKsJawro6LS4r87Fg&osid=1&passive=1209600&service=mail&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S-1825368990%3A1733391002986747&ddm=1",
  },

];

const AboutPage = () => {
  return (
    <>
    
      <div className="flex flex-col items-center py-8">
        {/* Title */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold mb-4">Our Team</h1>
          <div className="h-1 w-24 bg-blue-500 mx-auto"></div>
        </div>

        {/* Team Members Section */}
        <div className="flex flex-wrap justify-center gap-12 mb-16">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="flex flex-col items-center group relative"
            >
              {/* Circular Photo */}
              <div className="relative overflow-hidden rounded-full w-40 h-40 transition-transform duration-300 group-hover:scale-110">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Name */}
              <p className="mt-4 text-xl font-semibold">{member.name}</p>

              {/* Icons Below Name, Visible Only on Hover */}
              <div className="flex gap-4 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:scale-125 transition-transform"
                >
                  <FaLinkedin size={24} />
                </a>
                <a
                  href={member.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:scale-125 transition-transform"
                >
                  <FaInstagram size={24} />
                </a>
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 hover:scale-125 transition-transform"
                >
                  <FaGithub size={24} />
                </a>
                <a
                  href={member.email}
                  className="text-red-600 hover:scale-125 transition-transform"
                >
                  <FaEnvelope size={24} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Explanatory Text */}
        <div className="max-w-3xl text-center">
          <p className="text-lg leading-relaxed">
          About Us

We are a team of three passionate full-stack developer students, united by a shared commitment to innovation and teamwork. With a solid foundation in software development and problem-solving, we aim to create impactful digital solutions that address real-world challenges.

All of us bring unique perspectives shaped by our experiences in the military, where we served in combat roles. These roles not only instilled in us discipline, resilience, and adaptability but also taught us the importance of collaboration and clear communication—values we carry into every project we tackle.

Participating in this hackathon is an exciting opportunity for us to push our boundaries, learn from each other, and deliver a full-stack product that embodies our dedication and creativity. We are thrilled to contribute to a project that reflects our technical skills, teamwork, and determination to make a difference.
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutPage;