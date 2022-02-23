const cargarTipos = async()=>{
    try{
        const url = "https://nr-proxy.cloudno.de/http://201.140.116.237/services/tipo.php"
        await axios 
        .get(url)
        .then((res)=>{
            llenarcombos(res.data)
        })
        .catch((err)=>{
            console.log("Hubo un error en la peticion" +err);
            return false;
        })
    }catch{console.log("Surgio un error"); return false;}
    return true;
}
function llenarcombos(data){
    for(let item of data){
        document.getElementById('tipo').innerHTML += `
        <option value ="${item.tipo}">${item.descripcion}</option>
        `
    }
    document.getElementById('tipo').innerHTML+=`
    </select>
    `
};
const cargarVentas=async()=>{
    try{
     url = "https://nr-proxy.cloudno.de/201.140.116.237/services/ventas.php"
    await axios 
    .get(url)
    .then((res)=>{
        dibujarTabla(res.data);
    })
    .catch((err)=>{
        console.log("Hubo un error en la peticion" +err);
        
    })
}catch{console.log("Surgio un error")}
}
function dibujarTabla(data){
let tipo = document.getElementById("tipo").value;
document.getElementById("ventas").innerHTML=`
        <tr id="tab">
            <th>Folio</th>
            <th>Tipo</th>
            <th>Precio</th>
            <th>Descuento</th>
            <th>Total</th>
            <th>Fecha Pago</th>
            <th >Giro</th>
        </tr>`
for(let item of data){
    if(item.tipo == tipo){
        document.getElementById("ventas").innerHTML+=`
      
        <tr>
        <td class="rt">${item.folio}</td>
        <td class="rt">${item.tipo}</td>
        <td class="rt">${item.precio}</td>
        <td class="rt">${item.descuento}</td>
        <td class="rt">${item.total}</td>
        <td class="rt">${item.fechapago}</td>
        <td class="rt">${item.giro}</td>
    </tr>
        `
    }
}
}



const inicia=async()=>{
    if(await cargarTipos() == true){
        cargarVentas();
    }
    document.getElementById("tipo").addEventListener("change",async()=>{
    cargarVentas();
});
    
}

inicia();
