import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
export default function DrumMachine() {
    const [display, setDisplay] = useState('');
    const [powerOnOff, setPower] = useState('On');
    const [bankOnOff, setBank] = useState('On');
    const [errors, setErrors] = useState('');
    const audioRefs = {
        Q: useRef(null),
        W: useRef(null),
        E: useRef(null),
        A: useRef(null),
        S: useRef(null),
        D: useRef(null),
        Z: useRef(null),
        X: useRef(null),
        C: useRef(null),
    };
    
    const getTheClickedBtn = (e) => {
        const audio = e.target.querySelector("audio");
        setDisplay(e.target.id);
        if (powerOnOff === 'Off') {
            audio.play()
            setErrors('')
        } else {
            setErrors('Please turn power on')
            audio.pause();
        }
    }



    useEffect(() => {
        const handleKeyDown = (e) => {
            const key = e.key.toUpperCase();
            const audio = document.getElementById(key);
            if (!audio) {
                setErrors('Invalid key');
                return;
            }
            const id = audio.parentElement?.id || '';
            const element = audio.parentElement; 
            
            if (powerOnOff === 'Off') {
                audio.play();
                setDisplay(id);
                element.classList.add('click');
                setErrors('');
            } else {
                setErrors('Please power on');
                audio.pause();
            }
        };
        const handleKeyUp = (e) => {
            const key = e.key.toUpperCase();
            const audio = document.getElementById(key);
            if (!audio) {
                setErrors('Invalid key');
                return;
            }
            const element = audio.parentElement;
            element.classList.remove('click');
        };
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [powerOnOff]);


    const handlePowerOnOff = (e) => {
        const target = e.target;
        target.classList.toggle('float')
        setPower((prevState) => {
            return prevState === 'On' ? 'Off' : 'On';
        })
    }

    const handleBankOnOff = (e) => {
        const target = e.target;
        if (powerOnOff === 'On') {
            setErrors('Please turn power on')
            return;
        } else {
            target.classList.toggle('float')
            setBank((prevState) => {
                return prevState === 'On' ? 'Off' : 'On';
            })
        }
        if (bankOnOff === 'Off') {
            setDisplay('Heater Kit')
        } else if (bankOnOff === 'On') {
            setDisplay('Smooth Piano Kit')
        }
    }

    const volumeChange = (e) => {
        const volume = e.target.value;
        setDisplay(`volume: ${Math.ceil(e.target.value * 100)}%`)
        Object.values(audioRefs).forEach((ref) => {
            if (ref.current) {
                ref.current.volume = volume;
            }
        });
    };

    return <>
        <section id="drum-machine" className='d-flex justify-content-center align-items-center gap-5'>
            {bankOnOff === 'On' ?
                <div className="container-fluid">
                    <div className="row gap-5">
                        <motion.div key={'Q'}
                            whileTap={{
                                scale: 0.9,
                                transition: { duration: 0.2 }
                            }}
                            onClick={getTheClickedBtn} className="drum-pad col" id='Heater-1'>Q
                            <audio className='clip' ref={audioRefs.Q} id="Q" src="https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"></audio>
                        </motion.div>
                        <motion.div
                            whileTap={{
                                scale: 0.9,
                                transition: { duration: 0.2 }
                            }} onClick={getTheClickedBtn} className="drum-pad col" id='Heater-2'>W
                            <audio className='clip' ref={audioRefs.W} id="W" src="https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"></audio>
                        </motion.div >
                        <motion.div
                            whileTap={{
                                scale: 0.9,
                                transition: { duration: 0.2 }
                            }} onClick={getTheClickedBtn} className="drum-pad col" id='Heater-3'>E
                            <audio className='clip' ref={audioRefs.E} id="E" src="https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"></audio>
                        </motion.div >
                    </div>

                    <div className="row gap-5">
                        <motion.div
                            whileTap={{
                                scale: 0.9,
                                transition: { duration: 0.2 }
                            }}
                            onClick={getTheClickedBtn} className="drum-pad col" id='Heater-4'>A
                            <audio className='clip' ref={audioRefs.A} id="A" src="https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"></audio>
                        </motion.div>
                        <motion.div
                            whileTap={{
                                scale: 0.9,
                                transition: { duration: 0.2 }
                            }}
                            onClick={getTheClickedBtn} className="drum-pad col" id='Clap'>S
                            <audio className='clip' ref={audioRefs.S} id="S" src="https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"></audio>
                        </motion.div>
                        <motion.div
                            whileTap={{
                                scale: 0.9,
                                transition: { duration: 0.2 }
                            }}
                            onClick={getTheClickedBtn} className="drum-pad col" id='Open-HH'>D
                            <audio className='clip' ref={audioRefs.D} id="D" src="https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"></audio>
                        </motion.div>
                    </div>

                    <div className="row gap-5">
                        <motion.div
                            whileTap={{
                                scale: 0.9,
                                transition: { duration: 0.2 }
                            }}
                            onClick={getTheClickedBtn} className="drum-pad col" id="Kick-n'-Hat">Z
                            <audio className='clip' ref={audioRefs.Z} id="Z" src="https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"></audio>
                        </motion.div>
                        <motion.div
                            whileTap={{
                                scale: 0.9,
                                transition: { duration: 0.2 }
                            }}
                            onClick={getTheClickedBtn} className="drum-pad col" id='Kick'>X
                            <audio className='clip' ref={audioRefs.X} id="X" src="https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"></audio>
                        </motion.div>
                        <motion.div
                            whileTap={{
                                scale: 0.9,
                                transition: { duration: 0.2 }
                            }}
                            onClick={getTheClickedBtn} className="drum-pad col" id='Closed-HH'>C
                            <audio className='clip' ref={audioRefs.C} id="C" src="https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"></audio>
                        </motion.div>
                    </div>
                </div>
                :
                <div className="container-fluid">
                    <div className="row gap-5">
                        <motion.div 
                        whileTap={{
                            scale: 0.9,
                            transition: { duration: 0.2 }
                        }}
                        onClick={getTheClickedBtn} className="drum-pad col" id='Chord-1'>Q
                            <audio className='clip' ref={audioRefs.Q} id='Q' src='https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'></audio>
                        </motion.div>
                        <motion.div
                        whileTap={{
                            scale: 0.9,
                            transition: { duration: 0.2 }
                        }}
                        onClick={getTheClickedBtn} className="drum-pad col" id='Chord-2'>W
                            <audio className='clip' ref={audioRefs.W} id='W' src="https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"></audio>
                        </motion.div>
                        <motion.div
                        
                        whileTap={{
                            scale: 0.9,
                            transition: { duration: 0.2 }
                        }}
                        onClick={getTheClickedBtn} className="drum-pad col" id='Chord-3'>E
                            <audio className='clip' ref={audioRefs.E} id='E' src="https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"></audio>
                        </motion.div>
                    </div>

                    <div className="row gap-5">
                        <motion.div
                            whileTap={{
                                scale: 0.9,
                                transition: { duration: 0.2 }
                            }}
                            onClick={getTheClickedBtn} className="drum-pad col" id='Shaker'>A
                            <audio className='clip' ref={audioRefs.A} id='A' src="https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"></audio>
                        </motion.div>
                        <motion.div
                            whileTap={{
                                scale: 0.9,
                                transition: { duration: 0.2 }
                            }}
                            onClick={getTheClickedBtn} className="drum-pad col" id='Open-HH'>S
                            <audio className='clip' ref={audioRefs.S} id='S' src="https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"></audio>
                        </motion.div>
                        <motion.div
                            whileTap={{
                                scale: 0.9,
                                transition: { duration: 0.2 }
                            }}
                            onClick={getTheClickedBtn} className="drum-pad col" id='Closed-HH'>D
                            <audio className='clip' ref={audioRefs.D} id='D' src="https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"></audio>
                        </motion.div>
                    </div>

                    <div className="row gap-5">
                        <motion.div
                            whileTap={{
                                scale: 0.9,
                                transition: { duration: 0.2 }
                            }}
                            onClick={getTheClickedBtn} className="drum-pad col" id="Punchy-Kick">Z
                            <audio className='clip' ref={audioRefs.Z} id='Z' src="https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"></audio>
                        </motion.div>
                        <motion.div
                            whileTap={{
                                scale: 0.9,
                                transition: { duration: 0.2 }
                            }}
                            onClick={getTheClickedBtn} className="drum-pad col" id='Side-Stick'>X
                            <audio className='clip' ref={audioRefs.X} id='X' src="https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"></audio>
                        </motion.div>
                        <motion.div
                            whileTap={{
                                scale: 0.9,
                                transition: { duration: 0.2 }
                            }}
                            onClick={getTheClickedBtn} className="drum-pad col" id='Snare'>C
                            <audio className='clip' ref={audioRefs.C} id='C' src="https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"></audio>
                        </motion.div>
                    </div>
                </div>}
            <div className='control p-4 d-flex flex-column gap-5'>
                <div className='d-flex flex-column align-items-center on-off'>
                    <p>Power</p>
                    <div className='btn-power'>
                        <div className='inner d-flex align-items-center justify-content-center' onClick={handlePowerOnOff}>{powerOnOff}</div>
                    </div>
                </div>
                <div className='d-flex flex-column align-items-center'>
                    <p id="display" className='d-flex align-items-center justify-content-center'>{display}</p>
                    <p className='text-danger errors'>{errors}</p>
                    <div className='volume'>
                        <input onChange={volumeChange} max="1" min="0" step="0.01" type="range" />
                    </div>
                </div>
                <div className='bank d-flex flex-column align-items-center'>
                    <p>Bank</p>
                    <div className='btn-bank'>
                        <div className='inner d-flex align-items-center justify-content-center' onClick={handleBankOnOff}>{bankOnOff}</div>
                    </div>
                </div>
            </div>
            
        </section>
        <p className='text-center text-black'>Created by Yassine</p>
    </>
}