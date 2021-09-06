const webStyles = {
    body:{
        position:'fixed',
        padding:0,
        margin:0,
        top:0,
        left:0,
        width: '100%',
        height: '100%',
        display: "flex", 
        flexDirection: "row"
    },
    leftColumn:{width:'35%',  backgroundColor:"#D7D7D6"},
    rightColumn:{width: '65%',backgroundColor:'#292928',display:'flex', height:'100%' ,justifyContent:'center',alignItems:'center'},
    formContainer:{display:'flex', height:'100%' ,justifyContent:'center',alignItems:'center'},
    form:{ display: "flex", flexDirection: 'column', width:'65%'},
    forgotPassword:{backgroundColor:"#D7D7D6",borderStyle:'none', color:'blue', textDecorationLine: 'underline', textAlign:'left', fontSize:11},
    formCode:{ display: "flex", flexDirection: 'column', width:'100%'},
    input: {
        backgroundColor: "#D7D7D6",
        borderRadius: 5,
        padding: 3,
    },
    label:{
        marginBottom:5,
        fontWeight:'bold'
    },
    button1:{
        marginTop:20, 
        borderRadius:5, 
        height:27,
        backgroundColor:'#3399FF',
        border:0,
        color:'#FFFFFF',
        fontWeight:'bold',
        height:40,
    },
    button1Hover:{
        marginTop:20, 
        borderRadius:5, 
        height:27,
        border:0,
        color:'#FFFFFF',
        fontWeight:'bold',
        height:40,
        backgroundColor:'#005CB8',
    },
    button2:{
        
        borderRadius:5, 
        height:27,
        backgroundColor:'#FFFFFF',
        border:0,
        color:'#3399FF',
        fontWeight:'bold',
        height:40,
    },
    button2Hover:{
        
        borderRadius:5, 
        height:27,
        border:0,
        color:'#3399FF',
        fontWeight:'bold',
        height:40,
        backgroundColor:'#AAAAAA',
    },
    line:{
        marginTop: 40,
        marginBottom:40,
        backgroundColor:'#292928', 
        height:3, 
        borderRadius:10, 
        width:'120%', 
        position:'relative', 
        left:'-10%'
    },
    logo:{width:280, height:200},
}

export default webStyles;