import React, { useEffect, useState } from "react";
import "./Recommented.css";

import thambnail1 from "../../assets/thumbnail1.png";
import thambnail2 from "../../assets/thumbnail2.png";
import thambnail3 from "../../assets/thumbnail3.png";
import thambnail4 from "../../assets/thumbnail4.png";
import thambnail5 from "../../assets/thumbnail5.png";
import thambnail6 from "../../assets/thumbnail6.png";
import thambnail7 from "../../assets/thumbnail7.png";
import thambnail8 from "../../assets/thumbnail8.png";
import { API_KEY } from "../../Api/Api";
import axios from "axios";
import { value_converter } from "../../Data";
import { Link } from "react-router-dom";

function Recommented({ categoryId }) {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=45&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
        const response = await axios.get(relatedVideo_url);
        console.log(response.data.items);
        setApiData(response.data.items);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="recommented">
      {apiData.map((item, index) => {
        return (
          <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="side-video-list">
            <img src={item.snippet.thumbnails.default.url} alt="" />
            <div className="vid-info">
              <h4>{item.snippet.title}</h4>
              <p>{item.snippet.channelTitle}</p>
              <p>{value_converter(item.statistics.viewCount)} Views</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Recommented;
