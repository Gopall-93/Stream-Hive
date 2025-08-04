import React from "react";

const HomePagePreview = () => {
  return (
    <div className="bg-base-300 text-base-content p-6 rounded-xl shadow-xl max-w-5xl w-full mx-auto scale-70">
      <h2 className="text-2xl font-bold mb-4">Welcome to StreamHive</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1 */}
        <div className="card bg-base-200 shadow-xl">
          <figure className="h-40 bg-neutral">
            <div className="w-full h-full bg-base-100 flex items-center justify-center text-lg font-semibold">
              Thumbnail
            </div>
          </figure>
          <div className="card-body">
            <h3 className="card-title">Featured Video</h3>
            <p className="text-sm">
              A sneak peek into how our platform makes streaming smarter.
            </p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary btn-sm">Watch Now</button>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="card bg-base-200 shadow-xl">
          <figure className="h-40 bg-neutral">
            <div className="w-full h-full bg-base-100 flex items-center justify-center text-lg font-semibold">
              Thumbnail
            </div>
          </figure>
          <div className="card-body">
            <h3 className="card-title">Trending Now</h3>
            <p className="text-sm">
              Catch the most popular shows people are streaming right now.
            </p>
            <div className="card-actions justify-end">
              <button className="btn btn-secondary btn-sm">Explore</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePagePreview;
