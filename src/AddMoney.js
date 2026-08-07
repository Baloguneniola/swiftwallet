import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  PlusCircle,
  Wallet,
  CheckCircle,
  CreditCard,
  ArrowDownLeft
} from "lucide-react";


function AddMoney() {

  const navigate = useNavigate();


  const currentUser =
    JSON.parse(
      localStorage.getItem(
        "swiftWalletCurrentUser"
      )
    ) || null;



  const [amount, setAmount] =
    useState("");



  const [balance, setBalance] =
    useState(
      currentUser?.balance || 0
    );



  const [showCardForm, setShowCardForm] =
    useState(false);



  const [selectedCard, setSelectedCard] =
    useState("saved");



  const [cardDetails, setCardDetails] =
    useState({
      name:"",
      number:"",
      expiry:"",
      cvv:"",
    });



  const recentTopUps =
    currentUser?.transactions
      ?.filter(
        transaction =>
          transaction.type === "credit"
      )
      .slice(-5)
      .reverse() || [];





  const handleContinue = () => {

    if(
      !amount ||
      Number(amount) <= 0
    ){
      alert(
        "Please enter a valid amount."
      );
      return;
    }


    setShowCardForm(true);

  };





  const handleAddMoney = () => {

    if(!currentUser){

      alert(
        "User session not found."
      );

      return;

    }



    if(
      selectedCard === "new" &&
      (
        !cardDetails.name ||
        !cardDetails.number ||
        !cardDetails.expiry ||
        !cardDetails.cvv
      )
    ){

      alert(
        "Please complete card details."
      );

      return;

    }



    navigate(
      "/add-money-pin",
      {
        state:{
          amount:Number(amount)
        }
      }
    );

  };






  return (

    <div
      style={styles.page}
    >


      <div
        style={styles.navbar}
      >

        <Link
          to="/dashboard"
          onClick={() =>
            window.scrollTo(0,0)
          }
          style={styles.logoContainer}
        >

          <div
            style={styles.logo}
          >
            SW
          </div>


          <span
            style={styles.brand}
          >
            Swift Wallet
          </span>


        </Link>


      </div>





      <div
        style={styles.container}
      >


        <h1
          style={styles.heading}
        >

          <PlusCircle size={34}/>

          Add Money

        </h1>



        <p
          style={styles.subtitle}
        >
          Add funds to your Swift Wallet securely.
        </p>





        <div
          style={styles.card}
        >


          <div
            style={styles.sectionHeader}
          >

            <Wallet size={22}/>

            <span>
              Current Balance
            </span>

          </div>



          <h2
            style={styles.balance}
          >

            ₦
            {Number(balance)
              .toLocaleString(
                "en-NG"
              )
            }

            .00

          </h2>


        </div>





        <div
          style={{
            ...styles.card,
            marginTop:"25px"
          }}
        >


          <div
            style={styles.sectionHeader}
          >

            <CreditCard size={22}/>

            <h2
              style={{
                margin:0
              }}
            >
              Card Payment
            </h2>


          </div>



          <p
            style={styles.text}
          >
            Enter the amount and select your payment method.
          </p>



          <input
            style={styles.input}
            placeholder="Amount (₦)"
            value={
              amount
                ?
                Number(amount)
                .toLocaleString("en-NG")
                :
                ""
            }
            onChange={(e)=>{

              const value =
                e.target.value.replace(/,/g,"");


              if(!isNaN(value)){
                setAmount(value);
              }

            }}
          />



          {
            !showCardForm &&
            (

              <button
                style={styles.button}
                onClick={handleContinue}
              >
                Continue
              </button>

            )
          }

                        {
                showCardForm &&
                (

                  <>

                    <div
                      style={styles.cardOption}
                      onClick={() =>
                        setSelectedCard("saved")
                      }
                    >

                      <input
                        type="radio"
                        checked={
                          selectedCard === "saved"
                        }
                        readOnly
                      />

                      <span>
                        Saved Visa Card
                      </span>


                    </div>





                    <div
                      style={styles.cardOption}
                      onClick={() =>
                        setSelectedCard("new")
                      }
                    >

                      <input
                        type="radio"
                        checked={
                          selectedCard === "new"
                        }
                        readOnly
                      />

                      <span>
                        Add New Card
                      </span>


                    </div>





                    {
                      selectedCard === "new" &&
                      (

                        <>


                          <input
                            style={styles.input}
                            placeholder="Card Holder Name"
                            value={
                              cardDetails.name
                            }
                            onChange={(e)=>
                              setCardDetails({
                                ...cardDetails,
                                name:e.target.value
                              })
                            }
                          />



                          <input
                            style={styles.input}
                            placeholder="Card Number"
                            value={
                              cardDetails.number
                            }
                            onChange={(e)=>
                              setCardDetails({
                                ...cardDetails,
                                number:e.target.value
                              })
                            }
                          />



                          <input
                            style={styles.input}
                            placeholder="Expiry Date"
                            value={
                              cardDetails.expiry
                            }
                            onChange={(e)=>
                              setCardDetails({
                                ...cardDetails,
                                expiry:e.target.value
                              })
                            }
                          />



                          <input
                            style={styles.input}
                            placeholder="CVV"
                            value={
                              cardDetails.cvv
                            }
                            onChange={(e)=>
                              setCardDetails({
                                ...cardDetails,
                                cvv:e.target.value
                              })
                            }
                          />


                        </>

                      )
                    }





                    <button
                      style={styles.button}
                      onClick={handleAddMoney}
                    >

                      Add Money

                    </button>



                  </>

                )
              }


        </div>







        <div
          style={{
            ...styles.card,
            marginTop:"25px"
          }}
        >


          <h2
            style={{
              display:"flex",
              alignItems:"center",
              gap:"10px",
              marginBottom:"20px"
            }}
          >

            <CheckCircle size={22}/>

            Recent Top Ups

          </h2>





          {
            recentTopUps.length === 0

            ?

            (

              <p
                style={{
                  color:"#888"
                }}
              >
                No top ups yet.
              </p>

            )

            :

            (

              recentTopUps.map(
                (item,index)=>(

                  <div
                    key={index}
                    style={styles.transaction}
                  >


                    <div
                      style={{
                        display:"flex",
                        alignItems:"center",
                        gap:"14px"
                      }}
                    >


                      <div
                        style={styles.creditIcon}
                      >

                        <ArrowDownLeft
                          size={18}
                        />

                      </div>




                      <div>

                        <strong>
                          {
                            item.name ||
                            "Money Added"
                          }
                        </strong>


                        <p
                          style={{
                            color:"#888",
                            margin:"5px 0 0",
                            fontSize:"13px"
                          }}
                        >
                          {
                            item.date ||
                            "Unknown date"
                          }
                        </p>


                      </div>



                    </div>




                    <span
                      style={{
                        color:"#22c55e",
                        fontWeight:"700"
                      }}
                    >

                      +

                      ₦
                      {
                        Number(
                          String(
                            item.amount
                          )
                          .replace(/[^\d]/g,"")
                        )
                        .toLocaleString(
                          "en-NG",
                          {
                            minimumFractionDigits:2
                          }
                        )
                      }


                    </span>



                  </div>

                )
              )

            )

          }



        </div>






        <Link
          to="/dashboard"
          onClick={() =>
            window.scrollTo(0,0)
          }
          style={{
            textDecoration:"none"
          }}
        >

          <button
            style={{
              ...styles.button,
              marginTop:"30px"
            }}
          >

            ← Back to Dashboard

          </button>


        </Link>




      </div>


    </div>

  );

}





