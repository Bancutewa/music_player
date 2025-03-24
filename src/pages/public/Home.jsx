import React from "react";

const Home = () => {
  const albums = [
    { title: "Modern Rock Music", artist: "Mellisa", image: "url1" },
    { title: "Hard Metal Album", artist: "Jude", image: "url2" },
    { title: "Love Songs Album", artist: "Jack", image: "url3" },
    { title: "Instrumental Album", artist: "Jackson", image: "url4" },
    { title: "Made for you", artist: "Law Tiger", image: "url5" },
    { title: "Kiss the sky", artist: "Misterious", image: "url6" },
    { title: "In the Depths", artist: "Blank", image: "url7" },
    { title: "Volcano", artist: "Martini", image: "url8" },
    { title: "Juicy touch", artist: "Jingle", image: "url9" },
    { title: "Modern Rock Music", artist: "Mellisa", image: "url10" },
    { title: "Hard Metal Album", artist: "Jude", image: "url11" },
    { title: "Love Songs Album", artist: "Jack", image: "url12" },
  ];
  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">TRENDING ALBUMS</h2>
      <div className="grid grid-cols-3 gap-4">
        {albums.map((album, index) => (
          <div key={index} className="bg-white p-4 shadow rounded-lg">
            <img
              src={album.image}
              alt={album.title}
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="mt-2 font-semibold">{album.title}</h3>
            <p className="text-gray-600">{album.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
