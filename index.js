const input=document.getElementById('input')

const reset=document.getElementById('reset')

const numberButton=document.querySelectorAll('.number-button')
const operatorButton=document.querySelectorAll('.operator-button')

const enter=document.getElementById('enter')

const back=document.getElementById('back')
const decimal=document.getElementById('decimal')

let currentNumber=[];

let operatorStack=[];
let outputStack=[];

let isActive=false

const operationOrder={
    '^':3,
    '*':2,
    '/':2,
    '+':1,
    '-':1
}

numberButton.forEach(button=>{
    const buttonValue = button.getAttribute('data-number');
    button.addEventListener('click',()=>{

        currentNumber.push(buttonValue)
        input.value+=buttonValue

    })
})

operatorButton.forEach(button=>{
    const operator = button.getAttribute('data-type');

    button.addEventListener('click',()=>{
        if(currentNumber.length>0){
            outputStack.push(currentNumber.join(''))
            currentNumber=[]
        }
        
        let top=operatorStack[operatorStack.length-1]

        let topPrecedence=operationOrder[top]
        let currentPrecedence=operationOrder[operator]

        while(operatorStack.length>0 && topPrecedence>=currentPrecedence){
            outputStack.push(operatorStack.pop())
        }

        operatorStack.push(operator)
        input.value+=operator

    })
})

enter.addEventListener('click',()=>{
        if(currentNumber.length>0){
            outputStack.push(currentNumber.join(''))
            currentNumber=[]
        }
         while (operatorStack.length > 0) {
        outputStack.push(operatorStack.pop());
    }
    let expression=[];

    outputStack.forEach(token=>{
        if(!isNaN(token)){
            expression.push(token)
        }else{
            const sn=expression.pop();
            const fn=expression.pop();
            const result=calculation(fn,sn,token)
            expression.push(result)
        }
    })
    input.value=expression[0]
    isActive=true
    
})

function calculation(fn,sn,op){
    fn = parseFloat(fn);
    sn = parseFloat(sn);
    let result;
    if(op==='+'){
        result=fn+sn
    }
        if(op==='-'){
        result=fn-sn
    }
        if(op==='*'){
        result=fn*sn
    }
        if(op==='/'){
        result=fn/sn
    }
    return result;
}

back.addEventListener('click',()=>{

    if(isActive) return
    if(currentNumber.length>0){
        currentNumber.pop()
        input.value=input.value.slice(0,-1)
    }else if(operatorStack.length>0){
        operatorStack.pop();
        input.value = input.value.slice(0, -1);
    }else if(outputStack.length>0){
        let lastNumber=outputStack.pop()
        currentNumber = lastNumber.toString().split('').slice(0, -1);
        input.value = input.value.slice(0, -1);
    }

})

decimal.addEventListener('click', () => {
    if (!currentNumber.includes('.')) {
        currentNumber.push('.');
        input.value += '.';
    }
});

reset.addEventListener('click',()=>{
    input.value=''
    currentNumber=[];
    operatorStack=[];
    outputStack=[];
})

