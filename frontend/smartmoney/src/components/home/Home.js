import React from 'react';
import {useState} from 'react';

const Home = () => {

  const [buttomLogoutHover, setbuttomLogoutHover] = useState(false);

  function logout() {
    window.location.href = "./"
  }

  function styleButtonLogout(){
    if(buttomLogoutHover){
        return styles.buttomLogoutHover;
    }else{
        return styles.buttomLogout;
    }
  }

  return (
    <div style={{
        position:'fixed',
        padding:0,
        margin:0,
        top:0,
        left:0,
        width: '100%',
        height: '100%',
        display: "flex", 
        flexDirection: "row"}}>
      <div style={{width:'35%',  backgroundColor:"#D7D7D6", display:'flex',flexDirection:'column', alignItems:'center'}}>
        <p>Hola "NOMBRE"</p>
        <button 
          onMouseEnter={()=>{setbuttomLogoutHover(true);}} 
          onMouseLeave={()=>{setbuttomLogoutHover(false);}} 
          style={styleButtonLogout()}  
          type="button" 
          onClick={logout} 
          >Cerar sesión</button>
      </div>
      <div style={{width: '65%',backgroundColor:'#292928',display:'flex', height:'100%' ,justifyContent:'center',alignItems:'center'}}>
      </div>
    </div>
  );
}

const styles = {
  buttomLogout:{
    position: 'absolute',
    bottom:20,
    width:'20%',
    marginTop:20, 
    borderRadius:5, 
    height:27,
    backgroundColor:'#3399FF',
    border:0,
    color:'#FFFFFF',
    fontWeight:'bold',
    height:40,
  },
  buttomLogoutHover:{
    position: 'absolute',
    bottom:20,
    width:'20%',
    marginTop:20, 
    borderRadius:5, 
    height:27,
    border:0,
    color:'#FFFFFF',
    fontWeight:'bold',
    height:40,
    backgroundColor:'#005CB8',
  },
}

export default Home;
