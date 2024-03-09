import { root } from "./elements.js";
import { currentUser } from "../controller/firebase_auth.js";
import { erasePlayHistory, displayAll } from "../controller/firestore_controller.js";
import { protectedView } from "./protected_view.js";
import { DEV } from "../model/constants.js";

export  async function Ph_PageView()
{
    if(!currentUser)
    {
        root.innerHTML=await protectedView();
        return;
    }

    const response = await fetch('/view/templates/playhistory_page_template.html',
    {cache:'no-store'});
    const divWrapper =document.createElement('div');
    divWrapper.innerHTML=await response.text();
    divWrapper.classList.add('m-4', 'p-4');
    root.innerHTML='';
    root.appendChild(divWrapper);

    let erase = document.getElementById('erase');
    erase.onclick = eraseHistory;

    let playRecords;
    try{
        playRecords = await displayAll(currentUser.email);
    
    }catch(e)
    {
        if (DEV) console.log('Failed to getAllPlayRecords', e);
        alert(`Failed to get play records: ${JSON.stringify(e)}`);
    }

    const tbody = divWrapper.querySelector('tbody');
    if(playRecords.length == 0)
    {
        tbody.innerHTML=`
        <tr>
            <td colspan="6" class="text-center fs-3">No play records found!</td>
        </tr>
        `;
    }else
    {
    playRecords.forEach((record, pos) =>tbody.appendChild(displayPlayHistory(record, pos+1)));
    }

}


function displayPlayHistory(record, pos)
{
 const tr= document.createElement('tr');
 tr.innerHTML=`
    <td>
        ${pos}
    </td>
    <td>
        ${record.bet}
    </td>
    <td>
        ${record.won}
    </td>
    <td>
        ${record.balance}
    </td>
    <td>
        ${new Date(record.timestamp).toLocaleString()}
    </td>
 `;
    ;
 return tr; 
}

export async function eraseHistory(){
    erasePlayHistory(currentUser.email);
    Ph_PageView();
}