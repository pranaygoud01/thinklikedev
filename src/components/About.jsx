import React from "react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row gap-10 bg-white text-black px-10 max-lg:p-5 py-10 max-w-8xl mx-auto">
      {/* Page Title and Content */}
      <div className="w-full lg:w-7/12">
        <h1 className="text-4xl max-lg:text-2xl font-bold max-lg:mb-4 mb-8">About ThinkLikeDev</h1>

        {/* Who We Are */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
          <p className="text-neutral-500 text-sm leading-relaxed max-w-3xl">
            ThinkLikeDev is a community-driven platform crafted for developers—from beginners to experts—who are passionate about advancing their careers, acquiring new skills, and connecting with others in tech.
            Our mission is to empower developers by providing curated job opportunities, engaging blogs, valuable free resources, and a vibrant community focused on learning and growth.
          </p>
        </section>

        {/* Our Story */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-neutral-500 text-sm leading-relaxed max-w-3xl">
            Born from the vision to make career development accessible and effective, ThinkLikeDev bridges the gap between learning, opportunity, and professional connection.
            We focus on delivering a seamless experience that helps developers of all levels thrive.
          </p>
        </section>

        {/* What Sets Us Apart */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">What Sets Us Apart</h2>
          <ul className="list-disc list-inside text-sm max-w-3xl space-y-2 text-neutral-700">
            <li><strong>Developer-Centric Design:</strong> Every feature is built with modern UI/UX principles for clarity and ease of use.</li>
            <li><strong>Quality Over Quantity:</strong> We handpick opportunities, resources, and stories that truly matter.</li>
            <li><strong>Inclusive Community:</strong> Welcoming developers of all backgrounds and experience levels.</li>
            <li><strong>Continuous Learning:</strong> Access a wealth of free and up-to-date resources anytime.</li>
          </ul>
        </section>

        {/* Meet the Team */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Meet the Team</h2>
          <p className="text-neutral-500 text-sm leading-relaxed max-w-3xl">
            We’re a passionate group of developers, designers, and tech thinkers who understand the challenges developers face daily. Together, we’re building ThinkLikeDev to make a meaningful impact.
          </p>
        </section>

        {/* Stay Connected */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Stay Connected</h2>
          <p className="text-neutral-800 text-sm leading-relaxed max-w-3xl mb-2">
            Join our community, follow our blog for regular updates, and reach out anytime via the contact page. We’re eager to hear your feedback, ideas, and partnership inquiries.
          </p>
        </section>
      </div>

      {/* Image Section */}
      <div
        className="w-full lg:w-5/12 h-64 sm:h-80 md:h-[80vh] sticky top-0 bg-center bg-no-repeat bg-cover rounded-md shadow-lg"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1681066470612-36021f8da3d6?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      ></div>
    </div>
  );
};

export default About;
