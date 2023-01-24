import {playerActions} from "@/store/slices/playerSlice";
import {trackActions} from "@/store/slices/trackSlice"


export default {
    ...playerActions,
    ...trackActions
}