import React from 'react';
import { FaRegCheckCircle } from 'react-icons/fa';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import { useHistory } from 'react-router-dom';

const CadastroFinalizado: React.FC = () => {
    const { push } = useHistory()
    return (
        <div style={{ display: "flex",position:"relative", fontFamily: "Montserrat", fontSize: 40, fontWeight: "bolder", height: "100%", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "#FFF" }}>
            <FaRegCheckCircle color="#FFF" style={{ marginBottom: 20 }} size={60} />
            Cadastro realizado com sucesso!!!
            <div onClick={()=>push("")} style={{display:"flex",position:"absolute",bottom:0,alignItems:"center",cursor:"pointer",color:"#FF7B47",flexDirection:"row",fontFamily:"Poppins",fontSize:26,fontWeight:"bolder"}}>
                <HiOutlineArrowNarrowLeft color="#FF7B47" style={{marginRight:10}} size={30}/>
                Voltar para Home
            </div>
        </div>
    )
}

export default CadastroFinalizado