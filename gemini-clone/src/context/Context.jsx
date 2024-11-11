import { createContext } from "react";
import run from "../config/gemini";

// step1: create Context
export const Context = createContext();

// this is a user defined function
const ContextProvider = (props) => {


    const onSent = async (prompt) => {
        await run(prompt)
    }
    prompt = "What is Next js"
    onSent(prompt)
    const contextValue = {

    }


    return(

        // step2: wrap all the child inside a provider
        // step3: pass the value as passed below
        <Context.Provider value={contextValue}> 
            {props.children}
        </Context.Provider>
    )

}
// step4: the consumer can consume the passed value using this function
// because it is exported
export default ContextProvider