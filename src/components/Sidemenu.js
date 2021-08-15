import React, { useState } from "react";
import "./sidemenu.css";
import { useAuth0 } from "@auth0/auth0-react";
import LogOutButton from "./LogOutButton";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./cards.css";
import "react-datetime/css/react-datetime.css";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";



const PAGE_ADD = "add";
const PAGE_LIST = "list";
const PAGE_UPDATE = "update";
const PAGE_DELETE = "delete";

function Sidemenu() {
  // setting up the pages
  const [page, setPage] = useState(PAGE_ADD);
  const navigateTo = (nextPage) => {
    // console.log(nextPage);
    setPage(nextPage);
  };

  // let [meetings, setmeetings] = useState([]);
  const [cart, setCart] = useState([]);
  const myAdd = () => {
    let x =  document.getElementById("floatingInput1").value;
    let y =  document.getElementById("floatingInput2").value;
    let z =  document.getElementById("floatingInput3").value;
    let a =  document.getElementById("floatingInput4").value;
    if(x === "" || z ==="" || a === "" && y === "" ){
        alert("Enter Specific Input")
    };
    if(x !== "" && z !=="" && a !== ""){
    let meeting = {
      id: Date.now(),
      title: x,
      description: y,
      start:z,
      end: a,
    };
    // meetings.push(meeting);
    // setmeetings(meetings)
    document.getElementById("floatingInput1").value = "";
    document.getElementById("floatingInput2").value = "";
    document.getElementById("floatingInput3").value = "";
    document.getElementById("floatingInput4").value = "";
    // console.log(meetings);
    // console.log(meetings.length);

    setCart([...cart, { ...meeting }]);
    console.log(setCart);
  }};
  // console.log(meetings);
  const removeFromList = (itemToRemove) => {
    setCart(cart.filter((item) => item !== itemToRemove));
  };

  //  rendering adding page
  const renderAdd = () => (
    <>
      <div className="calendar">
        <div className="cal">
          <Calendar id="calendar" onChange={onChange} value={date}></Calendar>
        </div>
        <div className="vl"></div>
        <div className="add">
          <div className="addmeet">
            {/* <h3>{date.toString()}</h3> */}
            <table class="table">
              <tr>
                <th>Title</th>
                <th id="colon">:</th>
                <td>
                  <input
                    type="text"
                    class="form-control"
                    id="floatingInput1"
                    placeholder="Title"
                  />
                </td>
              </tr>
              <tr>
                <th>Description</th>
                <th id="colon">:</th>
                <td>
                  <input
                    type="text"
                    class="form-control"
                    id="floatingInput2"
                    placeholder="Add Description (optional)"
                  />
                </td>
              </tr>
              <tr>
                <th>Start Time</th>
                <th id="colon">:</th>
                <td>
                  <DateTimePickerComponent id="floatingInput3" placeholder="Choose start date and time"></DateTimePickerComponent>
                </td>
              </tr>
              <tr>
                <th>End Time</th>
                <th id="colon">:</th>
                <td>
                <DateTimePickerComponent id="floatingInput4" placeholder="Choose start date and time"></DateTimePickerComponent>
                </td>
              </tr>
            </table>
          </div>
          <h3>You have {cart.length} meetings in your List.</h3>
          <button
            type="button"
            id="addbtn"
            class="btn btn-primary btn-sm"
            onClick={myAdd}
          >
            ADD
          </button>
        </div>
      </div>
    </>
  );

  // rendering list of meetings
  const renderList = () => (
    <>
      <div className="cards">
        {cart.length === 0 && <h2>You didn't added any Meetings yet!</h2>}
        {cart.map((item, index) => {
          return (
            <div key={index}>
              <div className="card ">
                <div className="cardtitle">
                  <h1>{item.title}</h1>
                </div>
                <div className="para">
                  <h3>{item.description}</h3>
                </div>
                <div className="date">
                  <h3>Start Time: {item.start}</h3>
                  <h3>Start End: {item.end}</h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );

  let [upDateData, setUpdateData] = useState([]);
  let upDate = (updated) => {
    setUpdateData(updated);
    document.querySelector(".clear").style.visibility="hidden";
    document.querySelector("#addbtnsave").style.visibility="hidden";
  };
  const editFunc = () => {
    document.querySelector(".clear").style.visibility="visible";
    document.querySelector("#addbtnsave").style.visibility="visible";
    let noTextAreas = document.getElementsByClassName('form-control').length;
    if(noTextAreas === 0){

    let title = document.getElementById("settitle");
    let html = title.innerHTML;
    title.innerHTML = `<input type="text" class="form-control" id="titletext" placeholder="Title" /value=${html}>`;
      
    
    let description = document.getElementById("description");
    let html2 = description.innerHTML;
    description.innerHTML = `<textarea type="text" class="form-control" id="floatingInput2" placeholder="Add Description (optional)">${html2}</textarea>`;
    
    let start = document.getElementById("updatestart");
    let html3 = start.innerHTML;
    start.innerHTML = `<input type="datetime-local" format="MM-DD-YYYY hh:mm" class="form-control" id="startDatee" placeholder="start Time" /value=${html3}>`
    

    let end = document.getElementById("updateEnd");
    let html4 = end.innerHTML;
    end.innerHTML = `<input type="datetime-local" class="form-control" id="endDatee" placeholder="End Time" /value=${html4}>`
    
  }};

  const saveFunc = (data) => {
    // let b = document.getElementById("settitle").value;
    // console.log(b);
    // if(b === undefined){
    let x =  document.getElementById("titletext").value;
    let y =  document.getElementById("floatingInput2").value;
    let z =  document.getElementById("startDatee").value;
    let a =  document.getElementById("endDatee").value;
    if(x === "" || z ==="" || a === ""){
        alert("Enter Specific Input")
    };
    if(x !== "" && z !=="" && a !== ""){
    // for title
    let settitle = document.getElementById("titletext");
    let title = document.getElementById("settitle");
    title.innerHTML = settitle.value;
    data["title"] = title.innerHTML;
    // for description
    let setdes = document.getElementById("floatingInput2");
    let description = document.getElementById("description");
    description.innerHTML = setdes.value;
    data["description"] = description.innerHTML;
    // for start date
    let setStartDate = document.getElementById("startDatee");
    let start = document.getElementById("updatestart");
    start.innerHTML = setStartDate.value;
    data["start"] = start.innerHTML;
    // for end date
    let setEndDate = document.getElementById("endDatee");
    let end = document.getElementById("updateEnd");
    end.innerHTML = setEndDate.value;
    data["end"] = end.innerHTML;
    setUpdateData(data);
    alert("Data has been saved");
  document.querySelector(".clear").style.visibility="hidden";
  document.querySelector("#addbtnsave").style.visibility="hidden";
  }
  };

  const removeFunc = ()=>{
    let x =  document.getElementById("titletext").value;
    let y =  document.getElementById("floatingInput2").value;
    let z =  document.getElementById("startDatee").value;
    let a =  document.getElementById("endDatee").value;
    if(x === "" && z ==="" && a === "" ){
      alert("Data has been already Cleared")
    }
    if(x !== "" && z !=="" && a !== "" || y !==""){
    document.getElementById("titletext").value = "";
    document.getElementById("floatingInput2").innerHTML= "";
    document.getElementById("startDatee").value = "";
    document.getElementById("endDatee").value = "";
  }}
  
  // rendering update meets
  const renderUpdate = () => (
    <>
      <div className="update">
        <div className="upcards">
        {cart.length === 0 && <h4>You didn't added any Meetings yet!</h4>}
          {cart.map((item, index) => {
            return (
              <div key={index}>
                <div className="card upcard" onClick={() => upDate(item)}>
                  <div className="cardtitle up">
                    <h1>{item.title}</h1>
                  </div>
                  <div className="para">
                    <h3>{item.description}</h3>
                  </div>
                  <div className="date">
                    <h3>Start Time: {item.start}</h3>
                    <h3>Start End: {item.end}</h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <br />
        <div className="add upadd">
          <div className="addmeet" id="addmeet">
            <div className="uptitle">
              <div className="t">
                <h2>Title:</h2>
              </div>
              <div id="settitle" className="inputupdate">{upDateData.title}</div>
            </div>
            <div className="paragrapgh">
              <div className="t">
                <h2>Description:</h2>
              </div>
              <div id="description" className="inputupdate">{upDateData.description}</div>
            </div>
            <div className="upeditsave">
              <div className="left">
                <h2>Start Time:</h2>
                <div id="updatestart" className="inputupdate">
                {upDateData.start}
                </div>
              </div>
              <div className="right">
                <h2>End Time:</h2>
                <div id="updateEnd" className="inputupdate">
                {upDateData.end}
                </div>
              </div>
            </div>
          </div>
          <div className="editsave">
          <button
              type="button"
              id="addbtn"
              className="btn clear edit save btn-primary btn-sm"
              onClick={removeFunc}
            >
              CLEAR ALL
            </button>
            <button type="button" id="addbtnsave" className="btn changes save btn-primary btn-sm" onClick={() => saveFunc(upDateData)}> SAVE CHANGES </button>
            <button
              type="button"
              id="addbtn"
              className="btn edit save btn-primary btn-sm"
              onClick={editFunc}
            >
              EDIT
            </button>
          </div>
        </div>
      </div> 
    </>
  );

  // rendering delete meetings
  const renderDelete = () => (
    <>
      <div className="cards">
        {cart.length === 0 && <h2>You didn't added any Meetings yet!</h2>}
        {cart.map((item, index) => {
          return (
            <div key={index}>
              <div className="card upcard">
                <div className="cardtitle">
                  <h1>{item.title}</h1>
                </div>
                <div className="para">
                  <h3>{item.description}</h3>
                </div>
                <div className="date">
                  <h3>Start Time: {item.start}</h3>
                  <h3>Start End: {item.end}</h3>
                </div>
              </div>
              <button onClick={() => removeFromList(item)}>Delete</button>
            </div>
          );
        })}
      </div>
    </>
  );

  const { user, isAuthenticated } = useAuth0();

  const [date, setDate] = useState(new Date());

  const onChange = (date) => {
    setDate(date);
    console.log(date);
  };

  return (
    isAuthenticated && (
      <div>
        <div className="maincontent">
          {page === PAGE_ADD && renderAdd()}
          {page === PAGE_LIST && renderList()}
          {page === PAGE_UPDATE && renderUpdate()}
          {page === PAGE_DELETE && renderDelete()}
          <div className="sidemenu">
            <div className="image">
              <img src={user.picture} alt={user.name} />
            </div>
            <h2>{user.given_name}</h2>
            <div
              className="btn-group-vertical btn-group-lg "
              role="group"
              aria-label="Basic example"
            >
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => navigateTo(PAGE_ADD)}
              >
                Add Meeting<ion-icon name="add-outline"></ion-icon>
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => navigateTo(PAGE_LIST)}
              >
                List Meetings<ion-icon name="list-outline"></ion-icon>
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => navigateTo(PAGE_UPDATE)}
              >
                Update Meeting<ion-icon name="create-outline"></ion-icon>
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => navigateTo(PAGE_DELETE)}
              >
                Delete Meeting<ion-icon name="trash-outline"></ion-icon>
              </button>
            </div>
            <LogOutButton />
          </div>
        </div>
      </div>
    )
  );
}

export default Sidemenu;
