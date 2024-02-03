import { root } from "./elements.js";
import { currentUser } from "../controller/firebase_auth.js";
export async function Menu2PageView()
{
    if(!currentUser)
    {
        root.innerHTML = await protectedView();
        return;
    }
    root.innerHTML = '<h1>Menu2 Page</h1>';
}