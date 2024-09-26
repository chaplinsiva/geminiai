import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Main = () => {

    const {onSent,recentprompt,showresult,loading,resultdata,input,setinput} = useContext(Context)
  return (
    <div className='main'><div className='nav'>
        <p>Gemini</p><img src={assets.user_icon} alt="" /></div>
        <div className="main-container">
            {!showresult? <><div className='greet'>
                <p><span>Hello , Siva.</span></p>
                <p>How can I help you today?</p>
            </div>
            <div className="cards">
                <div className='card'>
                    <p>Vanakkam da mapla theni la irunthu</p>
                    <img src={assets.compass_icon} alt="" />
                </div>
                <div className='card'>
                    <p>Dhanush padam maari nee oru paithiyakaari</p>
                    <img src={assets.bulb_icon} alt="" />
                </div>
                <div className='card'>
                    <p>Ooran pillaya ooti valatthaa..</p>
                    <img src={assets.message_icon} alt="" />
                </div>
                <div className='card'>
                    <p>Kuthadi kuthadi tamila kunindhu koothadi</p>
                    <img src={assets.code_icon} alt="" />
                </div>
            </div></>:<div className='result'>
                <div className="result-title">
                    <img src={assets.user_icon} alt="" />
                    <p>{recentprompt}</p>
                    
                    </div>
                    <div className="result-data">
                        <img src={assets.gemini_icon} alt="" />
                        {loading ?<div className='loader'>

                            <hr />
                            <hr />
                            <hr />
                        </div> :  <p dangerouslySetInnerHTML={{__html:resultdata}}></p>}
                       
                    </div>
                    
                    </div>}
            

          <div className="main-bottom">
            <div className="search-box">
                <input onChange={(e)=>setinput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here' />
                <div>
                    <img src={assets.gallery_icon} alt="" />
                <img src={assets.mic_icon} alt="" />
                  {input? <img onClick={()=>onSent()} src={assets.send_icon} alt="" />: null} </div> 
            </div>
            <p className="bottom-info">Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps</p>
          </div>



            </div></div>
  )
}

export default Main