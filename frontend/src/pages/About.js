import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  // Team member data
  const teamMembers = [
    {
      name: 'Zhang Ming',
      role: 'Founder & CEO',
      bio: 'Blockchain and sustainability expert with 10 years of experience in carbon markets. Former consultant for multiple international environmental organizations.',
      image: '/team/founder.jpg',
    },
    {
      name: 'Li Hua',
      role: 'Chief Technology Officer',
      bio: 'Senior blockchain developer and early contributor to the Solana ecosystem. Has led the development of multiple successful DeFi projects.',
      image: '/team/cto.jpg',
    },
    {
      name: 'Wang Fang',
      role: 'Carbon Scientist',
      bio: 'PhD in Environmental Science, focusing on carbon capture and emission reduction technologies. Has participated in multiple international climate change research projects.',
      image: '/team/scientist.jpg',
    },
    {
      name: 'Zhao Qiang',
      role: 'Product Director',
      bio: '8 years of product management experience, specializing in blockchain and fintech products. Former product lead at several well-known technology companies.',
      image: '/team/product.jpg',
    },
  ];
  
  // Partner data
  const partners = [
    { name: 'Global Carbon Project', logo: '/partners/gcp.png' },
    { name: 'Climate Action Network', logo: '/partners/can.png' },
    { name: 'Solana Foundation', logo: '/partners/solana.png' },
    { name: 'Greenpeace', logo: '/partners/greenpeace.png' },
    { name: 'World Wildlife Fund', logo: '/partners/wwf.png' },
    { name: 'Carbon Credit Trading Association', logo: '/partners/ccta.png' },
  ];
  
  // FAQ data
  const faqs = [
    {
      question: 'What are carbon credits?',
      answer: 'Carbon credits are tradable permits that represent the reduction or removal of one ton of carbon dioxide or equivalent greenhouse gases. By purchasing carbon credits, individuals and organizations can offset carbon emissions they cannot directly reduce.'
    },
    {
      question: 'How does CarbonSol ensure the authenticity of carbon credits?',
      answer: 'We use blockchain technology to ensure the transparency and traceability of each carbon credit. All projects undergo a rigorous verification process and are certified by independent third-party organizations. Our AI system also analyzes project data to assess credibility and actual emission reduction effects.'
    },
    {
      question: 'How do I purchase carbon credits on the CarbonSol platform?',
      answer: 'First, you need to connect your Solana wallet. Then, you can browse our carbon projects, select the project you want to support, and purchase the corresponding VCU tokens. You can also directly purchase VCU tokens on the trading page and use them to offset your carbon footprint.'
    },
    {
      question: 'What is the difference between CST and VCU tokens?',
      answer: 'CST (CarbonSol Token) is the utility token of the platform, used for paying transaction fees, participating in governance, and incentivizing ecosystem participants. VCU (Verified Carbon Unit) represents 1 ton of verified carbon reduction and can be used to offset your carbon footprint.'
    },
    {
      question: 'How do I know what my carbon footprint is?',
      answer: 'You can use our carbon footprint calculator to estimate your personal or organizational carbon footprint. The calculator considers factors such as energy consumption, transportation, dietary habits, and more to provide you with a comprehensive carbon emission estimate.'
    },
  ];
  
  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-6">About CarbonSol</h1>
      
      {/* Mission and Vision */}
      <section className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
        <p className="mb-4">
          CarbonSol's mission is to create a transparent, efficient carbon credit trading ecosystem through blockchain technology and artificial intelligence, enabling individuals and organizations to easily measure, reduce, and offset their carbon footprint.
        </p>
        <p className="mb-4">
          We believe that by lowering the barriers to participating in carbon markets and increasing the transparency and credibility of carbon credits, we can accelerate the global transition to a low-carbon economy and contribute to addressing climate change.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Transparency</h3>
            <p className="text-gray-600">
              Using blockchain technology to ensure that the source and use of each carbon credit can be tracked and verified.
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Accessibility</h3>
            <p className="text-gray-600">
              Lowering the barriers to participating in carbon markets, making it easy for individuals and small organizations to engage in carbon trading and offsetting.
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Innovation</h3>
            <p className="text-gray-600">
              Combining AI and blockchain technology to create new solutions to address climate change challenges.
            </p>
          </div>
        </div>
      </section>
      
      {/* Team Introduction */}
      <section className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center">
              <div className="mb-3">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-32 h-32 rounded-full mx-auto object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://via.placeholder.com/128x128?text=${member.name.charAt(0)}`;
                  }}
                />
              </div>
              <h3 className="font-bold text-lg">{member.name}</h3>
              <p className="text-green-600 mb-2">{member.role}</p>
              <p className="text-gray-600 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Partners */}
      <section className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">Partners</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {partners.map((partner, index) => (
            <div key={index} className="flex items-center justify-center">
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="max-h-16 max-w-full"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://via.placeholder.com/160x80?text=${partner.name}`;
                }}
              />
            </div>
          ))}
        </div>
      </section>
      
      {/* FAQ */}
      <section className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
              <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Contact Us */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="mb-4">
              We welcome your feedback, questions, or collaboration proposals. Please contact us through the following channels:
            </p>
            <div className="space-y-3">
              <p>
                <span className="font-bold">Email: </span> 
                <a href="mailto:info@carbonsol.io" className="text-green-600 hover:text-green-800">
                  info@carbonsol.io
                </a>
              </p>
              <p>
                <span className="font-bold">Address: </span> 
                <span className="text-gray-600">Zhongguancun Science and Technology Park, Haidian District, Beijing</span>
              </p>
              <p>
                <span className="font-bold">Social Media: </span> 
                <div className="flex space-x-4 mt-2">
                  <a href="#" className="text-blue-600 hover:text-blue-800">Twitter</a>
                  <a href="#" className="text-blue-800 hover:text-blue-900">LinkedIn</a>
                  <a href="#" className="text-purple-600 hover:text-purple-800">Discord</a>
                  <a href="#" className="text-gray-800 hover:text-black">GitHub</a>
                </div>
              </p>
            </div>
          </div>
          <div>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  id="name" 
                  type="text" 
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  id="email" 
                  type="email" 
                  placeholder="Your email"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                  Message
                </label>
                <textarea 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  id="message" 
                  rows="4" 
                  placeholder="Your message"
                ></textarea>
              </div>
              <div>
                <button 
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                  type="button"
                  onClick={() => alert('Message feature coming soon!')}
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      
      {/* Join Us */}
      <section className="bg-green-50 rounded-lg shadow-md p-6 mt-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Join Our Mission</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Whether you are an individual, business, or organization, you can participate in the global action against climate change through the CarbonSol platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/footprint" 
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded"
            >
              Calculate Your Carbon Footprint
            </Link>
            <Link 
              to="/projects" 
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded"
            >
              Browse Carbon Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 