import React, { useEffect, useState } from "react";
import "./PlayVideo.css";

import video1 from "../../assets/video.mp4";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import jack from "../../assets/jack.png";
import user_profile from "../../assets/user_profile.jpg";
import { API_KEY } from "../../Api/Api";
import axios from "axios";

import { value_converter } from "../../Data";
import moment from "moment";

function PlayVideo({ videoId, categoryId }) {
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
        const response = await axios.get(videoDetails_url);
        // console.log(response.data)
        setApiData(response.data.items[0]);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        // Fectch channel data
        const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData?.snippet?.channelId}&key=${API_KEY}`;
        const response = await axios.get(channelData_url);
        //  console.log(response.data.items)
        setChannelData(response.data.items[0]);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchChannelData();
  }, [apiData]);

  useEffect(() => {
    //   Fetching comment data
    const fetchCommentData = async () => {
      try {
        const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;
        const response = await axios.get(comment_url);
        // console.log(response.data.items, "comment") 
        setCommentData(response.data.items);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchCommentData();
  }, [apiData]);

  return (
    <div className="play-video">
      {/* <video src={video1} controls autoPlay muted></video> */}
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
      <h3>{apiData ? apiData.snippet.title : "Title Here"}</h3>
      <div className="play-video-info">
        <p>
          {apiData ? value_converter(apiData.statistics.viewCount) : "16K"}{" "}
          Views &bull;{" "}
          {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ""}{" "}
        </p>
        <div>
          <span>
            <img src={like} alt="" />
            {apiData ? value_converter(apiData.statistics.likeCount) : 155}
          </span>
          <span>
            <img src={dislike} alt="" />
          </span>
          <span>
            <img src={share} alt="" />
            Share
          </span>
          <span>
            <img src={save} alt="" />
            Save
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img
          src={channelData ? channelData.snippet?.thumbnails?.default?.url : ""}
          alt=""
        />
        <div>
          <p>{apiData ? apiData.snippet?.channelTitle : ""}</p>
          <span>
            {channelData
              ? value_converter(channelData.statistics.subscriberCount)
              : "1M"}{" "}
            Subscribers
          </span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
        <p>
          {apiData
            ? apiData.snippet.description.slice(0, 250)
            : "Description Here"}
        </p>
        <hr />
        <h4>
          {apiData ? value_converter(apiData.statistics.commentCount) : "102"}{" "}
          Comments
        </h4>
        {commentData?.map((comment, index) => {
            return (
                <div className="comment" key={index}>
          <img src={comment.snippet?.topLevelComment?.snippet?.authorProfileImageUrl} alt="" />
          <div>
            <h3>
              {comment.snippet.topLevelComment.snippet.authorDisplayName} <span>1 day ago</span>
            </h3>
            <p>
              {comment.snippet.topLevelComment.snippet.textDisplay}
            </p>
            <div className="comment-action">
              <img src={like} alt="" />
              <span>{value_converter(comment.snippet.topLevelComment.snippet.likeCount)}</span>
              <img src={dislike} alt="" />
            </div>
          </div>
        </div>
            )
        })}
      </div>
    </div>
  );
}

export default PlayVideo;
