import React from 'react'
import './Peopleresponse.css';

function Peopleresponse(propse) {

    const [userEmail, setUserEmail] = React.useState('');
    const userResponse = [];
    const [allResponses, setAllResponses] = React.useState([]);
    const [stopInfiniteLoop, setStopInfiniteLoop] = React.useState(false);

    if(!stopInfiniteLoop) {
        fetch('https://mod-test-18b5f-default-rtdb.asia-southeast1.firebasedatabase.app/message.json')
        .then(response => response.json())
        .then(data => { 
            console.log(data);
            for (const dataItem in data) {
                console.log(
                    data[dataItem].userEmail,
                );
                userResponse.push({userEmail: data[dataItem].userEmail});
            }
            setAllResponses(userResponse);
         })
         setStopInfiniteLoop(true);
    }

    const handleUserEmailChange = (event) => {
        setUserEmail(event.target.value);
    }

    const handleSubscribe = (event) => {
        event.preventDefault();
        console.log('userEmail: ', userEmail);
        if(userEmail === '') {
            alert("please press on subscribe");
            return;
        }

        fetch('https://mod-test-18b5f-default-rtdb.asia-southeast1.firebasedatabase.app/message.json',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userEmail: userEmail,
                }) 
            }
        ).then(res => {
            console.log('res: ', res);
            return res.json();
        }).then ( data => {
            console.log('data: ', data);
        })

        setUserEmail('');


    }
    

  return (
    <div className='container'>
        <div className="gmail-detail">
                <form onSubmit={handleSubscribe}>
                    <input className='input-user-email' type="text" placeholder="Enter Email" onChange={handleUserEmailChange} value={userEmail}/>
                    <button className='input-subscribe' type="submit" >Subscribe</button>
                </form>
                </div>

            <div className='response-container' >
                {
                    allResponses && (
                        allResponses.map(item => {
                            return (
                            <div className='response-item'>
                                <p className='response-email'>{item.userEmail} : </p>
                            </div>
                            )
                        })
                    )
                }

            </div>

        </div>

  )
}

export default Peopleresponse