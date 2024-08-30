import React from 'react';
import Image from 'next/image';

const TeamMember = ({ name, image, role }) => (
  <div className="group relative overflow-hidden text-white rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl">
    <div className="aspect-w-1 aspect-h-1">
      <Image 
        src={image} 
        alt={name} 
        layout="fill" 
        objectFit="cover"
        className="transition-transform duration-300 ease-in-out group-hover:scale-110"
      />
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full transition-transform duration-300 group-hover:translate-y-0">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm opacity-80">{role}</p>
    </div>
  </div>
);

const TeamSection = ({ title, members }) => (
  <div className="mb-16">
    <h2 className="text-3xl font-bold text-white mb-8">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {members.map((member, index) => (
        <TeamMember key={index} {...member} />
      ))}
    </div>
  </div>
);

export default function Page() {
  const leads = [
    { name: "Lead 1", image: "/images/lead1.jpg", role: "Project Lead" },
    { name: "Lead 2", image: "/images/lead2.jpg", role: "Technical Lead" },
    // Add more leads as needed
  ];

  const webTeam = [
    { name: "Web 1", image: "/images/web1.jpg", role: "Frontend Developer" },
    { name: "Web 2", image: "/images/web2.jpg", role: "Backend Developer" },
    { name: "Web 3", image: "/images/web3.jpg", role: "UI/UX Designer" },
    { name: "Web 4", image: "/images/web4.jpg", role: "Full Stack Developer" },
    // Add more web team members as needed
  ];

  const contentTeam = [
    { name: "Content 1", image: "/images/content1.jpg", role: "Content Writer" },
    { name: "Content 2", image: "/images/content2.jpg", role: "Content Strategist" },
    { name: "Content 3", image: "/images/content3.jpg", role: "Content Editor" },
    { name: "Content 4", image: "/images/content4.jpg", role: "Content Researcher" },
    // Add more content team members as needed
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-5xl font-bold text-center text-white mb-16">Meet the Web Hunt Team</h1>
      <TeamSection title="Leads" members={leads} />
      <TeamSection title="Web Team" members={webTeam} />
      <TeamSection title="Content Team" members={contentTeam} />
    </div>
  );
}