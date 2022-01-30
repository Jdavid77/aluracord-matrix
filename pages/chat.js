import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import Loader from '../src/components/loader';
import { SendSticker } from '../src/components/SendSticker';


// optional

const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzI4NDExMSwiZXhwIjoxOTU4ODYwMTExfQ.IS8j-2rrp2WeHHJ-nGfQZsA16-xHvsDoeu3rVsHTOj8"
const SUPABASE_URL = "https://xfhwynzgnefoklidolvr.supabase.co"
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);



function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}


function EscutaMensagensEmTempoReal(adicionaMensagem) {
    return supabaseClient
    .from('mensagens')
    .on('INSERT',(respostaLive) => {
        adicionaMensagem(respostaLive.new)
        console.log('Houve uma nova mensagem')
    })
    .subscribe()
}

export default function PaginaDoChat() {

    const [mensagem, setMensagem] = React.useState('')
    const [listaMensagens, setListaMensagens] = React.useState([])
    const roteamento = useRouter();
    const usuarioLogado = roteamento.query.username;
    const [loader, setLoader] = React.useState(false);



    React.useEffect(() => {
        supabaseClient
            .from("mensagens")
            .select("*")
            .order("id", { ascending: false })
            .then((dados) => {
                console.log("Dados da consulta ", dados)
                setListaMensagens(dados.data)
            });
            EscutaMensagensEmTempoReal((novaMensagem) => {
                console.log(novaMensagem)
                //handleNovaMensagem(novaMensagem)
                setListaMensagens((valorAtualDaLista) => {
                    return [
                        novaMensagem,
                        ...valorAtualDaLista,
                    ]
                });
                
            });
        setTimeout(() => {
            setLoader(true)
        }, 2000)
    }, [])



    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            //id: listaMensagens.length + 1,
            de: `${usuarioLogado}`,
            texto: novaMensagem

        };

        supabaseClient
            .from("mensagens")
            .insert([mensagem])
            .then(({ data }) => {
                console.log("Criando mensagem : ", data)

                /*setListaMensagens([
                    novaMensagem,
                    ...listaMensagens,
                ]);*/

            });
        setMensagem("");
    }




    function MessageList(props) {
        console.log('MessageList', props);
        return (

            <Box
                tag="ul"
                styleSheet={{
                    overflow: 'scroll',
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    flex: 1,
                    color: appConfig.theme.colors.neutrals["000"],
                    marginBottom: '16px',

                }}
            >
                {props.mensagens.map((mensagem) => {
                    return (mensagem.de === usuarioLogado) ? (


                        <Text
                            key={mensagem.id}
                            tag="li"
                            styleSheet={{
                                alignSelf: 'flex-end',
                                borderRadius: '5px',
                                padding: '6px',
                                marginBottom: '12px',
                                hover: {
                                    backgroundColor: appConfig.theme.colors.neutrals[900],
                                }
                            }}
                        >
                            <Box
                                styleSheet={{
                                    marginBottom: '8px',
                                }}
                            >


                                <Image
                                    styleSheet={{
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '50%',
                                        display: 'inline-block',
                                        marginRight: '8px',
                                        //hover: <Hover de={mensagem.de}></Hover>
                                    }}
                                    src={`https://github.com/${mensagem.de}.png`}

                                />



                                <Text tag="strong">
                                    {mensagem.de}
                                </Text>
                                <Text
                                    styleSheet={{
                                        fontSize: '10px',
                                        marginLeft: '8px',
                                        color: appConfig.theme.colors.neutrals[300],
                                    }}
                                    tag="span"
                                >
                                    {(new Date().toLocaleDateString())}
                                </Text>
                                <button className="close-btn-chat-others" onClick={() => {
                                    const mensagens = props.mensagens.filter(x => x.id !== mensagem.id)
                                    setListaMensagens([...mensagens]);
                                    supabaseClient
                                        .from("mensagens")
                                        .delete()
                                        .match({ id: mensagem.id })
                                        .then(response => {
                                            console.log(response)
                                        })
                                }}>X</button>
                            </Box>
                            {mensagem.texto.startsWith(':sticker:')
                            
                                ? (
                                    <Image src={mensagem.texto.replace(':sticker:', '')} />
                                    
                                ) : 
                                (
                                    mensagem.texto
                                )}
                        </Text>

                    ) : (
                        <Text
                            key={mensagem.id}
                            tag="li"
                            styleSheet={{

                                borderRadius: '5px',
                                padding: '6px',
                                marginBottom: '12px',
                                hover: {
                                    backgroundColor: appConfig.theme.colors.neutrals[900],
                                }
                            }}
                        >
                            <Box
                                styleSheet={{
                                    marginBottom: '8px',

                                }}
                            >


                                <Image
                                    styleSheet={{
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '50%',
                                        display: 'inline-block',
                                        marginRight: '8px',
                                        //hover: <Hover de={mensagem.de}></Hover>
                                    }}
                                    src={`https://github.com/${mensagem.de}.png`}

                                />



                                <Text tag="strong">
                                    {mensagem.de}
                                </Text>
                                <Text
                                    styleSheet={{
                                        fontSize: '10px',
                                        marginLeft: '8px',
                                        color: appConfig.theme.colors.neutrals[300],
                                    }}
                                    tag="span"
                                >
                                    {(new Date().toLocaleDateString())}
                                </Text>
                                {/*<button className="close-btn-chat-others" onClick={() => {
                                    const mensagens = props.mensagens.filter(x => x.id !== mensagem.id)
                                    setListaMensagens([...mensagens]);
                                    supabaseClient
                                        .from("mensagens")
                                        .delete()
                                        .match({ id: mensagem.id })
                                        .then(response => {
                                            console.log(response)
                                        })
                                }}>X</button>*/}
                            </Box>
                            {mensagem.texto.startsWith(':sticker:')
                            
                                ? (
                                    <Image src={mensagem.texto.replace(':sticker:', '')} />
                                    
                                ) : 
                                (
                                    mensagem.texto
                                )}
                        </Text>
                    )

                })}


            </Box>
        )
    }

    return (

        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.neutrals[300],
                backgroundImage: `url(https://images7.alphacoders.com/112/thumb-1920-1122406.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000'],
                boxShadow: `inset 0px 0px 50px 30px ${appConfig.theme.colors.neutrals[999]}`
            }}
        >

            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: "rgba(0,0,0,0.5)",
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                    boxShadow: `0px 0px 10px 3px  ${appConfig.theme.colors.primary[1000]}`,

                }}
            >
                {loader ? (
                    <>
                        <Header />
                        <Box
                            styleSheet={{
                                position: 'relative',
                                display: 'flex',
                                flex: 1,
                                height: '80%',
                                backgroundColor: "rgba(146, 20, 12, 0.4)",
                                flexDirection: 'column',
                                borderRadius: '5px',
                                padding: '16px',
                            }}
                        >

                            <MessageList mensagens={listaMensagens} />

                            <Box
                                as="form"
                                styleSheet={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <TextField
                                    value={mensagem}
                                    onChange={event => {
                                        setMensagem(event.target.value)
                                    }}
                                    onKeyPress={(event) => {
                                        if (event.key === "Enter") {
                                            event.preventDefault
                                            handleNovaMensagem(mensagem)

                                        }
                                    }}
                                    placeholder="Insira sua mensagem aqui..."
                                    type="textarea"
                                    styleSheet={{
                                        width: '100%',
                                        border: '0',
                                        resize: 'none',
                                        borderRadius: '5px',
                                        padding: '6px 8px',
                                        backgroundColor: appConfig.theme.colors.neutrals[800],
                                        marginRight: '12px',
                                        color: appConfig.theme.colors.neutrals[200],
                                    }}
                                />
                                <SendSticker onStickerClick={(sticker) => {
                                    console.log(sticker)
                                    handleNovaMensagem(':sticker:' + sticker)
                                }}/>
                                <Button iconName="arrowRight"
                                    styleSheet={{
                                        //borderRadius: "20%",
                                        marginBottom: "10px",
                                        backgroundColor: "black"
                                    }}
                                    onClick={() => {
                                        handleNovaMensagem(mensagem)
                                    }}>

                                </Button>
                            </Box>
                        </Box>
                    </>

                ) : (<Loader></Loader>)}

            </Box>
        </Box>
    )
}