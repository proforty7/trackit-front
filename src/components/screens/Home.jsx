import React from "react";
import { Layout } from "antd";
import Navbar from "../elements/Navbar";
import Banner from "../elements/Banner";

const Home = () => {
  return (
    <>
      <Layout>
        <Navbar />
        <Banner />
      </Layout>
    </>
  );
};

export default Home;
