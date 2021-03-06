import React from "react";
import ReactDOM from "react-dom";

import Head from 'next/head'


import Link from 'next/link';

import {
  ChakraProvider,
  Button,
} from "@chakra-ui/react";

function Erro404()
{
  return (
    <>
      <Head>
        <title>Kcalculator -404</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="./logo.png" />
      </Head>
      

      <div class="container">
 
        <div class="main">
            <h1 className="typo404">ERRO 404</h1>
            <h3>PÁGINA NÃO ENCONTRADA</h3>
            
            <br/>
            <ChakraProvider>
                <BotaoLink texto="Início" end="/"></BotaoLink>
            </ChakraProvider>

            
        </div>


      </div>
    </>
  )
}
function BotaoLink(props) //   link:/
{
  return(
    <Link href={props.end} style={{ textDecoration: 'none' }}>
      <Button
          background="transparent" borderRadius="25"  size="sm"
          _hover={{
            background: "white",
            color: "black",
          }}
          _active={{
            background: "#b0ff29",
            color: "black",
            border: "0px solid"
          }}
          _focus={{
            background: "#b0ff29",
            color: "black",
            border: "0px solid"
          }}
          _focusWithin={{
            background: "#b0ff29",
            color: "black",
            border: "0px solid"
          }}
        >
          {props.texto}
      </Button>
    </Link> 
  );
}


export default Erro404;


