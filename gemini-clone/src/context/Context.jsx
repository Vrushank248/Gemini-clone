import { createContext, useState } from "react";
import run from "../config/gemini";

// step1: create Context
export const Context = createContext();

// this is a user defined function
const ContextProvider = (props) => {

    const [input,setInput] = useState(""); // to store the input from input box
    const [recentPrompt, setRecentPrompt] = useState(""); // it stores the input data after clicking send button and display it in main component
    const [prevPrompts, setPrevPrompts] = useState([]); // to store all the conversation history
    const [showResult, setShowResult] = useState(false); // if true hide the greet and cards, to show the result
    const [loading, setLoading] = useState(false); // if true, displays loading animation and false while displaying result
    const [resultData, setResultData] = useState(""); // to display the result


    const onSent = async (input) => {
        await run(input)
    }

    const contextValue = {
        // passed the state variables in this , so that we can use it in other components
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
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