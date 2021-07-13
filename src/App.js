import './App.css';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import React, { useState, useEffect } from "react"

let score = 0
let number = 10
let count = [10,10,20,25,35]
let problem = [0,0,0,0,0]
problem[0] =  Math.floor(Math.random() * (5))
problem[1] =  Math.floor(Math.random() * (5))
while (problem[0] === problem[1]) {
  problem[1] =  Math.floor(Math.random() * (5))
}
problem[2] =  3//Math.floor(Math.random() * (4))
problem[3] =  Math.floor(Math.random() * (2))
problem[4] =  Math.floor(Math.random() * (2))

let i = 0
let check = [0,0,0]

let random = 0
random = Math.floor(Math.random() * (2))
    
let perfect = [
  [//A
    [//6
      [7,6,78],//0
      [13,2,30]//0
    ],
    [//10
      [346,3,1],//0
      [37,16,5]//0
    ],
    [//11
      [1349,346,1],
      [6429,9761,0]
    ],
    [//12
      [17,91,1],//0
      [34,51,17]//0
    ],
    [//13
      [123,33,12],
      [94,43,20]
    ]
  ],
  [//B
    [//1
      [86,10,4],//0
      [346,7,1]//0
    ],
    [//7
      [61,13,2],//0
      [16,10,2]
    ],
    [//8
      [7,3,5],
      [4,6,3]//0
    ],
    [//9
      [349,349,924232],
      [346,196,9162413111]//0
    ]
  ],
  [//C
    [//3
      [123,456,162534],//0
      [497,163,439671]//0
    ],
    [//5
      [16,9,175],//0
      [13,4,153]//0
    ]
  ],
  [//D
    [//2
      [162,71,91],
      [162,75,237]
    ],
    [//4
      [70,31,6],//0
      [34,16,5]
    ]
  ]
]

check = perfect[Math.ceil(count[i]/10)-1][problem[i]][random]

function Start() {
  function handleClick(e) {
    window.location.href = "/next"
  }
  return ( 
    <div className="App">
      <header className="App-header">
        <h1>미스터리 사인</h1>
        <br></br>
        <Button variant="outline-light" onClick = {handleClick}>시작</Button>
      </header>
    </div>
  )
}

function Next() {
  return (
    <div className="App">
      <header className="App-header2">
        <br/>
        <div>
          <Time/>
        </div>
      </header>
    </div>
  );
}

