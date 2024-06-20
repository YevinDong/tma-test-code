import { Buffer } from "buffer"
import eruda from "eruda";

export function initEnv() {
    eruda.init();
    (window as any).Buffer = Buffer;
}