const styles = {


page:{
  backgroundColor:"#0d0d0d",
  minHeight:"100vh",
  color:"#fff"
},



navbar:{
  padding:"20px 50px",
  borderBottom:"1px solid #222",
},



logoContainer:{
  display:"flex",
  alignItems:"center",
  gap:"10px",
  textDecoration:"none"
},



logo:{
  width:"40px",
  height:"40px",
  backgroundColor:"#22c55e",
  borderRadius:"10px",
  display:"flex",
  alignItems:"center",
  justifyContent:"center",
  color:"#000",
  fontWeight:"800"
},



brand:{
  color:"#fff",
  fontSize:"20px",
  fontWeight:"700"
},



container:{
  maxWidth:"700px",
  margin:"45px auto",
  padding:"0 20px"
},



heading:{
  color:"#22c55e",
  fontSize:"36px",
  display:"flex",
  alignItems:"center",
  gap:"12px"
},



subtitle:{
  color:"#999",
  marginBottom:"35px"
},



card:{
  backgroundColor:"#1a1a1a",
  border:"1px solid #2a2a2a",
  borderRadius:"16px",
  padding:"25px"
},



sectionHeader:{
  display:"flex",
  alignItems:"center",
  gap:"10px",
  color:"#fff"
},



balance:{
  color:"#22c55e",
  fontSize:"38px",
  marginTop:"18px",
  marginBottom:0
},



text:{
  color:"#999"
},



input:{
  width:"100%",
  padding:"15px",
  marginTop:"12px",
  marginBottom:"15px",
  backgroundColor:"#111",
  color:"#fff",
  border:"1px solid #333",
  borderRadius:"10px",
  boxSizing:"border-box"
},



button:{
  width:"100%",
  padding:"15px",
  backgroundColor:"#22c55e",
  color:"#000",
  border:"none",
  borderRadius:"10px",
  fontWeight:"700",
  cursor:"pointer"
},



cardOption:{
  backgroundColor:"#111",
  border:"1px solid #333",
  padding:"16px",
  borderRadius:"12px",
  display:"flex",
  gap:"12px",
  marginBottom:"15px",
  cursor:"pointer"
},



transaction:{
  display:"flex",
  justifyContent:"space-between",
  alignItems:"center",
  padding:"16px 0",
  borderBottom:"1px solid #2a2a2a"
},



creditIcon:{
  width:"40px",
  height:"40px",
  borderRadius:"50%",
  backgroundColor:"#123d23",
  color:"#22c55e",
  display:"flex",
  justifyContent:"center",
  alignItems:"center"
}


};



export default AddMoney;