function Time() {
  const [minutes, setMinutes] = useState(4);
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(seconds) > 0) {
        setSeconds(parseInt(seconds) - 1);
      }
      if (parseInt(seconds) === 0) {
        if (parseInt(minutes) === 0) {
          clearInterval(countdown);
        } else {
          setMinutes(parseInt(minutes) - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  const [inputs,setInputs] = useState({
    first: "",
    second: ""
  })

  let studentAnswer = ""

  const handleOnLeftChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }

  const [users,setUsers] = useState([])

  const handleOnLeftClick = (e) => {
    const { first, second } = inputs;

    if (first != "" && (first != check[0] || second != check[1]) && second != "" && (second != check[0] || first != check[1]) && number > 0) {
      var ans = cal(first, second, Math.ceil(count[i]/10)-1, problem[i])

      const user = {
        first,
        second,
        ans
      }

      setUsers([
        ...users,
        user
      ])

      setInputs({
        first: "",
        second: ""
      })
      document.getElementById('firstNumber').value = ""
      document.getElementById('secondNumber').value = ""
      number -= 1
    }    
  }

  const User = ({ user }) => {
    return (
      <h3>{user.first} ? {user.second} = {user.ans}</h3>
    )
  }

  const handleOnRightChange = (e) => {
    studentAnswer = Number(e.target.value)
  }

  const handleOnRightClick = (e) => {
    studentAnswer = document.getElementById('answerNumber').value
    if (document.getElementById('answerNumber').value != ""){
      if (studentAnswer == check[2]) {
        score += count[i]
        i += 1 
        number = 10
        if (i < 5) {
          check = perfect[Math.ceil(count[i]/10)-1][problem[i]][random]
        }
        notify(true)
        setUsers([])
      } else {
        notify(false)
      }
      document.getElementById('answerNumber').value = ""
      document.getElementById('firstNumber').value = ""
      document.getElementById('secondNumber').value = ""
    }
  }

  const handleOnSkip = (e) => {
    i += 1 
    number = 10
    if (i < 5) {
      check = perfect[Math.ceil(count[i]/10)-1][problem[i]][random]
    }
    setUsers([])
    document.getElementById('answerNumber').value = ""
    document.getElementById('firstNumber').value = ""
    document.getElementById('secondNumber').value = ""
  } 

  if (minutes == 0 && seconds == 0) {
    return (
      <Finish/>
    )
  } else if (i === 5) {
    return (
      <div className="App">
        <header className="App-header2">
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <h1>종료</h1>
          <br/>
          <h2>획득점수 : {score}점</h2>
          <br/>
          <Button variant="outline-light" onClick = {() => {window.location.href = "/"}}>돌아가기</Button>
        </header>
      </div>
    );
  } else {
    return (
    <div>
      <div>
        <h1>남은 시간</h1>
        <h2>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h2>
        <div className="container">
          <h3 className="item">획득점수 : {score}점</h3>
          <h3 className="item">배점 : {count[i]}점</h3>
          <h3 className="item">남은횟수 : {number}회</h3>
        </div>
        
      </div>
      <div>
        ================================================
      </div>
      <div className="container">
        <div className="item">
        <Form>
          <Row>
            <Col xs={4}><Form.Control name="first" placeholder="First" onChange={handleOnLeftChange} id="firstNumber"/></Col>
            ?
            <Col xs={4}><Form.Control name="second" placeholder="Second" onChange={handleOnLeftChange} id="secondNumber"/></Col>
            <Button variant="outline-light" onClick={handleOnLeftClick}>확인</Button>
          </Row> 
        </Form>
        <br/>
        {users.map(user => (
          <User user = {user} />
        ))}
        </div>
        <div className="item">
          <Form>
            <Row>
              <Col xs={6}><Form.Control type="answer" placeholder="Answer" onChange={handleOnRightChange} id="answerNumber"/></Col>
              <Button variant="outline-light" onClick={handleOnRightClick}>제출</Button>
              <Col><Button variant="outline-light" onClick={handleOnSkip}>스킵</Button></Col>
              <Col xs={0}><Form.Control className="invisible"/></Col>
            </Row>
          </Form>
          <br/>
          <br/>
          <br/>
          <h4>문제</h4>
          <br/>
          <h3>{check[0]} ? {check[1]} = []</h3>
          <br/>
        </div>
      </div>
    </div>
    )}
}

function notify(n) {
  if (n === true) {
    var notification = new Notification('NULL festival', {
      icon: './favicon.ico',
      body: '맞았습니다',
    });
  }
  else {
    var notification = new Notification('NULL festival', {
      icon: './favicon.ico',
      body: '틀렸습니다',
    });
  }

}

function cal(fir,sec,n,i) {
  fir = Number(fir)
  sec = Number(sec)
  if (n === 0) {
    if (i === 0) {
      return (A_6(fir, sec))
    } else if (i === 1) {
      return (A_10(fir, sec))
    } else if (i === 2) {
      return (A_11(fir, sec))
    } else if (i === 3) {
      return (A_12(fir, sec))
    } else if (i === 4) {
      return (A_13(fir, sec))
    }
  } else if (n === 1) {
    if (i === 0) {
      return (B_1(fir, sec))
    } else if (i === 1) {
      return (B_7(fir, sec))
    } else if (i === 2) {
      return (B_8(fir, sec))
    } else if (i === 3) {
      return (B_9(fir, sec))
    }
  } else if (n === 2) {
    if (i === 0) {
      return (C_3(fir, sec))
    } else if (i === 1) {
      return (C_5(fir, sec))
    }
  } else if (n === 3) {
    if (i === 0) {
      return (D_2(fir, sec))
    } else if (i === 1) {
      return (D_4(fir, sec))
    }
  }
}

function A_6(fir,sec) {
  return (fir+sec) * sec
}

function A_10(fir,sec) {
  if (fir > sec) return fir%sec
  else return sec%fir
}

function A_11(fir,sec) {
  if (fir % 2 === sec % 2) return 0
  else return 1
}

function A_12(fir,sec) {
  let gcd = 1

  for(let i=2; i<=Math.min(fir, sec); i++){
      if(fir % i === 0 && sec % i === 0){
          gcd = i
      }
  }
  return gcd
}

function A_13(fir,sec) {
  let sum = 0
  while (fir > 0) {
    sum += fir % 10
    fir = (fir - fir%10) / 10
  }
  while (sec > 0) {
    sum += sec % 10
    sec = (sec - sec%10) / 10
  }
  return sum
}

function B_1(fir,sec) {
  let round = [1,0,0,0,0,0,1,0,2,1]
  let sum = 0
  while (fir > 0) {
    sum += round[fir % 10]
    fir = (fir - fir%10) / 10
  }
  while (sec > 0) {
    sum += round[sec % 10]
    sec = (sec - sec%10) / 10
  }
  return sum
}

function B_7(fir,sec) {
  return (fir + sec) % 12
}

function B_8(fir,sec) {
  let sum = 0
  while (fir > 0) {
    sum += fir % 2
    fir = (fir - fir%2) / 2
  }
  while (sec > 0) {
    sum += sec % 2
    sec = (sec - sec%2) / 2
  }
  return sum
}

function B_9(fir,sec) {
  let cut = [0,0,0,0,0,0,0,0,0,0]
  let res = ''
  let j = 9
  while (fir > 0) {
    cut[fir % 10] += 1
    fir = (fir - fir%10) / 10
  }
  while (sec > 0) {
    cut[sec % 10] += 1
    sec = (sec - sec%10) / 10
  }
  for ( j = 9 ; j >= 0 ; j--) {
    if (cut[j] != 0) {
      res += String(j)
      res += String(cut[j])
    }
  }
  return res
}

function C_3(fir,sec) {
  let fr = String(fir)
  let sc = String(sec)
  let res = ''
  for (i = 0 ; i < fr.length ; i++) {
    res += fr[i]
    if (i < sc.length) {
      res += sc[sc.length - 1 - i]
    }
  }
  return res
}

function C_5(fir,sec) {
  return (fir+sec)*Math.abs(fir-sec)
}

function D_2(fir,sec) {
  if ((fir+sec) % 2 === 0) {
    return fir + sec
  }
  else {
    return Math.abs(fir-sec)
  }
}

function D_4(fir,sec) {
  let two = 1
  let e = 0
  let sum = fir + sec
  while (true) {
    if (two <= sum && sum < two * 2) {
      return e
    }
    else {
      e += 1
      two *= 2
    }
  }
}

function Finish(){
  function handleClick(e) {
    window.location.href = "/"
  }
  return (
    <div className="App">
      <header className="App-header2">
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <h1>시간 종료</h1>
        <br/>
        <h2>획득점수 : {score}점</h2>
        <br/>
        <Button variant="outline-light" onClick = {handleClick}>돌아가기</Button>
      </header>
    </div>
    
  )
}

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path = "/Next" component={Next}/>
          <Route path = "/" component={Start}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
