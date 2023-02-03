import "react-calendar/dist/Calendar.css";
import React, { useState, createContext, useEffect } from "react";
import Calendar from "react-calendar";
import moment from "moment";
// import { addDays } from "date-fns";
import Lead from "./Lead";
// import Barchart from "./BarChart";
import MyModal from "./Modal";
import "react-datepicker/dist/react-datepicker.css";
// import { ko } from "date-fns/esm/locale";
import "../style/selectDate.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./Footer";

export const AppContext = createContext();

function SelectDate() {
  const [lead, setLead] = useState();
  const [startDate, setStartDate] = useState();
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    setStartDate(lead?.[0]["order_date"]);
    setVisible(!visible);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lead]);

  // 숫자만큼 선택한 날짜에서 더함
  // json 데이터 중 리드 타임을 어떤 변수에 저장해서 (+-표준편차)
  // 선택한 날짜 ~ 선택된 날짜 + 리드타임까지 표시 할려고 함
  // 해당 컴포넌트에서 함수호출을 통해 화면에 나타내거나 변수에 저장할 수 있지만
  // 다른 컴포넌트에 값을 전달하는 것은 잘 모르겠음

  const d1 = [];
  // let a = 100;

  let a = startDate;
  let b = lead?.[0]["avg_leadtime"];
  let t = b;

  // for (let i = 0; i < a; i++) {
  //   d1.push(addDays(startDate, i));
  // }

  let y = parseInt(t / 365);
  let m = parseInt((t % 365) / 30);
  let d2 = parseInt((t % 365) % 30);

  return (
    <AppContext.Provider value={[lead, setLead]}>
      <Container>
        <Row>
          <Col>
            {/* <div className="top">
          유출여부 조회하기
          <br/>
          대다수의 온라인서비스 사용자들이 동일한 계정정보(아이디,페스워드)를 사용하고 있어, 1건의 개정정보 유출로 막대한 피해를 입을 수 있습니다.
          <br/>
          따라서 동일한 패스워드를 타 사이트에서 중복하여 사용하지 말고, 사용중인 패스워드를 주기적으로 변경하길 권장합니다.
        </div> */}
            <header>
              <div className="container">
                <h1>리드타임 예측</h1>
                <h2>리드타임 예측이란</h2>
                <p>Maintained by </p>
              </div>
            </header>
          </Col>
        </Row>
        <Row>
          <Col>
            <Lead />
          </Col>

          <Col>
            <Container className="container-fluid">
              <Col>
                <Row>
                  <Calendar
                    // onChange={onChange}
                    value={
                      moment(startDate).add(lead?.[0]["avg_leadtime"], "days")[
                        "_d"
                      ]
                    }
                    locale="en-EN"
                    tileClassName={({ date, view }) => {
                      if (
                        d1.find(
                          (x) =>
                            moment(x).format("DD-MM-YYYY") ===
                            moment(date).format("DD-MM-YYYY")
                        )
                      ) {
                        // d1 안의 날짜 하이라이트
                        return "highlight";
                      }
                    }}
                  />
                </Row>
              </Col>

              <Col>
                <Row>
                  {visible && (
                    <div>
                      예상 리드타임은 {`${y}year ${m}month ${d2}day`} 입니다.
                      <br />
                      발주일이 {moment(a).format("YYYY년 MM월 DD일")}이라면{" "}
                      <br />
                      {moment(startDate)
                        .add(b, "days")
                        .format("YYYY년 MM월 DD일")}
                      에 입고예정입니다.
                    </div>
                  )}
                </Row>
              </Col>
              <Col className="a">
                <Row>
                  <div>
                    <MyModal props={lead} />
                  </div>
                </Row>
              </Col>
            </Container>
          </Col>
        </Row>
        {/* <Row><Col><MyModal props={lead} /></Col></Row> */}
      </Container>
      <Footer />
    </AppContext.Provider>
  );
}

export default SelectDate;
