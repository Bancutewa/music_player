import React, { memo, useState, useCallback, useEffect } from "react";
import { apiGetAllSongs } from "../../../apis/song";
const Songs = () => {
  const [songs, setSongs] = useState([]);
  const fetchSongs = async () => {
    const response = await apiGetAllSongs();
    if (response.success) setSongs(response.data);
    else console.log(response.error);
  };
  useEffect(() => {
    fetchSongs();
  }, []);
  return (
    <div>
      {songs.map((el, index) => (
        <h3>{el.title}</h3>
      ))}
    </div>
  );
};

export default memo(Songs);
