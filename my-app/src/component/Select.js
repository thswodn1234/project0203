import { useEffect, useState, useContext } from "react";
import { AppContext } from "../App";

function Select() {
  const [datas, setdata] = useState();
  const [data1, setdata1] = useState();
  const [data2, setdata2] = useState();
  const [data3, setdata3] = useState();
  const [machinery, setMachinery] = useState();
  const [items, setItems] = useState();
  const [part, setPart] = useState();
  const [lead, setLead] = useContext(AppContext);

  //화면이 실행되면 getMachinery() 호출
  useEffect(() => {
    getMachinery();
  }, []);
  // []이므로 처음 렌더링 될때만 실행

  //스프링에서 select box의 리스트 호출
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

  //select box
  let target = document.getElementById("choice");
  let target2 = document.getElementById("choice2");
  let target3 = document.getElementById("choice3");

  useEffect(() => {
    const result = [...new Set(data1)];

    //리스트를 select box의 option으로
    for (let i = 0; i < result.length; i++) {
      let opt = document.createElement("option");
      opt.value = result[i];
      opt.innerHTML = result[i];
      target.appendChild(opt);
    }
  }, [data1, target]);

  //machinary 리스트화

  // machinery 선택할 때 이벤트
  const changeValue = (e) => {
    e.preventDefault();
    //새로운 machinary가 선택될 때 마다 choice2를 초기화
    target2.length = 0;
    let items = [];
    items.push("===선택===");

    //machinery 선택값 저장
    setMachinery(e.target.value);

    //선택된 machinery값 중에서만 items 목록 가져오기
    // eslint-disable-next-line array-callback-return
    datas.map((item) => {
      if (item.machinery === e.target.value) {
        items.push(item.items);
      }
    });

    //data2 useState
    setdata2(items);
  };

  //data2 값이 변경될때마다 새로운 select box 목록 생성
  useEffect(() => {
    const result2 = [...new Set(data2)];
    for (let i = 0; i < result2.length; i++) {
      let opt = document.createElement("option");
      opt.value = result2[i];
      opt.innerHTML = result2[i];
      target2.appendChild(opt);
    }
  }, [data2, target2]);

  //items 선택할 때 이벤트
  const changeValue2 = (e) => {
    e.preventDefault();
    //새로운 items가 선택될 때 마다 choice3를 초기화
    target3.length = 0;

    //items 선택값 저장
    setItems(e.target.value);

    //선택된 machinery, items값 중에서만 part1 목록 가져오기
    let items2 = [];
    items2.push("===선택===");
    datas.map((item) => {
      if (item.machinery === machinery && item.items === e.target.value) {
        items2.push(item.part1);
      }
    });

    //data3 useState
    setdata3(items2);
  };

  //data3 값이 변경될때마다 새로운 select box 목록 생성
  useEffect(() => {
    const result3 = [...new Set(data3)];
    for (let i = 0; i < result3.length; i++) {
      let opt = document.createElement("option");
      opt.value = result3[i];
      opt.innerHTML = result3[i];
      target3.appendChild(opt);
    }
  }, [data3, target3]);

  //part1 선택할 때 이벤트
  const changeValue3 = (e) => {
    e.preventDefault();

    //part1 선택값 저장
    setPart(e.target.value);
  };

  //submit 버튼 클릭시 이벤트
  const submitdata = (e) => {
    e.preventDefault();
    //machinery, items, part1 선택값을 json형식으로
    let jsonObj = {
      machinery: machinery,
      items: items,
      part1: part,
    };

    //리드타임 불러오기 함수 호출
    getLeadtime(jsonObj);
  };

  //json파라미터로 리드타임 정보 호출
  // const getLeadtime = async(jsonObj) => {
  //   let url = 'http://10.125.121.177:8080/data/leadtime';

  //   try{
  //     const resp = await fetch(url, {
  //       method : 'post',
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body : JSON.stringify(jsonObj)
  //     });
  //     const data = await resp.json();
  //     console.log(data)
  //     setLead(data)
  //   }
  //   catch(err){
  //     console.log(err);
  //   }
  // }

  const getLeadtime = async () => {
    let url = `http://10.125.121.177:8080/data/leadtime?machinery=${machinery}&items=${items}&part1=${part}`;
    try {
      const resp = await fetch(url);
      const data = await resp.json();
      console.log(data);
      console.log(machinery, ",", items, ",", part);
      setLead(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <select id="choice" onChange={changeValue}>
        <option value="none">=== 선택 ===</option>
      </select>
      <select id="choice2" onChange={changeValue2}>
        <option value="none">=== 선택 ===</option>
      </select>
      <select id="choice3" onChange={changeValue3}>
        <option value="none">=== 선택 ===</option>
      </select>
      <button onClick={submitdata}>버튼</button>
    </>
  );
}

export default Select;
