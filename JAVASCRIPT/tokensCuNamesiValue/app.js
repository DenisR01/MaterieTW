function textProcessor(input, tokens){
    if(typeof input!=='string'){
        throw new Error("Input should be a string");
    }
    if(input.length<6){
        throw new Error("Input should have at least 6 characters");
    }
    if(!tokens || !Array.isArray(tokens)){
        throw new Error ("Invalid array format");
    }
    for(let i=0;i<tokens.length;i++){
        if(typeof(tokens[i].tokenName)!=="string" ||typeof(tokens[i].tokenValue)!=="string")
        {  throw new Error ("Invalid array format");
        }   
    }
    let k=0;
    for(let i=0;i<tokens.length;i++){
    if(!input.includes(tokens[i].tokenName)) {
       k++;
      }
    }
    if(k==tokens.length)
    return input;
   
    for(let i=0;i<tokens.length;i++){
        var t= "${"+ e.tokenName + "}";
        if(input.includes()) {
            input=input.replace(tokens[i].tokenName , tokens[i].tokenValue);
        }
    }
    

}

const app = {
    textProcessor: textProcessor
};

module.exports = app;