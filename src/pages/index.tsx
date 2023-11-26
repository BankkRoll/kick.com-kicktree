// pages/index.tsx
import React, { useEffect, useState } from 'react';
import SearchBar from '@/components/search';
import Link from 'next/link';

type User = {
  id: number;
  username: string;
  agreed_to_terms: boolean;
  email_verified_at: string;
  bio: string;
  country: string;
  state: string;
  city: string;
  instagram: string;
  twitter: string;
  youtube: string;
  discord: string;
  tiktok: string;
  facebook: string;
  profilepic: string;
};

type Category = {
  id: number;
  category_id: number;
  name: string;
  slug: string;
  tags: string[];
  description: string | null;
  deleted_at: string | null;
  viewers: number;
  category: {
    id: number;
    name: string;
    slug: string;
    icon: string;
  };
};

type ChannelData = {
  id: number;
  slug: string;
  channel_id: number;
  created_at: string;
  session_title: string;
  is_live: boolean;
  risk_level_id: number | null;
  start_time: string;
  source: string | null;
  twitch_channel: string | null;
  duration: number;
  language: string;
  is_mature: boolean;
  viewer_count: number;
  order: number;
  thumbnail: {
    src: string;
  };
  viewers: number;
  channel: {
    id: number;
    user_id: number;
    slug: string;
    is_banned: boolean;
    playback_url: string;
    name_updated_at: string | null;
    vod_enabled: boolean;
    subscription_enabled: boolean;
    can_host: boolean;
    user: User;
  };
  categories: Category[];
};

type FeaturedChannels = ChannelData[];

const HomePage = () => {
  const [featuredChannels, setFeaturedChannels] = useState<ChannelData[]>([]);

  useEffect(() => {
    const fetchFeaturedChannels = async () => {
      try {
        const response = await fetch('/api/featured');
        const data = await response.json();
        setFeaturedChannels(data.data.slice(0, 6));
      } catch (error) {
        console.error('Error fetching featured channels:', error);
      }
    };

    fetchFeaturedChannels();
  }, []);

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


<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {featuredChannels.slice(0, 6).map(channel => (
    <Link key={channel.id} href={`/${channel.channel.slug}`} passHref>
    <div key={channel.id} className="card bg-white rounded-lg h-full shadow-lg overflow-hidden">
        <img src={channel.thumbnail.src} alt={channel.slug} className="w-full h-40 object-cover" />

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{channel.session_title}</h3>
          <p className="text-sm text-gray-600 mb-2">{channel.channel.user.bio}</p>

          <div className="flex justify-between items-center text-gray-600 text-sm">
            <span>{channel.viewers} viewers</span>
            <span className="flex items-center bg-kick-green rounded-md px-2 py-1">
              {channel.is_live ? 'Live' : 'Offline'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  ))}
</div>

      </section>
    </div>
  );
};

export default HomePage;
