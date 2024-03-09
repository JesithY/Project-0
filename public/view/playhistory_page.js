import { root } from "./elements.js";
import { currentUser } from "../controller/firebase_auth.js";
import { getAllPlayRecords } from "../controller/firestore_controller.js";
import { protectedView } from "./protected_view.js";
import { DEV } from "../model/constants.js";

export  async function PlayHistoryPageView()
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

    let playRecords;
    try{
        playRecords = await getAllPlayRecords(currentUser.email);
    
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
    playRecords.forEach(record =>tbody.appendChild(buildOnePlayRecordView(record)));
    }

}

function buildOnePlayRecordView(record)
{
 let i = 1;
 const tr= document.createElement('tr');
 tr.innerHTML=`
    <td>
        ${i}
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