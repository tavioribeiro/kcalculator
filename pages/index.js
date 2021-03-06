import React from "react";
import ReactDOM from "react-dom";

import Head from 'next/head'


import { ChakraProvider, Button } from "@chakra-ui/react";






import Header from "../public/styles/header";
import SmallWithSocial from "../public/styles/footer";
import BodyCard from "../public/styles/body1";




function Home()
{
  return (
    <>
      <Head>
        <title>Kcalculator</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="./logo.png" />
      </Head>
      

      <div class="container">
        <div class="header">
          <ChakraProvider>
            <Header/>
          </ChakraProvider>
        </div>

        <div class="main">
          <div class="container2">
            <div class="content1">
              <ChakraProvider>
                <BodyCard></BodyCard>
              </ChakraProvider>
            </div>

            <div class="content2">
              <img src="/assets/fit.svg"></img>
            </div>
          </div>
          
        </div>

        <div class="footer">
          <ChakraProvider>
            <SmallWithSocial/>
          </ChakraProvider>
        </div>
      </div>
    </>
  )
}




export default Home;