import { Box, Button, Text, TextField, Image } from "@skynexui/components"
import React from "react";
import { useRouter } from "next/router"
import appConfig from "../config.json"
import Slide from "@mui/material/Slide";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";




function PopUp(props) {
  const username = props.username
  return (props.trigger) ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}>X</button>
        <Image height="150px" width="150px" src={props.pfp}
          styleSheet={{
            borderRadius: "50%"
          }}></Image>
        <p>Nome : {props.name}</p>
        <p>Bio : {props.bio}</p>
        <p>Localização : {props.location}</p>
        <p>Seguidores : {props.followers}</p>
        <a href={`https://github.com/${username}`}>Visitar</a>
      </div>
    </div>

  ) : "";
}


function Titulo(props) {
  const Tag = props.tag || "h1";
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`           
            ${Tag} {
             color : white;
             font-size : 24px;
             font-weight : 600;
             text-shadow : 2px 2px ${appConfig.theme.colors.primary[1000]};
             
             }`}
      </style>
    </>
  );

}

/*function ButtonSpecial(props) {

  const icon = "<ImageNext src='/shariganpng.png' height='25px' width='25px' />"
  return (
    <>
    <div className="sharingan">
      <button ><Image 
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Mangekyou_Sharingan_Kakashi.svg/640px-Mangekyou_Sharingan_Kakashi.svg.png" /></button>
    </div>
    </>
  )
}*/



/*function HomePage() {
    return (
        <div>
            <GlobalStyle />
            <Titulo tag="h2">Bem-vindo de volta!!</Titulo>
            <h2>Discord - Alura Matrix</h2>
        </div>
    )
}

export default HomePage*/

export default function PaginaInicial() {
  //const username = 'Jdavid77';

  const [username, setUsername] = React.useState('Jdavid77')
  const roteamento = useRouter();
  const [popup, setpopup] = React.useState(false)

  const [name, setName] = React.useState("");
  const [followers, setFollowers] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  React.useEffect(() => {
    const dados = fetch(`https://api.github.com/users/${username}`)
      .then(function (response) {
        return response.json();
      }).then(function (responseConverted) {
        setName(responseConverted.name);
        setFollowers(responseConverted.followers);
        setLocation(responseConverted.location);
        setBio(responseConverted.bio);
      })

  }, [handleChange])

  const slider = (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => handleChange()}>X</button>
        <Image height="150px" width="150px" src={`https://github.com/${username}.png`}
          styleSheet={{
            borderRadius: "50%"
          }}></Image>
        <p>Nome : {name}</p>
        <p>Bio : {bio}</p>
        <p>Localização : {location}</p>
        <p>Seguidores : {followers}</p>
        <a href={`https://github.com/${username}`}>Visitar</a>
      </div>
    </div>
  )

  


  return (
    <>

      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.neutrals[300],
          backgroundImage: 'url(https://images7.alphacoders.com/112/thumb-1920-1122406.jpg)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
          boxShadow: `inset 0px 0px 50px 30px ${appConfig.theme.colors.neutrals[999]}`
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '20px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: 'rgba(0,0,0,0.5)',
            border: `solid 1px ${appConfig.theme.colors.primary[1000]}`,
            boxShadow: `0px 0px 10px 3px  ${appConfig.theme.colors.primary[1000]}`

          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={function handler(event) {

              if (username.length > 2) {
                event.preventDefault();
                console.log("Alguém submeteu o form!!")
                roteamento.push(`/chat?username=${username}`)
              }

            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Titulo tag="h2">Boas vindas de volta!</Titulo>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
              {appConfig.name}
            </Text>

            <TextField
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[1000],
                  backgroundColor: "rgba(255,255,255,0.5)"//appConfig.theme.colors.neutrals[800],
                },
              }}
              onChange={function handler(event) {
                setUsername(event.target.value);
              }}
              value={`${username}`}
              required
            />
            <Button
              type='submit'
              label='Entrar'
              //iconName="arrowRight
              //variant="primary"
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[1000],
                mainColorLight: appConfig.theme.colors.primary[1100],
                mainColorStrong: appConfig.theme.colors.primary[1100],
              }}
            />
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: "rgba(146, 20, 12, 0.4)",//appConfig.theme.colors.neutrals[800],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: '20px',
              flex: 1,
              minHeight: '240px',
              //border: `solid 1px ${appConfig.theme.colors.primary[1000]}`
              boxShadow: '0px 0px 10px 3px rgba(255,255,255,0.5)'
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}

              src={username.length > 2 ? `https://github.com/${username}.png` : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Mangekyou_Sharingan_Kakashi.svg/2048px-Mangekyou_Sharingan_Kakashi.svg.png"


                //`https://github.com/${username}.png`
              }
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                borderRadius: '1000px'
              }}
            >
              {username.length > 2 ? username : "Usuário Inválido!"}

            </Text>
            <br />
            {username.length > 2 ? (

              <>
                <FormControlLabel
                  control={<Switch color="warning" checked={checked} onChange={handleChange} />}
                  label="Info"
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    
                  }}
                />
                <Slide direction="left" in={checked} mountOnEnter unmountOnExit>
                  {slider}
                </Slide>
              </>

              //<div className="sharingan">
              // <button onClick={function handler() { setpopup(true)}}><Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Mangekyou_Sharingan_Kakashi.svg/640px-Mangekyou_Sharingan_Kakashi.svg.png" /></button>
              // {/*<PopUp trigger={popup}></PopUp>*/}
              //</div>
            ) : ""}

          </Box>
          {/* Photo Area */}


        </Box>
      </Box>
      
    </>
  );
}