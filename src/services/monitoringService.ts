// @ts-ignore
import * as watchr from 'watchr'
// @ts-ignore
import Listener from "../monitoring/fileUtils";
// @ts-ignore
import Next from "../monitoring/errorHandler";
import * as fs from "fs";

class MonitoringService{
    public static start(path: string) {
        if (!fs.existsSync(path)){
            fs.mkdirSync(path);
        }
        watchr.open(path, Listener, Next)
    }

    public static stop(){
        watchr.close()
    }
}

export default MonitoringService