import { type NextPage } from "next";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import Layout from "../layout";
import Hero from "../components/hero";
import SubHero from "../components/sub-hero";
import Features from "../components/features";

const Home: NextPage = () => {
  return (
    <Layout>
      <Hero />
      <SubHero />
      <Features />
    </Layout>
  );
};

export default Home;
