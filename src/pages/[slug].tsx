import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

interface BadgeImage {
  src: string;
  srcset: string;
}

interface SubscriberBadge {
  id: number;
  channel_id: number;
  months: number;
  badge_image: BadgeImage;
}

interface BannerImage {
  responsive: string;
  url: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
}

interface RecentCategory {
  id: number;
  category_id: number;
  name: string;
  slug: string;
  tags: string[];
  description: string | null;
  deleted_at: string | null;
  viewers: number;
  banner: BannerImage;
  category: Category;
}

interface User {
  id: number;
  username: string;
  agreed_to_terms: boolean;
  email_verified_at: string;
  bio: string;
  country: string | null;
  state: string | null;
  city: string | null;
  instagram: string;
  twitter: string;
  youtube: string;
  discord: string;
  tiktok: string;
  facebook: string;
  profile_pic: string;
}

interface Chatroom {
  id: number;
  chatable_type: string;
  channel_id: number;
  created_at: string;
  updated_at: string;
  chat_mode_old: string;
  chat_mode: string;
  slow_mode: boolean;
  chatable_id: number;
  followers_mode: boolean;
  subscribers_mode: boolean;
  emotes_mode: boolean;
  message_interval: number;
  following_min_duration: number;
}

interface AscendingLink {
  id: number;
  channel_id: number;
  description: string;
  link: string;
  order: number;
  title: string;
  created_at: string;
  updated_at: string;
}

interface Plan {
  id: number;
  channel_id: number;
  stripe_plan_id: string;
  amount: string;
  created_at: string;
  updated_at: string;
}

interface Livestream {
  id: number;
  slug: string;
  channel_id: number;
  created_at: string;
  categories: Category[];
  duration: number;
  is_live: boolean;
  is_mature: boolean;
  language: string;
  risk_level_id: number | null;
  session_title: string;
  source: string | null;
  start_time: string;
  tags: string[];
  thumbnail: BadgeImage;
  twitch_channel: string | null;
  video: Video;
  viewer_count: number;
  views: number;
}

interface Video {
  id: number;
  live_stream_id: number;
  slug: string | null;
  thumb: string | null;
  s3: string | null;
  trading_platform_id: string | null;
  created_at: string;
  deleted_at: string | null;
  updated_at: string;
  uuid: string;
}

interface ChannelData {
  id: number;
  user_id: number;
  slug: string;
  is_banned: boolean;
  ascending_links: AscendingLink[];
  banner_image: BannerImage;
  can_host: boolean;
  chatroom: Chatroom;
  follower_badges: BadgeImage[];
  followersCount: number;
  media: any[]; // Define a more specific type if possible
  muted: boolean;
  name_updated_at: string | null;
  offline_banner_image: BadgeImage;
  plan: Plan;
  playback_url: string;
  previous_livestreams: Livestream[];
  recent_categories: RecentCategory[];
  role: string | null;
  subscriber_badges: SubscriberBadge[];
  subscription_enabled: boolean;
  user: User;
  verified: boolean;
  vod_enabled: boolean;
}

