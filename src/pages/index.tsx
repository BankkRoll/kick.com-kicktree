// pages/index.tsx
import SearchBar from '@/components/search';
import React from 'react';

const HomePage = () => {
  return (
    <div className="container mx-auto p-4 text-white animate-fade-in-up">
      <section className="text-center">
        <h1 className="text-6xl font-bold mb-6 text-kick-green">Welcome to Kick Profiles</h1>
        <p className="text-2xl mb-8">
          Your one-stop destination for comprehensive user profiles.
        </p>
        <h2 className="text-4xl font-bold mb-6">Ready to Explore?</h2>

        <div className="flex justify-center mb-12">
        <SearchBar className="flex-1 p-3 pl-10 rounded-lg border-2 border-kick-light-green focus-within:ring-2 focus-within:ring-kick-green" />

      </div>
        <p className="text-kick-light-green mb-6">
          Explore detailed information including social links, live streams, recent categories, and more.
        </p>
      </section>


    </div>
  );
};

export default HomePage;
