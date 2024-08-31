import React from 'react';
import Image from 'next/image';

const TeamMemberCard = ({ name, image, role }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl transform hover:-translate-y-2">
    <div className="relative h-64 w-full">
      <Image
        src={image}
        alt={name}
        layout="fill"
        objectFit="cover"
        className="transition-transform duration-300 ease-in-out hover:scale-105"
      />
    </div>
    <div className="p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{name}</h3>
      <p className="text-sm text-gray-600">{role}</p>
    </div>
  </div>
);

const TeamSection = ({ title, members }) => (
  <div className="mb-16">
    <h2 className="text-3xl font-bold text-gray-800 mb-8">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {members.map((member, index) => (
        <TeamMemberCard key={index} {...member} />
      ))}
    </div>
  </div>
);

const SDPTeamMember = ({ name, page }) => (
  <li className="mb-4">
    <span className="font-semibold">{name}</span> - {page}
  </li>
);

const SDPTeamSection = ({ members }) => (
  <div className="mb-16">
    <h2 className="text-3xl font-bold text-gray-800 mb-8">SDP Team</h2>
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {members.map((member, index) => (
        <SDPTeamMember key={index} {...member} />
      ))}
    </ul>
  </div>
);

export default function TeamPage() {
  const leads = [
    { name: "John Doe", image: "/images/john-doe.jpg", role: "Project Lead" },
    { name: "Jane Smith", image: "/images/jane-smith.jpg", role: "Technical Lead" },
  ];

  const webTeam = [
    { name: "Alice Johnson", image: "/images/alice-johnson.jpg", role: "Frontend Developer" },
    { name: "Bob Williams", image: "/images/bob-williams.jpg", role: "Backend Developer" },
    { name: "Charlie Brown", image: "/images/charlie-brown.jpg", role: "UI/UX Designer" },
    { name: "Diana Ross", image: "/images/diana-ross.jpg", role: "Full Stack Developer" },
  ];

  const contentTeam = [
    { name: "Eva Green", image: "/images/eva-green.jpg", role: "Content Writer" },
    { name: "Frank Sinatra", image: "/images/frank-sinatra.jpg", role: "Content Strategist" },
    { name: "Grace Kelly", image: "/images/grace-kelly.jpg", role: "Content Editor" },
    { name: "Henry Ford", image: "/images/henry-ford.jpg", role: "Content Researcher" },
  ];

  const sdpTeam = [
    { name: "Isaac Newton", page: "Home Page" },
    { name: "Marie Curie", page: "About Us" },
    { name: "Albert Einstein", page: "Services" },
    { name: "Nikola Tesla", page: "Contact" },
    { name: "Ada Lovelace", page: "Blog" },
    { name: "Alan Turing", page: "FAQ" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center text-gray-900 mb-16">Meet Our Team</h1>
        
        <TeamSection title="Leads" members={leads} />
        <TeamSection title="Web Team" members={webTeam} />
        <TeamSection title="Content Team" members={contentTeam} />
        
        <SDPTeamSection members={sdpTeam} />
      </div>
    </div>
  );
}