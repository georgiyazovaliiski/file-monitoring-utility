// @ts-ignore
import * as watchr from 'watchr'
// @ts-ignore
import Listener from "../monitoring/fileUtils";
// @ts-ignore
import Next from "../monitoring/errorHandler";

class MonitoringService{
    public static start(path: string) {
        watchr.open(path, Listener, Next)
    }

    public static stop(){
        watchr.close()
    }
}

export default MonitoringService