import { homePageView } from "../view/home_page.js";
import { PlayHistoryPageView } from "../view/playhistory_page.js";
import { signOutFirebase } from "./firebase_auth.js";
import { routePathnames } from "./route_controller.js";

export function onClickHomeMenu(e)
{
    history.pushState(null, null, routePathnames.HOME);
    homePageView();

}

export function onClickPlayHistory(e)
{
    history.pushState(null, null, routePathnames.PLAYHISTORY);
    PlayHistoryPageView();

}


export async function onClickSignOutMenu(e)
{
    await signOutFirebase(e);
}