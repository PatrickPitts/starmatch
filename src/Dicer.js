import React from 'react';
import './App.css';

const useDiceState = () => {

    const [diceMessage, setDiceMessage] = React.useState('');
    const [score, setScore] = React.useState(0);
    const [dieCount, setDieCount] = React.useState({
        'd4': 0, 'd6': 0, 'd8': 0, 'd10': 0, 'd12': 0, 'd20': 0, '': 0,
    });

    const updateScore = () => {
        setScore(utils.rollAllDie(dieCount))
    };
    const updateDieCount = (die, value) => {
        let temp = dieCount;
        switch(die){
            case 'd4':
                temp['d4'] = value;
                setDieCount(temp);
                break;
            case 'd6':
                temp['d6'] = value;
                setDieCount(temp);
                break;
            case 'd8':
                temp['d8'] = value;
                setDieCount(temp);
                break;
            case 'd10':
                temp['d10'] = value;
                setDieCount(temp);
                break;
            case 'd12':
                temp['d12'] = value;
                setDieCount(temp);
                break;
            case 'd20':
                temp['d20'] = value;
                setDieCount(temp);
                break;
            case '':
                temp[''] = value;
                setDieCount(temp);
                break;
            default:
                break;
        }
        let msg = '';
        for(const [key, val] of Object.entries(dieCount)){

            if(val > 0){msg += val +' '+key+' +'}
        }
        if(msg.length > 2){msg = msg.substr(0, msg.length-2)}
        setDiceMessage(msg);
    };


    return [setDiceMessage, setScore, setDieCount, dieCount, updateDieCount, diceMessage, updateScore, score];
};

const Roller = (props) => {

    return (<button className='rollDiceButton' onClick={props.onClick}>Roll</button>);
};

const DieCounter = (props) => {

    const handleChange = (e) => {props.onChange(props.die, e.target.value)};
    return (<input
        onChange={handleChange}
        type="number"
        id="quantity"
        name="quantity"
        min={0}
        max={30}/>);
};

const DiePanel = (props) => {
    const handleClick = num => useDiceState.addDie(num);
    return (
        <table>
            <tbody>
            <tr>
                <td><DieCounter key={'d4'} die={'d4'} onChange={props.onDieCounterChange}/> d4 +</td>
                <td><DieCounter key={'d6'} die={'d6'} onChange={props.onDieCounterChange}/> d6 +</td>
                <td><DieCounter key={'d8'} die={'d8'} onChange={props.onDieCounterChange}/> d8 +</td>
                <td><DieCounter key={'d10'} die={'d10'} onChange={props.onDieCounterChange}/> d10 +</td>
                <td><DieCounter key={'d12'} die={'d12'} onChange={props.onDieCounterChange}/> d12 +</td>
                <td><DieCounter key={'d20'} die={'d20'} onChange={props.onDieCounterChange}/> d20 +</td>
                <td><DieCounter key={''} die={''} onChange={props.onDieCounterChange}/> (Bonus)</td>
                <td><TotalDieDisplay msg={props.msg}/></td>
            </tr>
            </tbody>
        </table>
    )
};

const ScoreDisplay = props =>(
    <div className='score-display'>{props.msg}</div>
);

const TotalDieDisplay = (props) => (
    <div>= {props.msg}</div>
);
const App = () => {
    const [setDiceMessage, setScore, setDieCount, dieCount, updateDieCount, diceMessage, updateScore, score] = useDiceState();

    return (<div>

        <DiePanel onDieCounterChange={updateDieCount} msg={diceMessage}/>
        <Roller onClick={updateScore}/>
        <ScoreDisplay msg={score}/>
    </div>);
};

const utils = {

    randomInt: (max) => Math.floor((Math.random() * (max)) + 1),
    range: (min, max) => Array.from({length: max - min + 1}, (_, i) => min + i),
    rollAllDie: (diceValues) => {
        let total = Number(0) + Number(diceValues['']);
        for(let i = 0; i < diceValues['d4']; i++){total += utils.randomInt(4)}
        for(let i = 0; i < diceValues['d6']; i++){total += utils.randomInt(6)}
        for(let i = 0; i < diceValues['d8']; i++){total += utils.randomInt(8)}
        for(let i = 0; i < diceValues['d10']; i++){total += utils.randomInt(10)}
        for(let i = 0; i < diceValues['d12']; i++){total += utils.randomInt(12)}
        for(let i = 0; i < diceValues['d20']; i++){total += utils.randomInt(20)}

        return total;
    }




};

export default App;
