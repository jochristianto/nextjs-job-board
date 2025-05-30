"use client";

import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Search } from "lucide-react";
import { useState, type FC } from "react";

type HeroProps = {
  onSearch?: (query: string) => void;
};

const Hero: FC<HeroProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = () => {
    if (onSearch) onSearch(searchQuery);
  };

  return (
    <section className="bg-gradient-to-br from-brand via-blue-700 to-brand text-white">
      <Container className="px-4 py-25">
        <div className="flex flex-col items-center gap-10 max-w-3xl mx-auto">
          <div className="space-y-4 text-center">
            <Text variant="display2" className="font-semibold">
              Find Your Dream Job
            </Text>
            <Text variant="largeText" className="text-center text-pretty font-medium">
              Discover opportunities from top companies worldwide. Your next career move starts
              here.
            </Text>
          </div>

          {/* Hero Search */}
          <div className="bg-white rounded-lg p-2 shadow-lg w-full">
            <div className="flex flex-row items-center gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 size-6" />

                <Input
                  placeholder="Enter at least 3 characters: job title, keyword, or company"
                  className="pl-10 border-0 focus-visible:ring-0 text-gray-900 shadow-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                  }}
                />
              </div>

              <Button variant="default" size="lg" onClick={handleSearch}>
                Search Jobs
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
