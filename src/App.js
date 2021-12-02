import React from "react";
import './App.css'

let timerID;

const formatTime = (count) => {
  let min = Math.floor((count / 1000 / 60) << 0);
  if (min < 10) {
    min = '0' + min;
  };

  let sec = Math.floor((count / 1000) % 60);
  if (sec < 10) {
    sec = '0' + sec;
  };

  return (min + ':' + sec);
}

const Timer = ({ time, step, onTick, autostart }) => {
  const [count, setCount] = React.useState(time);
  const [paused, setPaused] = React.useState(false);

  const tik = () => {
    setCount((prev) => prev - step)
  }

  React.useEffect(() => {
    timerID = setInterval(tik, step)


    return () => {
      clearInterval(timerID)
    }
  }, [])

  React.useEffect(() => { onTick(count) }, [count])

  const clickHandler = () => {
    if (paused) {
      timerID = setInterval(tik, step)
    } else {
      clearInterval(timerID)
    }

    setPaused(!paused)
  }

  return (
    <div className = "clook">
      <div>{formatTime(count)}</div>
      <button onClick={clickHandler}>{paused ? 'Start' : 'Pause'}</button>
    </div>
  )
}

const App = () => {

  return (
    <div>
      <Timer
        time={3600000}
        step={1000}
        onTick={(time) => console.log("Залишилось часу: " + time)}
        autostart={true}
      />

    </div>
  )
}

export default App;