import React, { useState, useRef, useEffect } from "react";

import { read, utils } from "xlsx";

const UploadStudent = (props) => {
  const fileInfoInput = useRef(null);

  const excelFileHandler = (e) => {
    let input = e.target;
    if (input.files[0] !== undefined) {
      let reader = new FileReader();
      reader.onload = function () {
        try {
          let data = reader.result;
          let workBook = read(data, { type: "binary" });
          workBook.SheetNames.forEach(function (sheetName) {
            let rows = utils.sheet_to_json(workBook.Sheets[sheetName]);
            let new_rows = rows.map((row) => ({
              num: row["번호"],
              gender: row["성별"],
              name: row["이름"],
            }));
            //학생정보 배열 App으로 보내기
            props.setStudents(new_rows);

            //학생정보가 저장되면 로컬스토리지에 문자로 저장해두기
            localStorage.setItem("randomStudents", JSON.stringify(new_rows));
          });
        } catch (error) {
          //   console.log(error);
        }
      };
      reader.readAsBinaryString(input.files[0]);
    } else {
      return;
    }
  };

  return (
    <div>
      {" "}
      <label htmlFor="excelFileInput"></label>
      <input
        name="excelFileInput"
        type="file"
        id="excelFile"
        ref={fileInfoInput}
        onChange={(e) => {
          excelFileHandler(e);
        }}
        accept={".xls,.xlsx"}
      />
    </div>
  );
};

export default UploadStudent;
