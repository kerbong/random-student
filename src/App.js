import "./App.css";
import UploadStudent from "./component/UploadStudent";
import ShowStudents from "./component/ShowStudents";
import React, { useState, useRef } from "react";
import Swal from "sweetalert2";

function App() {
  const [students, setStudents] = useState(
    JSON.parse(localStorage?.getItem("randomStudents")) || []
  );
  const [pickStudents, setPickStudents] = useState([]);

  const numberRef = useRef();

  //랜덤으로 뽑는 전체 로직
  const randomPick = (num) => {
    let pickedStudentsNumName = [];
    let pickStudent = [];
    let new_students = [...students];
    for (let i = 0; i < num; i++) {
      //숫자 랜덤으로 뽑고

      let randNum = Math.floor(Math.random() * new_students.length);
      //남은 학생들 중에 선택하고
      let pickStudent = new_students[randNum];
      setPickStudents((prev) => [...prev, pickStudent]);
      //남은학생들 중에서 뽑힌 학생을 제외하기
      new_students = new_students.filter(
        (stu) => stu.name !== pickStudent.name
      );

      pickedStudentsNumName.push(pickStudent.num + pickStudent.name);
    }
    setStudents([...new_students]);

    Swal.fire({
      title: ``,
      html: `<div class="swal-text">${pickedStudentsNumName.join(" ")}</div>`,
      width: 500,
      padding: "3rem",
      color: "#043324eb",
      background: "#fff url(/images/trees.png)",
      confirmButtonText: "확인",
      timer: 5000,
      confirmButtonColor: "#043324eb",
      backdrop: `
      #005a7b4a
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let input_value = numberRef.current.value;
    //만약 숫자이면..
    if (!isNaN(+input_value)) {
      randomPick(input_value);
    }
  };

  return (
    <div className="App">
      {/* 타이틀 */}

      <div className="App-div">
        <div className="App-btn">
          <button
            className="reset-btn"
            onClick={() => {
              setStudents([
                ...JSON.parse(localStorage?.getItem("randomStudents")),
              ]);
              setPickStudents([]);
            }}
          >
            다시뽑기
          </button>
          <button
            className="reset-btn"
            onClick={() => {
              localStorage.removeItem("randomStudents");
              setStudents([]);
              setPickStudents([]);
            }}
          >
            학생정보 초기화
          </button>
        </div>
        <h1>🤔 누가뽑힐까?! 🤭 랜덤뽑기!</h1>
      </div>
      {/* 만약 학생자료가 없으면, 파일업로드 */}
      {students?.length === 0 && pickStudents?.length === 0 && (
        <div>
          <UploadStudent
            setStudents={(datas) => {
              setStudents([...datas]);
            }}
          />
        </div>
      )}

      {/*학생 보여주기 */}

      <>
        <form className="AppMain-form" onSubmit={submitHandler}>
          <input
            type="number"
            ref={numberRef}
            className="AppMain-btn appInputBtn"
            max="6"
            min="1"
          ></input>
          <button onClick={submitHandler} className="AppMain-btn">
            명 뽑기
          </button>
        </form>

        <ShowStudents students={students} pickStudents={pickStudents} />
      </>
    </div>
  );
}

export default App;
