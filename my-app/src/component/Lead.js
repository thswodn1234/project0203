import React from "react";
import { useEffect, useState, useContext, useRef } from "react";
import { AppContext } from "./SelectDate";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import "../style/lead.css";
// import { useNavigate } from "react-router-dom";
const Lead = () => {
  const [datas, setdata] = useState();
  const [data1, setdata1] = useState();
  const [data2, setdata2] = useState();
  const [data3, setdata3] = useState();
  const [machinery, setMachinery] = useState();
  const [items, setItems] = useState();
  const [part, setPart] = useState();
  const [order, setOrder] = useState();
  const [lead, setLead] = useContext(AppContext);

  useEffect(() => {
    getMachinery();
  }, []);

  useEffect(() => {
    const result = [...new Set(data1)];
    for (let i = 0; i < result.length; i++) {
      let opt = document.createElement("option");
      opt.value = result[i];
      opt.innerHTML = result[i];
      target.appendChild(opt);
    }
  }, [data1]);

  useEffect(() => {
    const result2 = [...new Set(data2)];
    for (let i = 0; i < result2.length; i++) {
      let opt = document.createElement("option");
      opt.value = result2[i];
      opt.innerHTML = result2[i];
      target2.appendChild(opt);
    }
  }, [data2]);

  useEffect(() => {
    const result3 = [...new Set(data3)];
    for (let i = 0; i < result3.length; i++) {
      let opt = document.createElement("option");
      opt.value = result3[i];
      opt.innerHTML = result3[i];
      target3.appendChild(opt);
    }
  }, [data3]);

  const getMachinery = async () => {
    let url = "http://10.125.121.177:8080/data/selectlist";

    try {
      const resp = await fetch(url);
      const data = await resp.json();
      setdata(data);
      setdata1(data.map((item) => item.machinery));
    } catch (err) {
      console.log(err);
    }
  };

  //리스트를 select box의 option으로
  let target = document.getElementById("choice");
  let target2 = document.getElementById("choice2");
  let target3 = document.getElementById("choice3");
  //machinary 리스트화

  const changeValue = (e) => {
    e.preventDefault();
    //새로운 machinary가 선택될 때 마다 choice2를 초기화
    target2.length = 0;
    let items = [];
    items.push("===선택===");
    setMachinery(e.target.value);

    datas.map((item) => {
      if (item.machinery === e.target.value) {
        items.push(item.items);
      }
    });
    setdata2(items);
  };

  const changeValue2 = (e) => {
    e.preventDefault();
    //새로운 machinary가 선택될 때 마다 choice2를 초기화
    target3.length = 0;
    setItems(e.target.value);
    let items2 = [];
    items2.push("===선택===");
    datas.map((item) => {
      if (item.machinery === machinery && item.items === e.target.value) {
        items2.push(item.part1);
      }
    });
    setdata3(items2);
  };

  const changeValue3 = (e) => {
    e.preventDefault();
    setPart(e.target.value);
  };

  // const getLeadtime = async (jsonObj) => {
  //   let url = "http://10.125.121.177:8080/data/leadtime";

  //   try {
  //     const resp = await fetch(url, {
  //       method: "post",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(jsonObj),
  //     });
  //     const data = await resp.json();
  //     console.log(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const getLeadtime = async () => {
    let url = `http://10.125.121.177:8080/data/leadtime?machinery=${machinery}&items=${items}&part1=${part}`;

    try {
      const resp = await fetch(url);
      const data = await resp.json();
      data[0].order_date = order;
      // console.log(data)
      setLead(data);
    } catch (err) {
      console.log(err);
    }
  };

  const submitdata = (e) => {
    e.preventDefault();
    let jsonObj = {
      machinery: machinery,
      items: items,
      part1: part,
    };
    getLeadtime(jsonObj);
  };

  const refDateIn = useRef();

  const handleChange = (e) => {
    e.preventDefault();
    // console.log(refDateIn.current.value)
    setOrder(refDateIn.current.value);
    //달력으로 입력받은 날짜값(refDateIn)를 url에 입력될 viewDay로 변경
  };

  return (
    <>
      <Container>
        {/* <fieldset className="fieldBox"> */}
        <Row>
          <Col>
            <label className="label" for="choice">
              {" "}
              Order To{" "}
            </label>
            <input className="input"></input>
            <label className="label" for="choice">
              {" "}
              MACHINERY{" "}
            </label>
            <select id="choice" onChange={changeValue}>
              <option value={null}>=== 선택 ===</option>
            </select>
            <label className="label" for="choice2">
              {" "}
              Description{" "}
            </label>
            <select id="choice2" onChange={changeValue2}>
              <option value={null}>=== 선택 ===</option>
            </select>
            <label className="label" for="choice3">
              {" "}
              Part NO{" "}
            </label>
            <select id="choice3" onChange={changeValue3}>
              <option value={null}>=== 선택 ===</option>
            </select>
            <label className="label" for="choice">
              {" "}
              Order Date{" "}
            </label>
            <input
              type="date"
              className="input"
              ref={refDateIn}
              onChange={handleChange}
            />
            <label className="label" for="choice">
              {" "}
              Qty{" "}
            </label>
            <input className="input"></input>
          </Col>
          <Button variant="dark" className="butt" onClick={submitdata}>
            Submit
          </Button>
        </Row>
        {/* <button className="butt" onClick={submitdata}>submit</button> */}
        {/* <button type="submit" onClick={goUrl}>
            submit
          </button> */}
        {/* </fieldset> */}
      </Container>
    </>
  );
};

export default Lead;