const ChannelPage = () => {
  const [channelData, setChannelData] = useState<ChannelData | null>(null);
  const router = useRouter();
  const { slug } = router.query;
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (slug) {
      setLoading(true);
      fetch(`/api/channel?channelName=${slug}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.id) {
            setChannelData(data);
            setLoading(false);
          } else {
            setNotFound(true);
          }
        })
        .catch(() => {
          setNotFound(true);
        });
    }
  }, [slug]);

  useEffect(() => {
    if (notFound && !loading) {
      router.push("/404");
    }
  }, [notFound, loading, router]);

  // Function to check if a string is a valid URL
  const isValidHttpUrl = (string: string | URL) => {
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false; // If the URL constructor fails, the URL is invalid
    }
    return url.protocol === "http:" || url.protocol === "https:";
  };

  if (loading) {
    return (
      <div className="profile-container bg-kick-slate min-h-screen flex items-center justify-center">
        <div className="loader-wrapper">
          <div className="loader"></div>
          <div className="loader-inner"></div>
          <div className="loader-inner"></div>
          <div className="loader-inner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {channelData && (
        <>
          {/* Banner Image */}
          {channelData ? (
            <iframe
              src={`https://player.kick.com/${channelData.slug}`}
              width="100%"
              frameBorder="0"
              allowFullScreen={true}
              scrolling="no"
              className="mb-10 rounded-lg shadow-lg overflow-hidden h-56 md:h-[550px]"
            ></iframe>
          ) : (
            <div
              className="bg-kick-green mb-10 rounded-lg shadow-lg flex justify-center items-center"
              style={{ height: "350px" }} // For mobile
            >
              <img src="./animated.gif" alt="Logo" className="max-h-full" />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 items-center justify-center lg:items-start bg-kick-green shadow-lg rounded-lg p-6 -mt-10 lg:-mt-10 mb-8 lg:gap-4">
            <div className="lg:col-span-2 flex flex-col lg:flex-row items-center justify-center">
              <img
                src={channelData.user.profile_pic}
                alt={channelData.user.username}
                className="rounded-full w-32 h-32 lg:w-48 lg:h-48 border-4 border-white shadow-md"
              />
              <div className="mt-4 lg:mt-0 lg:ml-8 text-center lg:text-left">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-800">
                  {channelData.user.username}
                </h1>
                <p className="text-gray-600 mt-2">{channelData.user.bio}</p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-4 items-center">
                  {channelData.verified && (
                    <span className="flex items-center justify-center bg-black rounded-full p-1">
                      <svg
                        className="text-kick-green w-16 h-16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.9925 7.0331L12.2948 5.60899L11.9088 3.42786H9.69394L7.99625 2L6.29856 3.42411H4.0837L3.69769 5.60525L2 7.0331L3.10931 8.95191L2.7233 11.133L4.807 11.8901L5.9163 13.8089L8 13.0518L10.0837 13.8089L11.193 11.8901L13.2767 11.133L12.8907 8.95191L14 7.0331H13.9925ZM6.86821 11.208L4.09119 8.42723L5.15178 7.36665L6.86821 9.08682L10.4622 5.49282L11.5228 6.5534L6.87195 11.2042L6.86821 11.208Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                  )}
                  <span className="bg-black text-kick-green py-1 px-3 rounded-full text-md">
                    Followers: {channelData.followersCount}
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1 flex flex-col items-center lg:items-start justify-center lg:justify-start mb-4 lg:mb-0">
              {channelData.ascending_links.map((link) => (
                <a
                  key={link.id}
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black block hover:scale-105 transition-transform mb-1"
                >
                  <span>
                    {isValidHttpUrl(link.link)
                      ? new URL(link.link).hostname
                      : link.title}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-4">
              {channelData.subscriber_badges.map((badge) => (
                <img
                  key={badge.id}
                  src={badge.badge_image.src}
                  alt={`Badge for ${badge.months} months`}
                  className="w-10 h-10 shadow-lg rounded-lg"
                />
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold">Recent Livestreams:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {channelData.previous_livestreams.map((livestream) => (
                <Link
                  href={`https://kick.com/video/${livestream.video.uuid}`}
                  key={livestream.id}
                >
                  <div className="block bg-kick-light-green rounded-lg shadow hover:shadow-lg hover:scale-105 transition-transform duration-300">
                    <img
                      src={livestream.thumbnail.src}
                      alt={`Thumbnail for ${livestream.session_title}`}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="p-4">
                      <h3 className="text-black text-lg font-semibold truncate">
                        {livestream.session_title}
                      </h3>
                      <p className="text-gray-800 mt-1">
                        Viewer Count: {livestream.viewer_count}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChannelPage;
