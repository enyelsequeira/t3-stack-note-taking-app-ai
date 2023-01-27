import { type NextPage } from "next";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import Layout from "../layout";
import Hero from "../components/hero";
import SubHero from "../components/sub-hero";
import Features from "../components/features";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  // console.log({ supabase });
  //   const [images, setImage] = useState<any>();

  //   const getImages = async () => {
  //     const { data } = supabase.storage
  //       .from("profile-images")
  //       .getPublicUrl("Space.jpg");

  //     console.log({ data });
  //   };

  //  useEffect(() => {
  //     getImages();
  //   }, []);

  // i want to read from my supabase storage that has the name of testing and i just want to list everything it has
  // const { data, error } = supabase.storage
  //   .from("profile-images")
  //   .list()
  //   .then((res) => {
  //     console.log("🚀 ~ file: index.tsx ~ line 18 ~ Home:NextPage ~ res", res);
  //   });

  // i want to get url of the image from supabase storage

  return (
    <Layout>
      <Hero />
      <SubHero />
      <Features />
    </Layout>
  );
};

export default Home;
