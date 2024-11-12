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

    const delayPara = (index, nextWord) => {
        setTimeout(function(){
            setResultData(prev => prev+ nextWord)
        }, 75*index)
    }

    const onSent = async (input) => {

        setResultData("")
        setLoading(true)
        setShowResult(true)
        setRecentPrompt(input)
        const response = await run(input)
        let responseArray = response.split("**")
        let newResponse ;

        /* every even elements of the array will be the string before 
         starting ** and every odd elements of the array will be the string before
         the ending ** 
         that means every odd position strings will be the one which are enclosed
         in bold tag  */
        for(let i =0 ; i< responseArray.length ; i++){

            if(i%2 === 0){
                newResponse += responseArray[i]
            }else{
                newResponse += "<b>"+responseArray[i]+"</b>"
            }
        }

        // logic for breaking the sentence for new line (finding * symbol)
        let newResponse2 = newResponse.split("*").join("<br>")
        

        // below is the logic for typing effect
        let newResponseArray = newResponse2.split(" ");
        for(let i = 0 ; i< newResponseArray.length ; i++){
            let nextWord = newResponseArray[i]
            delayPara(i, nextWord + " ")
        }

        setLoading(false)
        setInput("")
        
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