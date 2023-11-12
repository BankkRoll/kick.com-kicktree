import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from './input';
import { Badge } from './badge';
import debounce from 'lodash.debounce';
import Link from 'next/link';

interface GameDocument {
  name: string;
  slug: string;
  src: string;
}

interface ChannelDocument {
  username: string;
  verified: boolean;
  slug: string;
}

interface Hit {
  document: GameDocument | ChannelDocument;
}

interface SearchResult {
  hits: Hit[];
}

interface Results {
  hits: any;
  results: SearchResult[];
}

const SearchBar = ({ className }: { className?: string }) => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Results[]>([]);

  const clearSearch = () => {
  setQuery('');
};


  const debouncedFetchResults = debounce(async (searchQuery: string) => {
    try {
      const payload = {
        searches: [
          { preset: 'category_search', q: searchQuery },
          { preset: 'channel_search', q: searchQuery },
        ],
      };
      const headers = {
        'content-type': 'application/json',
        'x-typesense-api-key': 'nXIMW0iEN6sMujFYjFuhdrSwVow3pDQu',
      };
      const { data } = await axios.post(
        'https://search.kick.com/multi_search',
        payload,
        { headers },
      );
      setResults(data.results);
    } catch (error) {
      console.error('Error fetching search results:', error);
      // Handle error UI here
    }
  }, 300); // 300ms delay

  useEffect(() => {
    if (query.length > 0) {
      debouncedFetchResults(query);
    }
  }, [query]);

  return (
    <div>
      <Input
        className={`bg-kick-zinc hover:bg-[rgba(113,114,114,0.5)] min-w-[300px] ${className}`}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        icon={<img src="./search.svg" alt="Search" />}
      />
      <div>
        {query.length > 0 && (
          <div className="dropdown">
            {/* For Channels */}
            {results[1]?.hits?.slice(0, 5).map(
              (
                hit: {
                  document: {
                    slug: any;
                    username:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | React.PromiseLikeOfReactNode
                      | null
                      | undefined;
                    verified: any;
                    is_live: any;
                  };
                },
                index: React.Key | null | undefined,
              ) => (
                <Link
                  key={index}
                  href={`/${hit.document.slug}`}
                  className="block"
                  onClick={clearSearch}
                >
                  <div className="flex justify-between items-center hover-div">
                    <div className="flex items-center">
                      <span>{hit.document.username}</span>
                      {hit.document.verified && (
                      <svg className="text-kick-green" width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.9925 7.0331L12.2948 5.60899L11.9088 3.42786H9.69394L7.99625 2L6.29856 3.42411H4.0837L3.69769 5.60525L2 7.0331L3.10931 8.95191L2.7233 11.133L4.807 11.8901L5.9163 13.8089L8 13.0518L10.0837 13.8089L11.193 11.8901L13.2767 11.133L12.8907 8.95191L14 7.0331H13.9925ZM6.86821 11.208L4.09119 8.42723L5.15178 7.36665L6.86821 9.08682L10.4622 5.49282L11.5228 6.5534L6.87195 11.2042L6.86821 11.208Z" fill="currentColor"/>
                      </svg>
                      )}
                    </div>
                    <div className="flex items-center">
                      {hit.document.is_live && (
                        <Badge variant="destructive">Live</Badge>
                      )}
                    </div>
                  </div>
                </Link>
              ),
            )}

            {/* For Games */}
            {results[0]?.hits?.slice(0, 5).map(
              (
                hit: {
                  document: {
                    slug: any;
                    src: string | undefined;
                    name:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | React.PromiseLikeOfReactNode
                      | null
                      | undefined;
                    is_live: any;
                  };
                },
                index: React.Key | null | undefined,
              ) => (
                <Link
                  key={index}
                  href={`/${hit.document.slug}`}
                  className="block"
                  onClick={clearSearch}
                >
                  <div className="flex justify-between items-center hover-div">
                    <div className="flex items-center">
                      <img
                        src={hit.document.src}
                        alt="hit"
                        className="w-6 h-8 mr-2"
                      />
                      <span className="text-sm">{hit.document.name}</span>
                    </div>
                    {hit.document.is_live && (
                      <Badge variant="destructive">Live</Badge>
                    )}
                  </div>
                </Link>
              ),
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;