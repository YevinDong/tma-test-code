import { postEvent, on, retrieveLaunchParams, isTMA } from '@tma.js/sdk';
import { type Btns } from './types'
export function initTma(): Btns[] {
    isTMA().then(is_tma => {
        if (is_tma) {
            postEvent("web_app_ready")
            postEvent("web_app_setup_closing_behavior", { need_confirmation: true })
            postEvent("web_app_expand")
            postEvent("web_app_trigger_haptic_feedback", { type: "impact", impact_style: "medium" })
        }
    })

    const btns: Btns[] = [];
    function add2btns(params: Btns) {
        btns.push(params)
    }
    add2btns({
        className: "primary",
        text: "get_tma_init_data",
        cb: () => {
            console.log(retrieveLaunchParams());
        }
    })
    add2btns({
        className: "primary",
        text: "get_tma_url_params",
        cb: () => {
            const hash = window.location.hash.slice(1);
            console.log(hash);
            const params = new URLSearchParams(hash);
            console.log(params);
        }
    })
    add2btns({
        className: "primary",
        text: "web_app_close",
        cb: () => {
            postEvent("web_app_close")
        }
    })
    add2btns({
        className: "primary",
        text: "web_app_expand",
        cb: () => {
            postEvent("web_app_expand")
        }
    })
    add2btns({
        className: "primary",
        text: "web_app_biometry_request_access",
        cb: () => {
            const res = postEvent("web_app_biometry_request_access", { reason: "test web_app_biometry_request_access" })
            console.log(res);
        }
    })
    on("web_app_biometry_request_access" as any, (payload) => {
        console.log("web_app_biometry_request_access", payload);
    })
    add2btns({
        className: "primary",
        text: "web_app_open_tg_link",
        cb: () => {
            postEvent("web_app_open_tg_link", { path_full: "/cassavanetwork/1" })
        }
    })
    add2btns({
        className: "primary",
        text: "web_app_request_phone",
        cb: () => {
            postEvent("web_app_request_phone")
        }
    })
    add2btns({
        className: "primary",
        text: "web_app_open_scan_qr_popup",
        cb: () => {
            postEvent("web_app_open_scan_qr_popup" as any)
        }
    })

    on("qr_text_received", (payload) => {
        console.log("qr_text_received", payload);
        postEvent("web_app_close_scan_qr_popup")
    })


    return btns;
}