"use client";

import { useEffect, useState } from "react";

type VideoType = {
  _id?: string;
  title: string;
  description: string;
  thumbnail_url: string;
  video_url: string;
  controls?: boolean;
};
export default function Videos() {
  const [videos, setVideos] = useState<VideoType[]>([]);
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("/api/video");

        // Check if response is OK and JSON
        const contentType = res.headers.get("content-type");
        if (!res.ok) {
          console.error("Server error:", res.status);
          return;
        }

        if (contentType && contentType.includes("application/json")) {
          const data = await res.json();
          setVideos(data);
        } else {
          const text = await res.text(); // fallback for debugging
          console.error("Unexpected (non-JSON) response:", text);
        }
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  fetchVideos();
}, []);


  return (
    <div className="p-6 bg-gray-950 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-white">Latest Videos</h1>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div
            key={video._id}
            className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-amber-400/20 transition-shadow duration-300"
          >
            {/* Thumbnail */}
            <div className="relative">
              <video
                src={`${video.video_url}?tr=w-720,h-480`}
                poster={video.thumbnail_url}
                width={720}
                height={480}
                className="w-full h-0 object-cover"//h-48 initialy was this
                controls={false}
                muted
              />
              {/* Optional play overlay */}
              <div className="absolute inset-0 bg-black/40 hover:bg-black/20 transition" />
            </div>

            {/* Info Section */}
            <div className="p-4 text-white space-y-1">
              <h2 className="text-lg font-semibold truncate">{video.title}</h2>
              <p className="text-sm text-gray-400 line-clamp-2">{video.description}</p>
              <div className="mt-2">
                <video
                  src={`${video.video_url}?tr=w-720,h-480`}
                  controls
                  className="w-full rounded-md"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {videos.length === 0 && (
        <div className="text-gray-400 text-center mt-12">No videos uploaded yet.</div>
      )}
    </div>
  );
}
