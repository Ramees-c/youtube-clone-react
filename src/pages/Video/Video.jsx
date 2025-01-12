import React, { useEffect, useState } from "react";
import "./Video.css";
import PlayVideo from "../../components/PlayVideo/PlayVideo";
import Recommented from "../../components/Recommented/Recommented";
import { useParams } from "react-router-dom";

import spinner from "../../assets/spinner.gif";

function Video() {
  const { videoId, categoryId } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 2000);
  }, [loading]);

  return !loading ? (
    <div className="loading-spinner">
      <img src={spinner} alt="" />
    </div>
  ) : (
    <div className="play-container">
      <PlayVideo videoId={videoId} categoryId={categoryId} />
      <Recommented categoryId={categoryId} />
    </div>
  );
}

export default Video;
