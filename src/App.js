import "./App.css";
import UploadStudent from "./component/UploadStudent";
import ShowStudents from "./component/ShowStudents";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

function App() {
  const [students, setStudents] = useState(
    JSON.parse(localStorage?.getItem("randomStudents")) || []
  );
  const [pickStudents, setPickStudents] = useState([]);

  //랜덤으로 뽑는 전체 로직
  const randomPick = () => {
    //숫자 랜덤으로 뽑고
    let randNum = Math.floor(Math.random() * students.length);
    //남은 학생들 중에 선택하고
    let pickStudent = students[randNum];
    setPickStudents((prev) => [...prev, pickStudent]);
    console.log(pickStudent);
    //남은학생들 중에서 뽑힌 학생을 제외하기
    // let new_students = [...students];
    let new_students = students.filter((stu) => stu.name !== pickStudent.name);
    console.log(new_students);
    setStudents([...new_students]);
    Swal.fire({
      title: `${pickStudent.num}`,
      html: `<div class="swal-text">${pickStudent.name}</div>`,
      width: 500,
      padding: "3rem",
      color: "#043324eb",
      background: "#fff url(/images/trees.png)",
      confirmButtonText: "확인",
      timer: 4000,
      confirmButtonColor: "#043324eb",
      backdrop: `
      #005a7b4a
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `,
    });
  };

  return (
    <div className="App">
      {/* 타이틀 */}

      <div className="App-div">
        <button
          onClick={() => {
            localStorage.removeItem("randomStudents");
            setStudents([]);
            setPickStudents([]);
          }}
          className="App-btn"
        >
          학생정보 초기화
        </button>
        <h1>🤔 누가뽑힐까?! 🤭 랜덤뽑기!</h1>
      </div>
      {/* 만약 학생자료가 없으면, 파일업로드 */}
      {students.length === 0 && (
        <div>
          <UploadStudent
            setStudents={(datas) => {
              setStudents([...datas]);
            }}
          />
        </div>
      )}

      {/*학생 보여주기 */}
      {students.length > 0 && (
        <>
          <button
            onClick={() => {
              randomPick();
            }}
            className="AppMain-btn"
          >
            랜덤뽑기
          </button>
          <button
            className="AppMain-btn"
            onClick={() => {
              setStudents([
                ...JSON.parse(localStorage?.getItem("randomStudents")),
              ]);
              setPickStudents([]);
            }}
          >
            초기화
          </button>
          <ShowStudents students={students} pickStudents={pickStudents} />
        </>
      )}
    </div>
  );
}

export default App;
