import {
    Box,
    Collapse,
    Drawer,
    Heading,
    DrawerContent,
    Flex,
    Icon,
    IconButton,
    useColorModeValue,
    useDisclosure,
    Stack,
    Link,
    FormControl,
    FormLabel,
    Select,
    VisuallyHidden,
    Input,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    Button,
    HStack,
    Radio,
    Center,
    Divider,
    Square,
    Text,
    useToast,
  } from "@chakra-ui/react";

  import { Line } from 'react-chartjs-2';

  import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from "@chakra-ui/react"
  import { AiFillCloseCircle } from "react-icons/ai";
  import { FaBell, FaClipboardCheck, FaRss } from "react-icons/fa";
  import { AiFillGift } from "react-icons/ai";
  import { BsGearFill } from "react-icons/bs";
  import { FiMenu, FiSearch } from "react-icons/fi";
  import { HiCode, HiCollection } from "react-icons/hi";
  import { MdHome, MdKeyboardArrowRight } from "react-icons/md";
  import { BsFillPersonLinesFill } from "react-icons/bs";
  import React from "react";



  import { useEffect } from 'react';
  import { useState } from 'react';


  import axios from 'axios';
  import { ChatIcon } from "@chakra-ui/icons";

  var server = "https://nodetest15.herokuapp.com";
  //var server = "http://localhost:3001";

  var podePegarDados = 0;

  var respostaPerfil;
  var respostaDados;

  var condicional = 0; 

  
  export default function Swibc()
  {
    console.log("versão alpha: 0.2.1");
    const toast = useToast();

    var [nomeUsuario, setnomeUsuario] = useState("");
    var [mensagem1, setnomeMensagem1] = useState("");
    var [idUsuario, setIdUsuario] = useState("");
    var [pagina, setPagina] = useState(0);
    var [isLoading, setIsLoading] = useState(false);

    var [imc, setIMC] = useState(0);
    var [gc, setGC] = useState(0);

    var peso = 0;
    var altura = 0;
    var idade = 0;
    var abdomem = 0;
    var pescoco = 0;
    var quadril = 0;
    var sexo = "";
    var atividade = "";
    var objetivo = "";
    /*

    //----------------------- Perfil -----------------------
    var nome_perfil_g;
    var massa_perfil_g;
    var altura_perfil_g;
    var idade_perfil_g;
    var abdomem_perfil_g;
    var pescoco_perfil_g;
    var quadril_perfil_g;
    var sexo_perfil_g; // M = 1 / F = 2

    var dropButton_atividade_perfil_g = 'one';
    var dropButton_objetivo_perfil_g = 'one';

    var imc_perfil_g = 0;
    var tmb_perfil_g = 0;
    var lbm_perfil_g = 0;
    var gc_perfil_g = 0;
    var tdee_perfil_g = 0;
      var tdee_perfil_mensage_g = 'Não informado ainda';
    var pmm_perfil_g = 0;
      var pmm_perfil_10_g = 0;
      var pmm_perfil_15_g = 0;
    
    var min_pi_perfil_g = 0;
    var max_pi_perfil_g = 0;
    

    //imc chart-----------------------------
      var min_imc_chart_perfil_g = 0;
      var max_imc_chart_perfil_g = 0;
      var dif_imc_char_perfil_g = 0;
    //

    //gc chart-----------------------------
      var min_gc_chart_perfil_g = 0;
      var max_gc_chart_perfil_g = 0;
      var dif_gc_char_perfil_g = 0;
    //

    //macros -----------------------------
      var resultado_macro_LP_perfil_g = 0;
      var resultado_macro_LF_perfil_g = 0;
      var resultado_macro_LC_perfil_g = 0;

      var resultado_macro_MP_perfil_g = 0;
      var resultado_macro_MF_perfil_g = 0;
      var resultado_macro_MC_perfil_g = 0;

      var resultado_macro_HP_perfil_g = 0;
      var resultado_macro_HF_perfil_g = 0;
      var resultado_macro_HC_perfil_g = 0;

      var resultado_goal_perfil_g = "Sem medição ainda";
    //
*/
    var tmb_perfil_mensage_g;
    var imc_perfil_mensage_g;



    var [label, setLabel] = useState(new Array());
    var [dataIMC, setDataIMC] = useState(new Array());
    var [dataGC, setDataGC] = useState(new Array());

    

    
    useEffect(() =>
    {
      
      setnomeUsuario(localStorage.getItem('nome'));

      setIdUsuario(localStorage.getItem('idUsuario'));

      getData();


      if(localStorage.getItem('origem') === "2") //Entrar
      {
        setPagina(1);//Inicio direto 
      }

    }, []);



    function postuserdata() //Posta os dados gerais (altura, peso...) 
    {
      setIsLoading(true);

      peso = document.getElementById('peso').value;
      altura = document.getElementById('altura').value;
      idade = document.getElementById('idade').value;
      sexo = document.getElementById('sexo').value;
      abdomem = document.getElementById('abdomem').value;
      pescoco = document.getElementById('pescoco').value;
      quadril = document.getElementById('quadril').value;
      atividade = document.getElementById('nivelatividade').value;
      objetivo = document.getElementById('objetivo').value;

      if(localStorage.getItem('origem') === "1") //Posta
      {
        condicional = 0;
        axios.post
        (
          server + "/api/postuserdata", 
          {
            a: localStorage.getItem('idUsuario'),
            b: localStorage.getItem('nome'),
            c: document.getElementById('idade').value,
            d: document.getElementById('sexo').value,
            e: document.getElementById('peso').value,
            f: document.getElementById('altura').value,
            g: document.getElementById('abdomem').value,
            h: document.getElementById('pescoco').value,
            i: document.getElementById('quadril').value,
            j: document.getElementById('nivelatividade').value,
            k: document.getElementById('objetivo').value,
          }
        ).then((response)=>{
          if(response.data != 0)
          {
            if(response.data === 1)
            {
              setIsLoading(false);
              setnomeMensagem1("Não foi possível atualizar os dados!");

              toast({
                title: "Não foi possível atualizar os dados!",
                //description: "Seus dados foram sincronizados com sucesso.",
                status: "error",
                duration: 3500,
                isClosable: true,
              });
            }
            else
            {
              setIsLoading(false);

              respostaPerfil = response.data;
              console.log(respostaPerfil);
              podePegarDados = 0;
              localStorage.setItem('origem', 2);
              setnomeMensagem1("Atualizado com sucesso!");

              toast({
                title: "Atualizado com sucesso!",
                //description: "Seus dados foram sincronizados com sucesso.",
                status: "success",
                duration: 3500,
                isClosable: true,
              });

              postData();
              setPagina(1);
            } 
          }
          else
          {
            setIsLoading(false);
            setnomeMensagem1("Não foi possível atualizar os dados!");

            toast({
              title: "Não foi possível atualizar os dados!",
              //description: "Seus dados foram sincronizados com sucesso.",
              status: "error",
              duration: 3500,
              isClosable: true,
            });
          }
        })
      }
      if(localStorage.getItem('origem') === "2") //Atualiza
      {
        condicional = 0;
        axios.post
        (
          server + "/api/updateuserdata", 
          {
            a: localStorage.getItem('idUsuario'),
            b: localStorage.getItem('nome'),
            c: document.getElementById('idade').value,
            d: document.getElementById('sexo').value,
            e: document.getElementById('peso').value,
            f: document.getElementById('altura').value,
            g: document.getElementById('abdomem').value,
            h: document.getElementById('pescoco').value,
            i: document.getElementById('quadril').value,
            j: document.getElementById('nivelatividade').value,
            k: document.getElementById('objetivo').value,
          }
        ).then((response)=>{
          if(response.data != 0)
          {
            if(response.data === 1)
            {
              setnomeMensagem1("Não foi possível atualizar os dados!");

              toast({
                title: "Não foi possível atualizar os dados!",
                //description: "Seus dados foram sincronizados com sucesso.",
                status: "error",
                duration: 3500,
                isClosable: true,
              });

              setIsLoading(false);
            }
            else
            {
              respostaPerfil = response.data;
              console.log(respostaPerfil);
              podePegarDados = 0;
              setnomeMensagem1("Atualizado com sucesso!");

              toast({
                title: "Atualizado com sucesso!",
                //description: "Seus dados foram sincronizados com sucesso.",
                status: "success",
                duration: 3500,
                isClosable: true,
              });

              setPagina(1);
              postData();
              setIsLoading(false);
            } 
          }
          else
          {
            setnomeMensagem1("Não foi possível atualizar os dados!");

            toast({
              title: "Não foi possível atualizar os dados!",
              //description: "Seus dados foram sincronizados com sucesso.",
              status: "error",
              duration: 3500,
              isClosable: true,
            });

            setIsLoading(false);
          }
        })
      }
    }



    function getUserData() //Pega os dados gerais (altura, peso...) 
    {
      axios.post
      (
        server + "/api/getuserdata", 
        {
          a: localStorage.getItem('idUsuario'),
        }
      ).then((response)=>{
        if(response.data != 0)
        {
          if(response.data === 1)
          {
            setnomeMensagem1("Não foi possível atualizar os dados!");

            toast({
              title: "Não foi possível atualizar os dados!",
              //description: "Seus dados foram sincronizados com sucesso.",
              status: "error",
              duration: 3500,
              isClosable: true,
            });
          }
          else
          {
            respostaPerfil = response.data;
          } 
        }
        else
        {
          setnomeMensagem1("Não foi possível atualizar os dados!");

          toast({
            title: "Não foi possível atualizar os dados!",
            //description: "Seus dados foram sincronizados com sucesso.",
            status: "error",
            duration: 3500,
            isClosable: true,
          });
        }
      })
    }




    function postData() //ENVIA os dados FORTES (IMC, TDEE...) 
    {
      console.log("dddd00");
      axios.post
      (
        server + "/api/postvalues", 
        {
          a: localStorage.getItem('idUsuario'),
          //b: Math.floor(Math.random() * 40),
          b: new Date(),
          c: calcularImc(),
          d: calcularGc(),
        }
      ).then((response)=>{

        getData();

        if(response.data != 0)
        {
          console.log("tr: " + response.data);
          if(response.data === 1)
          {
            //setnomeMensagem1("Não foi possível atualizar os dados!");
          }
          else
          {
            console.log("tr");
          } 
        }
        else
        {
          //setnomeMensagem1("Não foi possível atualizar os dados!");
        }
      })
    }


 

    async function getData() //Pega os dados FORTES (IMC, TDEE...) 
    {

      console.log("dddd33");
      axios.post
      (
        server + "/api/getvalues", 
        {
          a: localStorage.getItem('idUsuario'),
        },
      ).then((response)=>{
        if(response.data != 0)
        {
          console.log(response.data);

          if(response.data === 1)
          {
            setnomeMensagem1("Não foi possível baixar os dados!");

            toast({
              title: "Não foi possível baixar os dados!",
              //description: "Seus dados foram sincronizados com sucesso.",
              status: "success",
              duration: 3500,
              isClosable: true,
            });
          }
          else
          {
            respostaDados = response.data; 
            generateCharts();
          } 
        }
        else
        {
          setnomeMensagem1("Não foi possível baixar os dados!");

          toast({
            title: "Não foi possível baixar os dados!",
            //description: "Seus dados foram sincronizados com sucesso.",
            status: "error",
            duration: 3500,
            isClosable: true,
          });
        }
      })
    }



    //================================================================
    const sidebar = useDisclosure();
    const integrations = useDisclosure();


    const Botao5 = ({onClick, color, texto, isLoading}) =>
    {
      return(
          <>
            <Button
            isLoading = {isLoading}
              onClick = {onClick}
                background="#7928CA" borderRadius="25" marginTop="20px"  size="sm" color= {color} border="2px solid #b0ff29" width="100%"
                _hover={{
                    background: "white",
                    color: "black",
                }}
                _active={{
                    background: "#7928CA",
                    color: "white",
                    border: "0px solid"
                }}
                _focus={{
                    background: "#7928CA",
                    color: "white",
                    border: "0px solid"
                }}
                _focusWithin={{
                    background: "#7928CA",
                    color: "white",
                    border: "0px solid"
                }}
            >
              {texto}
            </Button>
          
      </>
    );
    }


    const Botao6 = ({color, texto}) =>
    {
      function sair()
      {
        localStorage.clear();          
        window.location = "/";
      }

      return(
          <>
            <Button
              onClick = {() => {sair()}}
                background="#7928CA"  borderRadius="25" marginTop="20px"  size="sm" color= {color} border="2px solid #b0ff29" width="80%"
                _hover={{
                    background: "white",
                    color: "black",
                }}
                _active={{
                    background: "#7928CA",
                    color: "white",
                    border: "0px solid"
                }}
                _focus={{
                    background: "#7928CA",
                    color: "white",
                    border: "0px solid"
                }}
                _focusWithin={{
                    background: "#7928CA",
                    color: "white",
                    border: "0px solid"
                }}
            >
              {texto}
            </Button>
          
      </>
    );
    }
    
  
    const NavItem = (props) => {
      const { icon, children, ...rest } = props;
      return (
        <Flex
          align="center"
          px="4"
          pl="4"
          py="3"
          cursor="pointer"
          color={useColorModeValue("white", "white")}
          _hover={{
            bg: useColorModeValue("#7928CA", "white"),
            color: useColorModeValue("white", "white"),
          }}
          role="group"
          fontWeight="semibold"
          transition=".15s ease"
          {...rest}
        >
          {icon && (
            <Icon
              mr="2"
              boxSize="4"
              _groupHover={{
                color: useColorModeValue("white", "gray.300"),
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      );
    };
  
    const SidebarContent = (props) => (
      <Box
        as="nav"
        pos="fixed"
        top="0"
        left="0"
        zIndex="sticky"
        h="full"
        pb="10"
        overflowX="hidden"
        overflowY="auto"
        bg={useColorModeValue("black", "gray.800")}
        borderColor={useColorModeValue("#b0ff29", "gray.700")}
        borderRightWidth="0px"
        w="60"
        {...props}
      >
        <Flex px="4" py="5" align="center">
          <h1 className="titleFooter">KCALCULATOR</h1>
        </Flex>
        
        <Flex
          direction="column"
          as="nav"
          fontSize="sm"
          color="white"
          aria-label="Main Navigation"
        >
          <NavItem onClick={()=>setPagina(1)} icon={MdHome}>Início</NavItem>
          <NavItem onClick={()=>setPagina(0)} icon={BsFillPersonLinesFill}>Perfil</NavItem>
          

          <Center>
            <Botao6 texto="Sair"></Botao6>
          </Center>
          
        </Flex>
      </Box>
    );

    return (
      
      <Box
        as="section"
        bg={useColorModeValue("gray.50", "gray.700")}
        minH="100vh"
        background="black"
      >
        <SidebarContent display={{ base: "none", md: "unset" }} />

        <Drawer
          isOpen={sidebar.isOpen}
          onClose={sidebar.onClose}
          placement="left"

        >
          {/*<DrawerOverlay />*/}
          
          <DrawerContent>
            <SidebarContent w="full" borderRight="none" />
          </DrawerContent>
        </Drawer>
        
        <Box ml={{ base: 0, md: 60 }} transition=".3s ease">

          <Stack>
              <Box backgroundColor="black" height="50px">
                <Flex height="100%" direction="row">
                  <Flex align="center" height="100%" flex="1" justify="center" >
                    <Text color="white" margin="5px" className="typoG2">{nomeUsuario}</Text>
                  </Flex>

                  <Flex height="100%" justify="center" align="center">
                    <IconButton
                    backgroundColor="black" borderRadius="5" marginTop="20px"  size="sm" color= "#7928CA" border="2px solid #b0ff29" width="100%"
                    _hover={{
                        background: "white",
                        color: "black",
                    }}
                    _active={{
                        background: "#7928CA",
                        color: "white",
                        border: "0px solid"
                    }}
                    _focus={{
                        background: "#7928CA",
                        color: "white",
                        border: "0px solid"
                    }}
                    _focusWithin={{
                        background: "#7928CA",
                        color: "white",
                        border: "0px solid"
                    }}
                      margin="5px"
                      aria-label="Menu"
                      display={{ base: "inline-flex", md: "none" }}
                      onClick={sidebar.onOpen}
                      icon={<FiMenu />}
                      size="sm"
                    />
                  </Flex>
                </Flex>
              </Box>
              

{/* ----------------------------------------------------------------*/}

        <RetornoCondicional></RetornoCondicional>
              
            
          </Stack>

          {/* 
          <div class="container3">
            <div class="header3">
              <div className="content-hearder31">
                <p className="typoG2">Bem vindo {nome}</p>
              </div>
              
              <div className="content-hearder32">
                <IconButton
                  margin="5px"
                  aria-label="Menu"
                  display={{ base: "inline-flex", md: "none" }}
                  onClick={sidebar.onOpen}
                  icon={<FiMenu />}
                  size="sm"
                />
              </div>
              
            </div>
            <div class="main3">

            </div>
            <div class="footer3">

            </div>
          </div>

          */}          
          
        </Box>
      </Box>
    );


    function calcularImc()
    {
      var result = (peso / (altura * altura)) * 10000;
      console.log("===============================");
      console.log(peso);
      console.log(altura);
      console.log(result);
      console.log("===============================");
      return result;
    }


    function calcularGc()
    { 
      if(sexo === "Masculino")
      {
        var result = (495 / ( 1.0324 - 0.19077 * (Math.log(abdomem - pescoco) / Math.log(10)) + 0.15456 * (Math.log(altura) / Math.log(10))) - 450);
        console.log(result);
        return result;
      }

      if(sexo === "Feminino")
      { 
        var result = (495 / ( 1.29579 - 0.35004 * (Math.log(abdomem + quadril - pescoco) / Math.log(10)) + 0.22100 * (Math.log(altura) / Math.log(10))) - 450);
        console.log(result);
        return result;
      }
    }





    function generateCharts()
    {
      var tempLabel = [];
      var tempDataIMC = [];
      var tempDataGC = [];

      //var currentdate = new Date("Wed Aug 11 2021 19:56:35 GMT-0300 (Horário Padrão de Brasília)"); 
      //console.log(currentdate);
      //console.log(currentdate.getSeconds());

      for(var i = 0; i<respostaDados.length;i++)
      {
        var currentdate = new Date(respostaDados[i].data); 

        tempLabel.push(currentdate.getHours() + ":" + currentdate.getMinutes());

        tempDataIMC.push(respostaDados[i].imc);
        tempDataGC.push(respostaDados[i].gc);

        if(i === respostaDados.length - 1)
        {
          setIMC(respostaDados[i].imc);
          setGC(respostaDados[i].gc);
        }
      }

      setLabel(tempLabel);
      setDataIMC(tempDataIMC);
      setDataGC(tempDataGC);
    }


  

    function RetornoCondicional()
    {
      if(pagina === 0)
      {
        return[
          <Perfil></Perfil>
        ]
      }
      if(pagina === 1)
      {
        
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

        getUserData();
        //getData();
          



        const dataChartIMC = {
          labels: label,
          datasets: [
            {
              label: 'Índice',
              data: dataIMC,
              fill: false,
              backgroundColor: '#b0ff29',
              borderColor: 'rgba(255, 255, 255, 0.5)',
              //color: 'rgba(255, 255, 255, 0.5)', 
            },     
          ],
        };

        const dataChartGC = {
          labels: label,
          datasets: [
            {
              label: 'Porcentagem',
              data: dataGC,
              fill: false,
              backgroundColor: '#b0ff29',
              borderColor: 'rgba(255, 255, 255, 0.5)',
              //color: 'rgba(255, 255, 255, 0.5)', 
            },     
          ],
        };

        const optionsChart = {
          plugins:
          {
            legend:
            {
              display: false,
              labels:
              {
                color: 'white',
              }
            },

            title:
            {
              fullSize:true,
              display: false,
              text: 'IMC',
            
              color: 'white',
            },

            subtitle:
            {
              display: false,
              text: 'Seu histórico de resultados',
            },
          },

          scales: {
            y: {  // not 'yAxes: [{' anymore (not an array anymore)
              ticks: {
                color: "white", // not 'fontColor:' anymore
                // fontSize: 18,
                
              
                beginAtZero: true
              }
            },
            X: {  // not 'yAxes: [{' anymore (not an array anymore)
              ticks: {
                color: "white", // not 'fontColor:' anymore
                // fontSize: 18,
                
               
                beginAtZero: true
              }
            },
          },
        };
        

        
        /*
        const optionsChart = {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
            
          },
        };
        */

        
       

        return [
          <Box min-height="100vh" backgroundColor="#7928CA">
            <div className="container4">
              <div className="box14">
                <Box
                margin="10px"
                width="95%"
                  rounded="25px"
                  bg={useColorModeValue('black', 'gray.700')}
                  rounded="25px"
                  border="2px solid #b0ff29"
                  color="white"
                  p={3}>
                  
                  <Stack align={'center'}>
                    <Box marginTop="5px" marginBottom="20px">
                      <Stack align={'center'}>
                          <Heading textAlign="center" color="white" fontSize={'4xl'}>Estatísticas</Heading>
                            <Text fontSize="15px" color={'white'} textAlign="center">
                              Esses dados foram calculados a partir dos valores da aba Perfil
                            </Text>
                        </Stack>
                    </Box>

                    <Box width="100%" height="1px" backgroundImage="linear-gradient(to right, rgba(0, 0, 0, 0), #b0ff29, rgba(0, 0, 0, 0))">
                    
                    </Box>

                    <Box
                      marginTop="205px"
                      width="100%"
                        
                        p={8}>

                          <Flex width="100%" justify="center">
                            <Table size="sm" color="black">
                              <Thead>
                                <Tr>
                                  <Th color="#b0ff29" textAlign="center">Índices</Th>
                                  <Th color="#b0ff29" textAlign="center">Valores</Th>
                                </Tr>
                              </Thead>
                              <Tbody>
                                <Tr>
                                  <Td color="white" textAlign="center">Índice de Massa Corporal</Td>
                                  <Td color="white" textAlign="center" fontWeight="bold">{imc}</Td>
                                </Tr>

                                <Tr>
                                  <Td color="white" textAlign="center">Gasto Energético Diário</Td>
                                  <Td color="white" textAlign="center" fontWeight="bold">não disponível</Td>
                                </Tr>

                                <Tr>
                                  <Td color="white" textAlign="center">Gordura Corporal</Td>
                                  <Td color="white" textAlign="center" fontWeight="bold">{gc} %</Td>
                                </Tr>

                                <Tr>
                                  <Td color="white" textAlign="center">Taxa Metabólica Basal</Td>
                                  <Td color="white" textAlign="center" fontWeight="bold">não disponível</Td>
                                </Tr>

                                <Tr>
                                  <Td color="white" textAlign="center">Peso Ideal</Td>
                                  <Td color="white" textAlign="center" fontWeight="bold">não disponível</Td>
                                </Tr>
                                
                              </Tbody>
                              
                            </Table>
                          </Flex>
                      </Box>
                    </Stack>
                </Box>        
              </div>



              <div className="box24">
                <div className="parent3">

                  <div className="div1-3">
                    <Flex justify="center">
                      <Box width="90%" borderRadius="25px" border="2px solid #b0ff29" backgroundColor="black" margin="20px" padding="5px">
                        <h1 className='titleIndice'>IMC</h1>
                        <p className='titleSubIndice'>Seu histórico de resultados</p>
                        <Line data={dataChartIMC} options={optionsChart} />
                      </Box>
                    </Flex>
                  </div>

                  <div className="div2-3">
                    <Flex justify="center">
                      <Box width="90%" borderRadius="25px" border="2px solid #b0ff29" backgroundColor="black" margin="20px" padding="5px">
                        <h1 className='titleIndice'>Gordura Corporal</h1>
                        <p className='titleSubIndice'>Seu histórico de resultados</p>
                        <Line data={dataChartGC} options={optionsChart} />
                      </Box>
                    </Flex>
                  </div>
                  <div className="div3-3"></div>
                  <div className="div4-3"></div>
                </div>
               </div>
              </div>
          </Box>
        ]
      }
    }

    


    function Perfil()
    {
      return [
        <Box backgroundColor="#7928CA">
                <Flex justify="center">
                  <Flex direction="column"  width="500px">
                    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                      <Stack align={'center'}>
                        <Heading textAlign="center" color="white" fontSize={'4xl'}>Completar perfil</Heading>
                
                        <Text fontSize="16px" color={'white'} textAlign="center">
                          Esses dados serão utilizados para calcular os índices que serão exibidos na próxima página!
                        </Text>

                        <br></br>

                        <Text fontSize="13px" color={'white'} textAlign="center">
                          Atenção: Não deixe valores em branco e insira apenas números.
                        </Text>
                      </Stack>
                      <Box
                        rounded={'lg'}
                        bg={useColorModeValue('rgba( 0, 0, 0, 1 )', 'gray.700')}
                        boxShadow="0 0 5px black"
                        rounded="25px"
                        color="white"
                        p={8}>
                        <Stack spacing={4}>
                          
                        <FormControl id="idade">
                            <FormLabel>Idade | Em anos</FormLabel>
                            <Input 
                              placeholder="Ex: 25 "
                              height="30px"
                              fontSize="14px"
                              rounded="25px" 
                              border="0px" 
                              background="white" 
                              color="black"
                              border="2px solid white" 
                              type="email" 
                              _placeholder={{
                                color: '#545454',
                                fontSize: "13px"
                              }}
                              _focus={{
                                background: "white",
                                color: "black",
                                border:"2px solid #b0ff29" 
                              }}
                          />
                          </FormControl>

                          <FormControl id="sexo">
                            <FormLabel>Sexo biológico</FormLabel>
                            <Select
                              height="30px"
                              fontSize="14px"
                              rounded="25px" 
                              border="0px" 
                              background="white" 
                              color="black"
                              border="2px solid white" 
                              type="email" 
                              _focus={{
                                background: "white",
                                color: "black",
                                border:"2px solid #b0ff29" 
                              }}
                              placeholder="Selecionar">
                              <option backgroundColor="blue" >Masculino</option>
                              <option>Feminino</option>
                            </Select>
                          </FormControl>
                          
                          <FormControl id="peso">
                            <FormLabel>Peso | Em quilogramas</FormLabel>
                            <Input 
                            placeholder="Ex: 75"
                              height="30px"
                              fontSize="14px"
                              rounded="25px" 
                              border="0px" 
                              background="white" 
                              color="black"
                              border="2px solid white" 
                              type="email" 
                              _placeholder={{
                                color: '#545454',
                                fontSize: "13px"
                              }}
                              _focus={{
                                background: "white",
                                color: "black",
                                border:"2px solid #b0ff29" 
                              }}
                          />
                          </FormControl>

                          <FormControl id="altura">
                            <FormLabel>Altura | Em centímetros</FormLabel>
                            <Input 
                              placeholder="Ex: 179"
                              height="30px"
                              fontSize="14px"
                              rounded="25px" 
                              border="0px" 
                              background="white" 
                              color="black"
                              border="2px solid white" 
                              type="email" 
                              _placeholder={{
                                color: '#545454',
                                fontSize: "13px"
                              }}
                              _focus={{
                                background: "white",
                                color: "black",
                                border:"2px solid #b0ff29" 
                              }}
                          />
                          </FormControl>

                          <FormControl id="abdomem">
                            <FormLabel>Abdomem | Em centímetros</FormLabel>
                            <Input 
                              placeholder="Ex: 90"
                              height="30px"
                              fontSize="14px"
                              rounded="25px" 
                              border="0px" 
                              background="white" 
                              color="black"
                              border="2px solid white" 
                              type="email" 
                              _placeholder={{
                                color: '#545454',
                                fontSize: "13px"
                              }}
                              _focus={{
                                background: "white",
                                color: "black",
                                border:"2px solid #b0ff29" 
                              }}
                          />
                          </FormControl>

                          <FormControl id="pescoco">
                            <FormLabel>Pescoço | Em centímetros</FormLabel>
                            <Input 
                              placeholder="Ex: 37"
                              height="30px"
                              fontSize="14px"
                              rounded="25px" 
                              border="0px" 
                              background="white" 
                              color="black"
                              border="2px solid white" 
                              type="email" 
                              _placeholder={{
                                color: '#545454',
                                fontSize: "13px"
                              }}
                              _focus={{
                                background: "white",
                                color: "black",
                                border:"2px solid #b0ff29" 
                              }}
                          />
                          </FormControl>

                          <FormControl id="quadril">
                            <FormLabel>Quadril | Em centímetros</FormLabel>
                            <Input 
                              placeholder="Ex: 107"
                              height="30px"
                              fontSize="14px"
                              rounded="25px" 
                              border="0px" 
                              background="white" 
                              color="black"
                              border="2px solid white" 
                              type="email"
                              _placeholder={{
                                color: '#545454',
                                fontSize: "13px"
                              }} 
                              _focus={{
                                background: "white",
                                color: "black",
                                border:"2px solid #b0ff29" 
                              }}
                          />
                          </FormControl>
                          
                          <FormControl id="nivelatividade">
                            <FormLabel>Nivel de Atividade</FormLabel>
                            <Select
                              height="30px"
                              fontSize="14px"
                              rounded="25px" 
                              border="0px" 
                              background="white" 
                              color="black"
                              border="2px solid white" 
                              type="email" 
                              _focus={{
                                background: "white",
                                color: "black",
                                border:"2px solid #b0ff29" 
                              }}
                              placeholder="Selecionar">
                              <option>Sedentário</option>
                              <option>Baixo</option>
                              <option>Moderado</option>
                              <option>Alto</option>
                              <option>Atleta</option>
                            </Select>
                          </FormControl>

                          <FormControl id="objetivo">
                            <FormLabel>Objetivo</FormLabel>
                            <Select
                              height="30px"
                              fontSize="14px"
                              rounded="25px" 
                              border="0px" 
                              background="white" 
                              color="black"
                              border="2px solid white" 
                              type="email" 
                              _focus={{
                                background: "white",
                                color: "black",
                                border:"2px solid #b0ff29" 
                              }}
                              placeholder="Selecionar">
                              <option>Perder peso</option>
                              <option>Manter peso</option>
                              <option>Ganhar peso</option>
                            </Select>
                          </FormControl>
                          
                          <Stack spacing={10}>

                            <Center>
                              <Text fontSize="15px" color="#b0ff29">{mensagem1}</Text>
                            </Center>
                            <Botao5
                              color="#b0ff29" 
                              texto="Finalizar"
                              isLoading={isLoading}
                              //end="/dashboard"
                              onClick={() => postuserdata()}
                            ></Botao5>
                          </Stack>
                        </Stack>
                      </Box>
                    </Stack>
                  </Flex>
                </Flex>
              </Box>
      ]
    }
  }


  