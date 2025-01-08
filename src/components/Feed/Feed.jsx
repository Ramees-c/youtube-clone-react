import React, { useEffect, useState } from "react";
import "./Feed.css";

import thambnail1 from "../../assets/thumbnail1.png";
import thambnail2 from "../../assets/thumbnail2.png";
import thambnail3 from "../../assets/thumbnail3.png";
import thambnail4 from "../../assets/thumbnail4.png";
import thambnail5 from "../../assets/thumbnail5.png";
import thambnail6 from "../../assets/thumbnail6.png";
import thambnail7 from "../../assets/thumbnail7.png";
import thambnail8 from "../../assets/thumbnail8.png";
import { Link } from "react-router-dom";
import { API_KEY } from "../../Api/Api";
import axios from "axios";
import { value_converter } from "../../Data";
import moment from "moment";

function Feed({ category }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
        const response = await axios.get(videoList_url);
        // console.log(response.data.items, "itemss");
        setData(response.data.items);
      } catch (error) {
         console.error(error.message)
      }
    };
    fetchData();
  }, [category]);

  return (
    <div className="feed">
      {data.map((item, index) => {
        return (
          <Link to={`video/${item.snippet.categoryId}/${item.id}`} key={index} className="card">
        <img src={item.snippet.thumbnails.medium.url} alt="" />
        <h2>
          {item.snippet.title}
        </h2>
        <h3>{item.snippet.channelTitle}</h3>
        <p>{value_converter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
      </Link>
        )
      })}
    </div>
  );
}

export default Feed;
