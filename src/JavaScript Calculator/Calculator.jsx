import { useState } from 'react'
import './styles.css'
export default function Calculator() {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');
    const [errors, setError] = useState('');

    const handleClick = (e) => {
        setError('');
        setResult(0)
        let target = e.target.textContent;
        target = target.replace(/x/g, '*');
        setInput((prevState) => {
            if (result !== 0 && /[*+\-/]/.test(target)) {
                setResult(0);
                return prevState + target;
            }
            if (result !== 0 && /[0-9]/.test(target)) {
                return prevState + target;
            }
            if (/\d+\+-/.test(prevState) && /[*+\-/]/.test(target)) {
                return prevState.slice(0, -2) + target
            }
            if (/\d+\+-/.test(prevState) && /[0-9]+/.test(target)) {
                return prevState + target;
            }
            if (/\d+\+/.test(prevState) && target === '-') {
                if (/\d+\+-/.test(prevState) && target === '-') {
                    return prevState
                }
                return prevState + target;
            }
            if (/[*+\-/]$/.test(prevState) && /[*+\-/]/.test(target)) {
                return prevState.slice(0, -1) + target;
            }
            if (/^0$/.test(prevState) && /0/.test(target)) {
                return target;
            }
            if (/^0$/.test(prevState) && target === ".") {
                return prevState + target;
            }
            if (/\.\d*$/.test(prevState) && target === ".") {
                return prevState;
            }
            if (/\d+\.\d+$/.test(prevState) && /^[*+\-/]/.test(target)) {
                return prevState + target;
            }
            if (/[*+\-/]{2,}/.test(prevState + target)) {
                return prevState.replace(/[*+\-/]+$/, '') + target;
            }
            if (/[*+\-/]{2,}$/.test(prevState)) {
                return prevState.replace(/[*+\-/]+$/, '') + target;
            }

            if (input.length > 20) {
                setError('Input too long!')
                setInput(prevState => prevState.slice(0, -1) + target)
            }
            if (/^0$/.test(prevState)) {
                setResult(target)
                return target
            }
            return prevState + target;
        });
    };



    const clickClear = () => {
        setError('');
        setInput('');
        setResult(0);
    }
    const clickEquals = () => {
        try {
            if (/^-?\d+(\.\d+)?([+\-*/]-?\d+(\.\d+)?)*$/.test(input)) {
                const evaluatedResult = eval(input);
                setResult(evaluatedResult);
            } else {
                setError('Invalid expression');
            }
        } catch (error) {
            setError(error);
        }
    };


    return <>
        <section className='calculator'>
            <div className='calc-head'>
                <div className='error'>{errors}</div>
                <div className='result'>
                    <div className='expression-screen'>{input}</div>
                    <div id="display">{result}</div>
                </div>
            </div>
            <div className="grid-container">
                <button onClick={clickClear} id="clear">AC</button>
                <button onClick={handleClick} id="divide">/</button>
                <button onClick={handleClick} id="multiply">x</button>
                <button onClick={handleClick} id="seven">7</button>
                <button onClick={handleClick} id="eight">8</button>
                <button onClick={handleClick} id="nine">9</button>
                <button onClick={handleClick} id="subtract">-</button>
                <button onClick={handleClick} id="four">4</button>
                <button onClick={handleClick} id="five">5</button>
                <button onClick={handleClick} id="six">6</button>
                <button onClick={handleClick} id="add">+</button>
                <button onClick={handleClick} id="one">1</button>
                <button onClick={handleClick} id="two">2</button>
                <button onClick={handleClick} id="three">3</button>
                <button onClick={clickEquals} id="equals">=</button>
                <button onClick={handleClick} id="zero">0</button>
                <button onClick={handleClick} id="decimal">.</button>
            </div>
            <div className="author">
                <p>Designed and Coded By</p>
                <p><a target='_blank' href={'https://www.freecodecamp.org/XpertGenius'}>Yassine</a></p>
            </div>
        </section>
    </>
}