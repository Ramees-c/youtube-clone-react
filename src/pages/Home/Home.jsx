import React, { useEffect, useState } from "react";
import "./Home.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Feed from "../../components/Feed/Feed";

import spinner from "../../assets/spinner.gif";

function Home({ sidebar }) {
  const [category, setCategory] = useState(0);
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
    <>
      <Sidebar
        sidebar={sidebar}
        category={category}
        setCategory={setCategory}
      />
      <div className={`container ${sidebar ? "" : "large-container"}`}>
        <Feed category={category} />
      </div>
    </>
  );
}

export default Home;
