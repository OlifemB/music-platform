import {useAppDispatch} from "@/hooks/useAppDispatch";
import {bindActionCreators} from "redux";
import {useDispatch} from "react-redux";
import {AnyAction} from "@reduxjs/toolkit";
// import Actions from '@/store/slices'

const useActions = (actions: AnyAction) => {
    const dispatch = useAppDispatch()

    return bindActionCreators({...actions}, dispatch)
};

export default useActions;